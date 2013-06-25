//
// create closure
//
(function($) {


    //
    // plugin definition
    //
    $.fn.qte = function(options) {
        
	var opts = $.extend({}, $.fn.qte.defaults, options);
        // iterate and reformat each matched element
        return this.each(function() {
	    $this = $(this);
	    $.fn.qte.pop($this,opts);
	});
    };

    //
    // plugin defaults
    //
    $.fn.qte.defaults = {
        key:'SPACE',
        time:0,
        delay:0,
        attempt:0
    };
    //
    // private function for debugging
    //
    function debug(obj) {
        if (window.console && window.console.log)
            window.console.log('QTE Call' + JSON.stringify(obj));
    };
    //
    // define and expose our format function
    //
    $.fn.qte.pop = function(obj,options) {
        var qte = $("<div class='QTE'/>");
	var attempt = 0;
	$.fn.qte.display(qte,options,attempt);

        obj.keydown(function(event) {
            attempt = attempt + 1;
            if ( String.fromCharCode(event.which) === (options.key).toUpperCase() ) {
                $.fn.qte.succes(qte);
            }
            else{
                
                $.fn.qte.fail(qte,options,attempt);

                if(options.attempt === attempt){
                    obj.unbind('keydown')
                }
            }
            
        })
        obj.append(qte)
    };

    $.fn.qte.succes = function(obj){
	obj.html('SUCCES')
    }

    $.fn.qte.fail = function(obj,options,attempt){
	
        if(attempt < options.attempt){
                    obj.html('Fail! Try again')
        }else{
	    obj.html('Fail!')
	}
    }

    $.fn.qte.display = function(obj,options,attempt){
	if (options.time === 0){
            obj.html(options.key)
        }else{
            setTimeout(function(){
                if(options.delay != 0){
                    setTimeout(function(){
                        obj.empty();
                    },options.delay)
                }
                obj.html(options.key)
            },options.time);
        }
    }
    //
    // end of closure
    //
})(jQuery);



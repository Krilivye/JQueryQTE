//
// create closure
//
(function($) {


    //
    // plugin definition
    //
    $.fn.qte = function(options) {
	if (options && options.key){
            options.key = [].concat(options.key)
	}
	var opts = $.extend({}, $.fn.qte.defaults, options);
        // iterate and reformat each matched element
        return this.each(function() {
	    $this = $(this);
	    pop($this,opts);
	});
    };
    
    $.fn.qte.succes = function(){
	$(this).html('SUCCES')
    }

    $.fn.qte.fail = function(){
	$(this).html('Fail!')
    }

    $.fn.qte.display = function(options,attempt){
	var display = ""
	    $.each(options.key, function(index,value){
		display = display + value +','
	    })
	$(this).html(display.slice(0,-1))
    }

    $.fn.qte.fail_attempt = function(options,attempt){
	$(this).html('Fail! Try again')
    }
    //
    // plugin defaults
    //
    $.fn.qte.defaults = {
        key:['SPACE'],
        time:0,
        delay:0,
        max_attempt:0,
	hover:false,
	fail:$.fn.qte.fail,
	fail_attempt:$.fn.qte.fail_attempt,
	succes:$.fn.qte.succes,
	display:$.fn.qte.display
    };

    //
    // private function for debugging
    //
    function debug(obj) {
        if (window.console && window.console.log)
            window.console.log('QTE Debug: ' + JSON.stringify(obj));
    };
    //
    // define and expose our format function
    //
    function pop(obj,options) {
	obj.addClass('QTE')
	var attempt = 0;
	var pressed = 0;
	if (options.time === 0){
	    options.display.call(obj.get(),options,attempt);
	    if(options.hover){
		obj.hover(function hqte(){bindqte(obj,options,attempt,pressed)});
	    }else{
		bindqte(obj,options,attempt,pressed);
	    }
	    delayedQte(obj,options);
	}else{
            setTimeout(function(){               	
		options.display.call(obj.get(),options,attempt);
		bindqte(obj,options,attempt,pressed);
		delayedQte(obj,options);
            },options.time);
        }
    };

    function delayedQte(obj,options){
            if(options.delay != 0){
                setTimeout(function(){
                    obj.empty();
		    $(document).unbind('keydown');
                },options.delay)
	    }
    }
    function bindqte(obj,options,attempt,pressed){
        $(document).keydown(function(event) {
            if ( String.fromCharCode(event.which) === (options.key[pressed]).toUpperCase() ) {
		pressed = pressed + 1;
		if (pressed === options.key.length){
                    options.succes.call(obj.get());
		    $(document).unbind('keydown');
		}
            }
            else{
		attempt = attempt + 1;
		pressed = 0;
		if(attempt < options.max_attempt){
                    options.fail_attempt.call(obj.get(),options,attempt);
		}
		else{	
		    options.fail.call(obj.get());
		    $(document).unbind('keydown')
		}
            }           
        })
    }




    //
    // end of closure
    //
})(jQuery);



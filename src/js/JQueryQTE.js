// Annonymous function 
// create closure
(function($) {


    // jquery plugin definition
    $.fn.qte = function(options) {
	if (options && options.key){
            options.key = [].concat(options.key)
	}

        // iterate and reformat each matched element
        return this.each(function() {
	    var opts = $.extend({}, $.fn.qte.defaults, options);
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
	$(this).addClass('QTE');
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
	failOnDelay:true,
	delaywatcher:false,
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
	var attempt = 0;
	var pressed = 0;
	var issuccesfull = false;
	if (options.time === 0){
	    options.display.call(obj.get(),options,attempt);
	    cancelT =   delayedQte(obj,options);
	    if(options.hover){
		obj.hover(function hqte(){bindqte(obj,options,attempt,pressed,cancelT)				 },
			  function hclear(){
			      $(document).unbind('keydown')
			  }
			 );

	    }else{
		bindqte(obj,options,attempt,pressed,cancelT);
	    }
	    
	}else{
            setTimeout(function(){               	
		options.display.call(obj.get(),options,attempt);
		cancelT = delayedQte(obj,options);  
		if(options.hover){
		    obj.hover(function hqte(){bindqte(obj,options,attempt,pressed,cancelT)},
			      function hclear(){
				  $(document).unbind('keydown')
				  f			      }
			     );
		}else{
		    bindqte(obj,options,attempt,pressed,cancelT);
		}
            },options.time);
        }
    };
    function delayWatcher(obj,init)
    {
	if ($(obj).children().length === 0){
	    $(obj).append('<p></p>');
	}
	this.counter = (this.counter || init) -1;
	$(obj).children().html('time left '+counter)
    }

    function delayedQte(obj,options){
        if(options.delay != 0){
	    if(options.delaywatcher){
		var counter = options.delay/1000;
		var cancelDelayWatcher= setInterval(function(){delayWatcher(obj.get(),counter)},1000);
	    }
            var cancelT = setTimeout(function(){
		if(options.failOnDelay){
		    cleanqte(obj);
		    options.fail.call(obj.get());
		}else{
		    obj.removeClass('QTE');
		    obj.empty();
		}		    
            },options.delay)
	}
	return cancelT;
    }
    function bindqte(obj,options,attempt,pressed,cancelT){
        $(document).keydown(function(event) {
            if ( String.fromCharCode(event.which) === (options.key[pressed]).toUpperCase() ) {
		pressed = pressed + 1;
		if (pressed === options.key.length){
		    cleanqte(obj);
		    window.clearTimeout(cancelT);
                    options.succes.call(obj.get());
		}
            }
            else{
		attempt = attempt + 1;
		pressed = 0;
		if(attempt < options.max_attempt){
                    options.fail_attempt.call(obj.get(),options,attempt);
		}
		else{	
		    cleanqte(obj);
		    options.fail.call(obj.get());
		}
            }           
        })
    }

    function cleanqte(obj){
	obj.removeClass('QTE');
	obj.empty();
	$(document).unbind('keydown');
    }


    // Annonymous function call
    // assign $ to jQuery.
})(jQuery);



    //
    // create closure
    //
    (function($) {
      //
      // plugin definition
      //
      $.fn.qte = function(options) {
        debug(this);
        // build main options before element iteration
        var opts = $.extend({}, $.fn.qte.defaults, options);
        // iterate and reformat each matched element
        return this.each(function() {
          $this = $(this);
          // build element specific options
          var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
                    
          $.fn.qte.pop($this,o);
          
        });
      };
      //
      // private function for debugging
      //
      function debug($obj) {
        if (window.console && window.console.log)
          window.console.log('QTE Call' + $obj.size());
      };
      //
      // define and expose our format function
      //
      $.fn.qte.pop = function(obj,o) {
        var qte = $("<div class='QTE'/>");
        if (o.time === 0){
            qte.html(o.key)
        }else{
            setTimeout(function(){
                if(o.delay != 0){
                    setTimeout(function(){
                        qte.empty();
                    },o.delay)
                }
                qte.html(o.key)
            },o.time);
        }
        $(document).keydown(function(event) {
            if ( event.which == 40 ) {
                qte.html('SUCCES')
            }
        })
        obj.append(qte)
      };
      //
      // plugin defaults
      //
      $.fn.qte.defaults = {
        key:'SPACE',
        time:0,
        delay:0
      };
    //
    // end of closure
    //
    })(jQuery);



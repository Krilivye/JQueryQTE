$(document).ready(function(){
module("QTE", {

  teardown: function() {

    $('#test').empty()
  }
});
    test("QTE fire a selected question", function(){
        $('#test').qte({key:'a'});
        equal($('.QTE').html(), "a", "We expect value to be A");
    })
    test("QTE fire at selected time", function(){
        var clock = this.sandbox.useFakeTimers();
        $('#test').qte({time:10000});
        clock.tick(10000);
        equal($('.QTE').html(), "SPACE");
        clock.restore();
    })
    test("QTE fire for a selected delay", function(){
        var clock = this.sandbox.useFakeTimers();
        $('#test').qte({delay:10000});
        clock.tick(10);
        equal($('.QTE').html(), "SPACE");
        clock.restore();
    })
    test("QTE keypressed load a succes",function(){
        $('#test').qte()
        var e = jQuery.Event( 'keydown', { which: 40 } );
        $('#test').trigger(e)
        equal($('.QTE').html(),"SUCCES")
    })
    test("QTE can be chained",function(){
        var clock = this.sandbox.useFakeTimers();
        $('#test').qte().qte({time:10,delay:10})
         equal($('.QTE').html(), "SPACE");
        var e = jQuery.Event( 'keydown', { which: 40 } );
        $('#test').trigger(e)
        equal($('.QTE').html(),"SUCCES")
        clock.tick(11);
        equal($('.QTE:last').html(), "SPACE");
    })
    
});

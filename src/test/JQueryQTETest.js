$(document).ready(function(){

module("QTE", {
  setup: function(){
        key_a = jQuery.Event( 'keydown', { which: 65 } );
        key_b = jQuery.Event( 'keydown', { which: 66 } );
        
  },

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
        $('#test').qte([{time:10000}]);
        
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
        $('#test').qte({key:'a'})

        $('#test').trigger(key_a)

        equal($('.QTE').html(),"SUCCES")
    })
    test("QTE can be chained",function(){
        var clock = this.sandbox.useFakeTimers();
        $('#test').qte({key:'a'}).qte({time:10,delay:10})
        
	equal($('.QTE').html(), "a");
        $('#test').trigger(key_a)
        
	equal($('.QTE').html(),"SUCCES")
        clock.tick(11);
        equal($('.QTE:last').html(), "SPACE");
        clock.restore();
    })
    test("QTE fail if not correct key entered",function(){
        
	$('#test').qte({key:'a'})
        
	$('#test').trigger(key_b)
        
	equal($('.QTE').html(),"Fail!")
        
    })
    test("QTE can have several attempt", function(){
        $('#test').qte({key:'b',attempt:3})

        $('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail! Try again")
        $('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail! Try again")

        $('#test').trigger(key_b)
        equal($('.QTE').html(),"SUCCES")
    })
    
    test("QTE can fail after several attempt", function(){
        $('#test').qte({key:'b',attempt:3})
        var e = jQuery.Event( 'keydown', { which: 65 } );
        
	$('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail! Try again")
        $('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail! Try again")
        
	$('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail!")
    })
    
    test("QTE can be a combo",function(){
	$('#test').qte({ key : 'ab' })

	$('#test').trigger(key_a);
	$('#test').trigger(key_b);
	equal($('.QTE').html(),"SUCCES");
    })
    
});

$(document).ready(function(){

    module("Base", {
	setup: function(){
            key_a = jQuery.Event( 'keydown', { which: 65 } );
            key_b = jQuery.Event( 'keydown', { which: 66 } );
            key_c = jQuery.Event( 'keydown', { which: 67 } );
	    mousehover = jQuery.Event('mouseenter');
	},
	teardown: function() {
	    $('#test').empty()
	    $('#test2').empty()
	    $('.ctest').empty()
	    $(document).unbind('keydown')
	}
    })
    test("Can display the selected key", function(){
        
	$('#test').qte({key:'a'});
        
	equal($('.QTE').html(), "a", "We expect value to be A");
;
    })
    test("Correct keypressed load a succes",function(){
        $('#test').qte({key:'a'})

        $('#test').trigger(key_a)

        equal($('.QTE').html(),"SUCCES")
    })
    test("Can fail if not correct key entered",function(){
        
	$('#test').qte({key:'a'})
        
	$('#test').trigger(key_b)
        
	equal($('.QTE').html(),"Fail!")
        
    })
    test("Can display at selected time", function(){
        var clock = this.sandbox.useFakeTimers();
        $('#test').qte([{time:10000}]);
        
	clock.tick(10000);
        
	equal($('.QTE').html(), "SPACE");
        clock.restore();
    })
    test("Can display for a selected delay", function(){
        var clock = this.sandbox.useFakeTimers();
        $('#test').qte({delay:10000});
        

	clock.tick(10);
	equal($('.QTE').html(), "SPACE");
	clock.tick(100001);

	equal($('.QTE').html(), "");
        clock.restore();
    })

    test("Can display at a selected time and for a selected delay",function(){
	var clock = this.sandbox.useFakeTimers();
        $('#test').qte({time:10,delay:10000});
        
	equal($('#test').html(),"");
	clock.tick(11);
	equal($('.QTE').html(), "SPACE");
	clock.tick(100001);

	equal($('.QTE').html(), "");
        clock.restore();
    })
    test("Can be chained",function(){
        var clock = this.sandbox.useFakeTimers();
        $('#test').qte({key:'a'}).qte({time:10,delay:10})
        
	equal($('.QTE').html(), "a");
        $('#test').trigger(key_a)
        
	equal($('.QTE').html(),"SUCCES")
        clock.tick(11);
        equal($('.QTE:last').html(), "SPACE");
        clock.restore();
    })

    test("Can success after several attempt", function(){
        $('#test').qte({key:'b',max_attempt:3})

        $('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail! Try again")
        $('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail! Try again")

        $('#test').trigger(key_b)
        equal($('.QTE').html(),"SUCCES")
    })
    
    test("Can fail after several attempt", function(){
        $('#test').qte({key:'b',max_attempt:3})
        
	$('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail! Try again")
        $('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail! Try again")
        
	$('#test').trigger(key_a)
        equal($('.QTE').html(),"Fail!")
    })
    test("Can not work when qte hover option is set",function(){
	$('#test').qte({hover:true})

	$('#test').trigger(key_b)

	equal($('#test').html(),'SPACE');
    })

    test("Can work on hover when qte hover option is set",function(){
	$('#test').qte({hover:true})

	$('#test').trigger(mousehover);
	$('#test').trigger(key_b)

	equal($('#test').html(),'Fail!');
    })
    test("Can have two simultaneous qte when hover option is set",function(){
	$('#test').qte({hover:true})
	$('#test2').qte({hover:true})

	$('#test').trigger(mousehover);
	$('#test').trigger(key_b)

	equal($('#test').html(),'Fail!');
	equal($('#test2').html(),'SPACE')
    })
    test("Can have qte set on muliple selector",function(){
	$('.ctest').qte();
	
	$.each($('.ctest'),function(index,value){
	    equal($(value).html(),'SPACE');
	});
    })
    test("Can have independent qte set on multiple selector with hover",function(){
	$('.ctest').qte({hover:true});
	
	$('.ctest:first').trigger(mousehover);
	$('#test').trigger(key_b)
	
	equal($('.ctest:first').html(),'Fail!');
	equal($('.ctest:last').html(),'SPACE');

    })
    test("Can offer pattern qte (combo)",function(){
	$('#test').qte({key:['a','b','c']});
	
	equal($('#test').html(),'a,b,c');		  
    })
    test("Can work with a pattern qte",function(){
	$('#test').qte({key:['a','b','c']});

	$('#test').trigger(key_a);
	$('#test').trigger(key_b);
	$('#test').trigger(key_c);

	equal($('#test').html(),'SUCCES');
    })
    test("Can fail while in middle of a pattern qte",function(){
	$('#test').qte({key:['a','b','c']});

	$('#test').trigger(key_a);
	$('#test').trigger(key_c);
	$('#test').trigger(key_b);

	equal($('#test').html(),'Fail!');
    })

    test("Can have attemps with a pattern qte",function(){
	$('#test').qte({key:['a','b','c'],max_attempt:3});

	$('#test').trigger(key_a);
	$('#test').trigger(key_b);
	$('#test').trigger(key_b);

	equal($('#test').html(),'Fail! Try again');

	$('#test').trigger(key_c);
	equal($('#test').html(),'Fail! Try again');

	$('#test').trigger(key_a);
	$('#test').trigger(key_b);
	$('#test').trigger(key_c);

	equal($('#test').html(),'SUCCES');
    })

    module("Customisation", {
	setup: function(){
            key_a = jQuery.Event( 'keydown', { which: 65 } );
            key_b = jQuery.Event( 'keydown', { which: 66 } );
            key_c = jQuery.Event( 'keydown', { which: 67 } );
	    failfunction = function (){$(this).html('myFail')};

	},

	teardown: function() {

	    $('#test').empty()
	    $('#test2').empty()
	}
    });
    
    test("Can change the fail function",function(){
	$('#test').qte({key:'a',fail: failfunction});
	
	$('#test').trigger(key_b);

	equal($('.QTE').html(),"myFail");
	
    })

    test("Can keep attempt behavior while changing fail function",function(){
	$('#test').qte({key:'a',max_attempt:3,fail:failfunction});
	
	$('#test').trigger(key_b)
        equal($('.QTE').html(),"Fail! Try again")
        $('#test').trigger(key_b)
        equal($('.QTE').html(),"Fail! Try again")
        
	$('#test').trigger(key_b)
        equal($('.QTE').html(),"myFail")
    })

    test("Can have 2 fails function on different QTE",function(){

	$('#test').qte({key:'a',fail:failfunction});
	$('#test2').qte({key:'b'});
	
	$('#test').trigger(key_c)

	equal($('#test').html(),"myFail");
	equal($('#test2').html(),"Fail!");
	
    })
    test("Can change the fail attemps function",function(){
	var failAttempsFunction = function(options,attempt){$(this).html('Fail, left attemps:'+(options.max_attempt-attempt))};
	$('#test').qte({key:'a',max_attempt:3,fail_attempt: failAttempsFunction});
	
	$('#test').trigger(key_b);
	equal($('.QTE').html(),"Fail, left attemps:2");
    })

    test("Can change the succes function",function(){
	var succesfunction = function (){$(this).html('Win')};
	$('#test').qte({key:'a',succes: succesfunction});
	
	$('#test').trigger(key_a);
	equal($('.QTE').html(),"Win");
    })
    
    test("Can change the display function",function(){
	var displayfunction = function (){$(this).html('nothing')};
	
	$('#test').qte({display:displayfunction});
	
	equal($('#test').html(),"nothing");
    })

});

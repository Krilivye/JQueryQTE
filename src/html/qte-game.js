$(document).ready(function(){
    function level0(){
	$('#qte').empty();
	$('#level').html('Level 0');
	$('#qte').qte({key:'e',succes:level1,fail:level0});
	$('#comment').html("Seriously the first 10 levels are easy noobs, press e to restart");

    }
    function level1(){
	$('#level').html('Level 1');
	$('#qte').qte({key:'e',succes:level2, fail:level0});
	$('#comment').html("This is the level 1 of the QTE (Quick Time Event) game press e to continue");
    }
    function level2(){
	$('#level').html('Level 2');
	$('#qte').qte({key:'e',time:3000 ,succes:level3, fail:level0});
	$('#comment').html("Qte games are based on agility skill.  presse e when the key shows up to continue");
    }
    function level3(){
	$('#level').html('Level 3');
	$('#qte').qte({key:'e',delay:2000,failOnDelay:false, succes:level4, fail:level0});
	$('#comment').html("Qte games use the concept of delay to show the key so read it before it disappear ");
    }
    function level4(){
	$('#level').html('Level 4');
	$('#qte').qte({key:'e',delay:4000,succes:level5,fail:level3});
	$('#comment').html("This time, if you press after the delay: You fall back to previous level");
    }
    function level5(){
	$('#level').html('Level 5');
	$('#qte').qte({key:['s','d'],succes:level6,fail:level4})
	$('#comment').html("Qte can be chained!!!")
    }
    function level6(){
	$('#level').html('Level 6');
	$('#qte').qte({key:'f',max_attempt:2,succes:level7,fail:level0});
	$('#comment').html("Try to fail this qte, you may have another chance!");
    }
    function level7(){
	$('#level').html('Level 7');
	$('#qte').append('<div class="dx" />');
	$('#qte').append('<div class="dx" />');
	$('.dx').qte({key:'f', succes:level8, fail:level0});
	$('#comment').html("This two qte are trigerred with on key... You know: Double kill nearby foes!");
    }
    function level8(){
	$('#level').html('Level 8');
	$('#qte').empty();
	$('#qte').append('<div class="dx" />');
	$('#qte').append('<div class="dx" />');

	$('.dx').qte({key:'f',hover:true ,succes:level9count,fail:level0});
	$('.dx').qte({key:'f',hover:true , succes:level9count,fail:level0});

	$('#comment').html("Now you have to move your mouse to trigger each one individualy!");
    }
    function level9count(){

	$(this).html('SUCCES');
	var count = 0;
	$.each($('.dx'),function(index,value){
	    if ($(value).html() == 'SUCCES'){
		count++;
	    }
	});
	if (count  == 2){
	    level9();
	}
    }
    function level9(){
	$('#level').html('Level 9');
	$('#qte').empty();
	$('#qte').append('<div class="c1" />');
	$('#qte').append('<div class="c2" />');

	$('.c1').qte({key:'f',hover:true ,succes:level10,fail:level0});
	$('.c2').qte({key:'g',hover:true , succes:level8,fail:level0});

	$('#comment').html("f leads to level 10 while g lead to level 8");
    }
    function level10(){
	$('#level').html('Level 10');
	$('#qte').empty();
	$('#comment').html("Succes!!! You have mastered all the basics qte!");
    }
    level1();
});

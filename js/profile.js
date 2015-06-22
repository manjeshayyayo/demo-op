
function randomPetals(){

	if(localStorage.log_email != null && localStorage.log_email !=""){
		var no = Math.floor(Math.random() * 2) + 1;
		if(no==1){
			fadingPetals();
		}else{
			fadingPetals_1();
		}
	}else{
		$('#logi').trigger('click');		
		return -1;
	}
}
function fadingPetals(){

	var flrAudio = document.getElementById("flr_music");
	flrAudio.load();
	flrAudio.play();
	
	if(!image_urls){
		var image_urls=Array()
	}
	if(!flash_urls){
		var flash_urls=Array()
	}

	image_urls['rain1']="../js/petalsfly/images/redpetal1.png";
	image_urls['rain2']="../js/petalsfly/images/redpetal2.png";
	image_urls['rain3']="../js/petalsfly/images/pinkpetal1.png";
	image_urls['rain4']="../js/petalsfly/images/pinkpetal3.png";
	image_urls['rain5']="../js/petalsfly/images/pinkpetal5.png";
	image_urls['rain6']="../js/petalsfly/images/pinkpetal6.png";

	var c=520;
	var d=295;
	var e=function(a,b){
		return Math.round(a+(Math.random()*(b-a)))
	};
	
	var f=function(a){
		setTimeout(function(){
			a.css({left:e(0,c)+'px',top:'-30px', display:'block',opacity:'0.'+e(60,100)}).animate({top:(d-20)+'px'},e(5000,7000),function(){$(this).fadeOut(3000)})
		},e(1,4000));
	};

	var h=function(a){
		setTimeout(function(){
			a.css({left:e(0,c)+'px',top:'-30px',display:'block',opacity:'0.'+e(60,100)}).animate({top:e(280,d)+'px'},e(5000,7000),function(){$(this).fadeOut(5800)})
		},e(1,2000));
	};
	for(var i=0;i<=100;i++){
		var g=$('<img/>').attr('src',image_urls['rain'+e(1,6)]).css({position:'absolute',width:'28px',height:'25px',left:e(0,c)+'px',top:'-120px', zIndex: '15', opacity:'0.'+e(10,100),'margin-left':0}).addClass('rainDrop').appendTo('#petalContainer');
		f(g);
		g=null
	};
	
	setTimeout(function(){
		for(var i=0;i<=75;i++){
			var g=$('<img/>').attr('src',image_urls['rain'+e(1,6)]).css({position:'absolute',width:'28px',height:'25px',left:e(0,c)+'px',top:'-120px', zIndex: '15', opacity:'0.'+e(10,100),'margin-left':0}).addClass('rainDrop').appendTo('#petalContainer');
			h(g);
			g=null
		};
	}, 4000);
}

function fadingPetals_1(){

	var flrAudio = document.getElementById("flr_music");
	flrAudio.load();
	flrAudio.play();
	
	if(!image_urls){
		var image_urls=Array()
	}
	if(!flash_urls){
		var flash_urls=Array()
	}

	image_urls['rain1']="../js/petalsfly/images/whitepetal1.png";
	image_urls['rain2']="../js/petalsfly/images/whitepetal2.png";
	image_urls['rain3']="../js/petalsfly/images/whitepetal3.png";
	image_urls['rain4']="../js/petalsfly/images/pinkpetal3.png";
	image_urls['rain5']="../js/petalsfly/images/pinkpetal5.png";
	image_urls['rain6']="../js/petalsfly/images/pinkpetal6.png";

	var c=520;
	var d=295;
	var e=function(a,b){
		return Math.round(a+(Math.random()*(b-a)))
	};
	
	var f=function(a){
		setTimeout(function(){
			a.css({left:e(0,c)+'px',top:'-30px', display:'block',opacity:'0.'+e(60,100)}).animate({top:(d-20)+'px'},e(5000,7000),function(){$(this).fadeOut(3000)})
		},e(1,4000));
	};

	var h=function(a){
		setTimeout(function(){
			a.css({left:e(0,c)+'px',top:'-30px',display:'block',opacity:'0.'+e(60,100)}).animate({top:e(280,d)+'px'},e(5000,7000),function(){$(this).fadeOut(5800)})
		},e(1,2000));
	};
	for(var i=0;i<=100;i++){
		var g=$('<img/>').attr('src',image_urls['rain'+e(1,6)]).css({position:'absolute',width:'28px',height:'25px',left:e(0,c)+'px',top:'-120px', zIndex: '15', opacity:'0.'+e(10,100),'margin-left':0}).addClass('rainDrop').appendTo('#petalContainer');
		f(g);
		g=null
	};
	
	setTimeout(function(){
		for(var i=0;i<=75;i++){
			var g=$('<img/>').attr('src',image_urls['rain'+e(1,6)]).css({position:'absolute',width:'28px',height:'25px',left:e(0,c)+'px',top:'-120px', zIndex: '15', opacity:'0.'+e(10,100),'margin-left':0}).addClass('rainDrop').appendTo('#petalContainer');
			h(g);
			g=null
		};
	}, 4000);
}

function lightLamp(){
	if(localStorage.log_email != null && localStorage.log_email !=""){
		var lampAudio = document.getElementById("lamp_music");
		lampAudio.load();
		lampAudio.play();

		document.getElementById('flames').style.display = 'block'; 
		document.getElementById('non-flames').style.display = 'none'; 
		flower_light_tribute('diya', 0);
		setTimeout(function(){
			document.getElementById('flames').style.display = 'none'; 
			document.getElementById('non-flames').style.display = 'block'; 
		}, 2000);

	}else{
		$('#logi').trigger('click');		
		return -1;
	}
}


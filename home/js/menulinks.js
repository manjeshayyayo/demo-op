$(document).ready(function() {
	
	$('#fblog').mouseover(function(){
		$('#fblog').addClass("fbloghover");
	});
	$('#fblog').mouseout(function(){
		$('#fblog').removeClass("fbloghover");
	});
	$('#twitlog').mouseover(function(){
		$('#twitlog').addClass("twitloghover");
	});
	$('#twitlog').mouseout(function(){
		$('#twitlog').removeClass("twitloghover");
	});
	$('#googlog').mouseover(function(){
		$('#googlog').addClass("googloghover");
	});
	$('#googlog').mouseout(function(){
		$('#googlog').removeClass("googloghover");
	});
	$('#emailup').mouseover(function(){
		$('#emailup').addClass("emailuphover");
	});
	$('#emailup').mouseout(function(){
		$('#emailup').removeClass("emailuphover");
	});
	$('#phoneup').mouseover(function(){
		$('#phoneup').addClass("phoneuphover");
	});
	$('#phoneup').mouseout(function(){
		$('#phoneup').removeClass("phoneuphover");
	});
	
	
	
	
	$('#fblogin').mouseover(function(){
		$('#fblogin').addClass("fbloghover");
	});
	$('#fblogin').mouseout(function(){
		$('#fblogin').removeClass("fbloghover");
	});
	$('#fbjoin').mouseover(function(){
		$('#fbjoin').addClass("fbloghover");
	});
	$('#fbjoin').mouseout(function(){
		$('#fbjoin').removeClass("fbloghover");
	});
	$('#twitlogin').mouseover(function(){
		$('#twitlogin').addClass("twitloghover");
	});
	$('#twitlogin').mouseout(function(){
		$('#twitlogin').removeClass("twitloghover");
	});
	$('#twitjoin').mouseover(function(){
		$('#twitjoin').addClass("twitloghover");
	});
	$('#twitjoin').mouseout(function(){
		$('#twitjoin').removeClass("twitloghover");
	});
	$('#googlogin').mouseover(function(){
		$('#googlogin').addClass("googloghover");
	});
	$('#googlogin').mouseout(function(){
		$('#googlogin').removeClass("googloghover");
	});
	$('#googjoin').mouseover(function(){
		$('#googjoin').addClass("googloghover");
	});
	$('#googjoin').mouseout(function(){
		$('#googjoin').removeClass("googloghover");
	});
	$('#emaillogin').mouseover(function(){
		$('#emaillogin').addClass("emailuphover");
	});
	$('#emaillogin').mouseout(function(){
		$('#emaillogin').removeClass("emailuphover");
	});
	$('#emailjoin').mouseover(function(){
		$('#emailjoin').addClass("emailuphover");
	});
	$('#emailjoin').mouseout(function(){
		$('#emailjoin').removeClass("emailuphover");
	});
	$('#phonelogin').mouseover(function(){
		$('#phonelogin').addClass("phoneuphover");
	});
	$('#phonelogin').mouseout(function(){
		$('#phonelogin').removeClass("phoneuphover");
	});
	$('#phonejoin').mouseover(function(){
		$('#phonejoin').addClass("phoneuphover");
	});
	$('#phonejoin').mouseout(function(){
		$('#phonejoin').removeClass("phoneuphover");
	});
	$('#phonejoin').click(function(){
		$('#ph_join_1').show();
		$('#email_join_1').hide();
		$('#phonejoin').parent().hide();
		$('#emailjoin').parent().show();
	});
	$('#emailjoin').click(function(){
		$('#ph_join_1').hide();
		$('#email_join_1').show();
		$('#phonejoin').parent().show();
		$('#emailjoin').parent().hide();
	});
	$('#phonelogin').click(function(){
		$('#ph_login_1').show();
		$('#email_login_1').hide();
		$('#phonelogin').parent().hide();
		$('#emaillogin').parent().show();
	});
	$('#emaillogin').click(function(){
		$('#ph_login_1').hide();
		$('#email_login_1').show();
		$('#phonelogin').parent().show();
		$('#emaillogin').parent().hide();
	});
	$("#joinloin").click(function(){
		$("#join").show();
		$('#ver_login').hide();
		$('#ver_join').show();
		$("#login_content").hide();
		$("#joinusing").show();
		$("#loginusing").hide();
		$("#joinloin").css("background-color", "#98CEE8");
		$("#login").css("background-color", "#918F90");
	});
	$("#login_div").click(function(){
		$("#join").hide();
		$('#ver_login').show();
		$('#ver_join').hide();
		$("#login_content").show();
		$("#joinusing").hide();
		$("#loginusing").show();
		$("#login").css("background-color", "#98CEE8");
		$("#joinloin").css("background-color", "#918F90");
	});
	
	
});
function addremoveFav(){
	
	if(localStorage.log_email!=null && localStorage.log_email!=""){
		if(document.getElementById("bookmark_id").value == "1"){
			removeFavourite();
		}else{
			saveFavourite();
		}
	}else{
		$('#logi').trigger('click');
		return -1;
	}
	
}

function saveFavourite(){

	var notify = {};
    var profile_id = document.getElementById("prof_id").value
	notify.favNames = localStorage.log_email;

    $.ajax({
		url : '/saveAsFavourites?ids='+profile_id,
		data : JSON.stringify(notify),
		type : "POST",
		contentType : 'application/json',
		success : function successmsg(data){
			if(data!=null){
				$("#favourite_1 img").addClass("fav_menuselected");
				$("#favourite_1 span").addClass("cl_blue_hover");
				document.getElementById("bookmark_id").value = "1";
				insertNotify();
				//document.getElementById("fav_tooltip").innerHTML="Remove&nbsp;from&nbsp;favourite";
			}
		},
		error : function errormsg(data){
			if(data!=null){
			}
		}
	});
}

function insertNotify(){

	var profile_id = document.getElementById("prof_id").value;
	var notification = {};
	
	notification.mem_id = profile_id;
	notification.flname = localStorage.log_fname;
	notification.curatormail = document.getElementById('curator_email').value;
	notification.email = localStorage.log_email;
	notification.img_path = localStorage.log_prof_pic;
	notification.mem_name = document.getElementById('uname').innerHTML;
	notification.favourite = [document.getElementById('curator_email').value];
	notification.isnew = 1;
	notification.isfav = 1;
	var uid = document.getElementById('user_id').value;
	notification.memorial_id = "/memorial/"+uid;
	
	if(notification.curatormail == notification.email){
		return -1;
	}
	
	$.ajax({
		url : '/insertNotification',
		data : JSON.stringify(notification),
		type : "POST",
		contentType : 'application/json',
		success : function successmsg(data){
			if(data!=null){

			}
		},
		error : function errormsg(data){
			if(data!=null){
			}
		}
	});	
}



function removeFavourite(){
	
	var notify = {};
    var profile_id = document.getElementById("prof_id").value
	notify.favNames = localStorage.log_email;

    $.ajax({
		url : '/removeFavourites?ids='+profile_id,
		data : JSON.stringify(notify),
		type : "POST",
		contentType : 'application/json',
		success : function successmsg(data){
			if(data!=null){
				$("#favourite_1").removeClass("fav_menuselected");
				$("#fav_menu").removeClass("cl_blue_hover");
				document.getElementById("bookmark_id").value = "0";
				//document.getElementById("fav_tooltip").innerHTML="Add&nbsp;to&nbsp;favourite";
			}
		},
		error : function errormsg(data){
			if(data!=null){
			}
		}
	});
}

function email_mouseover(element){
	element.className = "flt pointer small_email_all small_emailhover";
}
function email_mouseout(element){
	element.className = "flt pointer small_email_all";
}

function facebook_mouseover(element){
	element.className = "ml3 pointer small_facebook_all small_facebookhover";
}
function facebook_mouseout(element){
	element.className = "ml3 pointer small_facebook_all";
}

function twitter_mouseover(element){
	element.className = "ml3 pointer small_twitter_all small_twitterhover";
}
function twitter_mouseout(element){
	element.className = "ml3 pointer small_twitter_all";
}

function google_mouseover(element){
	element.className = "ml3 pointer small_google_all small_googlehover";
}
function google_mouseout(element){
	element.className = "ml3 pointer small_google_all";
}

function email_mouseover_x(element){
	element.className = "flt pointer obitlogjoin_all obitlogjoinhover";
}
function email_mouseout_x(element){
	element.className = "flt pointer obitlogjoin_all";
}

function facebook_mouseover_x(element){
	element.className = "ml3 pointer fblogjoin_all fblogjoinhover";
}
function facebook_mouseout_x(element){
	element.className = "ml3 pointer fblogjoin_all";
}

function twitter_mouseover_x(element){
	element.className = "ml3 pointer twitlogjoin_all twitlogjoinhover";
}
function twitter_mouseout_x(element){
	element.className = "ml3 pointer twitlogjoin_all";
}

function google_mouseover_x(element){
	element.className = "ml3 pointer googlogjoin_all  googlogjoinhover";
}
function google_mouseout_x(element){
	element.className = "ml3 pointer googlogjoin_all";
}
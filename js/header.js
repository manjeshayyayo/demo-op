function audioControl(){
	
	var myAudio = document.getElementById("theme_music");
	if (myAudio.paused) {
		$('#speaker').css("background-image", "url(../images/speaker.png)");
		myAudio.load();
		myAudio.play();
	} else {
		$('#speaker').css("background-image", "url(../images/speaker-off.png)");
		myAudio.pause();
	}
}
var log_prof_name = "";

function checkSessionCookie(side_menu_type) {
	
	var email = "";
	if(localStorage.log_email && localStorage.log_email!=null){
		email = localStorage.log_email;
	}else if(sessionStorage.log_email && sessionStorage.log_email!=null){
		email = sessionStorage.log_email;
	}
	if(email!=""){
		var emails = [];
		emails.push(email);
		var registration = {};
		registration.email = emails;
		$.ajax({
			url : '/regDetails',
	        data : JSON.stringify(registration),
	        type : "POST",
	        contentType : 'application/json',
	        success : function successmsg(data){
	        	if(data.length>0){
	        	}else{
	        		localStorage.removeItem("log_email");
	        		window.location = "/home";
	        	}
	        	var log_prof_pic = "../images/profiles/prof_1.jpg";
	        	if(data[0].picture){
	        		log_prof_pic = data[0].picture;
	        	}
	        	
	        	log_prof_name = data[0].name;
	        	if(log_prof_name.length>15){
	        		log_prof_name = log_prof_name.substring(0,13)+"...";
	        	}
	        	
	        	var left_menu = "";
	        	left_menu = left_menu + '<li><div class="clipwrapper"><a class="rm_br" id="home_1" href="/home"><img class="hme_clip home_menu" src="../images/left-menu/home_all.png"><br><br><span class="cl_white" id="home_2">Home</span></a></div></li>';
	        	left_menu = left_menu + '<li><div class="clipwrapper"><a class="rm_br" id="cmem_1" href="/create-memorial"><img class="crt_clip create_menu" src="../images/left-menu/create_all.png"><br><br><span class="cl_white" id="cmem_2">Create Memorial</span></a></div></li>';
	        	if(side_menu_type=="memorial" || side_menu_type=="edit" || side_menu_type=="history" || side_menu_type=="update"){
//					left_menu = left_menu + '<li><div class="clipwrapper"><a class="rm_br" id="invite_1" onclick="loadInvite();"><img class="invite_clip invite_menu" src="../images/left-menu/invite_all.png"><br><br><span class="cl_white" id="invite_2">Invite</span></a></div></li>';
					left_menu = left_menu + '<li><div class="clipwrapper"><a class="rm_br" id="updt1"><img class="update_clip update_menu" src="../images/left-menu/update_all.png"><br><br><span class="cl_white" id="updt2">Update</span></a></div></li>';
	        	}
	        	left_menu = left_menu + '<li><div class="clipwrapper"><div id="notificationsCountWrapper" style="position: absolute; width: 67px; margin-top: -12px; z-index: 1;"><div class="jewelCount broidnormal ft10"><div id="notification_count"></div></div></div><a class="rm_br" id="notif_1" href="/notifications"><img class="notif_clip notif_menu" src="../images/left-menu/notif_all.png" /><br><br><span class="cl_white" id="notif_2">Notifications</span></a></div></li>';
        		left_menu = left_menu + '<li><div class="clipwrapper" style="line-height: 15px;"><div id="msgCountWrapper" style="position: absolute; width: 67px; margin-top: -6px; z-index: 1;"><div class="jewelCount broidnormal ft10"><div id="msg_count"></div></div></div><a class="rm_br" id="msg_1" href="/messages"><img class="msg_clip msg_menu" src="../images/left-menu/msg_all.png" /><br><br><span class="cl_white" id="msg_2">Obito Messages</span></a></div></li>';
        		if(side_menu_type=="memorial" || side_menu_type=="edit" || side_menu_type=="history" || side_menu_type=="update"){
    	        	left_menu = left_menu + '<li style="margin-top: -5px;"><div class="clipwrapper"><a class="rm_br" id="favourite_1" onclick="addremoveFav();"><img class="fav_clip fav_menu" src="../images/left-menu/fav_all.png"><br><br><span class="cl_white" id="favourite_2">Favourite</span></a></div></li>';
        		}
	        	left_menu = left_menu + '<div align="center" class="cl_white mt35 mb10 "><div id="fb_menu" onclick="sharefb(\'\',\'\');" class="share_fb pointer"></div></div>';
	        	left_menu = left_menu + '<div align="center" class="cl_white mb10 "><div id="tw_menu" onclick="sharetwitter()" class="share_twit pointer"></div></div>';
	        	left_menu = left_menu + '<div align="center" class="cl_white mb10 "><div id="gp_menu" onclick="sharegplus()" class="share_gp pointer"></div></div>';
				if(side_menu_type=="memorial" || side_menu_type=="edit" || side_menu_type=="history" || side_menu_type=="update" ){
					left_menu = left_menu + '<div align="center" class="cl_white mb10"><div id="invite_1" onclick="loadInvite()" class="invite_menu pointer"></div></div>';
				}
				$("#ul-m").append(left_menu);
	        	
	        	$("#home_1").mouseover(function(){
	        		$("#home_1 img").addClass("homehover");
	        		$("#home_1 span").addClass("cl_blue");
	        	});
	        	$("#home_1").mouseout(function(){
	        		$("#home_1 img").removeClass("homehover");
	        		$("#home_1 span").removeClass("cl_blue");
	        	});
	        	$("#cmem_1").mouseover(function(){
	        		$("#cmem_1 img").addClass("create_menuhover");
	        		$("#cmem_1 span").addClass("cl_blue");
	        	});
	        	$("#cmem_1").mouseout(function(){
	        		$("#cmem_1 img").removeClass("create_menuhover");
	        		$("#cmem_1 span").removeClass("cl_blue");
	        	});
	        	
	        	$("#invite_1").mouseover(function(){
	        		$("#invite_1 img").addClass("invite_menuhover");
	        		$("#invite_1 span").addClass("cl_blue");
	        	});
	        	$("#invite_1").mouseout(function(){
	        		$("#invite_1 img").removeClass("invite_menuhover");
	        		$("#invite_1 span").removeClass("cl_blue");
	        	});

	        	$("#updt1").mouseover(function(){
	        		$("#updt1 img").addClass("update_menuhover");
	        		$("#updt1 span").addClass("cl_blue");
	        	});
	        	$("#updt1").mouseout(function(){
	        		$("#updt1 img").removeClass("update_menuhover");
	        		$("#updt1 span").removeClass("cl_blue");
	        	});

	        	$("#notif_1").mouseover(function(){
	        		$("#notif_1 img").addClass("notif_menuhover");
	        		$("#notif_1 span").addClass("cl_blue");
	        	});
	        	$("#notif_1").mouseout(function(){
	        		$("#notif_1 img").removeClass("notif_menuhover");
	        		$("#notif_1 span").removeClass("cl_blue");
	        	});
	        	$("#msg_1").mouseover(function(){
	        		$("#msg_1 img").addClass("msg_menuhover");
	        		$("#msg_1 span").addClass("cl_blue");
	        	});
	        	$("#msg_1").mouseout(function(){
	        		$("#msg_1 img").removeClass("msg_menuhover");
	        		$("#msg_1 span").removeClass("cl_blue");
	        	});
	        	$("#favourite_1").mouseover(function(){
	        		$("#favourite_1 img").addClass("fav_menuhover");
	        		$("#favourite_1 span").addClass("cl_blue");
	        	});
	        	$("#favourite_1").mouseout(function(){
	        		$("#favourite_1 img").removeClass("fav_menuhover");
	        		$("#favourite_1 span").removeClass("cl_blue");
	        	});
	        	
	        	$("#fb_menu").mouseover(function(){
	        		$("#fb_menu").addClass("share_fbhover");
	        	});
	        	$("#fb_menu").mouseout(function(){
	        		$("#fb_menu").removeClass("share_fbhover");
	        	});
	        	$("#tw_menu").mouseover(function(){
	        		$("#tw_menu").addClass("share_twithover");
	        	});
	        	$("#tw_menu").mouseout(function(){
	        		$("#tw_menu").removeClass("share_twithover");
	        	});
	        	$("#gp_menu").mouseover(function(){
	        		$("#gp_menu").addClass("share_gphover");
	        	});
	        	$("#gp_menu").mouseout(function(){
	        		$("#gp_menu").removeClass("share_gphover");
	        	});
	        	$("#invite_1").mouseover(function(){
	        		$("#invite_1").addClass("invite_menuhover");
	        	});
	        	$("#invite_1").mouseout(function(){
	        		$("#invite_1").removeClass("invite_menuhover");
	        	});
	        	/*$("#invt_menu").mouseover(function(){
	        		$("#invt_menu").addClass("msg_menuhover");
	        		$("#invt_menu").addClass("cl_blue");
	        	});
	        	$("#invt_menu").mouseout(function(){
	        		$("#invt_menu").removeClass("msg_menuhover");
	        		$("#invt_menu").removeClass("cl_blue");
	        	});*/
	        	
				var search_menu = "";
	        	search_menu = search_menu + '<a class="rm_br" href="/home"><div style="float: left; background: url(\'../images/logo.png\') no-repeat; width: 180px; height: 57px; margin: 5px 0 5px 22px; cursor: pointer;" onclick="loadhome()" ></div></a>';
	        	search_menu = search_menu + '<div style="float: right; margin: 16px 0 0 0">';
        		search_menu = search_menu + '<div style="float: right; margin-right: 10px;"><div id="curlinks"><i class="imgstreching" style="background-image: url(\''+log_prof_pic+'\'); height: 39px; width: 39px; border-radius: 6px;"></i></div></div>';
	        	search_menu = search_menu + '<div style="background: url(\'../images/search.jpg\') no-repeat; width:175px; border-radius: 7px; height:25px; float: right; margin-right: 07px; margin-top: 11px; opacity:0.6;">';
	        	search_menu = search_menu + '<div style="float: left;"><input type="text" value="" placeholder="Search Obitopedia" id="fresearch" onkeypress="searchKeyCode(event);" class="broidnormal ft12 cl_ltgrey" style="height:25px; width:140px; margin-top:-1px; margin-left:25px; border: transparent; background: transparent;"></div>';
	        	search_menu = search_menu + '<div style="float: left; height:25px; width:25px; margin-top:-26px; margin-left:0; background: transparent; cursor: pointer;" onclick="freeSearch();" ></div>';
	        	search_menu = search_menu + '</div>';
	        	search_menu = search_menu + '</div>';
	        	search_menu = search_menu + '<div style="clear: both;"></div>';
	        	$("#searchbar").append(search_menu);
	        	
	        	var profile_menu = "";

	        	profile_menu = profile_menu + '<div id="" style="top: 8px;" class="arrowmark"><img style="position: absolute;top: -2px;left: -13px;" src="../images/up_arrow.png" /></div>';
	        	profile_menu = profile_menu + '<div style="background-color: rgba(77, 152, 190, 0.8);border: 1px solid white;border-radius: 7px; color: #f3f3f3; float:right; margin-top: 22px;line-height: 1;width: 135px;text-align: left;">';
	        	profile_menu = profile_menu + '<div id="myprofile" style="padding: 9px 13px 5px 14px; text-transform: capitalize;border-bottom : 1px solid #f3f3f3;" class="broidbold ft14 pointer" onclick="myprofile();">'+log_prof_name+'</div>';
	        	profile_menu = profile_menu + '<div id="mycurations" style="padding: 5px 15px; " class="broidnormal ft14 pointer" onclick="mycurated()">My Curations</div>';
	        	profile_menu = profile_menu + '<div id="myfavourites" style="padding: 5px 15px; " class="broidnormal ft14 pointer" onclick="myfavourites()">My Favourites</div>';
	        	profile_menu = profile_menu + '<div id="editprofile" style="padding: 5px 15px; " class="broidnormal ft14 pointer" onclick="editprofile()">Settings</div>';
	        	profile_menu = profile_menu + '<div id="logout" onclick="removeCookie();" style="padding: 5px 15px; " class="broidnormal ft14 pointer">Logout</div>';
	        	profile_menu = profile_menu + '</div>';
	        	$("#curationlinks").append(profile_menu);
	        	$('#fresearch').focus(function(){
					$('#fresearch').parent().parent().css("opacity","1");
				});
				$('#fresearch').focusout(function(){
					$('#fresearch').parent().parent().css("opacity","0.6");
				});

	        	$('#curlinks').hover(function() {
	        		$('#curationlinks').css({"display" : "block"});
	        	}, function() {
	        		$('#curationlinks').css({"display" : "none"});
	        	});
	        	$('#curationlinks').hover(function() {
	        		$(this).css({"display" : "block"});
	        	}, function() {
	        		$(this).css({"display" : "none"});
	        	});
	        	$('#myprofile').hover(function() {
	        		$(this).addClass("cl_blue" );
	        		$(this).addClass("bgcl_white_trans");
	        	}, function() {
	        		$(this).removeClass( "cl_blue" );
	        		$(this).removeClass("bgcl_white_trans");
	        	});
	        	$('#editprofile').hover(function() {
	        		$(this).addClass("cl_blue" );
	        		$(this).addClass("bgcl_white_trans");
	        	}, function() {
	        		$(this).removeClass( "cl_blue" );
	        		$(this).removeClass("bgcl_white_trans");
	        	});
	        	$('#mycurations').hover(function() {
	        		$(this).addClass("cl_blue" );
	        		$(this).addClass("bgcl_white_trans");
	        	}, function() {
	        		$(this).removeClass( "cl_blue" );
	        		$(this).removeClass("bgcl_white_trans");
	        	});
	        	$('#myfavourites').hover(function() {
	        		$(this).addClass("cl_blue" );
	        		$(this).addClass("bgcl_white_trans");
	        	}, function() {
	        		$(this).removeClass( "cl_blue" );
	        		$(this).removeClass("bgcl_white_trans");
	        	});
	        	$('#logout').hover(function() {
	        		$(this).addClass("cl_blue" );
	        		$(this).addClass("bgcl_white_trans");
	        	}, function() {
	        		$(this).removeClass( "cl_blue" );
	        		$(this).removeClass("bgcl_white_trans");
	        	});

	        }
		});
	}else{
		var left_menu = "";
		left_menu = left_menu + '<li><div class="clipwrapper"><a class="rm_br" id="home_1" href="/home"><img class="hme_clip home_menu" src="../images/left-menu/home_all.png"><br><br><span class="cl_white" id="home_2">Home</span></a></div></li>';
		left_menu = left_menu + '<li><div class="clipwrapper"><a class="rm_br" id="cmem_1" href="/create-memorial"><img class="crt_clip create_menu" src="../images/left-menu/create_all.png"><br><br><span class="cl_white" id="cmem_2">Create Memorial</span></a></div></li>';
		left_menu = left_menu + '<div align="center" class="cl_white mt35 mb10"><div id="fb_menu" onclick="sharefb(\'\',\'\');" class="share_fb pointer"></div></div>';
		left_menu = left_menu + '<div align="center" class="cl_white mb10 "><div id="tw_menu" onclick="sharetwitter(\'\',\'\')" class="share_twit pointer"></div></div>';
		left_menu = left_menu + '<div align="center" class="cl_white mb10 "><div id="gp_menu" onclick="sharegplus()" class="share_gp pointer"></div></div>';
		$("#ul-m").append(left_menu);

		$("#home_1").mouseover(function(){
			$("#home_1 img").addClass("homehover");
			$("#home_1 span").addClass("cl_blue");
		});
		$("#home_1").mouseout(function(){
			$("#home_1 img").removeClass("homehover");
			$("#home_1 span").removeClass("cl_blue");
		});
		$("#cmem_1").mouseover(function(){
			$("#cmem_1 img").addClass("create_menuhover");
			$("#cmem_1 span").addClass("cl_blue");
		});
		$("#cmem_1").mouseout(function(){
			$("#cmem_1 img").removeClass("create_menuhover");
			$("#cmem_1 span").removeClass("cl_blue");
		});
		
		$("#fb_menu").mouseover(function(){
			$("#fb_menu").addClass("share_fbhover");
		});
		$("#fb_menu").mouseout(function(){
			$("#fb_menu").removeClass("share_fbhover");
		});
		$("#tw_menu").mouseover(function(){
			$("#tw_menu").addClass("share_twithover");
		});
		$("#tw_menu").mouseout(function(){
			$("#tw_menu").removeClass("share_twithover");
		});
		$("#gp_menu").mouseover(function(){
			$("#gp_menu").addClass("share_gphover");
		});
		$("#gp_menu").mouseout(function(){
			$("#gp_menu").removeClass("share_gphover");
		});

		var search_menu = "";
    	search_menu = search_menu + '<a class="rm_br" href="/home"><div style="float: left; background: url(\'../images/logo.png\') no-repeat; width: 180px; height: 57px; margin: 5px 0 5px 22px; cursor: pointer;" onclick="loadhome()" ></div></a>';
		search_menu = search_menu + '<div style="float: right; margin: 16px 0 0 0">';
		search_menu = search_menu + '<div style="float: right; margin: 15px 0 0 0; color: #f3f3f3; text-transform: capitalize;" class="broidnormal ft14"> <div id="join_links" class="flt pointer" style="margin: 0 10px; padding-bottom: 15px;">Join</div> <div class="flt">|</div> <div id="login_links" class="flt pointer" style="margin: 0 10px; padding-bottom: 15px;">Log In</div><div class="cbth"></div></div>';
    	search_menu = search_menu + '<div style="background: url(\'../images/search.jpg\') no-repeat; width:175px; border-radius: 7px; height:25px; float: right; margin-right: 07px; margin-top: 11px; opacity:0.6;">';
		search_menu = search_menu + '<div style="float: left;"><input type="text" value="" placeholder="Search Obitopedia" id="fresearch" onkeypress="searchKeyCode(event);" class="broidnormal ft12 cl_ltgrey" style="height:25px; width:140px; margin-top:-1px; margin-left:25px; border: transparent; background: transparent;"></div>';
		search_menu = search_menu + '<div style="float: left; height:25px; width:25px; margin-top:-26px; margin-left:0; background: transparent; cursor: pointer;" onclick="freeSearch();" ></div>';
		search_menu = search_menu + '</div>';
		search_menu = search_menu + '</div>';
		search_menu = search_menu + '<div style="clear: both;"></div>';
		$("#searchbar").append(search_menu);
		$('#fresearch').focus(function(){
     		$('#fresearch').parent().parent().css("opacity","1");
		});
		$('#fresearch').focusout(function(){
			$('#fresearch').parent().parent().css("opacity","0.6");
		});

		var log_menu = "";
		log_menu = log_menu + '<div class="login_arrowmark" style="top: 2px;"><img style="position: absolute;left: -13px; top: -2px" src="../images/up_arrow.png" /></div>';
		log_menu = log_menu + '<div style="background-color: rgba(77, 152, 190, 0.8);border: 1px solid white;border-radius: 7px; color: #f3f3f3; float:right; margin-top: 16px;line-height: 1;width: 170px;text-align: left;">';
		log_menu = log_menu + '<div style="margin:8px 0 5px 0;"><div style="float: left; margin: 0 7px;"><div id="f_login" class="fblogjoin_all" onclick="facebooklogin(\'home\');"></div></div>';
		log_menu = log_menu + '<div style="float: left; margin-right: 7px;"><div id="t_login" class="twitlogjoin_all" onclick="twitterlogin(\'home\');"></div></div>';
		log_menu = log_menu + '<div style="float: left; margin-right: 7px;"><div id="g_login" class="googlogjoin_all" onclick="googlelogin(\'home\');"></div></div>';
		log_menu = log_menu + '<div style="float: left; margin-right: 7px;"><div id="e_login" class="emailupjoin_all"></div></div>';
		log_menu = log_menu + '<div style="float: left; margin-right: 7px; margin-bottom: 8px; "><div id="p_login" class="phoneupjoin_all"></div></div></div>';
		log_menu = log_menu + '<div style="clear: both; margin: 8px 0; border-top : 1px solid #f3f3f3; display: none;" id="ln_line"></div>';
		log_menu = log_menu + '<div id="ph_login" style="display: none; font-size:13px;">';
		log_menu = log_menu + '<div style="margin: 0 8px;"><input class="logintxt" type="text" style="width: 140px; height: 28px;" id="phone_id" name="name" placeholder="Mobile" onkeypress="return isNumberKey(event)" maxlength="14"></div>';
		log_menu = log_menu + '<div style="margin: 8px;"><input class="logintxt" type="password" style="width: 140px; height: 28px;" id="ph_passwd" onkeypress="showphoneKeyCode(event);" placeholder="Password"></div>';
		log_menu = log_menu + '<div style="color:red; margin-left:10px; margin-bottom:10px;"><b id="bldph"></b></div>';
		log_menu = log_menu + '<div onclick="ph_login()" style="margin-left: 40px;"><div class="psudo_btn bg_blue" style="width: 72px; padding: 4px 3px 3px 3px;"><label class="broidnormal ft16">Login</label></div></div>'
		log_menu = log_menu + '<div style="padding: 10px 0; text-align: center;" class="broidnormal ft12"><a href="javascript:void(0);" onclick="forgotpasswrdd();" class="cl_white rm_br underline">Forgot Password?</a></div>'
		log_menu = log_menu + '</div>';
		log_menu = log_menu + '<div id="email_login" style="display: none; font-size:13px;">';
		log_menu = log_menu + '<div style="margin: 0 8px;"><input class="logintxt" type="text" style="width: 140px; height: 28px;" id="email_id" name="name" placeholder="Email"></div>';
		log_menu = log_menu + '<div style="margin: 8px;"><input class="logintxt" type="password" style="width: 140px; height: 28px;" id="email_passwd" onkeypress="showKeyCode(event);" placeholder="Password"></div>';
		log_menu = log_menu + '<div style="color:red; margin-left:10px; margin-bottom:10px;"><b id="b_ld"></b></div>';
		log_menu = log_menu + '<div onclick="signIn()" style="margin-left: 40px;"><div class="psudo_btn bg_blue" style="width: 72px; padding: 4px 3px 3px 3px;"><label class="broidnormal ft16">Login</label></div></div>'
		log_menu = log_menu + '<div style="padding: 10px 0; text-align: center;" class="broidnormal ft12"><a href="javascript:void(0);" onclick="forgotpasswrdd();" class="cl_white rm_br underline">Forgot Password?</a></div>'
		log_menu = log_menu + '</div></div>';
		$("#l_links").append(log_menu);
		$('#login_links').hover(function() {
			$('#l_links').css({"display" : "block"});
			$('#b_ld').html('');
			$('#bldph').html('');
		}, function() {
//			$('#ln_line').hide();
//			$('#ph_login').hide();
//			$('#email_login').hide();
			$('#p_login').removeClass("phoneupjoinhoverclick");
			$('#e_login').removeClass("emailupjoinhoverclick");
			$('#l_links').css({"display" : "none"});
		});
		$('#l_links').hover(function() {
			$(this).css({"display" : "block"});
		}, function() {
			$(this).css({"display" : "none"});
		});
		
		
		var join_menu = "";

		join_menu = join_menu + '<div class="join_arrowmark" style="top: 2px;"><img style="position: absolute;left: -13px;top: -2px;" src="../images/up_arrow.png" /></div>';
		join_menu = join_menu + '<div style="background-color: rgba(77, 152, 190, 0.8);border: 1px solid white;border-radius: 7px; color: #f3f3f3; float:right; margin-top: 16px;line-height: 1;width: 170px;text-align: left;">';
		join_menu = join_menu + '<div style="margin:8px 0 5px 0;"><div style="float: left; margin: 0 7px;"><div id="f_join" class="fblogjoin_all" onclick="facebooklogin(\'home\');"></div></div>';
		join_menu = join_menu + '<div style="float: left; margin-right: 7px;"><div id="t_join" class="twitlogjoin_all" onclick="twitterlogin(\'home\');"></div></div>';
		join_menu = join_menu + '<div style="float: left; margin-right: 7px;"><div id="g_join" class="googlogjoin_all" onclick="googlelogin(\'home\');"></div></div>';
		join_menu = join_menu + '<div style="float: left; margin-right: 7px;"><div id="e_join" class="emailupjoin_all"></div></div>';
		join_menu = join_menu + '<div style="float: left; margin-right: 7px; margin-bottom: 8px; "><div id="p_join" class="phoneupjoin_all"></div></div></div>';
		join_menu = join_menu + '<div style="clear: both; margin: 8px 0; border-top : 1px solid #f3f3f3; display: none;" id="join_line"></div>';
		join_menu = join_menu + '<div id="ph_join" style="display: none; font-size:13px;">';
		join_menu = join_menu + '<div style="margin: 0 8px;"><input class="logintxt" type="text" style="width: 140px; height: 28px;" id="phone_name" name="name" placeholder="First & Last Name"></div>';
		join_menu = join_menu + '<div style="margin: 8px;"><input class="logintxt" type="text" style="width: 140px; height: 28px;" id="phone_phone" placeholder="Mobile" onkeypress="return isNumberKey(event)" maxlength="14"></div>';
		join_menu = join_menu + '<div style="margin: 8px;"><input class="logintxt" type="password" style="width: 140px; height: 28px;" id="phone_pwd" onkeypress="showKeyCode(event);" placeholder="Password"></div>';
		join_menu = join_menu + '<div style="color: red; margin-left:10px; margin-bottom:8px;"><b id="phone_join_err" ></b></div>';
		join_menu = join_menu + '<div style="margin-left: 40px;margin-right: 15px;" id="phone_sign" onclick="a=phone_validateFields(); if(a!=-1){phone_signCompletion();}"><div class="psudo_btn bg_blue" style="width: 72px; padding: 4px 3px 3px 3px;"><label class="broidnormal ft16 pointer">Join</label></div></div>'
		join_menu = join_menu + '<div style="margin: 10px;width: 150px;"><p class="broidnormal cl_white" style="margin:0px; font-size: 66%; line-height: 1.3">By joining, you agree to our Terms of Use and Data Use Policy, including our Cookie Use.</p></div>'
		join_menu = join_menu + '</div>';
		join_menu = join_menu + '<div id="email_join" style="display: none; font-size:13px;">';
		join_menu = join_menu + '<div style="margin: 0 8px;"><input class="logintxt" type="text" style="width: 140px; height: 28px;" id="fl_email_name" name="name" placeholder="First & Last Name"></div>';
		join_menu = join_menu + '<div style="margin: 8px;"><input class="logintxt" type="text" style="width: 140px; height: 28px;" id="emailid_join" placeholder="Email"></div>';
		join_menu = join_menu + '<div style="margin: 8px;"><input class="logintxt" type="password" style="width: 140px; height: 28px;" id="email_pwd" onkeypress="showKeyCode(event);" placeholder="Password"></div>';
		join_menu = join_menu + '<div style="color: red; margin-left:10px; margin-bottom:8px;"><b id="email_join_err" ></b></div>';
		join_menu = join_menu + '<div style="margin-left: 40px;margin-right: 15px;" id="email_sign" onclick="a=email_validateFields(); if(a!=-1){email_signCompletion();}"><div class="psudo_btn bg_blue" style="width: 72px; padding: 4px 3px 3px 3px;"><label class="broidnormal ft16 pointer">Join</label></div></div>';
		join_menu = join_menu + '<div id="loadingl_gif" style="position: fixed; display: none; top: 40%; left: 45%;"><img src="../images/loading.gif" style="width: 100px; height: 100px;"></div>';
		join_menu = join_menu + '<div style="margin: 10px;width: 150px;"><p class="broidnormal cl_white" style="margin:0px; font-size: 66%; line-height: 1.3">By joining, you agree to our Terms of Use and Data Use Policy, including our Cookie Use.</p></div>';
		join_menu = join_menu + '</div></div>';
		$("#j_links").append(join_menu);
		$('#join_links').hover(function() {
			$('#j_links').css({"display" : "block"});
			$('#email_join_err').html("");
			$('#phone_join_err').html("");
		}, function() {
			$('#j_links').css({"display" : "none"});
//			$('#join_line').hide();
//			$('#ph_join').hide();
//			$('#email_join').hide();
			$('#p_join').removeClass("phoneupjoinhoverclick");
			$('#e_join').removeClass("emailupjoinhoverclick");
		});
		$('#j_links').hover(function() {
			$(this).css({"display" : "block"});
		}, function() {
			$(this).css({"display" : "none"});
		});
		
	}
	$('#f_login').mouseover(function(){
		$('#f_login').addClass("fblogjoinhover");
	});
	$('#f_login').mouseout(function(){
		$('#f_login').removeClass("fblogjoinhover");
	});
	$('#f_join').mouseover(function(){
		$('#f_join').addClass("fblogjoinhover");
	});
	$('#f_join').mouseout(function(){
		$('#f_join').removeClass("fblogjoinhover");
	});
	$('#t_login').mouseover(function(){
		$('#t_login').addClass("twitlogjoinhover");
	});
	$('#t_login').mouseout(function(){
		$('#t_login').removeClass("twitlogjoinhover");
	});
	$('#t_join').mouseover(function(){
		$('#t_join').addClass("twitlogjoinhover");
	});
	$('#t_join').mouseout(function(){
		$('#t_join').removeClass("twitlogjoinhover");
	});
	$('#g_login').mouseover(function(){
		$('#g_login').addClass("googlogjoinhover");
	});
	$('#g_login').mouseout(function(){
		$('#g_login').removeClass("googlogjoinhover");
	});
	$('#g_join').mouseover(function(){
		$('#g_join').addClass("googlogjoinhover");
	});
	$('#g_join').mouseout(function(){
		$('#g_join').removeClass("googlogjoinhover");
	});
	$('#e_login').mouseover(function(){
		$('#e_login').addClass("emailupjoinhover");
	});
	$('#e_login').mouseout(function(){
		$('#e_login').removeClass("emailupjoinhover");
	});
	$('#e_join').mouseover(function(){
		$('#e_join').addClass("emailupjoinhover");
	});
	$('#e_join').mouseout(function(){
		$('#e_join').removeClass("emailupjoinhover");
	});
	$('#p_login').mouseover(function(){
		$('#p_login').addClass("phoneupjoinhover");
	});
	$('#p_login').mouseout(function(){
		$('#p_login').removeClass("phoneupjoinhover");
	});
	$('#p_join').mouseover(function(){

		$('#p_join').addClass("phoneupjoinhover");
	});
	$('#p_join').mouseout(function(){
		$('#p_join').removeClass("phoneupjoinhover");
		
	});
	
	
	$('#e_login').click(function(){
	    $('#bldph').html("");
        $('#email_id').val("");    
        $('#email_passwd').val(""); 
		$('#p_login').removeClass("phoneupjoinselected");
		$('#e_login').addClass("emailupjoinselected");
		$('#ln_line').show();
		$('#ph_login').hide();
		$('#email_login').show();
	});
	$('#p_login').click(function(){
	
		$('#b_ld').html("");
		$('#ph_passwd').val("");    
		$('#phone_id ').val("");  
		$('#p_login').addClass("phoneupjoinselected");
		$('#e_login').removeClass("emailupjoinselected");
		$('#ln_line').show();
		$('#ph_login').show();
		$('#email_login').hide();
	});
	
	$('#e_join').click(function(){
	    $('#email_join_err').html(""); 
		$('#p_join').removeClass("phoneupjoinselected");
		$('#e_join').addClass("emailupjoinselected");
		$('#fl_email_name').val("");    
		$('#email_pwd').val("");    
		$('#emailid_join').val("");  
		$('#join_line').show();
		$('#ph_join').hide();
		$('#email_join').show();
	});
	$('#p_join').click(function(){
	    $('#phone_join_err').html(""); 
	    $('#p_join').addClass("phoneupjoinselected");
		$('#e_join').removeClass("emailupjoinselected");
		$('#phone_phone').val("");    
		$('#phone_name').val("");    
		$('#phone_pwd').val("");       
		$('#join_line').show();
		$('#ph_join').show();
		$('#email_join').hide();
	});
	
	var footer_menu = "";

	footer_menu = footer_menu + '<div style="padding-top:23px;">&nbsp;</div><div style="padding-top: 15px; position: absolute; bottom: 0;" class="w760" id="foot_leng">';
	footer_menu = footer_menu + '<div style="padding: 7px 0 7px 15px; background-color: #3197c6; border-top-left-radius: 6px; border-top-right-radius: 6px; color: #FBFFFA;">';

	footer_menu = footer_menu + '<div class="footer_data cl_white" style="cursor: default">&copy;2015 Obitopedia</div>';
	footer_menu = footer_menu + '<div class="footer_data"><a class="foot_links rm_br" href="/about" id="ft_about">About</a></div>';
	footer_menu = footer_menu + '<div class="footer_data"><a class="foot_links rm_br" href="/help" id="ft_help">Help</a></div>';
	footer_menu = footer_menu + '<div class="footer_data"><a class="foot_links rm_br" href="/jobs" id="ft_jobs">Jobs</a></div>';
	footer_menu = footer_menu + '<div class="footer_data"><a class="foot_links rm_br" href="/terms" id="ft_terms">Terms</a></div>';
	footer_menu = footer_menu + '<div class="footer_data"><a class="foot_links rm_br" href="/privacy" id="ft_privacy">Privacy</a></div>';
	footer_menu = footer_menu + '<div class="footer_data"><a class="foot_links rm_br" href="/feedback" id="ft_feedback">Feedback</a></div>';
	footer_menu = footer_menu + '<div class="footer_data" style="margin: 4px 15px 0 5px; float: right; font-size: 11px; cursor: default">follow us on<a class="foot_links rm_br pointer" href="https://www.facebook.com/obitopedia" style="margin-left: 2px;" target="_blank"><img src="../images/footer/facebook.png"></a><a class="foot_links rm_br pointer" href="https://twitter.com/obitopedia" style="margin-left: -3px;" target="_blank"><img src="../images/footer/twitter.png"></a><a class="foot_links rm_br pointer" href="https://plus.google.com/u/0/112873346939896506295/posts" target="_blank" style="margin-left: 2px;"><img src="../images/footer/google.png" target="_blank"></a><a class="foot_links rm_br pointer" href="https://www.youtube.com/channel/UCGgzTSb-ee7-4rn3vZBu9fw" style="margin-left: 1px;" target="_blank"><img src="../images/footer/video.png"></a></div>';
	footer_menu = footer_menu + '<div style="clear: both;"></div>';
	footer_menu = footer_menu + '</div></div>';
	$("#footer_menu").append(footer_menu);

	if(localStorage.log_email && localStorage.log_email!=null){
		var notification = {};
		notification.curatormail = localStorage.log_email;
		notification.favourite = localStorage.log_email;
		notification.isnew = 1;
	
		$.ajax({
			url : '/new_notification_count',
			data : JSON.stringify(notification),
			type : "POST",
			contentType : 'application/json',
			success : function successmsg(data){
				if(data != 0){
					$('#notification_count').html(data);				
				}
	
			},
			error : function errormsg(data){
				if(data!=null){
				}
			}
		});
	
		var messages = {};
		messages.fromId = localStorage.log_email;
		messages.isnew = 1;
		$.ajax({
			url : '/msg_count',
			data : JSON.stringify(messages),
			type : "POST",
			contentType : 'application/json',
			success : function successmsg(data){
				if(data.length > 0){
					var count = 0;
					for(var i=0; i<data.length; i++){
						if(data[i].fromId == localStorage.log_email){
							if(data[i].fromNew==1) {
								count = count + 1;
							}
						}else{
							if(data[i].toNew==1) {
								count = count + 1;
							}
						}
					}
					if(count!=0){
						$('#msg_count').html(count);
					}
				}
	
			},
			error : function errormsg(data){
				if(data!=null){
				}
			}
		});
	}	
}
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function forgotpasswrdd() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
	for( var i=0; i < 5; i++ ) { 
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	$('#lb_captcha').html(text);
	$('#fp_captcha').val('');
	$('#blderror').html('');
	$('#fpass').trigger('click');
}

function createcaptcha() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
	for( var i=0; i < 5; i++ ) { 
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	$('#lb_captcha').html(text);
}
function sendlink() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
	for( var i=0; i < 8; i++ ) { 
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	$('#blderror').html('');
	if($('#lb_captcha').html()==$('#fp_captcha').val()) {
		if($('#fp_uname').val().trim()!="") {
			var prof={};
			prof.pwd=CryptoJS.SHA3(text)+"";
			$.ajax({
				url : '/updateProfile?sl_email='+$('#fp_uname').val(),
				data : JSON.stringify(prof),
				type : "POST",
				contentType : 'application/json',
				success : function successmsg(data) {
					if(data.length>0) {
						var notify = {};
						notify.invities_id = $('#fp_uname').val();
						notify.key=text;
						notify.name=data[0].name;
						$('#loading_gif').show();
						$.ajax({
							url : '/sendkeys',
							data : JSON.stringify(notify),
							type : "POST",
							contentType : 'application/json',
							success : function successmsg(data){
								$('#loading_gif').hide();
								$('#logiemail').html($('#fp_uname').val());
								$('#thanksmail').html('Thanks. Please check '+$('#fp_uname').val()+' for a link to reset your password')
								$('#fp_uname').val('');
								$('#cls').trigger('click');
								$('#fpasucc').trigger('click');
							}
						});
					}else {
						$('#blderror').html('Username is not registerd with Obitopedia');
					}
				}
			});
		}else{
			$('#blderror').html('Please enter email or username');
		}
	}else{
		$('#blderror').html('Enterd captcha is wrong');
	}
}
function removeCookie() {

	localStorage.removeItem("log_email");
	localStorage.removeItem("log_prof_pic");
	localStorage.removeItem("log_fname");
	localStorage.removeItem("log_lname");
	localStorage.removeItem("log_dnurl");
	localStorage.removeItem("log_fb");
	localStorage.removeItem("log_gp");
	localStorage.removeItem("log_tw");
	localStorage.removeItem("superadmin");
	
	//sessionStorage.removeItem("email");
	localStorage.clear();
	//sessionStorage.clear();
	window.location = "/";
}

function loadhome() {
	window.location = "/home";
}

function loadInvite(){
	if(localStorage.log_email !=null && localStorage.log_email!=""){
		$('#send_mail').css("display", "block");
		$('#after_mail').css("display", "none");
		$('#sending_invi').css("display", "none");
		$('#email_ids').val("");
		$('#email_ids').css("border", "1px solid #cccccc");
		$('#plswaitpop').css("display", "none");
		$('#inviTrig').trigger('click');
	}else{
		$('#logi').trigger('click');		
		return -1;
	}
}

function loadnotification(){

	if(localStorage.log_email !=null && localStorage.log_email!=""){
		window.location = "/notifications";
	}else{
		$('#logi').trigger('click');		
		return -1;
	}
}

function loadmessages(){
	if(localStorage.log_email!=null && localStorage.log_email!=""){
		window.location = "/messages";
	}else{
		$('#logi').trigger('click');		
		return -1;
	}
}


function searchKeyCode(e) {
	if(e.keyCode == 13){
		freeSearch();
	}
}

function searchfocus() {
	$('#fresearch').parent().parent().css("opacity","1");
}

function freeSearch() {
	var fretxt = encodeURIComponent(document.getElementById('fresearch').value);
	if(fretxt!=""){
		window.location = "../search/" + fretxt;
	}
}

function myprofile() {
	window.location = localStorage.log_dnurl;
}
function editprofile() {
	window.location = "/settings"
}
function myfavourites() {
	window.location = "/myfavourites"
}
function mycurated() {
	window.location = "/mycurated"
}



function sharetwitter(memname,curname) {

	var loc = window.location+"";
    var yourPageToShare=loc;
    var caption = "";
    if(loc.indexOf("/memorial/") != -1 || loc.indexOf("/edit/") != -1 || loc.indexOf("/history/") != -1 || loc.indexOf("/update/") != -1) {
    	if(loc.indexOf("/edit/") != -1){
    		yourPageToShare = loc.replace("/edit/", "/memorial/");
    	}else if(loc.indexOf("/history/") != -1){
    		yourPageToShare = loc.replace("/history/", "/memorial/");
    	}else if(loc.indexOf("/update/") != -1){
    		yourPageToShare = loc.replace("/update/", "/memorial/");
    	}
    	caption = 'Hi, Read this memorial remembering '+memname+' curated by '+curname+' on Obitopedia.';
    }else if(loc.indexOf("/curator/")!= -1) {
    	caption = 'Hi, Read this Curator page'+memname+'  on Obitopedia.';
    }else {
		caption = 'Creating memorials & personal histories.';
	}
    var url = caption+"\n\n"+yourPageToShare; 
	var title  = escape($(this).attr('title'));
	window.open('http://twitter.com/intent/tweet?text=' + encodeURIComponent(url)+ '&', 'twitterwindow', 'height=350, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0,resizable=yes');
}

function sharegplus() {
	
	var loc = window.location+"";
    var yourPageToShare=loc;
    
    if(loc.indexOf("/memorial/") != -1 || loc.indexOf("/edit/") != -1 || loc.indexOf("/history/") != -1 || loc.indexOf("/update/") != -1)
    {
    	if(loc.indexOf("/edit/") != -1){
    		yourPageToShare = loc.replace("/edit/", "/memorial/");
    	}else if(loc.indexOf("/history/") != -1){
    		yourPageToShare = loc.replace("/history/", "/memorial/");
    	}else if(loc.indexOf("/update/") != -1){
    		yourPageToShare = loc.replace("/update/", "/memorial/");
    	}
    }

    window.open('https://plus.google.com/share?url='+encodeURIComponent(yourPageToShare)+'','Google Share','status=0,width=626,height=436, top='+($(window).height()/2 - 225) +', left='+($(window).width()/2 - 313 ) +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');    
}

window.fbAsyncInit = function() {
	FB.init({
//		appId      : '1424899027760608',  // localhost :8080
		appId      : '757812071005286',   //ec2 8080
//		appId      : '627680780694939',  //ec2 8090
		cookie     : true,  // enable cookies to allow the server to access the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.0' // use version 2.0
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function facebooklogin(fwdPage){
	
    FB.login(function(main_response) {

        if (main_response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            access_token = main_response.authResponse.accessToken; //get access token
            user_id = main_response.authResponse.userID; //get FB UID

            
            FB.api('/me', function(response) {
            	
            	var r_em = response.email;
                var r_id = response.id;
                var r_na = response.name;
                var r_pi = "http://graph.facebook.com/" + response.id + "/picture?type=large";
                var r_fn = response.first_name;
                
				$.ajax({
					
					//url : '/obits/'+_id,
					url : '/registration?dataSearch=1&social_id='+decodeURIComponent(response.id),
					type : "GET",
					success : function(data) {

						if(data.length == 0){
							var registration = {};
							registration.name = decodeURIComponent(response.first_name);
							registration.lname = decodeURIComponent(response.last_name);
							var fullname = "";
							if(response.last_name!=""){
								fullname = response.first_name.toLowerCase()+" "+response.last_name.toLowerCase();
							}else{
								fullname = response.last_name.toLowerCase();
							}
							registration.fullname = fullname.trim();
							
							registration.fb_login = decodeURIComponent(response.link);
							registration.fb_id = decodeURIComponent(response.id);
							registration.picture = decodeURIComponent("http://graph.facebook.com/" + response.id + "/picture?type=large");
							registration.deleted = 0;
							registration.activation = 1;
							
							$.ajax({
								//url : '/obits/'+_id,
								url : '/registration?dataSearch=1&email='+decodeURIComponent(response.email),
								type : "GET",
								success : function(data_1) {
									var display_name = response.first_name+"_"+response.last_name.toLowerCase();
									display_name = display_name.replace(/\s/g, '');
									
									var xyz = {}
									xyz.name = "/curator/"+display_name;
									
									if(data_1.length==0){
										registration.email = decodeURIComponent(response.email);
										
										$.ajax({
											//url : '/obits/'+_id,
											url : '/reg_name',
											type : "POST",
											data : xyz,
											success : function(count) {
												if(count > 1){
													display_name = display_name+"_"+count;
												}
												//registration.dn_url = "/curator/"+display_name;
												registration.dn_url = "/curator/"+display_name;
												$.ajax({
													//url : '/obits/'+_id,
													url : '/insert?registrationTable=1',
													data : JSON.stringify(registration),
													type : "POST",
													contentType : 'application/json',
													success : function(data) {
														
														$.ajax({
														  	type: "GET",
														  	url: '/welcomethrsocialmedia?reg_email='+r_em+'&name='+response.first_name,
														  	datatype: "json",
														  	success:function(mail_data){
														  		
														  	}
														});
														localStorage.log_email = decodeURIComponent(r_em);
														localStorage.log_prof_pic = decodeURIComponent(registration.picture);	
								        				localStorage.log_fname = decodeURIComponent(response.first_name);
							        					localStorage.log_lname = decodeURIComponent(response.last_name);
								        				localStorage.log_dnurl = decodeURIComponent(registration.dn_url);
							        					localStorage.log_fb = decodeURIComponent(response.link);

														
														if(fwdPage == "login"){
								        					window.location = "/home";
								        				}else{
								        					window.location = window.location;
								        				}	
													},
													error : function (data) {
														if (data != null) {
														}
													}
												});
											}
										});
									}else{
																				
										if(data_1[0].dn_url && data_1[0].dn_url != ""){
											console.log("ifffffff");
											$.ajax({
												url : '/updateProfile?sl_email='+response.email,
												data : JSON.stringify(registration),
												type : "POST",
												contentType : 'application/json',
												success : function successmsg(data_2) {
													localStorage.log_email = decodeURIComponent(r_em);
													localStorage.log_prof_pic = decodeURIComponent(registration.picture);	
							        				localStorage.log_fname = decodeURIComponent(response.first_name);
						        					localStorage.log_lname = decodeURIComponent(response.last_name);
							        				localStorage.log_dnurl = decodeURIComponent(data_1[0].dn_url);
						        					localStorage.log_fb = decodeURIComponent(response.link);
						        					
						        					if(fwdPage == "login"){
							        					window.location = "/home";
							        				}else{
							        					window.location = window.location;
							        				}	
												},
												error : function errormsg(data) {
													if (data != null) {
														document.getElementById('bld').innerHTML = "Unable to update";
													}
												}
											});
										}else{
											console.log("elsseee");
											var display_name = response.first_name+"_"+response.last_name.toLowerCase();
											var xyz = {}
											xyz.name = "/curator/"+display_name;
											$.ajax({
												//url : '/obits/'+_id,
												url : '/reg_name',
												type : "POST",
												data : xyz,
												success : function(count) {
													display_name = display_name.replace(/\s/g, '');
													if(count > 1){
														display_name = display_name+"_"+count;
													}
													registration.dn_url = "/curator/"+display_name;
													console.log(response.id+"hiiii"+JSON.stringify(registration));
													$.ajax({
														url : '/updateProfile?sl_email='+response.email,
														data : JSON.stringify(registration),
														type : "POST",
														contentType : 'application/json',
														success : function successmsg(data_1) {
															localStorage.log_email = decodeURIComponent(r_em);
															localStorage.log_prof_pic = decodeURIComponent(registration.picture);	
									        				localStorage.log_fname = decodeURIComponent(response.first_name);
								        					localStorage.log_lname = decodeURIComponent(response.last_name);
									        				localStorage.log_dnurl = decodeURIComponent(registration.dn_url);
								        					localStorage.log_fb = decodeURIComponent(response.link);

								        					if(fwdPage == "login"){
									        					window.location = "/home";
									        				}else{
									        					window.location = window.location;
									        				}	
														},
														error : function errormsg(data) {
															if (data != null) {
																document.getElementById('bld').innerHTML = "Unable to update";
															}
														}
													});
												}
											});
										
										}
										
									}
									
								}
							});
							
						}else{
							var registration = {};
							registration.name = decodeURIComponent(response.first_name);
							registration.lname = decodeURIComponent(response.last_name);
							var fullname = "";
							if(response.last_name!=""){
								fullname = response.first_name.toLowerCase()+" "+response.last_name.toLowerCase();
							}else{
								fullname = response.last_name.toLowerCase();
							}
							registration.fullname = fullname.trim();

							registration.fb_login = decodeURIComponent(response.link);
							registration.fb_id = decodeURIComponent(response.id);
							registration.picture = decodeURIComponent("http://graph.facebook.com/" + response.id + "/picture?type=large");
							
							
							if(data[0].dn_url && data[0].dn_url != ""){
								$.ajax({
									url : '/updateProfile?sl_email='+response.email,
									data : JSON.stringify(registration),
									type : "POST",
									contentType : 'application/json',
									success : function successmsg(data_1) {
										localStorage.log_email = decodeURIComponent(r_em);
										localStorage.log_prof_pic = decodeURIComponent(registration.picture);	
				        				localStorage.log_fname = decodeURIComponent(response.first_name);
			        					localStorage.log_lname = decodeURIComponent(response.last_name);
				        				localStorage.log_dnurl = decodeURIComponent(data[0].dn_url);
			        					localStorage.log_fb = decodeURIComponent(response.link);
			        					
			        					if(fwdPage == "login"){
				        					window.location = "/home";
				        				}else{
				        					window.location = window.location;
				        				}
									},
									error : function errormsg(data) {
										if (data != null) {
											document.getElementById('bld').innerHTML = "Unable to update";
										}
									}
								});								
							}else{

								var display_name = response.first_name+"_"+response.last_name.toLowerCase();
								display_name = display_name.replace(/\s/g, '');
								var xyz = {}
								xyz.name = display_name;
								$.ajax({
									//url : '/obits/'+_id,
									url : '/reg_name',
									type : "POST",
									data : xyz,
									success : function(count) {
										if(count > 1){
											display_name = display_name+"_"+count;
										}
										
										registration.dn_url = "/curator/"+display_name;
										$.ajax({
											url : '/updateProfile?social_id='+response.id,
											data : JSON.stringify(registration),
											type : "POST",
											contentType : 'application/json',
											success : function successmsg(data_1) {
												localStorage.log_email = decodeURIComponent(r_em);
												localStorage.log_prof_pic = decodeURIComponent(registration.picture);	
						        				localStorage.log_fname = decodeURIComponent(response.first_name);
					        					localStorage.log_lname = decodeURIComponent(response.last_name);
						        				localStorage.log_dnurl = decodeURIComponent(registration.dn_url);
					        					localStorage.log_fb = decodeURIComponent(response.link);
					        					
					        					if(fwdPage == "login"){
						        					window.location = "/home";
						        				}else{
						        					window.location = window.location;
						        				}
											},
											error : function errormsg(data) {
												if (data != null) {
													document.getElementById('bld').innerHTML = "Unable to update";
												}
											}
										});
									}
								});
							
							}
						}
					},
					error : function (data) {
						if (data != null) {
						}
					}
				});
            	user_email = response.email; //get user email
          // you can store this data into your database             
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_actions,email'
    });
}
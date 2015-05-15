//var ip_host = "http://localhost:8000";

function showKeyCode(e, loc) {
	if(e.keyCode == 13){
		signIn(loc);
	}
}

function signIn(loc){
	
	if($("#email_id").val()==""){
		$("#email_id").focus(); 
		$("#email_id").css('border-color','red');
		$('#b_ld').html("Enter Email and Password");
		return false;
	}
	if($("#email_passwd").val()==""){
	    $("#email_passwd").focus(); 
		$("#email_passwd").css('border-color','red');
		$('#b_ld').html("Enter Email and Password");
		return false;
	}
	var hash_pwd = CryptoJS.SHA3($("#email_passwd").val());
	
	var registration = {};
	registration.email = $("#email_id").val();
	registration.isemail = 1;
	registration.pwd = hash_pwd+"";
	
	$.ajax({
		url : '/loginReg',
        data : JSON.stringify(registration),
        type : "POST",
        contentType : 'application/json',
        success : function successmsg(data){
        	if(data.length > 0){
        		if(data[0].verify == 1){
        			window.location = "/verifyaccount";
        		}else{
        			if(data[0].deleted == 1 || data[0].activation == 0){
        				
        			}else{
        				localStorage.log_email = decodeURIComponent(data[0].email);
        				if(data[0].picture &&  data[0].picture!=""){
        					localStorage.log_prof_pic = decodeURIComponent(data[0].picture);
        				}
						localStorage.log_fname = decodeURIComponent(data[0].name);
						localStorage.log_lname = "";
        				if(data[0].lname){
        					localStorage.log_lname = decodeURIComponent(data[0].lname);
        				}
        				localStorage.log_dnurl = decodeURIComponent(data[0].dn_url);
        				if(data[0].gp_login){
        					localStorage.log_gp = decodeURIComponent(data[0].gp_login);
        				}
        				if(data[0].fb_login){
        					localStorage.log_fb = decodeURIComponent(data[0].fb_login);
        				}
        				if(data[0].tw_login){
        					localStorage.log_tw = decodeURIComponent(data[0].tw_login);
        				}
        				if(data[0].superadmin){
        					localStorage.superadmin = decodeURIComponent(data[0].superadmin);
        				}
        				
                		if(loc == "login"){
        					window.location = "/home";
        				}else{
        					window.location = window.location;
        				}	
        			}
        		}
				
        	}else{
        		$('#b_ld').html("Invalid Email or Password");
        	}
        }
	});
}

function checkCookie(){
	if(localStorage.log_email && localStorage.log_email!=null){
		window.location ="/home";
	}
}
function showphoneKeyCode(e, loc) {
	if(e.keyCode == 13){
		ph_login(loc);
	}
}

function ph_login(loc){
	
	if($("#phone_id").val()==""){
	    $("#phone_id").focus(); 
		$('#bldph').html("Enter Mobile and Password");
		$("#phone_id").css('border-color','red');
		return false;
	}
	if($("#ph_passwd").val()==""){
	    $("#ph_passwd").focus(); 
		$("#ph_passwd").css('border-color','red');
		$('#bldph').html("Enter Mobile and Password");
		return false;
	}
	
	var hash_pwd = CryptoJS.SHA3($("#ph_passwd").val());
	var registration = {};
	registration.email = $("#phone_id").val();
	registration.isemail = 1;
	registration.pwd = hash_pwd+"";
	$.ajax({
		url : '/loginReg',
        data : JSON.stringify(registration),
        type : "POST",
        contentType : 'application/json',
        success : function successmsg(data){
			$('#bldph').html("");
        	if(data.length > 0){
        		if(data[0].verify == 1){
        			window.location = "/verifyaccount";
        		}else{
        			if(data[0].deleted == 1 || data[0].activation == 0){
        				
        			}else{
        				localStorage.log_email = decodeURIComponent(data[0].phone_id);
        				if(data[0].picture &&  data[0].picture!=""){
        					localStorage.log_prof_pic = decodeURIComponent(data[0].picture);	
        				}
        				localStorage.log_fname = decodeURIComponent(data[0].name);
        				localStorage.log_lname = "";
        				if(data[0].lname){
        					localStorage.log_lname = decodeURIComponent(data[0].lname);
        				}
        				localStorage.log_dnurl = decodeURIComponent(data[0].dn_url);
        				if(data[0].gp_login){
        					localStorage.log_gp = decodeURIComponent(data[0].gp_login);
        				}
        				if(data[0].fb_login){
        					localStorage.log_fb = decodeURIComponent(data[0].fb_login);
        				}
        				if(data[0].tw_login){
        					localStorage.log_tw = decodeURIComponent(data[0].tw_login);
        				}
        				if(data[0].superadmin){
        					localStorage.superadmin = decodeURIComponent(data[0].superadmin);
        				}
        				
        				if(loc == "login"){
        					window.location = "/home";
        				}else{
        					window.location = window.location;
        				}	
        			}
        		}
        		   		
        	}else{
				$('#bldph').html("Invalid Mobile or Password");
        	}
        }
	});

}

function googlelogin(fwdPage){
	hello('google').login();
	networkLogin(fwdPage);
}


function twitterlogin(fwdPage){
	
	window.location = '/auth/twitter';
}

function networkLogin(fwdPage){
	hello.on('auth.login', function(auth){
  	  // call user information, for the given network
        hello( auth.network ).api( '/me' ).success(function(r){
        	
			var $target = $("#profile_"+ auth.network );
			if(auth.network == "google"){

				$.ajax({
					//url : '/obits/'+_id,
					url : '/registration?dataSearch=1&social_id='+decodeURIComponent(r.id),
					type : "GET",
					success : function(data) {
						
						if(data.length == 0){
							var registration = {};
							registration.gp_id = decodeURIComponent(r.id);
							registration.name = decodeURIComponent(r.first_name);
							registration.lname = decodeURIComponent(r.last_name);
							var fullname = "";
							if(r.last_name!=""){
								fullname = r.first_name.toLowerCase()+" "+r.last_name.toLowerCase();
							}else{
								fullname = r.last_name.toLowerCase();
							}
							registration.fullname = fullname.trim();
							
							registration.gp_login = decodeURIComponent(r.link);
							registration.picture = decodeURIComponent(r.picture);
							registration.deleted = 0;
							registration.activation = 1;
							
							$.ajax({
								//url : '/obits/'+_id,
								url : '/registration?dataSearch=1&email='+decodeURIComponent(r.email),
								type : "GET",
								success : function(data_1) {
									
									
									if(data_1.length==0){
										registration.email = decodeURIComponent(r.email);
										var display_name = r.first_name+"_"+r.last_name.toLowerCase();
										display_name = display_name.replace(/\s/g, '');
										var xyz = {}
										xyz.name = "/curator/"+display_name;
													
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
														//window.location = "/"+fwdPage;
														$.ajax({
														  	type: "GET",
														  	url: '/welcomethrsocialmedia?reg_email='+r.email+'&name='+r.first_name,
														  	datatype: "json",
														  	success:function(mail_data){
														  		
														  	}
														});
														localStorage.log_email = decodeURIComponent(r.email);
							        					localStorage.log_prof_pic = decodeURIComponent(r.picture);	
								        				localStorage.log_fname = decodeURIComponent(r.first_name);
							        					localStorage.log_lname = decodeURIComponent(r.last_name);
								        				localStorage.log_dnurl = decodeURIComponent(registration.dn_url);
							        					localStorage.log_gp = decodeURIComponent(r.link);

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
											$.ajax({
												url : '/updateProfile?sl_email='+r.email,
												data : JSON.stringify(registration),
												type : "POST",
												contentType : 'application/json',
												success : function successmsg(data_2) {
													if(data_2[0].deleted == 1 || data_2[0].activation == 0){
								        				
								        			}else{
														localStorage.log_email = decodeURIComponent(r.email);
							        					localStorage.log_prof_pic = decodeURIComponent(r.picture);	
								        				localStorage.log_fname = decodeURIComponent(r.first_name);
							        					localStorage.log_lname = decodeURIComponent(r.last_name);
								        				localStorage.log_dnurl = decodeURIComponent(data_1[0].dn_url);
							        					localStorage.log_gp = decodeURIComponent(r.link);
								                		if(fwdPage == "login"){
								        					window.location = "/home";
								        				}else{
								        					window.location = window.location;
								        				}	
								        			}
												},
												error : function errormsg(data) {
													if (data != null) {
														document.getElementById('bld').innerHTML = "Unable to update";
													}
												}
											});
											
										}else{

											var display_name = r.first_name+"_"+r.last_name.toLowerCase();
											display_name = display_name.replace(/\s/g, '');
											
											var xyz = {}
											xyz.name = "/curator/"+display_name;
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
														url : '/updateProfile?social_id='+r.id,
														data : JSON.stringify(registration),
														type : "POST",
														contentType : 'application/json',
														success : function successmsg(data_2) {
										        				localStorage.log_email = decodeURIComponent(r.email);
									        					localStorage.log_prof_pic = decodeURIComponent(r.picture);	
										        				localStorage.log_fname = decodeURIComponent(r.first_name);
									        					localStorage.log_lname = decodeURIComponent(r.last_name);
										        				localStorage.log_dnurl = decodeURIComponent(registration.dn_url);
									        					localStorage.log_gp = decodeURIComponent(r.link);

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
							registration.name = decodeURIComponent(r.first_name);
							registration.lname = decodeURIComponent(r.last_name);
							registration.gp_login = decodeURIComponent(r.link);
							registration.picture = decodeURIComponent(r.picture);
							var fullname = "";
							if(r.last_name!=""){
								fullname = r.first_name.toLowerCase()+" "+r.last_name.toLowerCase();
							}else{
								fullname = r.last_name.toLowerCase();
							}
							registration.fullname = fullname.trim();
							

							if(data[0].dn_url == ""){
								var display_name = r.first_name+"_"+r.last_name.toLowerCase();
								display_name = display_name.replace(/\s/g, '');
								var xyz = {}
								xyz.name = "/curator/"+display_name;
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
											url : '/updateProfile?social_id='+r.id,
											data : JSON.stringify(registration),
											type : "POST",
											contentType : 'application/json',
											success : function successmsg(data_1) {

												localStorage.log_email = decodeURIComponent(r.email);
					        					localStorage.log_prof_pic = decodeURIComponent(r.picture);	
						        				localStorage.log_fname = decodeURIComponent(r.first_name);
					        					localStorage.log_lname = decodeURIComponent(r.last_name);
						        				localStorage.log_dnurl = decodeURIComponent(registration.dn_url);
					        					localStorage.log_gp = decodeURIComponent(r.link);
					        					
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
							}else{
								$.ajax({
									url : '/updateProfile?sl_email='+r.email,
									data : JSON.stringify(registration),
									type : "POST",
									contentType : 'application/json',
									success : function successmsg(data_1) {

										localStorage.log_email = decodeURIComponent(r.email);
			        					localStorage.log_prof_pic = decodeURIComponent(r.picture);	
				        				localStorage.log_fname = decodeURIComponent(r.first_name);
			        					localStorage.log_lname = decodeURIComponent(r.last_name);
				        				localStorage.log_dnurl = decodeURIComponent(data[0].dn_url);
			        					localStorage.log_gp = decodeURIComponent(r.link);
			        					
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
						}
					},
					error : function (data) {
						if (data != null) {
						}
					}
				});
				
            }
			
			
		}, {scope: 'email, user_likes'});
    });
}

function email_validateFields()
{
	$("#email_join_err").html("");

	if($.trim($("#fl_email_name").val())==""){
	    $("#fl_email_name").focus(); 
		$("#fl_email_name").css('border-color','red');
		
		$('#email_join_err').html('Name cannot be empty');
		return -1;
	}
	if($.trim($("#emailid_join").val())==""){
		$("#emailid_join").focus(); 
		$("#emailid_join").css('border-color','red');
		$('#email_join_err').html('Email cannot be empty');
		return -1;
	}else{
		var emlval=validEmail($.trim($("#emailid_join").val()));
	   	if(!emlval) {
			$("#emailid_join").focus(); 
			$("#emailid_join").css('border-color','red');
	   		$('#email_join_err').html('Invaild Email.');
	   		return -1;
		}
	}
	if($.trim($("#email_pwd").val())==""){
		$("#email_pwd").focus(); 
		$("#email_pwd").css('border-color','red');
		$('#email_join_err').html('Password cannot be empty');
		return -1;
	}
}
function validEmail(email)
{
	var re = new RegExp();
	re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!re.test(email)) {return false;}
	else {return true;}
}

function phone_validateFields()
{
	$("#phone_join_err").html("");

	if($.trim($("#phone_name").val())==""){
		$("#phone_name").focus(); 
		$("#phone_name").css('border-color','red');
		$('#phone_join_err').html('Name cannot be empty');
		return -1;
	}
	if($.trim($("#phone_phone").val())==""){
	    $("#phone_phone").focus(); 
		$("#phone_phone").css('border-color','red');
		$('#phone_join_err').html('Mobile no cannot be empty');
		return -1;
	}else{
		var emlval=$.isNumeric($("#phone_phone").val());
		if($("#phone_phone").val().length<10) {
			$("#phone_phone").focus(); 
			$("#phone_phone").css('border-color','red');
			$('#phone_join_err').html('Invaild mobile number.');
			return -1;
		}
		if(!emlval) {
			$("#phone_phone").focus(); 
			$("#phone_phone").css('border-color','red');
	   		$('#phone_join_err').html('Invaild mobile number.');
	   		return -1;
		}
	}
	if($.trim($("#phone_pwd").val())==""){
		$("#phone_pwd").focus(); 
		$("#phone_phone").css('border-color','red');
		$('#phone_join_err').html('Password cannot be empty');
		return -1;
	}
}

function email_signCompletion(){

document.getElementById('email_sign').style.pointerEvents = 'none';
	try{
		var xmlHttp=new XMLHttpRequest();
	}catch (e){
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e){
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	$('#loadingg_gif').show();
	$('#loadingl_gif').show();
	var url = '/registration?dataSearch=1&email='+$('#emailid_join').val();
	if(xmlHttp!=null){
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					var res=eval("("+xmlHttp.responseText+")");
					if(res.length>0){
$('#loadingg_gif').hide();
						$('#loadingl_gif').hide();
						
						$('#email_join_err').html('Email Already Exists.');
document.getElementById('email_sign').style.pointerEvents = 'auto';
					}else{
						
						var emailE = $("#emailid_join").val();
						var pass = $('#email_pwd').val();
						var hash = CryptoJS.SHA3(emailE)+"";
						var hashpass = CryptoJS.SHA3(pass);
						$.ajax({
						  	type: "GET",
						  	url: '/send?reg_email='+emailE+'&hashkey='+hash+"&name="+$('#fl_email_name').val(),
						  	datatype: "json",
						  	success:function(mail_data){
							$.ajax({
						  	type: "GET",
						  	url: '/welcomemsg?reg_email='+emailE+'&hashkey='+hash+"&name="+$('#fl_email_name').val(),
						  	datatype: "json",
						  	success:function(mail_data){

								var obits = {};
								var str=$('#fl_email_name').val();
								var arr=str.split(' ');
								obits.name=arr[0];
								obits.lname="";
								for(var i=1;i<arr.length;i++) {
									if(i>1) {
										obits.lname=obits.lname+"  "+arr[i]
									}else{
										obits.lname=obits.lname+arr[i]
									}
								}
								obits.fullname = str.toLowerCase().trim();
								
								obits.email = emailE;
								obits.pwd = hashpass+"";
								//obits.pwd = $('#email_pwd').val();
								obits.picture = "../images/profiles/prof_1.jpg";
								obits.verify = "1";
								obits.verifykey = hash+"";
								var display_name = $('#fl_email_name').val().toLowerCase();
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
										
										obits.dn_url = "/curator/"+display_name;
										obits.deleted = 0;
										obits.activation = 1;
										obits.ipaddress = $('#log_ipaddress').val();
										
										$.ajax({
											url : '/insert?registrationTable=1&email='+emailE,
											data : JSON.stringify(obits),
											type : "POST",
											contentType : 'application/json',
											success : function successmsg(data){
												$('#fl_email_name').val("");
												$('#loadingg_gif').hide();
												$('#loadingl_gif').hide();
												window.location = "/verifyaccount"
												/*var notification={};
												notification.curatormail = data.email;
												notification.startcuratn=1;
												notification.isnew = 1;
												if(data!=null){
													$.ajax({
														url : '/insertNotification',
														data : JSON.stringify(notification),
														type : "POST",
														contentType : 'application/json',
														success : function successmsg(dataaa){
															if(dataaa!=null){
																sessionStorage.clear();
																sessionStorage.setItem("email", data.email);
																sessionStorage.setItem("username", data.name);
																sessionStorage.setItem("pId", data._id);
																sessionStorage.setItem("first_name", data.name)
																sessionStorage.setItem("profImg", data.picture);
																sessionStorage.setItem("dn_url", data.dn_url);
																
																window.parent.location = "/home";
																		
															}
														},
														error : function errormsg(data){
															if(data!=null){
															}
														}
													});	
													//document.getElementById('bld').innerHTML = "User Registration Successful. Please Login";
												}*/
											},
											error : function errormsg(data){
												if(data!=null){
													$('#email_join_err').html('User Registration Failed. Please check the Details.');
												}
											}
										});
									}
								});}
								});
						  	},
						    error:function(){
						      alert("failed");
						    }
						});
						
					}
				}
			}
		};
		xmlHttp.open("GET",url, true);
		xmlHttp.send(null);
	}
}

function phone_signCompletion(){

document.getElementById('phone_sign').style.pointerEvents = 'none';
	try{
		var xmlHttp=new XMLHttpRequest();
	}catch (e){
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e){
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	$('#loadingg_gif').show();
	var url = '/registration?dataSearch=1&phone_no='+$('#phone_phone').val();
	if(xmlHttp!=null){
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					var res=eval("("+xmlHttp.responseText+")");
					if(res.length>0){
$('#loadingg_gif').hide();
						$('#phone_join_err').html('Mobile number already exists.');
						document.getElementById('phone_sign').style.pointerEvents = 'auto';					
}else{
						
						var phone_no = $("#phone_phone").val();
						var pass = $('#phone_pwd').val();
						var hash = CryptoJS.SHA3(phone_no);
						var hashpass = CryptoJS.SHA3(pass);
						
//						$.ajax({
//						  	type: "GET",
//						  	url: '/send?reg_email='+emailE+'&hashkey='+hash+"",
//						  	datatype: "json",
//						  	success:function(mail_data){
								var obits = {};
								
								//obits.name = $('#phone_name').val();
								
								var str=$('#phone_name').val();
								var arr=str.split(' ');
								obits.name=arr[0];
								obits.lname="";
								for(var i=1;i<arr.length;i++) {
									if(i>1) {
										obits.lname=obits.lname+"  "+arr[i]
									}else{
										obits.lname=obits.lname+arr[i]
									}
								}
								var fullname = "";
								if(obits.lname!=""){
									fullname = name.toLowerCase()+" "+obits.lname.toLowerCase();
								}else{
									fullname = obits.lname.toLowerCase();
								}
								obits.fullname = str.toLowerCase().trim();
								
								obits.phone_id = phone_no;
								obits.pwd = hashpass+"";
								obits.picture = "../images/profiles/prof_1.jpg";
								obits.verify = "1";
								obits.verifykey = hash+"";
								var display_name = $('#phone_name').val().toLowerCase();
								display_name = display_name.replace(/\s/g, '');
								
								var xyz = {}
								xyz.name = "/curator/"+display_name;
								$.ajax({
									//url : '/obits/'+_id,
									url : '/reg_name',
									type : "POST",
									data : xyz,
									success : function(count) {
										if(count > 1){
											display_name = display_name+"_"+count;
										}
										
										obits.dn_url = "/curator/"+display_name;
										obits.deleted = 0;
										obits.activation = 1;
										obits.ipaddress = $('#log_ipaddress').val();
										
										$.ajax({
											url : '/insert?registrationTable=1',
											data : JSON.stringify(obits),
											type : "POST",
											contentType : 'application/json',
											success : function successmsg(data){
												if(data!=null){
													localStorage.log_email = decodeURIComponent(data.phone_id);
							        				if(data.picture &&  data.picture!=""){
							        					localStorage.log_prof_pic = decodeURIComponent(data.picture);	
							        				}
							        				localStorage.log_fname = decodeURIComponent(data.name);
							        				localStorage.log_lname = "";
							        				if(data.lname){
							        					localStorage.log_lname = decodeURIComponent(data.lname);
							        				}
							        				localStorage.log_dnurl = decodeURIComponent(data.dn_url);
													$('#loadingg_gif').hide();
													window.parent.location = "/home";
													//document.getElementById('bld').innerHTML = "User Registration Successful. Please Login";
												}
											},
											error : function errormsg(data){
												if(data!=null){
													document.getElementById('phone_signup_id').innerHTML = "User Registration Failed. Please check the Details.";
												}
											}
										});		
									}
								});
//						  	},
//							error:function(){
//						      alert("failed");
//						    }
//						});
							
							
					}
				}
			}
		};
		xmlHttp.open("GET",url, true);
		xmlHttp.send(null);
	}
}

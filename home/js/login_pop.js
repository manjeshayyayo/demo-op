//var ip_host = "http://localhost:8000";

function showKeyCode_pop(e) {
	if(e.keyCode == 13){
		signIn_pop();
	}
}

function signIn_pop(){
	
	if($("#email_id_pop").val()==""){
	    $("#email_id_pop").focus(); 
		$("#email_id_pop").css('border-color','red');
		$('#b_ld_pop').html("Enter Email and Password");
		return false;
	}
	if($("#email_passwd_pop").val()==""){
	    $("#email_passwd_pop").focus(); 
		$("#email_passwd_pop").css('border-color','red');
		$('#b_ld_pop').html("Enter Email and Password");
		return false;
	}
	
	var hash_pwd = CryptoJS.SHA3($("#email_passwd_pop").val());
	
	var registration = {};
	registration.email = $("#email_id_pop").val();
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
        				
						window.location = window.location;
        			}
        		}
				
        	}else{
        		$('#b_ld_pop').html("Invalid Email or Password");
        	}
        }
	});
}

function showphoneKeyCode_pop(e, loc) {
	if(e.keyCode == 13){
		ph_login_pop(loc);
	}
}

function ph_login_pop(loc){
	
	if($("#phone_id_pop").val()==""){
	    $("#phone_id_pop").focus(); 
		$("#phone_id_pop").css('border-color','red');
		$('#bld_pop').html("Enter Mobile and Password");
		return false;
	}
	if($("#ph_passwd_pop").val()==""){
	    $("#ph_passwd_pop").focus(); 
		$("#ph_passwd_pop").css('border-color','red');
		$('#bld_pop').html("Enter Mobile and Password");
		return false;
	}
	
	var hash_pwd = CryptoJS.SHA3($("#ph_passwd_pop").val());
	var registration = {};
	registration.email = $("#phone_id_pop").val();
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
        				
						window.location = window.location;
					}
				}
				
			}else{
				$('#bld_pop').html("Invalid Mobile or Password");
			}
		}
	});
}


function email_pop_upvalidateFields()
{

	$("#email_join_err_pop").html("");

	if($.trim($("#fl_email_name_pop").val())==""){
	    $("#fl_email_name_pop").focus(); 
		$("#fl_email_name_pop").css('border-color','red');
		$('#email_join_err_pop').html('Name cannot be empty');
		return -1;
	}
	if($.trim($("#emailid_join_pop").val())==""){
	    $("#emailid_join_pop").focus(); 
		$("#emailid_join_pop").css('border-color','red');
		$('#email_join_err_pop').html('Email cannot be empty');
		return -1;
	}else{
		var emlval=validEmail($.trim($("#emailid_join_pop").val()));
	   	if(!emlval) {
			$("#emailid_join_pop").focus(); 
		    $("#emailid_join_pop").css('border-color','red');
	   		$('#email_join_err_pop').html('Invaild Email.');
	   		return -1;
		}
	}
	if($.trim($("#email_pwd_pop").val())==""){
	      $("#email_pwd_pop").focus(); 
		  $("#email_pwd_pop").css('border-color','red');
		$('#email_join_err_pop').html('Password cannot be empty');
		return -1;
	}
}

function phone_pop_upvalidateFields()
{

	$("#phone_join_err_pop").html("");

	if($.trim($("#phone_name_pop").val())==""){
	     $("#phone_name_pop").focus(); 
		 $("#phone_name_pop").css('border-color','red');
		$('#phone_join_err_pop').html('Name cannot be empty');
		return -1;
	}
	if($.trim($("#phone_phone_pop").val())==""){
		$("#phone_phone_pop").focus(); 
		$("#phone_phone_pop").css('border-color','red');
		$('#phone_join_err_pop').html('Mobile no cannot be empty');
		return -1;
	}else{
		var emlval=$.isNumeric($("#phone_phone_pop").val());
		if($("#phone_phone_pop").val().length<10) {
			$("#phone_phone_pop").focus(); 
			$("#phone_phone_pop").css('border-color','red');
			$('#phone_join_err_pop').html('Invaild mobile number');
			return -1;
		}
	   	if(!emlval) {
			$("#phone_phone_pop").focus(); 
		    $("#phone_phone_pop").css('border-color','red');
	   		$('#phone_join_err_pop').html('Invaild mobile number');
	   		return -1;
		}
	}
	if($.trim($("#phone_pwd_pop").val())==""){
	     $("#phone_pwd_pop").focus(); 
		 $("#phone_pwd_pop").css('border-color','red');
		$('#phone_join_err_pop').html('Password cannot be empty');
		return -1;
	}
}

function email_pop_upsignCompletion(){

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
	$('#loadingpop_gif').show();
	var url = '/registration?dataSearch=1&email='+$('#emailid_join_pop').val();
	if(xmlHttp!=null){
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					var res=eval("("+xmlHttp.responseText+")");
					if(res.length>0){
						$('#email_join_err_pop').html('Email Already Exists.');
					}else{
						
						var emailE = $("#emailid_join_pop").val();
						var pass = $('#email_pwd_pop').val();
						var hash = CryptoJS.SHA3(emailE);
						var hashpass = CryptoJS.SHA3(pass);
						$.ajax({
						  	type: "GET",
						  	url: '/send?reg_email='+emailE+'&hashkey='+hash+"&name="+$('#fl_email_name_pop').val(),
						  	
						  	datatype: "json",
						  	success:function(mail_data){
						  		$.ajax({
								type: "GET",
								url: '/welcomemsg?reg_email='+emailE+'&hashkey='+hash+"&name="+$('#fl_email_name').val(),
								datatype: "json",
								success:function(mail_data){
						  		var obits = {};
								//obits.name = $('#fl_email_name_pop').val();
								
								var str=$('#fl_email_name_pop').val();
								//alert(str.substr(0,str.indexOf(' ')))
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
								var display_name = $('#fl_email_name_pop').val().toLowerCase();
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
												window.location = "/verifyaccount"
												$('#loadingpop_gif').hide();
											},
											error : function errormsg(data){
												if(data!=null){
													$('#email_join_err').html('User Registration Failed. Please check the Details.');
												}
											}
										});}
										});
									}
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

function phone_pop_upsignCompletion(){

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
	$('#loadingpop_gif').show();
	var url = '/registration?dataSearch=1&phone_no='+$('#phone_phone_pop').val();
	if(xmlHttp!=null){
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					var res=eval("("+xmlHttp.responseText+")");
					if(res.length>0){
						$('#phone_join_err_pop').html('Phone number already exists.');
					}else{
						
						var phone_no = $("#phone_phone_pop").val();
						var pass = $('#phone_pwd_pop').val();
						var hash = CryptoJS.SHA3(phone_no);
						var hashpass = CryptoJS.SHA3(pass);
						
//						$.ajax({
//						  	type: "GET",
//						  	url: '/send?reg_email='+emailE+'&hashkey='+hash+"",
//						  	datatype: "json",
//						  	success:function(mail_data){
								var obits = {};
								
								//obits.name = $('#phone_name_pop').val();
								var str=$('#phone_name_pop').val();
								//alert(str.substr(0,str.indexOf(' ')))
								var arr=str.split(' ');
								obits.name=arr[0];
								obits.lname="";
								for(var i=1;i<arr.length;i++) {
									if(i>1) {
										obits.lname=obits.lname+"  "+arr[i]
									}else {
										obits.lname=obits.lname+arr[i]
									}
								}
								obits.fullname = str.toLowerCase().trim();
								
								obits.phone_id = phone_no;
								obits.pwd = hashpass+"";
								obits.picture = "../images/profiles/prof_1.jpg";
								obits.verify = "1";
								obits.verifykey = hash+"";
								var display_name = $('#phone_name_pop').val().toLowerCase();
										
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
											url : '/insert?registrationTable=1',
											data : JSON.stringify(obits),
											type : "POST",
											contentType : 'application/json',
											success : function successmsg(data){
												$('#loadingpop_gif').hide();
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

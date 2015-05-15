function loginPage(){
	showPopWin('preview.html', 640, 675, null);
}

function loadData(){
	if(localStorage.log_email != null && localStorage.log_email !=""){
		$.ajax({
			url : '/registration?dataSearch=1&email='+localStorage.log_email,
			type : "GET",
			success : function(res_data) {
				res_data = res_data[0];
				if(localStorage.log_prof_pic!=null && localStorage.log_prof_pic!=""){
					$('#curatorImg').css( "background-image", 'url(\''+localStorage.log_prof_pic+'\')');	
				}
				$('#curatorImg').parent().attr("href",res_data.dn_url);
				if(res_data.fb_login && $.trim(res_data.fb_login)!=""){
					$('#obit_fb').css("display", "block");
					$('#obit_fb').attr("href", res_data.fb_login);
				}
				if(res_data.gp_login && $.trim(res_data.tw_login)!=""){
					$('#obit_twitt').css("display", "block");
					$('#obit_twitt').attr("href", res_data.tw_login);
				}
				if(res_data.gp_login && $.trim(res_data.gp_login)!=""){
					$('#obit_gp').css("display", "block");
					$('#obit_gp').attr("href", res_data.gp_login);
				}
			},
			error : function(data){
				
			}
		});

		var memLang = {};
		$.ajax({
			type : "POST",
			url : '/getMemorialLang',
			data : memLang,
			success : function(res_lang) {
				var xy = "";
				for(m=0; m<res_lang.length; m++){
					xy = xy + '<option value="'+res_lang[m].lang_id+'">'+res_lang[m].language+'</option>';
				}
				$('#memorial_text_lang').html(xy);
				$('#memorial_text_lang').val(39);
			}
		});
	}
}

function prev(){
	picture=$('#ppic img').attr("src");
	if(picture==""){
		picture = "../images/profiles/prof_1.jpg";
	}else{
		
		var ppic_percentage = "";
		if($('#nw').val() > $('#pw').val()){
			ppic_percentage = ($('#pw').val() - 115) / $('#pw').val();
		}else{
			ppic_percentage = ($('#nw').val() - 115) / $('#nw').val();
		}
		var img_width = $('#nw').val() - ($('#nw').val() * ppic_percentage);
		var img_height = $('#nh').val() - ($('#nh').val() * ppic_percentage);
		var x_pos = $('#px1').val() - ($('#px1').val() * ppic_percentage);
		var y_pos = $('#py1').val() - ($('#py1').val() * ppic_percentage);

		$('#prfImg').attr("src", picture);
		$('#prfImg').css("width", img_width);
		$('#prfImg').css("height", img_height);
		$('#prfImg').css("margin-left", -x_pos);
		$('#prfImg').css("margin-top", -y_pos);
	
	}
		
	var no = Math.floor(Math.random() * 4) + 1;
	document.getElementById('hdImg').src = "../images/header_photo/header_"+ no +".jpg";

	document.getElementById('mem_name_prev').innerHTML = document.getElementById('uname').value;
//	document.getElementById('mem_txt_prev').innerHTML = $(".nicEdit-main").html();
	document.getElementById('mem_txt_prev').innerHTML = CKEDITOR.instances.editor1.getData();
	var hei = 220 - $('#des1').height();
	//$('#des2').css("height", hei);
	var mtext2 = $("#mem_txt_prev").text().length;
	if(mtext2>300){
		$("#expandtxt").show();
	}else{
		$("#expandtxt").hide();
	}
	document.getElementById('name_prev').innerHTML = document.getElementById('uname').value;
	document.getElementById('bfintro_prev').innerHTML = document.getElementById('bfintro').value;
	
	var dpbirth = "";
	var dpdeath = "";
	if(document.getElementById('dob').value!=""){
		dpbirth = document.getElementById('dob').value;
	}
	if(document.getElementById('pob').value!=""){
		if(dpbirth!=""){
			dpbirth = dpbirth+", "+document.getElementById('pob').value;
		}else{
			dpbirth = document.getElementById('pob').value;
		}
	}
	if(document.getElementById('dod').value!=""){
		dpdeath = document.getElementById('dod').value;
	}
	if(document.getElementById('pod').value!=""){
		if(dpdeath!=""){
			dpdeath = dpdeath+", "+document.getElementById('pod').value;
		}else{
			dpdeath = document.getElementById('pod').value;
		}
	}
	
	if(dpbirth!=""){
		document.getElementById('dpob').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Born</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+dpbirth+'</label></div></div>';
	}
	if(dpdeath!=""){
		document.getElementById('dpod').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Died</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+dpdeath+'</label></div></div>';
	}
    if($('#aad_hide').html()=="Hide" && $('#aad').val()!=""){
		document.getElementById('apad').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Age</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+$('#aad').val()+'</label></div></div>';
	}else{
		document.getElementById('apad').innerHTML="";
	}
	var r_name_obj = document.getElementsByName('relationship_name');
	var r_type_obj = document.getElementsByName('relationship_type');
	var r_name = new Array();
	var r_type = new Array();

	for ( var i = 0; i < r_name_obj.length; i++) {
		if (r_name_obj[i].value != "") {
			r_name[i] = r_name_obj[i].value;
			r_type[i] = r_type_obj[i].value;
		}
	}

	var relation= r_type;
	var parents = "", spouse="", children="", colleagues="", siblings="", grandparents = "", grandchildren="";
	var partner="", wife="", husband="", daughter="", son="", mother="", father="", brother="", sister="", childreninlaw="", siblingsinlaw="", parentsinlaw="";
	var granddaughter="", grandson="", grandmother="", grandfather="", greatgrandchildren="", greatgrandparent="", friends="", aunt="", uncle="", cousin="", niece="", nephew="", greatgrandson="", motherinlaw="", greatgranddaughter="", fatherinlaw="", brotherinlaw="", sisterinlaw="", neighbour="", student="", teacher="", colleague="";

	for(var j=0; j<relation.length; j++){
		
		if(relation[j]=="wife"){
			wife += r_name[j]+"<br>";
		}else if(relation[j]=="husband"){
			husband += r_name[j]+"<br>";
		}else if(relation[j]=="partner"){
			partner += r_name[j]+"<br>";
		}else if(relation[j]=="daughter"){
			daughter += r_name[j]+"<br>";
		}else if(relation[j]=="son"){
			son += r_name[j]+"<br>";
		}else if(relation[j]=="mother"){
			mother += r_name[j]+"<br>";
		}else if(relation[j]=="father"){
			father += r_name[j]+"<br>";
		}else if(relation[j]=="brother"){
			brother += r_name[j]+"<br>";
		}else if(relation[j]=="sister"){
			sister += r_name[j]+"<br>";
		}else if(relation[j]=="granddaughter"){
			granddaughter += r_name[j]+"<br>";
		}else if(relation[j]=="grandson"){
			grandson += r_name[j]+"<br>";
		}else if(relation[j]=="grandmother"){
			grandmother += r_name[j]+"<br>";
		}else if(relation[j]=="grandfather"){
			grandfather += r_name[j]+"<br>";
		}else if(relation[j]=="sisterinlaw" || relation[j]=="brotherinlaw"){
			siblingsinlaw += r_name[j]+"<br>";
		}else if(relation[j]=="motherinlaw" || relation[j]=="fatherinlaw"){
			parentsinlaw += r_name[j]+"<br>";
		}else if(relation[j]=="greatgrandmother" || relation[j]=="greatgrandfather"){
			greatgrandparent += r_name[j]+"<br>";
		}else if(relation[j]=="friend"){
			friends += r_name[j]+"<br>";
		}else if(relation[j]=="neighbour"){
			neighbour += r_name[j]+"<br>";
		}else if(relation[j]=="aunt"){
			aunt += r_name[j]+"<br>";
		}else if(relation[j]=="uncle"){
			uncle += r_name[j]+"<br>";
		}else if(relation[j]=="cousin"){
			cousin += r_name[j]+"<br>";
		}else if(relation[j]=="nephew"){
			nephew += r_name[j]+"<br>";
		}else if(relation[j]=="niece"){
			niece += r_name[j]+"<br>";
		}else if(relation[j]=="student"){
			student += r_name[j]+"<br>";
		}else if(relation[j]=="teacher"){
			teacher += r_name[j]+"<br>";
		}else if(relation[j]=="colleague"){
			colleague += r_name[j]+"<br>";
		}else if(relation[j]=="daughterinlaw" || relation[j]=="soninlaw"){
			childreninlaw += r_name[j]+"<br>";
		}else if(relation[j]=="greatgranddaughter" || relation[j]=="greatgrandson"){
			greatgrandchildren += r_name[j]+"<br>";
		}
	}

	if(mother!=""){
		parents = mother;
	}
	if(father!=""){
		parents += father;
	}
	if(parents!=""){
		document.getElementById('parents').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Parents</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+parents+'</label></div></div>';
	}
	if(wife!=""){
		spouse = wife;
	}
	spouse += husband;

	if(spouse!=""){
		document.getElementById('spouse').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Spouse</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+spouse+'</label></div></div>';
	}
	if(partner!=""){
		document.getElementById('partner').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Partner</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+partner+'</label></div></div>';
	}
	if(son!=""){
		children = son;
	}
	children += daughter;
	
	if(children!=""){
		document.getElementById('children').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Children</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+children+'</label></div></div>';
	}
	if(brother!=""){
		siblings = brother;
	}
	siblings += sister;

	if(siblings!=""){
		document.getElementById('siblings').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Siblings</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+siblings+'</label></div></div>';
	}
	if(grandmother!=""){
		grandparents = grandmother;
	}
	grandparents += grandfather;

	if(grandparents!=""){
		document.getElementById('grandparents').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Grand-Parents</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+grandparents+'</label></div></div>';
	}
	if(grandson!=""){
		grandchildren = grandson;
	}
	grandchildren += granddaughter;

	if(grandchildren!=""){
		document.getElementById('grandchildren').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Grand-Children</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+grandchildren+'</label></div></div>';
	}

	if(greatgrandparent!=""){
		document.getElementById('greatgrandparent').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Great-Grand-Parent</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+greatgrandparent+'</label></div></div>';
	}
	
	if(greatgrandchildren!=""){
		document.getElementById('greatgrandchildren').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Great-Grand-Children</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+greatgrandchildren+'</label></div></div>';
	}
	
	if(childreninlaw!=""){
		document.getElementById('childreninlaw').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Children-in-law</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+childreninlaw+'</label></div></div>';
	}
	
	if(siblingsinlaw!=""){
		document.getElementById('siblingsinlaw').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Siblings-in-law</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+siblingsinlaw+'</label></div></div>';
	}
	if(parentsinlaw!=""){
		document.getElementById('parentsinlaw').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Parents-in-law</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+parentsinlaw+'</label></div></div>';
	}
	
	if(friends!=""){
		document.getElementById('friends').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Friends</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+friends+'</label></div></div>';
	}
	if(teacher!=""){
		document.getElementById('teacher').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Teacher</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+teacher+'</label></div></div>';
	}
	if(neighbour!=""){
		document.getElementById('neighbour').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Neighbour</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+neighbour+'</label></div></div>';
	}
	if(student!=""){
		document.getElementById('student').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Student</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+student+'</label></div></div>';
	}
	if(cousin!=""){
		document.getElementById('cousin').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">cousin</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+cousin+'</label></div></div>';
	}
	if(uncle!=""){
		document.getElementById('uncle').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Uncle</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+uncle+'</label></div></div>';
	}
	if(aunt!=""){
		document.getElementById('aunt').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Aunt</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+aunt+'</label></div></div>';
	}
		if(niece!=""){
		document.getElementById('niece').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Niece</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+niece+'</label></div></div>';
	}
	
	if(nephew!=""){
		document.getElementById('nephew').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Nephew</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+nephew+'</label></div></div>';
	}
	
	if(colleague!=""){
		document.getElementById('colleague').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">colleague</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+colleague+'</label></div></div>';
	}
	if($('#famname').val()!="") {
		document.getElementById('family').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px; " class="">Family Name</div><div style="display: table-cell; vertical-align: top; word-break: break-all;"><label style="font-weight: normal;">'+$('#famname').val()+'</label></div></div>';
	}
	var s_name_obj = document.getElementsByName('school_name');
	var s_place_obj = document.getElementsByName('school_place');
	var s_name = new Array();
	var s_place = new Array();
	for ( var i = 0; i < s_name_obj.length; i++) {
		if (s_name_obj[i].value != "") {
			s_name[i] = s_name_obj[i].value;
			s_place[i] = s_place_obj[i].value;
		}
	}

	if(s_name!=""){
		var school ="";
		for(var i=0;i<s_name.length; i++){
			isdata="";
			if(s_place[i]!=""){
				isdata= ", ";
			}
			school = school + ''+s_name[i]+''+isdata+''+s_place[i]+'<br>';
			
			
		}
		document.getElementById('school').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">School</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+school+'</label></div></div>';
	}
	
	var c_name_obj = document.getElementsByName('college_name');
	var c_place_obj = document.getElementsByName('college_place');
	var c_name = new Array();
	var c_place = new Array();
	for ( var i = 0; i < c_name_obj.length; i++) {
		if (c_name_obj[i].value != "") {
			c_name[i] = c_name_obj[i].value;
			c_place[i] = c_place_obj[i].value;
		}
	}

	if(c_name!=""){
		var college ="";
		for(var i=0;i<c_name.length; i++){
			isdata="";
			if(c_place[i]!=""){
				isdata= ", ";
			}
			college = college + ''+c_name[i]+''+isdata+''+c_place[i]+'<br>';
		}
		document.getElementById('college').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">College</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+college+'</label></div></div>';
	}
	if(document.getElementById('profession').value.trim()!=""){
		document.getElementById('profe').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Profession</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+document.getElementById('profession').value+'</label></div></div>';
	}
	var emp_name_obj = document.getElementsByName('employer');
	var emp_place_obj = document.getElementsByName('employer_place');
	var emp_name = new Array();
	var emp_place = new Array();
	for ( var i = 0; i < emp_name_obj.length; i++) {
		if (emp_name_obj[i].value != "") {
			emp_name[i] = emp_name_obj[i].value;
			emp_place[i] = emp_place_obj[i].value;
		}
	}

	
	if(emp_name!=""){
		var employers ="";
		for(var i=0;i<emp_name.length; i++){
			isdata="";
			if(emp_place[i]!=""){
				isdata= ", ";
			}
			employers = employers + ''+emp_name[i]+''+isdata+''+emp_place[i]+'<br>';
		}
		document.getElementById('employers').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px;" class="">Employers</div><div  style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+employers+'</label></div></div>';
	}

	var place_obj = document.getElementsByName('lived');
	var plived = "";
	for ( var i = 0; i < place_obj.length; i++) {
		if (place_obj[i].value != "") {
			plived += place_obj[i].value+"<br>";
		}
	}
	if(plived!=""){
		document.getElementById('plived').innerHTML = '<div style="padding-top: 6px;"><div style="display: table-cell; vertical-align: top; width: 80px; " class="">Place lived</div><div style="display: table-cell; vertical-align: top;"><label style="font-weight: normal;">'+plived+'</label></div></div>';
	}				

	
	$('#preModal').trigger('click');
	
}

	

function logout(){
	sessionStorage.removeItem("email");
	sessionStorage.removeItem("pId");
	sessionStorage.removeItem("username");
	window.location = "index.html";
}

var msg = new Array();;
function loadNotification(){
	
	var url = '/readnotificationbymail?email='+localStorage.log_email;
	var xmlHttp = "";
	try{
		xmlHttp=new XMLHttpRequest();
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
	if(xmlHttp!=null){
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					
					var res=eval("("+xmlHttp.responseText+")");
					$("#innerDiv").html('');
					var len = res.length;
					var msgcnt = "";
					if(len>0){
						$("#notifContainer").css("display", "block");
						for(var i=0; i < len; i++){
								//alert(res[i].newflower);
								if(res[i].newdiya==1){
									$("#innerDiv").append('<div style="line-height:15px;">'+res[i].diya[length-1]+' and '+(res[i].diya.length-1)+' others lit lights for '+res[i].memorialname+'</div><hr style="margin: 10px 0 10px 0;">')
								}
								if(res[i].newflower==1){
									$("#innerDiv").append('<div style="line-height:15px;">'+res[i].flower[length-1]+' and '+(res[i].flower.length-1)+' others placed flowers for '+res[i].memorialname+'</div><hr style="margin: 10px 0 10px 0;">')
								}
								if(res[i].newtirbute==1){
									$("#innerDiv").append('<div style="line-height:15px;">'+res[i].tributes[length-1]+' and '+(res[i].tributes.length-1)+' others wrote Tributes for '+res[i].memorialname+'</div><hr style="margin: 10px 0 10px 0;">')
								}
								
								//alert(res[i].diya.length)
						}
						
					}
					/* if(cnt!=0){
						if(cnt<10){
							document.getElementById('msgCountWrapper').innerHTML = "0"+cnt;	
						}else{
							document.getElementById('msgCountWrapper').innerHTML = cnt;
						}
					} */
				}
			}
		};
		xmlHttp.open("GET",url, true);
		xmlHttp.send(null);
	}
}

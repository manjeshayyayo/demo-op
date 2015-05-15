	function alphaNumericWithUnderScoredotCheck(value){
		var regex=/^[0-9A-Za-z]+[0-9A-Za-z\s\.:;,_-]*$/;
		if(regex.test(value)){
			return true;
		} else {
			return false;
		}
	}
	
	function specialCharCheck(value){
		var regex=/^[\.'~!@#$%^&*:;,_-]*$/;
		if(regex.test(value)){
			return true;
		} else {
			return false;
		}
	}
	
	function alphaWithUnderScoredotCheck(value){
		var regex=/^[A-Za-z]+[A-Za-z\s]*$/;
		if(regex.test(value)){
			return true;
		} else {
			return false;
		}
	}

	function checkNumeric()
	{
		if (!((event.keyCode > 47 && event.keyCode < 58) || event.keyCode==46) )
		{
			event.returnValue=false;
		}
	}
	
	function isNumericWithDecimal(str) {
	    str = alltrim(str);
	    return /^[-+]?[0-9]+(\.[0-9]+)?$/.test(str);
	}
	
	function isOnlyNumeric(str) {
	    str = alltrim(str);
	    var regex=/^[0-9]*$/;
		if(regex.test(str)){
			return true;
		} else {
			return false;
		}
		
	}
	
	function alltrim(str) {
	    return str.replace(/^\s+|\s+$/g, '');
	}
	
	function validEmail(email)
	{
		var re = new RegExp();
		re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!re.test(email)) {return false;}
		else {return true;}
	}

	function loadCurator(){
		//window.location = "/curator/"+document.getElementById('curator_dn_url').value;
		window.location = document.getElementById('curator_dn_url').value;
	}
	
	function to_mem_name(){
		var mem_name = document.getElementById('memorial_name').value;
		if(specialCharCheck(mem_name)){
			document.getElementById('mem_lbl').innerHTML = "Memorial Name cannot contains special charaters";
			return -1;
		}else{
			document.getElementById('mem_lbl').innerHTML = "";
		}
		
		$.ajax({
			//url : '/obits/'+_id,
			url : '/checkMemorial?status=create&mem_name='+mem_name,
			type : "GET",
			success : function(data) {
				if(data.length > 0){
					document.getElementById('mem_lbl').innerHTML = "Memorial Name already exists";
				}else{
					document.getElementById('mem_lbl').innerHTML = "";
				}
			}
		});
	}
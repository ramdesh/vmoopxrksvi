function doAll(){
	var text = $("#inputText").val();
	var output="";
	$(".multioutput").remove();
	
	//reverse()
	output = reverse(text);
	$("#multioutput").append("<div class=\"multioutput\" id=\"reverse\"><h5><b>Reverse</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\">"+output+"</div>");
	
	//atbash()
	output = atbash(text,0);
	$("#multioutput").append("<div class=\"multioutput\" id=\"atbash\"><h5><b>Atbash</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\">"+output+"</div>");
	
	//atbash all
	output = atbash(text,1);
	$("#multioutput").append("<div class=\"multioutput\" id=\"atbash-all\"><h5><b>Atbash All</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\">"+output+"</div>");
	
	//odd-even()
	output = extractAlternatingChars(text,0);
	$("#multioutput").append("<div class=\"multioutput\" id=\"odd\"><h5><b>Odd</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\">"+output+"</div>");
	output = extractAlternatingChars(text,1);
	$("#multioutput").append("<div class=\"multioutput\" id=\"even\"><h5><b>Even</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\">"+output+"</div>");
	
	//caseSwitch()
	output = caseSwitch(text);
	$("#multioutput").append("<div class=\"multioutput\" id=\"caseSwitch\"><h5><b>Case Switch</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\">"+output+"</div>");
	
}

function copyVals(){
	var text = $("#inputText").val();
	$("#outputText").val(text.trim());
	$("#outputText").removeClass("btn-success btn-warning");
	$(".multioutput").removeClass("btn-success btn-warning");
}

function clickToCopy(text){
	$("#outputText").val(text);
	$("#outputText").removeClass("btn-success btn-warning");
	formValidate($("#outputText"),text);
}

function recordLog(){
}

function formValidate(obj,text){
	classstring="";
	var ret = validate(text,keywords);
	if(ret.length>0){
		if(ret[0][1]=="full"){
			classstring="btn-success";
		}
		else if(ret[0][1]=="pattern"){
			classstring="btn-warning";
		}
		else if(ret[0][1]=="partial"){
			classstring="btn-info";
		}
	}
	else{
		classstring="";
	}
	if(obj){
		$(obj).removeClass("btn-success btn-warning btn-info");
		if(typeof classstring !== 'undefined'){
			$(obj).addClass(classstring);
		}
	}
	else{
		return classstring;	
	}
	return;			
}

function formAtbash(){
	text = atbash($("#outputText").val(),0);
	$("#outputText").val(text);
	formValidate($("#outputText"),text);
}

function formAtbashAll(){
	text = atbash($("#outputText").val(),1);
	$("#outputText").val(text);
	formValidate($("#outputText"),text);
}

function formReverse(){
	text = reverse($("#outputText").val());
	$("#outputText").val(text);
	formValidate($("#outputText"),text);
}

function formOddEven(){
	var text = $("#outputText").val();
	$(".multioutput").remove();
	$("#outputText").removeClass("btn-success btn-warning");
	$("#multioutput").append("<div class=\"multioutput\" id=\"odd\"><h5><b>Odd</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"even\"><h5><b>Even</b></h5></div>");
	
	ret = extractAlternatingChars(text,0);
	$("#multioutput #odd").append("<div class=\"multioutput\">"+ret+"</div>");
	$("#multioutput #odd .multioutput:last-child").addClass(formValidate("",ret));
	$("#multioutput #odd .multioutput:last-child").attr("value",ret);
	$("#multioutput #odd .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");

	ret = extractAlternatingChars(text,1);
	$("#multioutput #even").append("<div class=\"multioutput\">"+ret+"</div>");
	$("#multioutput #even .multioutput:last-child").addClass(formValidate("",ret));
	$("#multioutput #even .multioutput:last-child").attr("value",ret);
	$("#multioutput #even .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
}

function formRotN(){
	var text = $("#outputText").val();
	$(".multioutput").remove();
	for(i=1;i<=25;i++){
		ret = caesar(text,i,0);
		$("#multioutput").append("<div class=\"multioutput\" >"+ret+" rot:"+i+"</div>");
		$("#multioutput .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		$("#multioutput .multioutput:last-child").addClass(formValidate("",ret));
	}
	formValidate();
}

function formAffine(){
	var text = $("#outputText").val();
	$(".multioutput").remove();
	a = new Array(9,21,15,3,19,7,23,11,5,17,25);
	for(i=0;i<=a.length;i++){
		for(b=0;b<26;b++){
			ret = affine(text,a[i],b,0);
			$("#multioutput").append("<div class=\"multioutput\" >"+ret+" (Affine A/B:"+a[i]+"/"+i+") </div>");
			$("#multioutput .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
			$("#multioutput .multioutput:last-child").addClass(formValidate("",ret));
		}
	}
	formValidate();
}

function formColumnar(type){
	var text = $("#outputText").val();
	var fac = factors(text);
	$(".multioutput").remove();
	$("#outputText").removeClass("btn-success btn-warning");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column0\"><h5><b>Top to Bottom: Left to Right</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column1\"><h5><b>Top to Bottom: Right to Left</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column2\"><h5><b>Bottom to Top: Left to Right</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column3\"><h5><b>Bottom to Top: Right to Left</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column4\"><h5><b>Right to Left: Top to Bottom</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column5\"><h5><b>Right to Left: Bottom to Top</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column6\"><h5><b>Left to Right: Top to Bottom</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column7\"><h5><b>Left to Right: Bottom to Top</b></h5></div>");

	for(i=0;i<fac.length;i++){
		ret = columnar_transposition(text,fac[i],0,type);
		$("#multioutput #column0").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column0 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column0 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column0 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");

		ret = columnar_transposition(text,fac[i],1,type);
		$("#multioutput #column1").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column1 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column1 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column1 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");

		ret = columnar_transposition(text,fac[i],2,type);
		$("#multioutput #column2").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column2 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column2 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column2 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],3,type);
		$("#multioutput #column3").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column3 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column3 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column3 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],4,type);
		$("#multioutput #column4").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column4 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column4 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column4 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],5,type);
		$("#multioutput #column5").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column5 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column5 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column5 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],6,type);
		$("#multioutput #column6").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column6 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column6 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column6 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],7,type);
		$("#multioutput #column7").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column7 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column7 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column7 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");

	}
	
}

function formSpiral(){
	var text = $("#outputText").val();
	var fac = factors(text);
	$(".multioutput").remove();
	$("#outputText").removeClass("btn-success btn-warning");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column0\"><h5><b>Top Left - Clockwise</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column1\"><h5><b>Bottom Left - Clockwise</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column2\"><h5><b>Bottom Right - Clockwise</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column3\"><h5><b>Top Right - Clockwise</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column4\"><h5><b>Top Right - Anti-Clockwise</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column5\"><h5><b>Bottom Right - Anti-Clockwise</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column6\"><h5><b>Bottom Left - Anti-Clockwise</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"column7\"><h5><b>Top Left - Anti-Clockwise</b></h5></div>");

	// Top Left - Clockwise	
	for(i=0;i<fac.length;i++){
		ret = spiral(text,fac[i],0);
		$("#multioutput #column0").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column0 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column0 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column0 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
	}

	// Bottom Left - Clockwise
	for(i=0;i<fac.length;i++){
		tmp = columnar_transposition(text,fac[i],2,0);
		ret = spiral(tmp,Math.ceil(text.length/fac[i]),0);
		$("#multioutput #column1").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column1 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column1 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column1 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
	}
	
	// Bottom Right - Clockwise
	for(i=0;i<fac.length;i++){
		tmp = columnar_transposition(text,fac[i],5,0);
		ret = spiral(tmp,fac[i],0);
		$("#multioutput #column2").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column2 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column2 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column2 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
	}
	
	// Top Right - Clockwise
	for(i=0;i<fac.length;i++){
		tmp = columnar_transposition(text,fac[i],1,0);
		ret = spiral(tmp,Math.ceil(text.length/fac[i]),0);
		$("#multioutput #column3").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column3 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column3 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column3 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
	}
	
	//Top Right - Anti-Clockwise
	for(i=0;i<fac.length;i++){
		tmp = columnar_transposition(text,fac[i],4,0);
		ret = spiral(tmp,fac[i],0);
		$("#multioutput #column4").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column4 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column4 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column4 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
	}
	
	//Bottom Right - Anti-Clockwise
	for(i=0;i<fac.length;i++){
		tmp = columnar_transposition(text,fac[i],3,0);
		ret = spiral(tmp,Math.ceil(text.length/fac[i]),0);
		$("#multioutput #column5").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column5 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column5 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column5 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
	}
	
	//Bottom Left - Anti-Clockwise
	for(i=0;i<fac.length;i++){
		tmp = columnar_transposition(text,fac[i],7,0);
		ret = spiral(tmp,fac[i],0);
		$("#multioutput #column6").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column6 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column6 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column6 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
	}
	
	//Top Left - Anti-Clockwise
	for(i=0;i<fac.length;i++){
		tmp = columnar_transposition(text,fac[i],0,0);
		ret = spiral(tmp,Math.ceil(text.length/fac[i]),0);
		$("#multioutput #column7").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column7 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column7 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column7 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
	}
}

function formLettersNum(flag){
	text = $("#outputText").val();
	text = numText(text,flag);
	$("#outputText").removeClass("btn-success btn-warning");
	$("#outputText").val(text);
	formValidate($("#outputText"),text);
}

function formCaseSwitch(){
	text = caseSwitch($("#outputText").val());
	$("#outputText").val(text);
	formValidate($("#outputText"),text);			
}

function formGroup(n){
	text = $("#outputText").val();
	output = "";
	for(i=0;i<text.length;i++){
		output = output+ text.charAt(i);
		if((i+1)%n==0){
			output = output + " ";
		}
	}
	$("#outputText").val(output);
}

function formLetters_n_Numbers(){
	var text = $("#outputText").val();
	$(".multioutput").remove();
	$("#outputText").removeClass("btn-success btn-warning");
	$("#multioutput").append("<div class=\"multioutput\" id=\"letters\"><h5><b>Letters</b></h5></div>");
	$("#multioutput").append("<div class=\"multioutput\" id=\"numbers\"><h5><b>Numbers</b></h5></div>");
	
	ret = removeCharRange(text,"numbers")
	$("#multioutput #letters").append("<div class=\"multioutput\">"+ret+"</div>");
	$("#multioutput #letters .multioutput:last-child").addClass(formValidate("",ret));
	$("#multioutput #letters .multioutput:last-child").attr("value",ret);
	$("#multioutput #letters .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");

	ret = removeCharRange(text,"lowercase");
	ret = removeCharRange(ret,"uppercase");
	$("#multioutput #numbers").append("<div class=\"multioutput\">"+ret+"</div>");
	$("#multioutput #numbers .multioutput:last-child").addClass(formValidate("",ret));
	$("#multioutput #numbers .multioutput:last-child").attr("value",ret);
	$("#multioutput #numbers .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
}

function formMorse(){
	j = 0;
	text = $("#outputText").val();
        //Check if this is az09 or otherwise
 		if(text.search(/[^a-z0-9]/i)!=-1){
        	// no characters therefore decode
        	text = morse(text,1);	
        }
        else{
        	text = morse(text,0);
        }
	$("#outputText").val(text);
	formValidate($("#outputText"),text);
}

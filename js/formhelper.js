function clickToCopy(text){
	$("#outputText").val(text);
	$("#outputText").removeClass("btn-success btn-warning");
	formValidate($("#outputText"),text);
}

function recordLog(){
}

function formValidate(obj,text){
	var ret = validate(text,keywords);
	if(ret.length>0){
		if(ret[0][1]=="full"){
			classstring="btn-success";
		}
		else{
			classstring="btn-warning";
		}
	}
	else{
		classstring="";
	}
	if(obj){
		$(obj).addClass(classstring);
	}
	else{
		return classstring;	
	}
	return;			
}

function formAtbash(){
	text = atbash($("#outputText").val());
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
	}
	formValidate();
}

function formColumnar(){
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
		ret = columnar_transposition(text,fac[i],0);
		$("#multioutput #column0").append("<div class=\"multioutput\">"+ret+" (columns:"+fac[i]+")</div>");
		$("#multioutput #column0 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column0 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column0 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");

		ret = columnar_transposition(text,fac[i],1);
		$("#multioutput #column1").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column1 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column1 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column1 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");

		ret = columnar_transposition(text,fac[i],2);
		$("#multioutput #column2").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column2 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column2 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column2 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],3);
		$("#multioutput #column3").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column3 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column3 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column3 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],4);
		$("#multioutput #column4").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column4 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column4 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column4 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],5);
		$("#multioutput #column5").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column5 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column5 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column5 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],6);
		$("#multioutput #column6").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
		$("#multioutput #column6 .multioutput:last-child").addClass(formValidate("",ret));
		$("#multioutput #column6 .multioutput:last-child").attr("value",ret);
		$("#multioutput #column6 .multioutput:last-child").attr("ondblclick","clickToCopy(\""+ret+"\")");
		
		ret = columnar_transposition(text,fac[i],7);
		$("#multioutput #column7").append("<div class=\"multioutput\">"+ret+"(columns:"+fac[i]+")</div>");
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

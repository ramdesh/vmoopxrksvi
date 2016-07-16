function regex_filter(list,reg){
	$("#output").html("");
	if(reg==""){
		for(i=0;i<list.length;i++){
			$("#output").append("<div class=\"col-md-1\">"+list[i]+"</div>");
		}
		return;
	}
	rx = new RegExp(reg);
	for(i=0;i<list.length;i++){
		if(rx.test(list[i])){
			$("#output").append("<div class=\"col-md-1\">"+list[i]+"</div>");
		}
	}
}

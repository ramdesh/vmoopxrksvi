function replaceCipher(ciphertext, start, end) {
	var prefix = ciphertext.substring(0,start);
	var suffix = ciphertext.substring(end);
	var outputhtml = "Strings: ";
	$.getJSON("json/keywords.json", function(json) {
		$.each(json.keywords, function(i, keyword) {
			var outstring = '<div class="col-md-4"><p>' + prefix + keyword + suffix + '</p></div>';
			if ((i % 3) == 0) {
				outputhtml += '<div class="row">'
				outputhtml += outstring;
			} else if ((i % 3) == 2) {
				outputhtml += outstring;
				outputhtml += '</div>';
			} else {
				outputhtml += outstring;
			}
		});
	});
	$("#results").html(outputhtml);
}
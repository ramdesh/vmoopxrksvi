/**
 * Counts the number of numeric digits in the text. 
 * @param {string} text - text to be analysed.
 * @return {integer} - returns number of numeric digits.
 * @author - KJ <kulendra@gmail.com>
 */
function countNumbers(text,flag){
	var i=0;
	var j=0;
	var lower = 0;
	var upper = 0;
	if(flag ==1 ){
		lower = 49;
		upper = 58;
	}
	else if (!(flag)||(flag==0)){
		
	}
	for (i=0;i<text.length;i++){
		if(text.charCodeAt(i) >= lower && text.charCodeAt(i)<=upper){
			j++;
		}
	}
	return j;
}

/**
 * Counts the number of text in the text. 
 * @param {string} text - text to be analysed.
 * @return {string array} - returns an array with characters and number of appearences.
 * @author - KJ <kulendra@gmail.com>
 */
function countLetters(text,flag){
	var i=0;
	var j=0;
	ret = [];
	text = text.toLowerCase();
	for (i=0;i<text.length;i++){
		c = text.charCodeAt(i);
		if(c>=97 && c<=122){
			ret[string.fromCharCode(c)] = ret[string.fromCharCode(c)]+1;	
		}
	}
	return ret;
}

/**
 * Computes factors of a given text length. Used for columnar transpositions. 
 * @param {string} text - text to be analysed.
 * @return {integer array} - returns integer factors as an array.
 * @author - KJ <kulendra@gmail.com>
 */
function factors(text){
	var primes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
	var i = 0;
	var factors = [];
	for(i=0;i<primes.length;i++){
		if(text.length==primes[i]){
			factors.push(text.length);
			return factors;
		}
	}
	
	// If the code runs up to here, then the text length is not a prime.
	for(i=2;i<=text.length;i++){
		if(text.length%i == 0){
			factors.push(i);
		}
	}
	return factors;
}

/**
 * Checks if a range of numbers can be converted to ASCII [0-9][A-Z][a-z] range by some manipulation.
 * @param {string} text - text to be checked has to be numbers.
 * @return {string} - returns atbash converted string of the input.
 * @todo - This currently requires the text to be entered in a 3 digit number format. Should ideally sort it out it self. 
 * @author - KJ <kulendra@gmail.com>
 */
function checkAscii(text){
		var i=0;
		var j=0;
		var mincode = 255;
		var maxcode = 0;
		var code = "";
		var asciid = [];
		var valid = 1;
		
		for(i=0;i<text.length;i=i+3){
			code = text.substr(i,3);
			if(code < mincode){
				mincode = code;
			}
			if (code > maxcode){
				maxcode = code;
			}
			asciid.push(code);
		}
		
		// We have found the max and min codes of the ascii ranges.
		// [0-9]:[48-57], [A-Z]:[65-90], [a-z]:[97-122]
		// [0-z]:[48-122]
		if((maxcode - mincode) > (122-48)){
			return;
		}
		
		for(i=-255;i<255;i++){
			valid = 1;
			for(j=0;j<asciid.length;j++){
				code = asciid[j];
				if((j+i < 48) || (j+i > 57 && j+i < 65) || (j+i > 90 && j+i < 97) || (j+i > 122)){
					valid = 0;
					break;
				}
			}
			if (valid == 1){
				if(!flag){
					output.push(i);
				}
			}
		}
		return i;
}

/**
 * Checks if a given string matches known passcode patterns. 
 * @param {string} text - text to be analysed.
 * @param {string array} keywords - array of known keywords.
 * @return {string array} - returns the matched pattern and match level. [0] - p1,p2,p3,p4 [1] - "full", "partial".
 * @author - KJ <kulendra@gmail.com>
 */
function validate(text,keywords){
	var output=[];
	text = text.toLowerCase();
	// check straightforward match
	var p1="^[2-9][p-z][p-z][a-h][2-9]("+keywords.join("|")+")[p-z][2-9][2-9][2-9][p-z]$";
	var p2="^[2-9][a-z][a-z][a-z][2-9]("+keywords.join("|")+")[a-z][2-9][a-z][2-9][a-z]$";
	var p3="^[2-9][p-z][a-h][2-9]("+keywords.join("|")+")[p-z][2-9][p-z][2-9][p-z]$";
	var p4="^[2-9][a-z][a-z][2-9]("+keywords.join("|")+")[a-z][2-9][2-9][2-9][a-z]$";
	var p5="^[a-z]{8}[2-9]("+keywords.join("|"+")[2-9]$");
	
		
	if(text.match(p1)){
		output.push(["p1","full"]);
	}
	if(text.match(p2)){
		output.push(["p2","full"]);
	}
	if(text.match(p3)){
		output.push(["p3","full"]);
	}
	if(text.match(p4)){
		output.push(["p4","full"]);
	}
	if(text.match(p5)){
		output.push(["p5","full"]);
	}
	if(output.length>0){
		return output;	
	}
			
	// check pattern matches
	var p1="^[2-9][p-z][p-z][a-h].*[2-9][p-z][2-9][2-9][2-9][p-z]$";
	var p2="^[2-9][a-z][a-z][a-z][2-9].*[a-z][2-9][a-z][2-9][a-z]$";
	var p3="^[2-9][p-z][a-h][2-9].*[p-z][2-9][p-z][2-9][p-z]$";
	var p4="^[2-9][a-z][a-z][2-9].*[a-z][2-9][2-9][2-9][a-z]$";
	var p5="^[a-z]{8}[2-9]*[2-9]$");

	if(text.match(p1)){
		output.push(["p1","pattern"]);
	}
	if(text.match(p2)){
		output.push(["p2","pattern"]);
	}
	if(text.match(p3)){
		output.push(["p3","pattern"]);
	}
	if(text.match(p4)){
		output.push(["p4","pattern"]);
	}
	if(text.match(p5)){
		output.push(["p5","pattern"]);
	}

	if(output.length>0){
		return output;	
	}
	
	// check keywords
	var i = text.length;
	if (i-10>0){
		var p1= "[".text."]{".i-10."}";	
	}
	if (i-9>0){
		var p2 = "[".text."]{".i-9."}";
	}
        if(text.match(p1)){
        	output.push(["keyword","pattern"]);
        }
        if(text.match(p2)){
        	output.push(["keyword","pattern"]);
        }
	if(output.length>0){
		return output;	
	}
	
	// check words
	numbers = ["two","three","four","five","six","seven","eight","nine","tw","th","fo","fi","si","se","ei","ni"];
	p1 = "^.*("+numbers.join("|")+").*$";
	if(text.match(p1)){
		output.push(["numbers","partial"]);
	}
	return output;
}

/**
* Converts the input text to its reverse.
*/
function reverse(text) {
  var text = document.getElementById("ciphertext").value;
  var outputArea = document.getElementById("outputtext");

  var reversedString = text.split("").reverse().join("");

  outputArea.value = reversedString;
}
/**
 * Converts the input text in to an atbash cipher using an alphabet [a-z] and [A-Z]. 
 * Numbers and all other characters are left as they are.
 * @param {string} text - text to be atbashed.
 * @return {string} - returns atbash converted string of the input.
 * @todo - Currently this function uses a pure a-z alphabet and uses the ASCII offset 
 * to find the atbash. Will not work with anything outside the a-z alphabet OR numbers.
 * @author - KJ <kulendra@gmail.com>
 */
function atbash(text){

	var i = 0;
	var character = "";
	var outputchar = "";
	var outputtext = "";
	for(i=0; i<text.length;i++){
		character = text.charCodeAt(i);
		if(character >= 65 && character <= 90){
			outputchar = fromCharCode(155-character);
		}
		elseif(character >= 97 && character <=122){
			outputchar = String.fromCharCode(219 - character);
		}
		else{
			outputchar = String.fromCharCode(character);
		}
		outputtext = outputtext+outputchar;
	}
	return outputtext;
}
/**
 * Converts the input text using caesar cipher using an alphabet [a-z] and [A-Z]. 
 * @param {string} text - text to be encrypted/decrypted.
 * @param {integer} n - shift for caesar.
 * @param {integer} flag - 0: for encrypt 1: for decrypt
 * @return {string} - returns caesar encrypted/decrypted text.
 */
function caesar(text,n,flag){

	var i = 0;
	var character = "";
	var outputchar = "";
	var outputtext = "";
	for(i=0; i<text.length;i++){
		character = text.charCodeAt(i);
		if(character >= 65 && character <= 90){
			outputchar = String.fromCharCode(65 + ((character+n)%90));
		}
		elseif(character >= 97 && character <=122){
			outputchar = String.fromCharCode(97 + ((character+n)%122));
		}
		else{
			outputchar = fromCharCode(character);
		}
		outputtext = outputtext+outputchar;
	}
	return outputtext;
}

function columnar_transposition(text, n, flag){
/**
 * Converts the input text using a columnar transposition.
 * <b>Important note:</b> For the purpose of Ingress, use flag = 0 always.
 * @param {string} text - text to be encrypted/decrypted.
 * @param {integer} n - number of columns.
 * @param {integer} flag - 0: for encrypt 1: for decrypt
 * @return {string} - returns columnar encrypted/decrypted text.
 */
	var character = "";
	var outputchar = "";
	var outputtext = "";
	
	var i = 0;
	var j = i;
	var break = 0;
	var m;

	if (flag = 0){
		m = n;
	}
	if (flag = 1){
		m = Math.ceil(text.length / n);
	}
	while(break = 0){
		outputchar = text.charAt(j);
		outputtext = outputtext+outputchar;
		
		j = j+m;
		if (j >= text.length){
			i = i+1;
			j = i;
		}
		if(j >= i+m){
			break = 1;
		}
	}
}

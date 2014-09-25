function changeCipherBasic() {
  var cipherText = document.getElementById("ciphertext").value;
  document.getElementById("reverse").value = reverse(cipherText);
  document.getElementById("atbash").value = atbash(cipherText); 
  document.getElementById("odd").value = extractAlternatingChars(cipherText, 0); 
  document.getElementById("even").value = extractAlternatingChars(cipherText, 1); 
  document.getElementById("filter-uppercase").value = removeCharRange(cipherText, "uppercase");
  document.getElementById("filter-lowercase").value = removeCharRange(cipherText, "lowercase");
  document.getElementById("filter-numbers").value = removeCharRange(cipherText, "numbers");
}
/**
 * Converts the input text to its reverse.
 * @param {string} the string to be reversed.
 * @return {string} returns the reversed string.
 */
function reverse(text) {
  return reversedString = text.split("").reverse().join("");
}
/**
 * Extracts even/odd characters from input text
 * @param {string} text - text to be extracted from.
 * @param {integer} parity - shift for parity. use 0 to extract odd characters and 1 for even.
 * @return {string} - returns extracted text.
 * @author - Cyan
 */
function extractAlternatingChars(text, parity) {
  var i = 0;
  var outputtext = "";
  if (parity==1 || parity==0) {
    i = parity;
  } else {
    return "WTF is this? Wrong args!!";
  }
  for (i; i < text.length; i=i+2) {
    outputtext = outputtext + text.charAt(i);
  }
  return outputtext;
}

/**
 * Removes a range of characters from input text
 * @param {string} text - text to be extracted from.
 * @param {integer} range - shift for for the character range to be removed. valid values are "uppercase", "lowercase", and "numbers".
 * @return {string} - returns extracted text.
 * @author - Cyan
 */
function removeCharRange(text, range) {
  var outputtext = "";

  function createOutput(cipherText, minLimit, maxLimit) {
    for (i = 0; i < cipherText.length; i++) {
      character = text.charCodeAt(i);
      if (character < minLimit || character > maxLimit) {
        outputtext = outputtext + cipherText.charAt(i);
      } 
    }
  }

  switch (range) {
    case "uppercase": 
      createOutput(text, 65, 90) //remove uppercase characters
      break;
    case "lowercase": 
      createOutput(text, 97, 122) //remove lowercase characters
      break;
    case "numbers": 
      createOutput(text, 48, 57) //remove number characters (0-9)
      break;
    default: 
      outputtext = "This shit is not implemented yet!";
  }

  return outputtext;
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
function atbash(text) {

  var i = 0;
  var character = "";
  var outputchar = "";
  var outputtext = "";
  for (i = 0; i < text.length; i++) {
    character = text.charCodeAt(i);
    if (character >= 65 && character <= 90) {
      outputchar = String.fromCharCode(155 - character);
    } else if (character >= 97 && character <= 122) {
      outputchar = String.fromCharCode(219 - character);
    } else {
      outputchar = String.fromCharCode(character);
    }
    outputtext = outputtext + outputchar;
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
function caesar(text, n, flag) {

  var i = 0;
  var character = "";
  var outputchar = "";
  var outputtext = "";
  for (i = 0; i < text.length; i++) {
    character = text.charCodeAt(i);
    if (character >= 65 && character <= 90) {
      outputchar = String.fromCharCode(65 + ((character + n) % 90));
    } else if (character >= 97 && character <= 122) {
      outputchar = String.fromCharCode(97 + ((character + n) % 122));
    } else {
      outputchar = String.fromCharCode(character);
    }
    outputtext = outputtext + outputchar;
  }
  return outputtext;
}

/**
 * Converts the input text using a columnar transposition.
 * <b>Important note:</b> For the purpose of Ingress, use flag = 0 always.
 * @param {string} text - text to be encrypted/decrypted.
 * @param {integer} n - number of columns.
 * @param {integer} flag - 0: top-bottom LR 1: top-bottom RL 2:bottom-top LR 3:bottom-top RL
 * @return {string} - returns columnar encrypted/decrypted text.
 */
function columnar_transposition(text, n, flag) {
  var character = "";
  var outputchar = "";
  var outputtext = "";

  var i = 0;
  var j = i;
  var maxrow = Math.ceil(text.length/n);
  var maxcol = n;
  
  // read columnwise left-right
  if(flag == 0){
	  for(j=0;j<maxcol;j++){
	  	for(i=0;i<maxrow;i++){
			outputchar = text.charAt(i*n+j);
			outputtext = outputtext+outputchar;
		}
	  }
	  return outputtext;
  }
  
  //read columnwise right-left
  if (flag == 1){
	  for(j=maxcol-1;j>=0;j--){
	  	for(i=0;i<maxrow;i++){
			outputchar = text.charAt(i*n+j);
			outputtext = outputtext+outputchar;
		}
	  }
	  return outputtext;
  }

  //read columnwise bottom-top left-right
  if (flag == 2){
	  for(j=0;j<maxcol;j++){
	  	for(i=maxrow-1;i>=0;i--){
			outputchar = text.charAt(i*n+j);
			outputtext = outputtext+outputchar;
		}
	  }
	  return outputtext;
  }
  
  //read columnwise bottom-up right-left
  if (flag == 3){
	  for(j=maxcol-1;j>=0;j--){
	  	for(i=maxrow-1;i>=0;i--){
			outputchar = text.charAt(i*n+j);
			outputtext = outputtext+outputchar;
		}
	  }
	  return outputtext;
  }
  
  //read rowwise right-left
  if (flag == 4){
	  for(i=0;i<maxrow;i++){
	  	for(j=maxcol-1;j>=0;j--){
			outputchar = text.charAt(i*n+j);
			outputtext = outputtext+outputchar;
		}
	  }
	  return outputtext;
  }
  
  //read rowwise bottom-up right-left
  if (flag == 5){
	  for(i=maxrow-1;i>=0;i--){
	  	for(j=maxcol-1;j>=0;j--){
			outputchar = text.charAt(i*n+j);
			outputtext = outputtext+outputchar;
		}
	  }
	  return outputtext;
  }
}

/**
 * Converts the input text into their Ascii values
 * @param {string} text - text to be encrypted/decrypted.
 * @param {integer} flag - 0: number to letter 1: letter to number 2: Ascii to characters 3: char to Ascii
 *                         4: hex to char 5: char to hex
 * @return {string} - returns the converted text.
 * @todo - The ASCII conversion assumes that it will be all doublets. I can't think of a better alternative.
 * @author - KJ <kulendra@gmail.com>
 */
function numText(text,flag){
  var character="";
  var output="";
  var i=0;
  for(i=0;i<text.length;i++){
  	if(flag==0){
  		output = output + String.fromCharCode(97+text.charAt(i));	
  	}
  	else if(flag==1){
  		text = text.toLowerCase();
  		output = output + (text.charCodeAt(i) - 97);
  	}
  	else if(flag==2){
  		// Assumes that the characters will be in lower case range
  		output = output + String.fromCharCode(text.charAt(i)*10+text.charAt(i+1));
  		i++;
  	}
  	else if(flag==3){
  		output = output + text.charCodeAt(i);
  	}
  }
  return output;
}

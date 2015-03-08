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
      outputchar = String.fromCharCode(65 + ((character + n) % 91)%65);
    } else if (character >= 97 && character <= 122) {
      outputchar = String.fromCharCode(97 + ((character + n) % 123)%97);
    } else {
      outputchar = String.fromCharCode(character);
    }
    outputtext = outputtext + outputchar;
  }
  return outputtext;
}

/**
 * Converts the input text using a columnar transposition.
 * @param {string} text - text to be encrypted/decrypted.
 * @param {integer} n - number of columns.
 * @param {integer} flag - 0: top-bottom LR 1: top-bottom RL 2:bottom-top LR 3:bottom-top RL
 * @param {integer} type - 1: snake algorithm 0/ommitted/null: regular 
 * @return {string} - returns columnar encrypted/decrypted text.
 * @author - KJ <kulendra@gmail.com>
 */
function columnar_transposition(text, n, flag, type) {
  var character = "";
  var outputchar = "";
  var outputtext = "";
  var rowtext = "";
  var dir = 1;

  var i = 0;
  var j = i;
  var maxrow = Math.ceil(text.length/n);
  var maxcol = n;
  
  // read columnwise left-right
  if(flag == 0){
	  for(j=0;j<maxcol;j++){
	  	rowtext = "";
	  	for(i=0;i<maxrow;i++){
			outputchar = text.charAt(i*n+j);
			rowtext = rowtext+outputchar;
		}
		if(dir == -1 && type==1){
			rowtext = reverse(rowtext);
		}
		dir=dir*(-1);
		outputtext = outputtext+rowtext;
	  }
	  return outputtext;
  }
  
  //read columnwise right-left
  if (flag == 1){
	  for(j=maxcol-1;j>=0;j--){
	  	rowtext="";
	  	for(i=0;i<maxrow;i++){
			outputchar = text.charAt(i*n+j);
			rowtext = rowtext+outputchar;
		}
		if(dir == -1 && type==1){
			rowtext = reverse(rowtext);
		}
		dir=dir*(-1);
		outputtext = outputtext+rowtext;
	  }
	  return outputtext;
  }

  //read columnwise bottom-top left-right
  if (flag == 2){
	  for(j=0;j<maxcol;j++){
	  	rowtext="";
	  	for(i=maxrow-1;i>=0;i--){
			outputchar = text.charAt(i*n+j);
			rowtext = rowtext+outputchar;
		}
		if(dir == -1 && type==1){
			rowtext = reverse(rowtext);
		}
		dir=dir*(-1);
		outputtext = outputtext+rowtext;
	  }
	  return outputtext;
  }
  
  //read columnwise bottom-up right-left
  if (flag == 3){
	  for(j=maxcol-1;j>=0;j--){
	  	rowtext="";
	  	for(i=maxrow-1;i>=0;i--){
			outputchar = text.charAt(i*n+j);
			rowtext = rowtext+outputchar;
		}
		if(dir == -1 && type==1){
			rowtext = reverse(rowtext);
		}
		dir=dir*(-1);
		outputtext = outputtext+rowtext;
	  }
	  return outputtext;
  }
  
  //read rowwise right-left top-bottom
  if (flag == 4){
	  for(i=0;i<maxrow;i++){
	  	rowtext="";
	  	for(j=maxcol-1;j>=0;j--){
			outputchar = text.charAt(i*n+j);
			rowtext = rowtext+outputchar;
		}
		if(dir == -1 && type==1){
			rowtext = reverse(rowtext);
		}
		dir=dir*(-1);
		outputtext = outputtext+rowtext;
	  }
	  return outputtext;
  }
  
  //read rowwise right-left bottom-up
  if (flag == 5){
	  for(i=maxrow-1;i>=0;i--){
	  	rowtext="";
	  	for(j=maxcol-1;j>=0;j--){
			outputchar = text.charAt(i*n+j);
			rowtext = rowtext+outputchar;
		}
		if(dir == -1 && type==1){
			rowtext = reverse(rowtext);
		}
		dir=dir*(-1);
		outputtext = outputtext+rowtext;
	  }
	  return outputtext;
  }
  
  //read rowwise left-right top-bottom
  if(flag==6){
	  for(i=0;i<maxrow;i++){
		rowtext="";
	  	for(j=0;j<maxcol;j++){
			outputchar = text.charAt(i*n+j);
			rowtext = rowtext+outputchar;
		}
		if(dir == -1 && type==1){
			rowtext = reverse(rowtext);
		}
		dir=dir*(-1);
		outputtext = outputtext+rowtext;
	  }
	  return outputtext;
  }
  //read rowwise left-right bottom-top
  if(flag==7){
	  for(i=maxrow-1;i>=0;i--){
	  	rowtext="";
	  	for(j=0;j<maxcol;j++){
			outputchar = text.charAt(i*n+j);
			rowtext = rowtext+outputchar;
		}
		if(dir == -1 && type==1){
			rowtext = reverse(rowtext);
		}
		dir=dir*(-1);
		outputtext = outputtext+rowtext;
	  }
	  return outputtext;
  }
}

/**
 * Converts the input text into their Ascii values
 * @param {string} text - text to be encrypted/decrypted.
 * @param {integer} flag - 0: number to letter 1: letter to number 2: Ascii to characters 3: char to Ascii
 *                         4: hex to char 5: char to hex 6: b64 to char 7:char to b64
 * @return {string} - returns the converted text.
 * @todo - The ASCII and Hex conversions assume that it will be all doublets. I can't think of a better alternative.
 * @author - KJ <kulendra@gmail.com>
 */
function numText(text,flag){
  var character="";
  var output="";
  var i=0;
  for(i=0;i<text.length;i++){
  	if(flag==0){
		// 0->a
		if(!isNaN(parseInt(text.charAt(i)))){
			output = output + String.fromCharCode(97+parseInt(text.charAt(i)));		
		}
		else{
			output = output + text.charAt(i);
		}
  		
  	}
  	else if(flag==1){
		// a->0
  		text = text.toLowerCase();
		if(isNaN(parseInt(text.charAt(i)))){
			output = output + (parseInt(text.charCodeAt(i)) - 97);	
		}
		else{
			output = output + text.charAt(i);
		}
  		
  	}
  	else if(flag==2){
		// ASC -> A
  		// Assumes that the characters will be in lower case range and a two character code.
  		output = output + String.fromCharCode(text.charAt(i)+text.charAt(i+1));
  		i++;
  	}
  	else if(flag==3){
		// A->ASC
  		output = output + text.charCodeAt(i);
  	}
  	else if(flag==4){
		// Hex->A
  		character = text.charAt(i)+text.charAt(i+1);
  		output = output + String.fromCharCode(parseInt(character,16));
  		i++;
  	}
  	else if(flag==5){
		// A->Hex
  		output = output + text.charCodeAt(i).toString(16);
  	}
  }
  if(flag==6){
  	// B64->A
  	output = atob(text);
  }
  else if(flag==7){
  	// A->B64
  	output = btoa(text);
  }

  return output;
}

/**
 * Converts the input text using caesar cipher using an alphabet [a-z] and [A-Z].
 * @param {string} text - text to be encrypted/decrypted.
 * @param {integer} a - shift for a.
 * @param {integer} b - shift for b.
 * @param {integer} flag - 0: for encrypt 1: for decrypt
 * @return {string} - returns caesar encrypted/decrypted text.
 */
function affine(text, a, b, flag){
	var output_text = null;
	var c = null;
	for (i=0;i<text.length;i++){
		char = text.charCodeAt(i);
		if(char>=65 && char <= 90){
			asc2a = (char - 65);    // Convert so that A = 0
			c = ((asc2a - b + 25) % 25) *a % 26;
			c = c+ 65; // Add the ascii offset so that A = 65
		}
		if(char>=97 && char <= 122){
			asc2a = (char - 97);    // Convert so that A = 0
			c = ((asc2a - b + 25) % 25) *a % 26;
			c = c+ 97; // Add the ascii offset so that A = 65
		}
		output_text = output_text + String.fromCharCode(c);
	}
	return output_text;
}

/**
 * Converts the case of the text. Leaves non alphabetic characters as it is.
 * @param {string} text - text to be converted.
 * @return {string} - returns the converted text.
 * @author - KJ <kulendra@gmail.com>
 */
function caseSwitch(text){
	var output = "";
	for(i=0;i<text.length;i++){
		c = text.CharAt(i);
		if(c==c.toUpperCase()){
			output = output+c.toLowerCase();
		}
		else if(c==c.toLowerCase()){
			output = output+c.toUpperCase();
		}
		else{
			output = output + c;
		}
	}
}

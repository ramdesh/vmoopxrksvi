function changeCipher() {
  var cipherText = document.getElementById("ciphertext").value;
  document.getElementById("reverse").value = reverse(cipherText);
  document.getElementById("atbash").value = atbash(cipherText); 
  document.getElementById("odd").value = extractAlternatingChars(cipherText, 0); 
  document.getElementById("even").value = extractAlternatingChars(cipherText, 1); 
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
  if (parity==1 | parity==0) {
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
      outputchar = fromCharCode(155 - character);
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
      outputchar = fromCharCode(character);
    }
    outputtext = outputtext + outputchar;
  }
  return outputtext;
}

function columnar_transposition(text, n, flag) {
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
  var breakValue = 0;
  var m;

  if (flag = 0) {
    m = n;
  }
  if (flag = 1) {
    m = Math.ceil(text.length / n);
  }
  while (breakValue = 0) {
    outputchar = text.charAt(j);
    outputtext = outputtext + outputchar;

    j = j + m;
    if (j >= text.length) {
      i = i + 1;
      j = i;
    }
    if (j >= i + m) {
      breakValue = 1;
    }
  }
}

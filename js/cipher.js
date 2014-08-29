function reverse() {
  var text = document.getElementById("ciphertext").value;
  var outputArea = document.getElementById("outputtext");

  var reversedString = text.split("").reverse().join("");

  outputArea.value = reversedString;
}

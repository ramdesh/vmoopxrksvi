'use strict';
angular.module('decodetoolsApp').controller('MainCtrl', ['$base64', '$scope',
    function($base64, $scope) {
        function bin2text(input) {
            var inp = input.replace(/\s+/g, '');
            var out = '';
            if (inp.length % 8 !== 0) {
                return 'Not valid binary length.';
            }
            for (var i = 0; i < inp.length / 8; i++) {
                var sub = inp.substr(i * 8, 8);
                var num = 0;
                for (var j = 0; j < sub.length; j++) {
                    if (sub.charAt(j) === '0') {} else {
                        if (sub.charAt(j) === '1') {
                            num += Math.pow(2, 7 - j);
                        } else {
                            return 'Not valid binary. 0 and 1 only';
                        }
                    }
                }
                out += String.fromCharCode(num);
            }
            return out;
        }

        function oct2text(input) {
            var inp = input.replace(/\s+/g, '');
            var out = '';
            if (inp.length % 3 !== 0) {
                return 'Not valid octal length.';
            }
            for (var i = 0; i < inp.length / 3; i++) {
                var sub = inp.substr(i * 3, 3);
                var num = 0;
                num = parseInt(sub, 8).toString(10);
                out += String.fromCharCode(num);
            }
            return out;
        }

        function hex2text(input) {
            var inp = input.replace(/\s+/g, '');
            var out = '';
            if (inp.length % 2 !== 0) {
                return 'Not valid hex length.';
            }
            for (var i = 0; i < inp.length / 2; i++) {
                var sub = inp.substr(i * 2, 2);
                var num = 0;
                num = parseInt(sub, 16).toString(10);
                out += String.fromCharCode(num);
            }
            return out;
        }

        function ascii2text(input) {
            var inp = input.replace(/\s+/g, '');
            var out = '';
            if (inp.length % 3 !== 0) {
                return 'Not valid ascii length.';
            }
            for (var i = 0; i < inp.length / 3; i++) {
                var sub = inp.substr(i * 3, 3);
                var num = 0;
                num = parseInt(sub, 10).toString(10);
                out += String.fromCharCode(num);
            }
            return out;
        }

        function text2bin(input) {
            var PADDING = '00000000';
            var out = '';
            for (var i = 0; i < input.length; i++) {
                var compact = input[i].charCodeAt(0).toString(2);
                var padded = PADDING.substring(0, PADDING.length - compact.length) + compact;
                out += padded + ' ';
            }
            return out;
        }

        function reverseText(text) {
            return text.split('').reverse().join('');
        }

        function text2octal(input) {
            var PADDING = '000';
            var out = '';
            for (var i = 0; i < input.length; i++) {
                var compact = input[i].charCodeAt(0).toString(8);
                var padded = PADDING.substring(0, PADDING.length - compact.length) + compact;
                out += padded + ' ';
            }
            return out;
        }

        function text2ascii(input) {
            var PADDING = '000';
            var out = '';
            for (var i = 0; i < input.length; i++) {
                var compact = input[i].charCodeAt(0).toString(10);
                var padded = PADDING.substring(0, PADDING.length - compact.length) + compact;
                out += padded + ' ';
            }
            return out;
        }

        function text2hex(input) {
            var PADDING = '00';
            var out = '';
            for (var i = 0; i < input.length; i++) {
                var compact = input[i].charCodeAt(0).toString(16);
                var padded = PADDING.substring(0, PADDING.length - compact.length) + compact;
                out += padded + ' ';
            }
            return out;
        }

        function atbash(input) {
            var code = input;
            var key = 'ZYXWVUTSRQPONMLKJIHGFEDCBA'.toLowerCase();
            var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var key_rev = 'ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba';
            var res = '';
            var re = /[A-Za-z]/;
            for (var i = 0; i < code.length; i++) {
                if (re.test(code.charAt(i))) {
                    res += key_rev[key.indexOf(code[i])];
                } else {
                    res += code.charAt(i);
                }
            }
            return res;
        }
        $scope.changeBin = function() {
            $scope.passcode = bin2text($scope.binary);
            $scope.octal = text2octal($scope.passcode);
            $scope.hex = text2hex($scope.passcode);
            $scope.fulltext = $scope.passcode;
            $scope.ascii = text2ascii($scope.passcode);
            $scope.reverse = reverseText($scope.passcode);
            $scope.base64 = $base64.encode($scope.passcode);
            $scope.atbash = atbash($scope.passcode);
        };
        $scope.changeText = function() {
            $scope.passcode = $scope.fulltext;
            $scope.binary = text2bin($scope.passcode);
            $scope.octal = text2octal($scope.passcode);
            $scope.hex = text2hex($scope.passcode);
            $scope.ascii = text2ascii($scope.passcode);
            $scope.reverse = reverseText($scope.passcode);
            $scope.base64 = $base64.encode($scope.passcode);
            $scope.atbash = atbash($scope.passcode);
        };
        $scope.changeOct = function() {
            $scope.passcode = oct2text($scope.octal);
            $scope.binary = text2bin($scope.passcode);
            $scope.hex = text2hex($scope.passcode);
            $scope.fulltext = $scope.passcode;
            $scope.ascii = text2ascii($scope.passcode);
            $scope.reverse = reverseText($scope.passcode);
            $scope.base64 = $base64.encode($scope.passcode);
            $scope.atbash = atbash($scope.passcode);
        };
        $scope.changeHex = function() {
            $scope.passcode = hex2text($scope.hex);
            $scope.binary = text2bin($scope.passcode);
            $scope.octal = text2octal($scope.passcode);
            $scope.fulltext = $scope.passcode;
            $scope.ascii = text2ascii($scope.passcode);
            $scope.reverse = reverseText($scope.passcode);
            $scope.base64 = $base64.encode($scope.passcode);
            $scope.atbash = atbash($scope.passcode);
        };
        $scope.changeAscii = function() {
            $scope.passcode = ascii2text($scope.ascii);
            $scope.binary = text2bin($scope.passcode);
            $scope.octal = text2octal($scope.passcode);
            $scope.hex = text2hex($scope.passcode);
            $scope.fulltext = $scope.passcode;
            $scope.reverse = reverseText($scope.passcode);
            $scope.base64 = $base64.encode($scope.passcode);
            $scope.atbash = atbash($scope.passcode);
        };
        $scope.changeReverse = function() {
            $scope.passcode = reverseText($scope.reverse);
            $scope.binary = text2bin($scope.passcode);
            $scope.octal = text2octal($scope.passcode);
            $scope.hex = text2hex($scope.passcode);
            $scope.ascii = text2ascii($scope.passcode);
            $scope.fulltext = $scope.passcode;
            $scope.base64 = $base64.encode($scope.passcode);
            $scope.atbash = atbash($scope.passcode);
        };
        $scope.changeBase64 = function() {
            $scope.passcode = $base64.decode($scope.base64);
            $scope.binary = text2bin($scope.passcode);
            $scope.octal = text2octal($scope.passcode);
            $scope.hex = text2hex($scope.passcode);
            $scope.ascii = text2ascii($scope.passcode);
            $scope.fulltext = $scope.passcode;
            $scope.reverse = reverseText($scope.passcode);
            $scope.atbash = atbash($scope.passcode);
        };
        $scope.changeAtbash = function() {
            $scope.passcode = atbash($scope.atbash);
            $scope.binary = text2bin($scope.passcode);
            $scope.octal = text2octal($scope.passcode);
            $scope.hex = text2hex($scope.passcode);
            $scope.ascii = text2ascii($scope.passcode);
            $scope.fulltext = $scope.passcode;
            $scope.reverse = reverseText($scope.passcode);
            $scope.base64 = $base64.encode($scope.passcode);
        };
        $scope.rotnEncode = function(text, inc) {
            var res = '';
            var idx;
            var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            inc = inc * 1;
            for (var i = 0; i < text.length; i++) {
                var letter = text.charAt(i);
                if ((idx = alphabet.indexOf(letter)) >= 0) {
                    idx = (idx + inc) % alphabet.length;
                    letter = alphabet.charAt(idx);
                } else if ((idx = alphabet.indexOf(letter.toUpperCase())) >= 0) {
                    idx = (idx + inc) % alphabet.length;
                    letter = alphabet.charAt(idx).toLowerCase();
                }
                res += letter;
            }
            return res;
        };

        function vigenereEncrypt() {
            var text = $scope.vigenere.toLowerCase().replace(/[^a-z]/g, '');
            var k = $scope.vigenereKey.toLowerCase().replace(/[^a-z]/g, '');
            if (text.length < 1) {
                return ''
            }
            if (k.length <= 1) {
                return ''
            }
            var res = '';
            for (var i = 0; i < text.length; i++) {
                res += String.fromCharCode((((text.charCodeAt(i) - 97) + (k.charCodeAt(i % k.length) - 97) + 26) % 26) + 97);
            }
            return res;
        }

        function vigenereDecrypt() {
            var res = $scope.vigenere.toLowerCase().replace(/[^a-z]/g, '');
            var k = $scope.vigenereKey.toLowerCase().replace(/[^a-z]/g, '');
            if (res.length < 1) {
                return ''
            }
            if (k.length <= 1) {
                return ''
            }
            var text = '';
            for (var i = 0; i < res.length; i++) {
                text += String.fromCharCode((((res.charCodeAt(i) - 97) - (k.charCodeAt(i % k.length) - 97) + 26) % 26) + 97);
            }
            return text;
        }
        $scope.changeVigS = function() {
            if ($scope.vigenereDe) {
                $scope.vigenereres = vigenereDecrypt();
            } else {
                $scope.vigenereres = vigenereEncrypt();
            }
        };
        $scope.changeVigR = function() {};
        $scope.changeVigK = function() {
            if ($scope.vigenereDe) {
                $scope.vigenereres = vigenereDecrypt();
            } else {
                $scope.vigenereres = vigenereEncrypt();
            }
        };
        $scope.changeVigDe = function() {
            if ($scope.vigenereDe) {
                $scope.vigenereres = vigenereDecrypt();
            } else {
                $scope.vigenereres = vigenereEncrypt();
            }
        };
        $scope.passcode = 'Hello World';
        $scope.fulltext = $scope.passcode;
        $scope.binary = text2bin($scope.passcode);
        $scope.octal = text2octal($scope.passcode);
        $scope.hex = text2hex($scope.passcode);
        $scope.ascii = text2ascii($scope.passcode);
        $scope.reverse = reverseText($scope.passcode);
        $scope.base64 = $base64.encode($scope.passcode);
        $scope.atbash = atbash($scope.passcode);
        $scope.rotn = $scope.passcode;
        $scope.vigenereDe = true;
        $scope.vigenere = 'alpvsuhypn';
        $scope.vigenereKey = 'thekey';
        $scope.vigenereres = vigenereDecrypt();
    }
]).controller('KeywordCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/scripts/json/keywords.json').then(function(res) {
            $scope.keywords = res.data.keywords;
        });
    }
]).controller('GlyphCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/scripts/json/glyphs.json').then(function(res) {
            $scope.glyphs = res.data.glyphs;
        });
    }
]).controller('ModsCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/scripts/json/mods.json').then(function(res) {
            $scope.mods = res.data.mods;
        });
        $scope.portal.attributes = {
            "mitigation": 0,
            "force": 1,
            "linkdistance": 1,
            "numberofhack": 4,
            "time": 300,
            "damage": 1
        };
        $scope.portal.mod1 = {};
        $scope.portal.mod2 = {};
        $scope.portal.mod3 = {};
        $scope.portal.mod4 = {};
    }
]).filter('regex', function() {
    return function(input, regex) {
        var inp = "";
        inp = input;
        var patt = new RegExp(regex);
        var out = [];
        for (var i = 0; i < inp.length; i++) {
            if (patt.test(inp[i]))
                out.push(inp[i]);
        }
        return out;
    };
});
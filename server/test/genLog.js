/// <reference path="../../public/NwLib/NwSS.min.js" />
/// <reference path="../../public/NwLib/NwLib.js" />

//var NwSS = require('../../public/NwLib/NwSS.min.js');
var AES = require("crypto-js/aes");

var fs = require("fs");

var key = 'var r=b[n>>>2]>>>24-8*(n%4)&255;';

fs.readFile("../../public//word/test/log/debug26.log", "utf-8", function (err, data) {
    console.log('data',data.length);

    var encrypted = AES.encrypt(data, key);
    var resultStr = encrypted.toString();
    console.log('resultStr',resultStr.length);    
    //var decrypted = NwSS.SS.dct(encrypted.toString(), key)
    ;
    fs.writeFile("../../public//word/test/log/debug62.log", resultStr, function (err) {
        if (err) {
            return console.log('error writeFile');
        }

        console.log("The file was saved!");
    });

});
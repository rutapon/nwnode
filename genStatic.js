/// <reference path="../../public/index.js" />

var minifyAll = require("node-minify-all");
//var ncp = require('ncp').ncp;
//var fs = require('fs.extra');
var fs = require('fs-extra');


//var source = "./NewFolder1";
var source = "./public";
var sourceOverwrite = "./public_staic_version";
var destination = '../dist/nwdict';

var exclude = "../dist/nwdict/lib"

fs.copy(source, destination, function (err) {
    fs.copy(sourceOverwrite, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        //console.log('ncp done! start minifyAll');
        exclude = exclude.replace(/\//g, '\\');
        console.log('start minifyAll *exclude', exclude);
        minifyAll(destination, exclude);
    });
});


/// <reference path="../../public/index.js" />

var minifyAll = require("node-minify-all");
//var ncp = require('ncp').ncp;
//var fs = require('fs.extra');
var fs = require('fs-extra');
var path = require("path");
var $ = require('cheerio');

var async = require("async");

var MD5 = require("crypto-js/md5");

//var source = "./NewFolder1";
var source = "public";

var destination = 'public_minify';

var exclude = 'public_minify' + "/lib"



//var walker = fs.walk(destination);
//// file, files, directory, directories 
//walker.on("file", function (root, stat, next) {
//    var filepath = path.join(root, stat.name)


//    console.log(filepath);
//});
var md5 = function (value) {
    return MD5(value).toString();
}

var addMd5ToHtml = function (destination, fileIndex, cb) {
    fs.readFile(destination + '/' + fileIndex, "utf-8", function (err, data) {
        //console.log('data', md5(data));

        var srcTarget = [];
        var newUrlMap = {};
        var $html = $(data);

        var $script = $html.find('script');
        for (var id in $script) {

            var src = $script.eq(id).attr('src');
            if (src && src.indexOf('http') != 0) {
                //console.log(src);
                srcTarget.push(src);
            }
        }

        var $link = $html.find('link');
        for (var id in $link) {

            var src = $link.eq(id).attr('href');
            if (src && src.indexOf('http') != 0) {
                //console.log(src);
                srcTarget.push(src);
            }
        }


        // assuming openFiles is an array of file names
        async.each(srcTarget, function (file, callback) {

            fs.readFile(destination + '/' + file, "utf-8", function (err, fileData) {
                var newUrl = file + '?' + md5(fileData);
                newUrlMap[file] = newUrl;
                callback();
            });


        }, function (err) {
            // if any of the file processing produced an error, err would equal that error
            if (err) {
                // One of the iterations produced an error.
                // All processing will now stop.
                console.log('A file failed to process');
            } else {
                console.log('All files have been processed successfully');

                for (var i in newUrlMap) {
                    data = data.replace(i, newUrlMap[i]);
                }

                fs.writeFile(destination + '/' + fileIndex, data, function (err) {
                    if (err) {
                        return console.log('error writeFile');
                    }

                    console.log(destination + '/' + fileIndex, "file was saved!");
                    cb();
                });
            }
        });

        //$script.each(function (id) {
        //    var src = $script.eq(id).attr('src');
        //    if (src && src.indexOf('http') != 0) {
        //        //console.log(src);

        //        fs.readFile(destination + '/' + src, "utf-8", function (err, srcData) {
        //            var newUrl = src + '?' + md5(srcData);
        //            console.log(newUrl);
        //        });
        //    }

        //});
    });
}

fs.copy(source, destination, function (err) {
    addMd5ToHtml(destination, 'index.html', function () {

        //console.log('ncp done! start minifyAll');
        exclude = exclude.replace(/\//g, '\\');
        console.log('start minifyAll *exclude', exclude);
        minifyAll(destination, exclude);
    });
});


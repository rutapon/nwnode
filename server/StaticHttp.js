
var static = require('node-static');
//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('../web');

require('http').createServer(function (request, response) {
    //console.log('connect');
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 8026);


//require('http').createServer(function (request, response) {
//    //console.log('connect');
//    request.addListener('end', function () {
//        //
//        // Serve files!
//        //
//        file.serve(request, response);
//    }).resume();
//}).listen(8088);


/// <reference path="../public/NwLib/NwLib.js" />

/// <reference path="../lib/underscore/underscore.js" />
/// <reference path="NwServiceProcess.js" />
/// <reference path="service_method/NwStockServiceMethod.js" />
/// <reference path="NwConn/NwWsServer.js" />
/// <reference path="NwConn/NwDbConnection.js" />

(function (context, undefined) {
    //#region requre

    if (typeof module !== "undefined") {
        process.chdir(__dirname);


        NwLib = require('../public/NwLib/NwLib.js');
        _ = require('underscore');
        async = require("async");

        Class = NwLib.Nwjsface.Class;

        NwServiceProcess = require('./NwServiceProcess.js');
        NwStockServiceMethod = require('./service_method/NwStockServiceMethod.js');

        http = require('http');
        NwWsServer = require('./NwConn/NwWsServer.js');

        //require('./StaticHttp.js');

        request = require('request');

        var express = require('express');
        var compression = require('compression');
        var minify = require('express-minify');

        var nodestatic = require('node-static');
        file = new nodestatic.Server(__dirname + '/../public');

        var app = express();

        app.use(compression());

        app.use(function (req, res, next) {
            if (/\.min\.(css|js)$/.test(req.url)) {
                res._no_minify = true;
            }
            next();
        });
        app.use(minify());

        var router = express.Router();
        router.get('/', function (req, res) {
            file.serve(req, res);
        });
        app.use('/search', router);

        app.use(function (req, res) {
            //res.send('Hello World! by newww นิว');
            //res.sendfile('index.html');
            file.serve(req, res);
        });


        //require('mkdirp')(__dirname + '/../cache', function (err) {
        //    if (err) console.error(err)
        //    else app.use(minify({
        //        cache: __dirname + '/../cache'
        //    }));    
        //});

    } else {

    }
    async.waterfall([
    //function (callback) {
    //    console.log('01 connect logDb');
    //    var logDb = new NwDbConnection('mongodb://newww:123456@ds161495.mlab.com:61495/nwlog', function () {
    //        callback(null, logDb);
    //    });

    //},
    function ( callback) {
        console.log('02 connect dataDb');
        var NwStockServiceMethodObj = new NwStockServiceMethod(function () {
            callback(null, NwStockServiceMethodObj);
        });
    },
    function (NwStockServiceMethodObj, callback) {
        console.log('03 init networkConn');
        NwServiceProcess.addServiceMethod(NwStockServiceMethodObj);

        var passiveConn = function (appServer, port, ip) {

            var self = this;
            var wsServer = new NwWsServer(appServer);

            //var key;
            //if (port) {
            //    if (!ip) {
            //        ip = '0.0.0.0'
            //    }
            //    key = ip + ':' + port;
            //} else {
            //    key = Nw.getGUID();
            //}
            //this.wsServerList.addItem(key, wsServer);

            wsServer.setOnConnectEventListener(function (socket) {
                var ip = socket.handshake.address;
                var id = socket.id;

                //var ip2 = socket.request.connection.remoteAddress;
                //var ip3 = socket.conn.remoteAddress;
                //socket.request.client._peername.address

                console.log('setOnConnectEventListener ' + id, ip);

                //var logObj = { date: new Date(), id: id, ip: ip };

                //logDb.insert('connectLog', logObj);

                //if (self._onConnectEventListener) {
                //    self._onConnectEventListener(new NwSocket(socket, 'passive'));
                //}
            });

            wsServer.setOnDisconnectEventListener(function (socket) {
                console.log('setOnDisconnectEventListener');
                //var disconnectId = socket.id;
                //console.log('disconnect ' + socket.id);

                //self.wsClientList.removeItem(disconnectId);

                //if (self._onDisconnectEventListener) {
                //    self._onDisconnectEventListener(new NwSocket(socket, 'passive'));
                //}
            });

            wsServer.setOnMessageEventListener(function (socket, msgObj, fn) {
                //var ip = socket.handshake.address;
                //var id = socket.id;

                // console.log('setOnMessageEventListener ' + JSON.stringify(msgObj));
                //if (msgObj.msg == "findWord") {
                //    var logObj = { date: new Date(), id: id, ip: ip, data: msgObj.data.esearch };
                //    logDb.insert('findWordLog', logObj);
                //} else {
                //    var logObj = { date: new Date(), id: id, ip: ip, type: msgObj.msg, data: msgObj.data };
                //    logDb.insert('msgdLog', logObj);
                //}
                //if (self._onMessageEventListener) {
                //    try {
                //        self._onMessageEventListener(new NwSocket(socket, 'passive'), msgObj, fn);
                //    } catch (e) {
                //        //throw e;
                //        console.log('err wsServer.setOnMessageEventListener :' + e);
                //    }
                //}

                NwServiceProcess.cammandProcess(msgObj, function (result) {
                    //console.log(result);
                    fn(result);
                });
            });
        }

        var listenCommand = function (commandPort) {
            this.commandPort = commandPort;

            var appServer = http.createServer(app);
            passiveConn(appServer);

            //appServer.listen(commandPort, '0.0.0.0');
            appServer.listen(commandPort);

        }

        listenCommand(process.env.PORT || 8088);
        callback(null);
    }
    ], function (err, result) {
        console.log('complete');
    });



    //app.use(express.static(__dirname + '/../web'))


})(this);


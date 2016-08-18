/// <reference path="../../lib/socket.io-1.0.6.js" />
/// <reference path="../../Lib/step/step.js" />
/// <reference path="../lib/async/async.js" />
/// <reference path="../../NwLib/NwLib.js" />
/// <reference path="../NwConn/NwMLabApiConn.js" />


/// <reference path="../NwConn/NwConn.js" />



(function (context, undefined) {
    //#region requre

    if (typeof module !== "undefined") {

        NwLib = require('../NwLib/NwLib.js');
        Class = NwLib.Nwjsface.Class;

        //NwDataMsgObj = require('../NwUtil/NwDataMsgObj.js');

        ////http = require('http');

        //NwConn = require('../NwConn/NwConn.js');

        //_ = require('../Lib/underscore/underscore.js');

    } else {

    }

    //#endregion
    var NwMLabServiceConn = Class(function () {

        return {
            //$singleton: true,
            wsClient: {},

            constructor: function (wsClient) {
                this.wsClient = wsClient;
            },

            count: function (cb) {
                mlabApiConn.count('nwdict', 'data', {}, cb);
            },

            findWord: function (esearch, cb) {
                mlabApiConn.findOne('nwdict', 'data', { esearch: esearch }, function (data) {
                    var val = NwSS.SS.dct(data.dt, window.c).toString(NwSS.enc.Utf8);
                    var dataObj = JSON.parse(val);
                    dataObj.esearch = esearch;
                    cb(dataObj);

                });
            }

        };
    });

    if (typeof module !== "undefined" && module.exports) {                       // NodeJS/CommonJS
        module.exports = NwMLabServiceConn;
    } else {

        context.NwMLabServiceConn = NwMLabServiceConn;
    }

})(this);

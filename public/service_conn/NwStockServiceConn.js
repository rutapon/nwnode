/// <reference path="../../lib/socket.io-1.0.6.js" />
/// <reference path="../../Lib/step/step.js" />
/// <reference path="../lib/async/async.js" />
/// <reference path="../../NwLib/NwLib.js" />


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
    var NwStockServiceConn = Class(function () {

        return {
            //$singleton: true,
            wsClient: {},

            constructor: function (wsClient) {
                this.wsClient = wsClient;
            },

            count: function (cb) {
                this.wsClient.callService('count', {}, cb);
            },

            searchStartWith: function (esearch, cb) {
                this.wsClient.callService('searchStartWith', { esearch: esearch }, cb);
            },

            searchStartWith_limit: function (esearch, limit, cb) {
                this.wsClient.callService('searchStartWith_limit', { esearch: esearch, limit: limit }, cb);
            },
            searchContain: function (insertObj, cb) {

                this.wsClient.callService(insertObj, cb);
            },
            searchContain_limit: function (updateObj, cb) {

                this.wsClient.callService('searchContain_limit', updateObj, cb);
            },
            searchWhere: function (cb) {
                this.wsClient.callService('searchWhere', {}, cb);
            },
            findWord: function (esearch, cb) {
                this.wsClient.callService('findWord', { esearch: esearch }, cb);
            }

        };
    });

    if (typeof module !== "undefined" && module.exports) {                       // NodeJS/CommonJS
        module.exports = NwStockServiceConn;
    } else {

        context.NwStockServiceConn = NwStockServiceConn;
    }

})(this);

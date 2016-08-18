/// <reference path="../../../node_modules/underscore/underscore.js" />
/// <reference path="../../www/lib/NwBackboneIntellisense.js" />

/// <reference path="WordModel.js" />
/// <reference path="../lib/nedb/nedb.js" />
/// <reference path="../NwLogWords/logWords.js" />

(function (context, undefined) {
    //'use strict';

    //#region requre
    if (typeof module !== "undefined") {

        //NwLib = require('../lib/NwLib.js');
        //Class = NwLib.Nwjsface.Class;

        _ = require('underscore');
        Backbone = require('backbone');
        async = require('async');
        WordModel = require('./WordModel.js');


    } else {

    }
    //#endregion

    var WordCollection = Backbone.Collection.extend({
        model: WordModel,
        serviceMethod: {},
        //debug_log: new Nedb(),
        //mapLog: {},
        //longing: true,
        logWordObj: new logWords(),
        initialize: function (cb) {

        },
        setServiceMethod: function (serviceMethod) {
            this.serviceMethod = serviceMethod;
        },

        count: function (cb) {
            this.serviceMethod.count(function (num) {
                cb(num);
            });
        },
        // //'/word/test/log/debug26.log'
        initDB: function (cb) {
            var self = this;
            var data = localStorage.getItem('debugLog');

            if (!data) {
                $.ajax({ url: 'https://raw.githubusercontent.com/webstatic/static/master/log/debug62.log', type: "GET", }).done(function (data) {
                    localStorage.setItem('debugLog', data);
                    //self.longing = false;
                    self.logWordObj.insertWordsRow(data, function (data) {
                        if (cb) cb();
                    });
                });
            } else {
                self.logWordObj.insertWordsRow(data, function () {
                    if (cb) cb();
                });
            }

        },
        searchStartWith: function (text, cb) {
            var query = { esearch: new RegExp('^' + text) };

        },
        searchStartWith_limit: function (text, limit, cb) {
            //if (text.length < 2) {
            //this.serviceMethod.searchStartWith_limit(text, limit, function (docs) { cb(docs, text); });
            //} else {
            this.ssw(text, limit, cb);
            //}
        },
        searchContain: function (text, cb) {
            var query = { esearch: new RegExp(text) };

        },
        searchContain_limit: function (text, limit, cb) {
            var query = { esearch: new RegExp(text) };

        },
        searchWhere: function (whereFn, cb) {
            var query = { $where: whereFn };

        },
        findWord: function (text, cb) {
            this.serviceMethod.findWord(text, cb);
        },
        ssw: function (text, limit, cb) {
            this.logWordObj.findWord(text, function (data) {

                cb(data.docs, data.esearch);
            });

        }

    });

    if (typeof module !== "undefined" && module.exports) {                       // NodeJS/CommonJS
        module.exports = WordCollection;
    } else {

        //var app = context.app = context.app || { models: {}, collections: {}, views: {} };
        //app.collections.EspCollection = EspCollection;

        context.WordCollection = WordCollection;
    }

})(this);
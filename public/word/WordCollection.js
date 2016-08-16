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

        initDB: function (cb) {
            var self = this;
            $.ajax({ url: '/word/test/log/debug26.log', type: "GET", }).done(function (data) {

                console.log('loging...');
                if (console && console.log) {
                    var dataSp = data.split('\n');


                    //self.mapLog = {};

                    //for (var i in dataSp) {

                    //    var key = dataSp[i].slice(0, 2).toLowerCase();

                    //    if (!self.mapLog[key]) {
                    //        self.mapLog[key] = new Nedb();
                    //    }
                    //    self.mapLog[key].insert({ esearch: dataSp[i] });
                    //}
                    //self.longing = false;

                    self.logWordObj.insertWords(dataSp, function (num) {
                        console.log('insertWords', num);
                        cb();

                    });
                }
            })

            // if (cb) cb();
        },
        searchStartWith: function (text, cb) {
            var query = { esearch: new RegExp('^' + text) };

        },
        searchStartWith_limit: function (text, limit, cb) {
            //if (text.length < 2) {
            //    this.serviceMethod.searchStartWith_limit(text, limit, cb);
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
            this.logWordObj.findWord(text, function (docs) {
                cb(docs);
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
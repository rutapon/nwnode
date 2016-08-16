/// <reference path="../../../node_modules/underscore/underscore.js" />
/// <reference path="../../www/lib/NwBackboneIntellisense.js" />

/// <reference path="WordModel.js" />


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

        initialize: function (cb) {

        },
        setServiceMethod: function (serviceMethod) {
            this.serviceMethod = serviceMethod;
        },

        count: function (cb) {
            this.stockMethod.count(function (num) {
                cb(num);
            });
        },

        initDB: function (cb) {
            if (cb) cb();
        },
        searchStartWith: function (text, cb) {
            var query = { esearch: new RegExp('^' + text) };

        },
        searchStartWith_limit: function (text, limit, cb) {
            this.stockMethod.searchStartWith_limit(text, limit, function (docs) {
                cb(docs);
            });

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
            this.stockMethod.findWord(text, cb);
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
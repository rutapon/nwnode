/// <reference path="../../../node_modules/underscore/underscore.js" />
/// <reference path="../../www/lib/NwBackboneIntellisense.js" />

/// <reference path="WordModel.js" />
/// <reference path="../lib/nedb/nedb.js" />

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
        debug_log: new Nedb(),

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

                if (console && console.log) {
                    var dataSp = data.split('\n');
                    dataSp = dataSp.map(function (v) {
                        return { esearch: v };
                    })

                    //self.debug_log = ;
                    self.debug_log.insert(dataSp, function (err) {
                        //  self.debug_log.ensureIndex({ fieldName: 'esearch' }, function (err) {
                        //self.debug_log.count({}, function (err, count) {
                        //    //alert(count);

                        //});
                        cb();
                        // });

                    });
                }
            })

            if (cb) cb();
        },
        searchStartWith: function (text, cb) {
            var query = { esearch: new RegExp('^' + text) };

        },
        searchStartWith_limit: function (text, limit, cb) {
            this.serviceMethod.searchStartWith_limit(text, limit, cb);
            //this.ssw(text, limit, cb);

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
           
            var self = this;
            var reg = new RegExp('^' + text, 'i');
            var query = { esearch: { $regex: reg } };

            self.debug_log.find(query, { esearch: 1, _id: 0 })
             .sort({ esearch: 1 })
           .limit(limit).exec(function (err, docs) {
               cb(docs);
               if (docs.length != 0) {
                   var fw = _.findWhere(docs, { esearch: text });
                   if (!fw) {
                       self.debug_log.findOne({ esearch: text }, function (err, doc) {

                           if (doc) {
                               docs.unshift(doc);
                           }

                           docs = _.sortBy(docs, function (doc) {
                               //var prefx = doc.esearch == text ? 0 : 1;
                               return  doc.esearch.toLowerCase();
                           });
                           console.log('ssw', text);
                           cb(docs);
                       });
                   }
                   else {

                       for (var i in docs) {
                           if (docs[i].esearch == text) {
                               docs[i] = false;
                               break;
                           }
                       }

                       docs = _.compact(docs);
                       docs.unshift(fw);
                       //docs = _.chain(docs).uniq(function (doc) {
                       //    return doc._id;
                       //}).sortBy(function (doc) {
                       //    return doc.esearch.toLowerCase()
                       //}).value();

                       //docs = _.sortBy(docs, function (doc) {
                       //    var prefx = doc.esearch == text ? 0 : 1;
                       //    return prefx + doc.esearch.toLowerCase();
                       //});
                       console.log('ssw', text);
                       cb(docs);
                   }
               } else {
                   console.log('ssw', text);
                   cb(docs);
               }

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
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
        mapLog: {},
        longing: true,
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

                    //dataSp = _.sortBy(dataSp, function (doc) {
                    //    //var prefx = doc.esearch == text ? 0 : 1;
                    //    return doc.esearch.toLowerCase();
                    //});
                    self.mapLog = {};
                    //self.debug_log = dataSp;
                    //console.log();

                    for (var i in dataSp) {

                        var key = dataSp[i].slice(0, 2).toLowerCase();
                        //if (key.length < 4) {
                        ////    //key = -1;// 'data@mini';
                        //    if (!self.mapLog['data@mini']) {
                        //        self.mapLog['data@mini'] = new Nedb();
                        //    }
                        //    self.mapLog['data@mini'].insert({ esearch: dataSp[i] });
                        //}

                        if (!self.mapLog[key]) {
                            self.mapLog[key] = new Nedb();
                        }
                        self.mapLog[key].insert({ esearch: dataSp[i] });
                    }
                    self.longing = false;
                    //dataSp = dataSp.map(function (v) {
                    //    return { esearch: v };
                    //})
                    console.log(_.keys(self.mapLog).length);

                    cb();

                    //self.debug_log.insert(dataSp, function (err) {
                    //    //  self.debug_log.ensureIndex({ fieldName: 'esearch' }, function (err) {
                    //    //self.debug_log.count({}, function (err, count) {
                    //    //    //alert(count);

                    //    //});
                    //    cb();
                    //    // });

                    //});
                }
            })

            // if (cb) cb();
        },
        searchStartWith: function (text, cb) {
            var query = { esearch: new RegExp('^' + text) };

        },
        searchStartWith_limit: function (text, limit, cb) {
            if (text.length < 2) {
                this.serviceMethod.searchStartWith_limit(text, limit, cb);
            } else {
                this.ssw0(text, limit, cb);
            }
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
        ssw0: function (text, limit, cb) {

            var self = this;

            var key = text.slice(0, 2).toLowerCase();

            //if (key.length < 3) {
            //    key = 'data@mini';
            //}
            self.debug_log = self.mapLog[key];

            if (!self.debug_log) {
                cb([]);
                return;
            }


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
                               return doc.esearch.toLowerCase();
                           });

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

                       cb(docs);
                   }
               } else {

                   cb(docs);
               }

           });
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
                               return doc.esearch.toLowerCase();
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
        },
        ssw2: function (text, limit, cb) {

            var self = this;
            var docs = [];
            var key = text.slice(0, 3);

            var keyid = self.mapLog[key];

            if (!keyid) {
                cb(docs);
                return;
            }
            var reg = new RegExp('^' + text, 'i');

            for (var i = keyid; docs.length < 15 && i < keyid + 1000; i++) {
                console.log(i, self.debug_log[i]);
                if (reg.test(self.debug_log[i])) {
                    docs.push({ esearch: self.debug_log[i] });

                } else {
                    var currentKey = self.debug_log[i].slice(0, 3);
                    var currentKeyid = self.mapLog[currentKey];
                    if (currentKey != key) {
                        break;
                    }
                }
            }

            if (docs.length != 0) {
                var fw = _.findWhere(docs, { esearch: text });
                if (!fw) {
                    var doc = null;
                    for (var i = keyid; i < keyid + 100 ; i++) {
                        if (self.debug_log[i] == text) {
                            doc = { esearch: text };
                            break;
                        }
                    }

                    if (doc) {
                        docs.unshift(doc);
                    }

                    docs = _.sortBy(docs, function (doc) {
                        //var prefx = doc.esearch == text ? 0 : 1;
                        return doc.esearch.toLowerCase();
                    });
                    console.log('ssw', text);
                    cb(docs);

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
            }
            else {
                console.log('ssw', text);
                cb(docs);
            }

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
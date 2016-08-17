/// <reference path="../../public/NwLib/NwLib.js" />
/// <reference path="../../public/lib/underscore/underscore.js" />
/// <reference path="../NwConn/NwDbConnection.js" />
/// <reference path="../NwServiceProcess.js" />


(function (context, undefined) {
    //#region requre

    if (typeof module !== "undefined") {
        NwLib = require('../../public/NwLib/NwLib.js');
        _ = require('underscore');
        Class = NwLib.Nwjsface.Class;
        NwDbConnection = require('../NwConn/NwDbConnection.js');
        NwServiceProcess = require('../NwServiceProcess.js');

    } else {

    }
    //#endregion

    //var databases = {};

    //var getDb = function (stockName) {
    //    return databases[stockName];
    //}

    //var NwDatabaseServiceMethod = {
    //    count: function (data, callback) {

    //        if (callback) {        
    //            callback(426);
    //        }
    //    },

    //getAllDatabaseName: function (data, cb) {
    //    if (cb) { cb(_.keys(databases)) };
    //},

    //findeStartWith: function (data, cb) {

    //    var dbName = 'main';//data.stockName;
    //    var findWord = data.findWord;
    //    var limit = data.limit ? data.limit : 20;
    //    //var stock = new NwDbConnection(__dirname + '/../Database/stock/stock1.s3db'); //getDb(stockName);
    //    var stock = getDb(stockName);
    //    stock.findStartWith(productTableName, { code: findWord, name: findWord }, limit, function (result) {
    //        if (cb) { cb(result) }
    //    });

    //},

    //findeSupplyLog: function (data, cb) {

    //    var dbName = 'main';//data.stockName;
    //    //delete data.stockName;
    //    console.log('findeSupplyLog', data);
    //    //var product_id = data.product_id;{ product_id: product_id }
    //    var db = getDb(stockName);

    //    if (data.limit) {
    //        db.findLimit(supplyLogTableName, data, data.limit, function (result) {
    //            if (cb) { cb(result) }
    //        });
    //    } else {
    //        db.find(supplyLogTableName, data, function (result) {
    //            if (cb) { cb(result) }
    //        });
    //    }
    //}

    //};

    var NwDatabaseServiceMethodClass = Class({

        constructor: function (dbPath) {
            this.dbPath = dbPath;
            this.colName = 'nwDic';

            this.dbConn = new NwDbConnection('mongodb://newww:123456@ds161505.mlab.com:61505/nwdict', function () {

            });

        },

        count: function (data, cb) {
            this.dbConn.count(this.colName, {}, function (result) {
                cb(result);
            });
        },
        searchStartWith: function (data, cb) {
            var limit = 25;
            var esearch = data.esearch;
            this.dbConn.findStartWith(this.colName, { esearch: esearch }, limit, function (docs) {
                var searchWordArray = _.pluck(docs, 'esearch');
                if (cb) cb(searchWordArray);
            });
        },
        searchStartWith_limit: function (data, cb) {
            var self = this;
            var limit = data.limit;
            var esearch = data.esearch;

            this.dbConn.searchStartWith(this.colName, { esearch: esearch }, limit, function (docs) {
              
                if (docs.length > 0 && !_.findWhere(docs, { esearch: esearch })) {

                    self.dbConn.findOne(self.colName, { esearch: esearch }, function (doc) {
                     
                        if (doc) {
                            docs.push(doc);
                        }

                        docs = _.sortBy(docs, function (doc) {
                        
                            var prefx = doc.esearch == esearch ? 0 : 1;
                            return prefx + doc.esearch.toLowerCase();
                        });

                        cb(docs);
                    });
                }
                else {

                    //docs = _.chain(docs).uniq(function (doc) {
                    //    return doc._id;
                    //}).sortBy(function (doc) {
                    //    return doc.esearch.toLowerCase()
                    //}).value();

                    docs = _.sortBy(docs, function (doc) {
                        var prefx = doc.esearch == esearch ? 0 : 1;
                        return prefx + doc.esearch.toLowerCase();
                    });

                    cb(docs);
                }

                //var docs = _.pluck(docs, 'esearch');
                //docs = _.sortBy(docs, function (obj) {

                //    return obj.esearch.toLowerCase();
                //});
                
            });
        },
        searchContain: function (data, cb) {

        },
        searchContain_limit: function (data, cb) {

        },
        searchWhere: function (data, cb) {

        },
        findWord: function (data, cb) {
            console.log('findWord', data);
            var esearch = data.esearch;
            this.dbConn.findOne(this.colName, { esearch: esearch }, function (doc) {
                //console.log('findWord', data,doc);
                cb(doc);
            });
        }
    });


    if (typeof module !== "undefined" && module.exports) {                       // NodeJS/CommonJS
        module.exports = new NwDatabaseServiceMethodClass();
    } else {

        context.NwDatabaseServiceMethod = new NwDatabaseServiceMethodClass();
    }

})(this);
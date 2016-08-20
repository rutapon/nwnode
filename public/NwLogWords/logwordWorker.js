/// <reference path="../lib/underscore/underscore.js" />
/// <reference path="../lib/lokijs/lokijs.js" />
/// <reference path="../NwLib/NwSS.min.js" />


//importScripts('/lib/underscore/underscore-min.js');
//importScripts('/lib/lokijs/lokijs.min.js');

importScripts('https://cdnjs.cloudflare.com/ajax/libs/lokijs/1.4.1/lokijs.min.js');
//importScripts('https://cdnjs.cloudflare.com/ajax/libs/lokijs/1.4.1/loki-indexed-adapter.min.js');

importScripts('https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js');
importScripts('../NwLib/NwSS.min.js');

//var idbAdapter = Object;
//var dbstring;
//idbAdapter.prototype.loadDatabase = function (dbname, callback) { callback(dbstring); }
//idbAdapter.prototype.saveDatabase = function (dbname, dbstring, callback) { callback(dbstring, dbname); }
//var db = new loki('test', { env: 'BROWSER', adapter: new idbAdapter() });

var db = new loki('test', { env: 'BROWSER' });

var collObj = {};

var getWordsDb = function (collName) {
    if (!_.has(collObj, collName)) {

        collObj[collName] = db.addCollection(collName);
        //var words = db.addCollection('datas');
        //var words = db.addCollection('datas', {
        //    indices: ['esearch']
        //});
        collObj[collName].ensureIndex('esearch', true);

    }

    return collObj[collName];
}

self.addEventListener('message', function (e) {

    //var db = new Nedb();

    if (e.data.msg == 'insertWordsRow') {

        //var encrypted = NwSS.SS.ect(data, key);
        var code = e.data.c;
        var data = NwSS.SS.dct(e.data.data, code).toString(NwSS.enc.Utf8);
        //console.log(decrypted.toString(NwSS.enc.Utf8));
        var dataSp = data.split('\r\n');

        var wordsGrop = {};

        //var obj = _.map(dataSp, function (word) {
        //    return { esearch: word };
        //});

        _.each(dataSp, function (word) {
            if (word) {
                var fword = word[0].toLowerCase();
                if (!_.has(wordsGrop, fword)) {
                    //console.log(fword);
                    wordsGrop[fword] = [];
                }

                wordsGrop[fword].push({ esearch: word });
            }
        });

        _.each(wordsGrop, function (obj, fword) {
            //console.log(obj.length);
            getWordsDb(fword).insert(obj);
        });
      
        //e.data.data = {};
        self.postMessage(e.data);
        //db.saveDatabase(function (serializedDb) {
        //    var serializedDbencrypted = NwSS.SS.ect(serializedDb, code);
        //    e.data.data.obj = serializedDbencrypted.toString();
        //    //e.data.data.num = words.count(null);

        //    self.postMessage(e.data);
        //});

    }
        //else if (e.data.msg == 'insertDb') {
        //    //var serializedDbencrypted = e.data.data;
        //    dbstring = NwSS.SS.dct(e.data.data, code).toString(NwSS.enc.Utf8);
        //    db.loadDatabase();
        //    words = db.getCollection('datas');
        //    self.postMessage();
        //}
        //else if (e.data.msg == 'insertWords') {

        //    var data = _.map(e.data.data, function (word) {
        //        return { esearch: word };
        //    });

        //    words.insert(data);
        //    e.data.num = words.count(null);
        //    //e.data.obj = obj;
        //    self.postMessage(e.data);

        //}
    else if (e.data.msg == 'findWord') {
        var text = e.data.data;
        var fword = text[0].toLowerCase();
        var words = getWordsDb(fword);

        var reg = new RegExp('^' + text, 'i');
        var query = { esearch: { $regex: reg } };

        var docs = words.chain()
              .find(query)
              .simplesort("esearch")
              .limit(15)
              .data()

        if (docs.length != 0) {
            var foundWord = _.findWhere(docs, { esearch: text });
            if (!foundWord) {
                var doc = words.findOne({ esearch: text });
                if (doc) {
                    docs.unshift(doc);
                }
            } else {
                for (var i in docs) {
                    if (docs[i].esearch == text) {
                        docs[i] = false;
                        break;
                    }
                }
                docs = _.compact(docs);
                docs.unshift(foundWord);
            }

            //docs = _.sortBy(docs, function (doc) {
            //    //var prefx = doc.esearch == text ? 0 : 1;
            //    return doc.esearch.toLocaleLowerCase();
            //});
        }
        e.data.data = { esearch: text, docs: docs };
        self.postMessage(e.data);
    }



}, false);
/// <reference path="../lib/underscore/underscore.js" />
/// <reference path="../lib/lokijs/lokijs.js" />


//importScripts('/lib/underscore/underscore-min.js');
//importScripts('/lib/lokijs/lokijs.min.js');

importScripts('https://cdnjs.cloudflare.com/ajax/libs/lokijs/1.4.1/lokijs.min.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js');

var db = new loki('test', { env: 'BROWSER' });
var words = db.addCollection('datas');


self.addEventListener('message', function (e) {

    //var db = new Nedb();

    if (e.data.msg == 'insertWords') {

        words.ensureIndex('esearch', true);

        var obj = _.map(e.data.data, function (word) {
            return { esearch: word };
        });
        words.insert(obj);

        e.data.data = words.count(null);

        self.postMessage(e.data);
        
    } else if (e.data.msg == 'findWord') {
        var text = e.data.data;
        var reg = new RegExp('^' + text, 'i');
        var query = { esearch: { $regex: reg } };

        var docs = words.chain()
              .find(query)
              .limit(15)
              .simplesort("esearch")
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
            //    return doc.esearch.toLowerCase();
            //});
        }

        e.data.data = docs;// JSON.stringify(obj);
        self.postMessage(e.data);
    }

   
   
}, false);
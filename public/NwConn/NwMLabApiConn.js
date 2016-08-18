/// <reference path="../lib/jquery/jquery-2.1.1.js" />

//var key = "keyAZOKApPuILmacU08AQquZkjwkkpcvb4a";
//var dbName = ['connectlog', 'findwordlog', 'searchlog'];

this.mlabApiConn = Object;

this.mlabApiConn.upsert = function (dbName, collName, data, q, cb) {
    var myAPIKey = this.k;
    q = q ? '&q=' + JSON.stringify(q) : '';
    // '&q={"_id":1234}';
    $.ajax({
        url: 'https://api.mlab.com/api/1/databases/' + dbName + '/collections/' + collName + '?apiKey=' + myAPIKey + q + '&u=true',
        data: JSON.stringify({ "$set": data }),
        type: "PUT",
        contentType: "application/json"
    }).done(function (data) {
        if (cb) cb(data);
    });
};
this.mlabApiConn.insert = function (dbName, collName, data, cb) {
    var myAPIKey = this.k;
    $.ajax({
        url: 'https://api.mlab.com/api/1/databases/' + dbName + '/collections/' + collName + '?apiKey=' + myAPIKey,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json"
    }).done(function (data) {
        if (cb) cb(data);
    });
}

this.mlabApiConn.findOne = function (dbName, collName, q, cb) {
    var myAPIKey = this.k;
    var queryStr = '&q=' + JSON.stringify(q);

    var getUrl = 'https://api.mlab.com/api/1/databases/' + dbName + '/collections/' + collName + '?apiKey=' + myAPIKey + '&fo=true' + queryStr;

    $.getJSON(getUrl, function (data) {
        cb(data);
    });

}
this.mlabApiConn.count = function (dbName, collName, q, cb) {
    var myAPIKey = this.k;
    var queryStr = '&q=' + JSON.stringify(q);
    var getUrl = 'https://api.mlab.com/api/1/databases/' + dbName + '/collections/' + collName + '?apiKey=' + myAPIKey + '&c=true' + queryStr;
    $.getJSON(getUrl, function (data) {
        cb(data);
    });
}
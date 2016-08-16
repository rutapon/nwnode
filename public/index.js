/// <reference path="lib/underscore/underscore.js" />
/// <reference path="lib/jquery/jquery-2.1.1.js" />
/// <reference path="lib/backbone/backbone.js" />
/// <reference path="lib/async/async.js" />

/// <reference path="lib/NwBackboneIntellisense.js" />

/// <reference path="../app/word/WordCollection.js" />

/// <reference path="word/WordEachView.js" />
/// <reference path="word/WordView.js" />


//if (window.require) {
//    require('nw.gui').Window.get().showDevTools();
//}

$(function () {

    //try {
    //    WordCollection = require('../app/word/WordCollection.js');
    //} catch (e) {

    //}

    var host = window.location.hostname;
    var port = window.location.port;
    var protocol = 'ws:';
    //var host = 'localhost';
    //var host = 'newww.dyndns.org';
    //alert(window.location.protocol + window.location.port);

    if (window.location.protocol == 'https:') {
        protocol = 'wss:';
        var wsClient = new NwWsClient(protocol + '//' + host + ":" + port, { secure: true });
    } else {
        var wsClient = new NwWsClient(protocol + '//' + host + ":" + port);
    }
    var serviceMethod = new NwStockServiceConn(wsClient);

    wsClient.setOnConnectEventListener(function (socket) {
        var id = wsClient.getId();
        console.log('onConnect ' + id);

    });

    wsClient.setOnDisconnectEventListener(function myfunction() {

    });

    var wordCollectionObj = new WordCollection();
    wordCollectionObj.setServiceMethod(serviceMethod);

    var wordViewObj = new app.views.WordView({ collection: wordCollectionObj });

    $("body").addClass('ui-disabled');

    $.mobile.loading('show', {
        text: "Database Loading...",
        textVisible: true,
        theme: "z",
        html: ""
    });

    wordCollectionObj.initDB(function () {
        $("body").removeClass('ui-disabled');
        $.mobile.loading('hide');
    });
    //wordCollectionObj.searchStartWith('new', function (docs) {
    //    $('body').append(JSON.stringify(docs));
    //}); 

    $("[data-role='navbar']").navbar();
    $("[data-role='header'], [data-role='footer']").toolbar();


});

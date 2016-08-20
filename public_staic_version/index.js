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
    //$('head').append('<link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />');
    var NwdictDiscirpton = {
        "esearch": "NwDict",
        "lMn": [{ "tentry": "พจนานุกรม อังกฤษ-ไทย", "ecat": "N", "esyn": "English-Thai Dictionary" },
            { "tentry": "จำนวนคำหลัก 99360 คำ", "ecat": "N" },
            { "tentry": "มีคำอ่านออกเสียงภาษาไทย", "ecat": "N" },
            { "tentry": "มีวิธีการออกเสียงคำ เป็น IPA (International Phonetic Alphabat)", "ecat": "N" },
            { "tentry": "เน้นที่การแสดงผลที่เรียบง่ายสบายตา", "ecat": "V" },
            { "tentry": "เน้นที่ความเร็วในการค้นหา", "ecat": "V" },
            { "tentry": "เน้นที่ความง่ายในการค้นหา", "ecat": "V" }],
        "hope": { "mn": [{ "tentry": "Special Characters <br> § = synonym<br>☯ = antonym<br> C = confer, compare" }] },
        "stm": {
            "mn": [{ "ecat": "vt,vi", "tentry": "กดปุ่มที่มุมซ้ายบนเพื่อค้นหา" },
                { "ecat": "vt,vi", "tentry": "กดแป้นพิมพ์เพื่อค้นหา" },
                  { "ecat": "vt,vi", "tentry": "drag mounse ที่หน้า page ไปด้านขวาเพื่อค้นหา" },
                  { "ecat": "vt,vi", "tentry": "เมื่อย่อหน้า page แคบลง word list จะซ่อนและโชว์โดยอัตโนมัติเมื่อค้นหา" },

                { "ecat": "*", "tentry": "ควรใช้ google chrome หรือ firefox ในการแสดงผล" }],
            //"esyn": "experiment, tax, try"
        },
        "proTh": "นิวดิค'",
        "pro": ["njuːdɪk"],

    };


    //try {
    //    WordCollection = require('../app/word/WordCollection.js');
    //} catch (e) {

    //}

    var host = window.location.hostname;
    var port = window.location.port;
    //var protocol = 'ws:';
    //var host = 'nwdict.herokuapp.com';
    //var port = '';

    //var host = 'newww.dyndns.org';
    //alert(window.location.protocol + window.location.port);

    $("body").addClass('ui-disabled');

    //if (window.location.protocol == 'https:') {
    //    protocol = 'wss:';
    //    var wsClient = new NwWsClient(protocol + '//' + host + ":" + port, { secure: true });
    //} else {
    //    var wsClient = new NwWsClient(protocol + '//' + host + ":" + port);
    //}

    var serviceMethod = new NwMLabServiceConn();

    var wordCollectionObj = new WordCollection();
    wordCollectionObj.setServiceMethod(serviceMethod);

    wordCollectionObj.add(NwdictDiscirpton);
    var wordViewObj = new app.views.WordView({ collection: wordCollectionObj });


    window.udl = {};
    mlabApiConn.k = "32KYjlie99BH6Euf8x98GQaOVbXAj-Zw";
    window.c = 'var r=b';


    $.mobile.loading('show', {
        text: "Database Loading...",
        textVisible: true,
        theme: "z",
        html: ""
    });

    async.parallel([
        function (callback) {
            window.c += '[n>>>2]>>>24-8*(n%4)&255;';

            wordCollectionObj.initDB(function () {
                callback(null);
            });

        }
    ],
    function (err, results) {
        $("body").removeClass('ui-disabled');
        $.mobile.loading('hide');
        $("#search-panel").panel("open");
    });


    //wordCollectionObj.searchStartWith('new', function (docs) {
    //    $('body').append(JSON.stringify(docs));
    //}); 


    $("[data-role='navbar']").navbar();
    $("[data-role='header'], [data-role='footer']").toolbar();

    $.getJSON('//api.ipify.org/?format=jsonp&callback=?', function (data) {

        //window.udl.data = data;
        window.udl.ip = data.ip;
        window.udl.type = 'ipify';

        mlabApiConn.insert('connectlog', 'data', { ip: window.udl.ip, host: host, data: window.udl.data, type: window.udl.type, date: new Date() });
    });
});

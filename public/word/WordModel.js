/// <reference path="../../../node_modules/underscore/underscore.js" />
/// <reference path="../../NwLib/NwBackboneIntellisense.js" />

(function (context, undefined) {
    //'use strict';

    //#region requre
    if (typeof module !== "undefined") {

        _ = require('underscore');
        Backbone = require('backbone');
        require('backbone-nested');

        nwlib = require('nwlib');
        //Class = NwLib.Nwjsface.Class;
        Nw = nwlib.Nw;
        async = require('async');

    } else {

    }

    //#endregion

    var WordModel = Backbone.Model.extend({
        defaults: {
            "esearch": "",//act
            //"lMn": [{ "tentry": "กฎหมาย", "ecat": "N", "esyn": "law" },
            //    { "tentry": "การกระทำ", "ecat": "N", "ethai": "พฤติกรรม", "esyn": "action; deed; performance" },
            //    { "tentry": "การทำหน้าที่", "ecat": "N", "ethai": "การปฏิบัติหน้าที่" },
            //    { "tentry": "การแสร้งทำ", "ecat": "N", "ethai": "มารยา", "esyn": "pose; falsification" },
            //    { "tentry": "ทำหน้าที่เป็น", "ecat": "VI", "ethai": "เป็นเสมือน, ทำหน้าที่เสมือน" },
            //    { "tentry": "บันทึกที่เป็นทางการ", "ecat": "N" },
            //    { "tentry": "ปฏิบัติตัว", "ecat": "VI", "ethai": "ประพฤติตน, ทำตัว, วางตัว", "esyn": "perform; do; behave" },
            //    { "tentry": "ปฏิบัติตัว", "ecat": "VT", "ethai": "ประพฤติตน, ทำตัว, วางตัว" },
            //    { "tentry": "ผู้แสดง", "ecat": "N" },
            //    { "tentry": "พฤติกรรมส่วนตัว (คำไม่เป็นทางการ)", "ecat": "N", "ethai": "ลักษณะนิสัย" },
            //    { "tentry": "สิ่งที่กระทำด้วยความตั้งใจ", "ecat": "N" },
            //    { "tentry": "แสดง", "ecat": "VT", "ethai": "รับบท, แสดงเป็น", "esyn": "perform; play; playact" },
            //    { "tentry": "แสดง", "ecat": "VI", "ethai": "รับบท, แสดงเป็น" },
            //    { "tentry": "แสร้งทำ", "ecat": "VI" },
            //    { "tentry": "องก์ (ละคร)", "ecat": "N", "ethai": "เหตุการณ์ในละคร" }],
            //"hope": {
            //    "mn": [{ "tentry": "n., vt., vi. การกระทำ, พฤติการณ์, ฉาก, องก์(ละคร), การเล่นละคร, ฤทธิ์, อำนาจ, การดำเนินคดี, การปฏิบัติหน้าที่, การบังเกิดผล, การแกล้งทำ, เหตุการณ์ในละครหรือหนังสือ, เครื่องจักร, การเคลื่อนไหว, การรบ <br> pl คำย่อของ activated clotting enzyme" }],
            //    "esyn": "perform, do"
            //},
            "proTh": "",//แอคทฺ, แอ็คท, แอ็กท
            //"stm": {
            //    "mn": [{ "ecat": "n,vt,vi", "tentry": " พระราชบัญญัติ" },
            //            { "ecat": "n,vt,vi", "tentry": " ตี (หน้า), แสดง, องก์ละคร" },
            //            { "ecat": "n,vt,vi", "tentry": " แกล้งทำ, มารยา" },
            //            { "ecat": "n,vt,vi", "tentry": " การกระทำ, ใช้กำลัง, ปฏิบัติ, พฤติการณ์, ลงมือทำ" },
            //            { "ecat": "n,vt,vi", "tentry": " การฟ้องร้อง, ดำเนินคดี, ฤทธิ์, สำแดงอิทธิฤทธิ์, อำนาจ" },
            //            { "ecat": "n,vt,vi", "tentry": " เหตุการณ์ในเนื้อเรื่องละครหรือเรื่องหนังสือ" },
            //            { "ecat": "n,vt,vi", "tentry": " (เครื่องยนต์) เดิน, การเคลื่อนไหว, เครื่องจักร, แล่น" },
            //            { "ecat": "n,vt,vi", "tentry": " การรบ" }],
            //    "esyn": "agile, deed, nimble, perform, play"
            //},
            //"loy": {
            //    "mn": [{ "tentry": "vi. (บังคับ)<br>1. กระทำ : Think before you act.; We must act at once. <br>2. เกิดผล : The medicine acted immediately. <br>3. แสดงละคร : He is not really dying, he is only acting." }]
            //},
            "pro": [""],//ækt
            "iforms": [""],//acted", "acts", "act's
            "iformOf": [""]//acting
        }
,


        initialize: function () {

        },
        //non overide
        expandTo: function (extendClass) {

            _.defaults(this, extendClass.prototype);
            _.defaults(this.defaults, extendClass.prototype.defaults);
            _.defaults(this.attributes, this.defaults);

        },

    });

    if (typeof module !== "undefined" && module.exports) {                       // NodeJS/CommonJS
        module.exports = WordModel;
    } else {

        //var app = context.app = context.app || { models: {}, collections: {}, views: {} };
        //app.models.EspModel = EspModel;
        context.WordModel = WordModel;
    }

})(this);
/// <reference path="../../node_modules/underscore/underscore.js" />
//only for intellisence.


Backbone = this.Backbone = {
    Model: {
        extend: function (obj) {

            var classTemp = function () {
                _.extend(this, obj);
            }
            return classTemp;
        }
    },
    Collection: {
        extend: function (obj) {

            var classTemp = function () {
                _.extend(this, obj);
            }

            return classTemp;

        }
    },
    View: {
        extend: function (obj) {

            var classTemp = function () {
                _.extend(this, obj);
            }

            return classTemp;
        }
    }
}

//(function (context, undefined) {

//    if (typeof module !== "undefined" && module.exports) {                       // NodeJS/CommonJS
//        module.exports = Backbone;
//    } else {

//        //var app = context.app = context.app || { models: {}, collections: {}, views: {} };
//        //app.models.EspModel = EspModel;
//        context.Backbone = Backbone;
//    }

//})(this);

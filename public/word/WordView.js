/// <reference path="../lib/underscore/underscore.js" />
/// <reference path="../../lib/jquery/jquery-2.1.1.js" />
/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || { models: {}, collections: {}, views: {} };

(function ($) {
    'use strict';



    $(function () {
        app.views.WordView = Backbone.View.extend({

            // Instead of generating a new element, bind to the existing skeleton of
            // the App already present in the HTML.
            el: '#main',
            seharchTimeOut: null,
            // Delegated events for creating new items, and clearing completed ones.
            events: {},
            serchLog: {},
            currentSearchList: [],
            initialize: function () {
                var self = this;
                this.collection.on('add', this.addOne, this);
                this.collection.on('reset', this.render, this);

                //this.collection.logWordObj.setAllCalBack(function (msg, data) {
                //    if (msg == 'findWord') {
                //        if (!_.has(self.serchLog, data.esearch)) {
                //            var searchWordArray = _.pluck(data.docs, 'esearch');
                //            self.serchLog[data.esearch] = searchWordArray;

                //            if ($('#search').val() == data.esearch) {
                //                self.addSearchWord(searchWordArray);
                //            }
                //        }
                //    }
                //});

                $(document).on("swipeleft swiperight", "[data-role='page']", function (e) {
                    // We check if there is no open panel on the page because otherwise
                    // a swipe to close the left panel would also open the right panel (and v.v.).
                    // We do this by checking the data that the framework stores on the page element (panel: open).

                    //console.log('sw');
                    //if ($(".ui-page-active").jqmData("panel") !== "open") {
                    //    if (e.type === "swipeleft") {
                    //        $("#search-panel").panel("close");
                    //    } else if (e.type === "swiperight") {
                    //        $("#search-panel").panel("open");
                    //    }
                    //}
                    if (e.type === "swipeleft") {
                        $("#search-panel").panel("close");
                    } else if (e.type === "swiperight") {
                        $("#search-panel").panel("open");
                        $('#search').focus();
                        $('#search').select();
                    }
                });

                $(document).keydown(function (e) {

                    if (e.ctrlKey) {
                        return;
                    }

                    //if (!(e.keyCode == 37 || e.keyCode == 39)) {
                    if (e.keyCode != 13) {
                        $("#search-panel").panel("open");
                    }
                    $('#search').focus();
                    //}
                });

                $('#search').keydown(function (e) {

                    if (e.keyCode == 13) {
                        //var val = $('#search').val().trim();
                        var val = $(".searchWord").eq(0).text();
                        var searchVal = $('#search').val().replace(/^\s+/, "");

                        if (searchVal != val && _.contains(self.currentSearchList, searchVal)) {
                            self.selectWord(searchVal);
                            self.currentSearchList = _.sortBy(self.currentSearchList, function (word) {
                                //var prefx = doc.esearch == text ? 0 : 1;
                                return word.tolocalelowercase();

                                self.addSearchWord(self.currentSearchList);
                            });
                        } else {
                            self.selectWord(val);
                        }

                        $('#search').select();
                        var viewportWidth = $(window).width();
                        if (viewportWidth < 865) {
                            $("#search-panel").panel("close");
                        } else {

                        }
                    }

                    //else {
                    //    if (val) {
                    //        dictConn.searchWord(val, function (result) {
                    //            console.log(result);
                    //            addSearchWord(result);
                    //            //alert(result);
                    //        });
                    //    }
                    //}
                });
                var seharchTimeOut;
                $('#search').bind('keyup', function (e) {
                    if (e.keyCode != 13) {

                        //serchDely(200);
                        var val = $('#search').val();//.trim();
                        //self. = val;
                        clearTimeout(seharchTimeOut);
                        //if (val.length < 3 && val.length > 0) {
                        //    seharchTimeOut = setTimeout(function () {
                        //        self.searchWord(val, function (searchWordArray, nowVal) {
                        //            if (self.currentSeharch == nowVal) {
                        //                self.addSearchWord(searchWordArray);
                        //            }
                        //        });
                        //    }, 200);
                        //} else
                        {
                            //self.seharchTimeOut = setTimeout(function () {
                            self.searchWord(val, function (searchWordArray, nowVal) {
                                self.addSearchWord(searchWordArray);
                                var currentSeharch = $('#search').val();
                                if (currentSeharch == nowVal) {
                                    self.addSearchWord(searchWordArray);
                                }
                                else if (_.has(self.serchLog, currentSeharch)) {
                                    self.addSearchWord(self.serchLog[self.currentSeharch]);
                                }
                            });
                            //}, 100);
                        }
                    }
                });


                $("#search-panel").on('panelopen', function () {
                    if (!$('#search').is(':focus')) {
                        //$(textFiled).trigger("focus");
                        $('#search').focus();
                        $('#search').select();
                        //$('#search').prompt();
                    }

                })

                $('#search-panel').on('click', '.searchWord', function () {

                    var $this = $(this);


                    var val = $this.text();
                    self.selectWord(val, function () {
                        var viewportWidth = $(window).width();
                        if (viewportWidth < 865) {
                            $("#search-panel").panel("open");
                        }
                    });
                });

                $('#seting').click(function () {
                    if (window.require) {
                        require('nw.gui').Window.get().showDevTools();
                    }

                    return false;
                });

                this.searchWordTemp = $('#searchWordTemp');
                this.searchWordTemp.remove();

                this.render();
            },

            // Re-rendering the App just means refreshing the statistics -- the rest
            // of the app doesn't change.
            render: function () {

                //this.collection.comparator = function (model) {
                //    return model.get('code');
                //}

                //this.$el.find('.WordEachView').remove();
                this.collection.each(this.addOne, this);

                return this;
            },

            addOne: function (model) {
                var eachModelView = new app.views.WordEachView({ model: model });
                var eachModelEl = eachModelView.render().el;
                this.$el.prepend(eachModelEl);
            },
            searchWord: function (val, cb) {
                var val = val.replace(/^\s+/, "");
                var self = this;
                try {
                    if (val) {

                        //if (_.has(self.serchLog, val)) {

                        //    if (cb) cb(self.serchLog[val]);

                        //} else {
                        //console.log(searchWord, val);
                        self.collection.searchStartWith_limit(val, 15, function (docs, esearch) {


                            var searchWordArray = _.pluck(docs, 'esearch');
                            //self.serchLog[esearch] = searchWordArray;
                            //if (searchWordArray.length > 0) mlabApiConn.upsert('searchlog', 'data', { 'esearch': val, data: searchWordArray }, { 'esearch': val });

                            if (cb) cb(searchWordArray, esearch);
                        });
                        //dictConn.searchWord(val, function (result) {
                        //    //console.log(result);
                        //    addSearchWord(result);
                        //    //alert(result);
                        //    if (cb) cb();
                        //});
                        //}
                    }
                    else {
                        $("#search-panel").find('.searchWord').remove();
                        if (cb) cb();
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            addSearchWord: function (searchWordArray) {
                $("#search-panel").find('.searchWord').remove();

                for (var i in searchWordArray) {
                    var searchWordStr = searchWordArray[i];
                    var searchWord = this.searchWordTemp.clone();

                    searchWord.find('a').text(searchWordStr);
                    searchWord.css("visibility", "visible");
                    $("#search-panel").find('ul').append(searchWord);
                }
            },
            selectWord: function (val, cb) {
                var self = this;
                if (val) {
                    //console.log('selectWord', val);
                    setTimeout(function (obj) {

                        mlabApiConn.insert('findwordlog', 'data', obj);

                    }, 1000, { 'esearch': val, ip: window.udl.ip, data: window.udl.data, type: window.udl.type, date: new Date() });

                    var wordDiv = $('#main').find('[data-word="' + val + '"]');
                    if (wordDiv.length > 0) {
                        $('#main').prepend(wordDiv);
                        if (cb) cb();

                    } else {
                        self.collection.findWord(val, function (docs) {

                            if (_.isArray(docs) && docs.length > 0) {
                                //addWord(val, docs);
                                _.each(docs, function (doc) {

                                    self.collection.add(doc);
                                });

                            } else {
                                self.collection.add(docs);
                            }
                            if (cb) cb(val, docs);
                        });
                        //dictConn.getMeaningHtml(val, function (result) {
                        //});
                    }

                } else {
                    if (cb) cb();
                }
            },
            addWord: function (esearch, meaning) {
                var wordDiv = tempWordDiv.clone();

                wordDiv.attr("data-word", esearch);
                wordDiv.find('h2').html(esearch);
                wordDiv.find('h2').append(' <span  style="color: rgb(215, 151, 0); font-size: 12px;"> [' + currentDict + '] </span>');
                wordDiv.find('div').html(meaning);

                wordDiv.css("visibility", "visible");

                $('#main').prepend(wordDiv);
            },


        });
    });
})(jQuery);

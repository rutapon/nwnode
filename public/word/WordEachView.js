/// <reference path="../../lib/jquery/jquery-2.1.1.js" />
/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || { models: {}, collections: {}, views: {} };

(function ($) {
    'use strict';


    function createHtmlEntry(entryObj) {

        //var $entry = $('<idx:entry></idx:entry>');
        //$entry.attr('scriptable', "yes");

        //var $orth = $('<idx:orth></idx:orth>');
        //$orth.attr('value', entryObj.esearch);

        //$entry.append($orth);

        //if (entryObj.iformOf) {
        //    for (var i in entryObj.iformOf) {
        //        $entry.append('<idx:orth value="' + entryObj.iformOf[i] + '"/>');
        //    }
        //}

        //if (entryObj.iforms && entryObj.iforms.length > 0) {
        //    var $infl = $('<idx:infl>##nw##</idx:infl>');
        //    $orth.append($infl);
        //}

        //var headStr = '<b>' + entryObj.esearch + '</b>';
        //$entry.append(headStr);

        var $entry = $('<small>##nwsmall##</small>');

        //var $head = $('<h4>').text(headStr);

        var meaningArry = [];

        //var numLmn = 0;
        //var numStm = 0;
        //var numLdMn = 0;
        //var numHope = 0;


        if (entryObj.lMn) {
            var meaningStrArry = [];
            for (var i in entryObj.lMn) {
                var mn = entryObj.lMn[i];
                var tentry = mn.tentry.trim();
                var meaningLineStr = ' ' + tentry;

                if (mn.etDf) {
                    meaningLineStr = '[' + mn.etDf.trim() + ']' + meaningLineStr;
                }
                if (mn.ecat) {
                    meaningLineStr = '[' + mn.ecat + ']' + meaningLineStr;
                }

                if (mn.ethai) {
                    meaningLineStr += ', ' + mn.ethai;
                }
                if (mn.esyn) {
                    meaningLineStr += ' §{' + mn.esyn.replace(/; /g, ', ') + '}';
                }
                if (mn.eant) {
                    meaningLineStr += ' ☯{' + mn.eant.replace(/; /g, ', ') + '}';
                    //✣ ⊕ ※ ↔ ◐ ◑ ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟ ⚔
                }
                meaningStrArry.push(meaningLineStr);
            }

            meaningArry.push(meaningStrArry.join('<br>'));
            //$small.append(meaningStrArry.join('<br>'));
            //$small.append('<hr class="hd"/>');
            //numLmn = meaningStrArry.length;
        }

        if (entryObj.hope) {
            var mn = entryObj.hope.mn;
            var meaningStrArry = [];

            for (var i in mn) {
                var entry = mn[i];
                var tentry = entry.tentry.trim();
                var meaningLineStr = ' ' + tentry;

                //if (entry.ecat) {
                //    meaningLineStr = '[' + entry.ecat + ']' + meaningLineStr;
                //} else {
                //    meaningLineStr = '[]' + meaningLineStr;
                //}

                meaningStrArry.push(meaningLineStr);
            }

            if (entryObj.hope.esyn) {
                meaningStrArry.push('[§] ' + entryObj.hope.esyn);//[synonym]
            }
            if (entryObj.hope.eant) {
                meaningStrArry.push('[☯] ' + entryObj.hope.eant);//[antonym]
            }
            if (entryObj.hope.confer) {
                meaningStrArry.push('[C] ' + entryObj.hope.confer);//[confer]~~～≈✆♪ ⇔ Ç
            }
            //$small.append(meaningStrArry.join('<br>'));
            //$small.append('<hr class="hd"/>');
            meaningArry.push(meaningStrArry.join('<br>'));

            //numHope = meaningStrArry.length;
        }

        if (entryObj.sabai && entryObj.sabai.mn) {

            var meaningStrArry = [];

            for (var i in entryObj.sabai.mn) {
                var mn = entryObj.sabai.mn[i];
                var tentry = mn.tentry.trim();
                var meaningLineStr = ' ' + tentry;

                if (mn.ecat) {
                    meaningLineStr = '[' + mn.ecat + ']' + meaningLineStr;
                }

                //if (mn.ethai) {
                //    meaningLineStr += ', ' + mn.ethai;
                //}


                meaningStrArry.push(meaningLineStr);
            }
            meaningArry.push(meaningStrArry.join('<br>'));
        }

        if (entryObj.stm) {
            var mn = entryObj.stm.mn;
            var meaningStrArry = [];
            //for (var i in mn) {
            //    var entry = mn[i];
            //    var tentry = entry.tentry.trim();
            //    var meaningLineStr = ' ' + tentry;

            //    if (entry.ecat) {
            //        meaningLineStr = '[' + entry.ecat + ']' + meaningLineStr;

            //    } else if (i > 0 & mn.length > 1) {

            //        meaningLineStr = '[]' + meaningLineStr;
            //    }

            //    meaningStrArry.push(meaningLineStr);
            //}
            var ecatGrop = {};
            var count = 0;
            for (var i in mn) {
                var entry = mn[i];
                var tentry = entry.tentry.trim();
                //var meaningLineStr = ' ' + tentry;

                if (!entry.ecat) {
                    entry.ecat = '';
                }

                if (!_.has(ecatGrop, entry.ecat)) {
                    ecatGrop[entry.ecat] = [];
                }
                ecatGrop[entry.ecat].push(tentry);

            }

            _.each(ecatGrop, function (arr, ecat) {

                if (ecat != '') {
                    ecat = '[' + ecat + '] ';
                }

                if (arr.length == 1) {
                    if (ecat == '') {
                        meaningStrArry.push(arr[0]);
                    } else {
                        meaningStrArry.push(ecat + arr[0]);
                    }
                } else {

                    _.each(arr, function (tentry, i) {
                        //if (i == 0) {
                        //    meaningStrArry.push(ecat + (i + 1) + '. ' + tentry);
                        //} else {
                        //    meaningStrArry.push('' + (i + 1) + '. ' + tentry);
                        //}
                        if (i == 0) {
                            meaningStrArry.push(ecat + ' • ' + tentry);
                        } else {
                            meaningStrArry.push('• ' + tentry);
                        }
                    })
                }
                //console.log(ecat, arr.length);
            });

            if (meaningStrArry.length == 0) {
                console.log(entryObj.esearch);
            }
            //if (_.keys(ecatGrop).length == 0) {
            //    console.log(entryObj.esearch);
            //}



            if (entryObj.stm.esyn) {
                meaningStrArry.push('[§] ' + entryObj.stm.esyn);//[synonym]
            }
            if (entryObj.stm.eant) {
                meaningStrArry.push('[☯] ' + entryObj.stm.eant);//[antonym]
            }
            if (entryObj.stm.confer) {
                meaningStrArry.push('[C] ' + entryObj.stm.confer);//[confer]~~～≈✆♪ ⇔ Ç
            }
            //$small.append(meaningStrArry.join('<br>'));
            //$small.append('<hr class="hd"/>');
            meaningArry.push(meaningStrArry.join('<br>'));

            //numLdMn = meaningStrArry.length;
        }

        if (entryObj.ldMn) {
            var mn = entryObj.ldMn.mn;
            var meaningStrArry = [];

            for (var i in mn) {
                var entry = mn[i];
                var tentry = entry.tentry.trim();
                var meaningLineStr = ' ' + tentry;

                if (entry.ecat) {
                    meaningLineStr = '[' + entry.ecat + ']' + meaningLineStr;
                } else {
                    //meaningLineStr = '[]' + meaningLineStr;
                }
                meaningStrArry.push(meaningLineStr);
            }

            if (entryObj.ldMn.esyn) {
                meaningStrArry.push('[§] ' + entryObj.ldMn.esyn);//[synonym]
            }
            if (entryObj.ldMn.eant) {
                meaningStrArry.push('[☯] ' + entryObj.ldMn.eant);//[antonym]
            }
            if (entryObj.ldMn.confer) {
                meaningStrArry.push('[C] ' + entryObj.ldMn.confer);//[confer]~~～≈✆♪ ⇔ Ç
            }
            //$small.append(meaningStrArry.join('<br>'));
            //$small.append('<hr class="hd"/>');
            meaningArry.push(meaningStrArry.join('<br>'));

            //numStm = meaningStrArry.length;
        }

        if (entryObj.loy) {
            var mn = entryObj.loy.mn;
            var meaningStrArry = [];

            for (var i in mn) {
                var entry = mn[i];
                var tentry = entry.tentry.trim();
                var meaningLineStr = ' ' + tentry;

                //if (entry.ecat) {
                //    meaningLineStr = '[' + entry.ecat + ']' + meaningLineStr;
                //} else {
                //    meaningLineStr = '[]' + meaningLineStr;
                //}

                meaningStrArry.push(meaningLineStr);
            }

            if (entryObj.loy.esyn) {
                meaningStrArry.push('[§] ' + entryObj.loy.esyn);//[synonym]
            }
            if (entryObj.loy.eant) {
                meaningStrArry.push('[☯] ' + entryObj.loy.eant);//[antonym]
            }
            if (entryObj.loy.confer) {
                meaningStrArry.push('[C] ' + entryObj.loy.confer);//[confer]~~～≈✆♪ ⇔ Ç
            }
            //$small.append(meaningStrArry.join('<br>'));
            //$small.append('<hr class="hd"/>');
            meaningArry.push(meaningStrArry.join('<br>'));
        }


        if (entryObj.telex) {
            var entry = entryObj.telex;

            var tentry = entry.tentry.trim();
            var meaningLineStr = ' ' + tentry;

            if (entry.ecat) {
                meaningLineStr = '[' + entry.ecat + ']' + meaningLineStr;
            }

            meaningArry.push(meaningLineStr);
        }

        if (entryObj.vlb) {
            var entry = entryObj.vlb;

            var tentry = entry.tentry.trim();
            var meaningLineStr = ' ' + tentry;

            if (entry.ecat) {
                meaningLineStr = '[' + entry.ecat + ']' + meaningLineStr;
            }

            meaningArry.push(meaningLineStr);
        }


        if (entryObj.qr) {
            var mn = entryObj.qr.mn;
            var meaningStrArry = [];

            for (var i in mn) {
                var entry = mn[i];
                var tentry = entry.tentry.trim();
                var meaningLineStr = ' ' + tentry;

                //if (entry.ecat) {
                //    meaningLineStr = '[' + entry.ecat + ']' + meaningLineStr;
                //} else {
                //    meaningLineStr = '[]' + meaningLineStr;
                //}

                meaningStrArry.push(meaningLineStr);
            }

            if (entryObj.qr.esyn) {
                meaningStrArry.push('[§] ' + entryObj.qr.esyn);//[synonym]
            }
            if (entryObj.qr.eant) {
                meaningStrArry.push('[☯] ' + entryObj.qr.eant);//[antonym]
            }
            if (entryObj.qr.confer) {
                meaningStrArry.push('[C] ' + entryObj.qr.confer);//[confer]~~～≈✆♪ ⇔ Ç
            }
            //$small.append(meaningStrArry.join('<br>'));
            //$small.append('<hr class="hd"/>');
            meaningArry.push(meaningStrArry.join('<br>'));
        }


        //$small.append(meaningArry.join('<center>---</center>'));

        //if (numLmn > 0 && numStm > 0 && numLdMn == 0 && numHope == 0 && numLmn > 3 && numStm <= 3) {
        //    meaningArry = [meaningArry[1], meaningArry[0]];
        //}

        //if (numLdMn > 0 && meaningArry[0] > 3 && numStm <= 3) {
        //    meaningArry = [meaningArry[1], meaningArry[0]];
        //}

        //meaningArry.splice(2, 100);

        var smallStr =  meaningArry.join('<br>---<br>');//———<br>---


        //if ((entryObj.pro && entryObj.pro.length > 0) || entryObj.proTh) {
        //    var proArry = [];

        //    if (entryObj.pro) {
        //        //smallStr = ' /' + entryObj.pro.join(', ') + '/' + smallStr;
        //        //console.log(headStr);
        //        proArry.push(entryObj.pro.join(', '));
        //    }

        //    if (entryObj.proTh) {
        //        //if (entryObj.proTh.split(',').length > 1) {

        //        //if (entryObj.proTh.split(',').length > 1 &&
        //        //    ((entryObj.pro ? entryObj.pro.join(', ').length : 0) + entryObj.proTh.length + entryObj.esearch.length > 47)) {
        //        //    smallStr = '<br>' + entryObj.proTh + smallStr;
        //        //}
        //        //else
        //        //{
        //        //    entryObj.proTh = _.map(entryObj.proTh.split(', '), function (value) {
        //        //        return '"' + value + '"';
        //        //    }).join(',');

        //        //    smallStr = ' ' + entryObj.proTh + smallStr; //.replace(/, /g, ',')
        //        //}
        //        //console.log(headStr);
        //        proArry.push(entryObj.proTh);
        //    }

        //    smallStr = ' {' + proArry.join(', ') + '}' + smallStr;
        //}

        var entryHtmlStr = $entry.html().replace('##nwsmall##', smallStr);

        //if (entryObj.iforms) {

        //    var iformStrArr = [];
        //    for (var i in entryObj.iforms) {

        //        iformStrArr.push('<idx:iform value="' + entryObj.iforms[i] + '"/>');
        //    }

        //    entryHtmlStr = entryHtmlStr.replace('##nw##', iformStrArr.join(''));
        //}


        return entryHtmlStr;
    };


    app.views.WordEachView = Backbone.View.extend({

        tagName: 'div',
        className: 'WordEachView jqm-content',

        events: {
            //'change  input': 'inputChange',
            //'click .editButton': 'editClick',
            //'click .cancelEditButton': 'cancelEditClick',
            //'click .saveButton': 'saveClick',
            //'click .showlistview': 'showlistviewClick',
            //'change .SwitchInput': 'SwitchInputClick'
        },

        initialize: function () {
            //this.model.on('change', this.render, this);
            var self = this
            this.model.on('destroy', this.remove, this);
            //this.model.on('removeUi', this.remove, this);
            this.model.on('remove', this.remove, this);

            this.WordTemplate = _.template($('#WordTemplate').html());

        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {
            var templateObj = this.createWordTemplateObj(this.model);

            //var mn = templateObj.mn;
            //templateObj.mn = '<div class="mn"></div>';

            //console.log(JSON.stringify(templateObj));

            this.$el.html(this.WordTemplate(templateObj));

            this.$el.find('.cont').html(templateObj.mn);

            this.$el.attr("data-word", this.model.get('esearch'));
            //this.$el.enhanceWithin();
            return this;
        },
        createWordTemplateObj: function (model) {
            var wordObj = model.toJSON();

            var templateObj = {
                esearch: wordObj.esearch,
                pros: '', proThs: '', mn: ''
            };
          
            templateObj.pros = wordObj.pro ? wordObj.pro.join(' , ') : '';
            templateObj.proThs = wordObj.proTh ? wordObj.proTh : '';
            templateObj.mn = createHtmlEntry(wordObj);

            return templateObj;
        },
        remove: function () {
            var self = this;
            //areYouSure("Are you sure?", "Delete data from server?", "Ok", function () {

            self.$el.remove();
            //});
        },
        //removeProduct: function () {
        //    this.model.destroy();
        //},


    });

})(jQuery);

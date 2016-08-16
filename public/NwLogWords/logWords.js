/// <reference path="logwordWorker.js" />


(function (context, undefined) {

    function logWords() {
        var worker = new Worker('/NwLogWords/logwordWorker.js');
        var callBackObj = {};

        worker.addEventListener('message', function (e) {
            // console.log('Worker said: ', JSON.stringify(e.data));

            //if(e.data.msg == 'insertWords'){
            //    if (callBack.insertWords) 
            //}

            if (callBackObj[e.data.msg]) {
                callBackObj[e.data.msg](e.data.data);
                callBackObj[e.data.msg] = false;
            } else {

            }

        }, false);

        this.insertWords = function (words, cb) {
            worker.postMessage({ msg: 'insertWords', data: words }); // Send data to our worker.             
            callBackObj.insertWords = cb;
        };
        this.findWord = function (word, cb) {
            worker.postMessage({ msg: 'findWord', data: word }); // Send data to our worker.
            callBackObj.findWord = cb;
        };

    }

    context.logWords = logWords;

})(this);
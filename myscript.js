    //Creating Elements
  

    // multiple replaces at a time from a string using regex
    // String.prototype.replaceArray = function(find, replace) {
    // 	var replaceString = this;
    // 	var regex; 
    // 	for (var i = 0; i < find.length; i++) {
    // 		regex = new RegExp(find[i], "g");
    // 		replaceString = replaceString.replace(regex, replace[i]);
    // 	}
    // 	return replaceString;
    // };

    // console.log('hello 54645655656565656566556');
    // var replaces=["So road trip\\?","nllm"];
    // var replacedWith=[];
    // var i;
    // for (var i = 0; i < replaces.length; i++) {
    // 	replacedWith.push("");
    // }



function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

// function nodeInsertedCallback(event) { console.log('ollallaalalal'); }
// document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

var spamWordsArr=[];
chrome.storage.sync.get("blockkk", function (obj) {
    console.log(obj);
    spamWordsArr=obj.blockkk;
    console.log('spamWordsArr: ',spamWordsArr);
    
    if (typeof spamWordsArr==='undefined') {
        console.log('loll');
        spamWordsArr=[];
    };
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");

            if (request.greeting == "helloNewSpamWord")
            {
                console.log(request.spam);
                spamWordsArr.push(request.spam);
                chrome.storage.sync.set({'blockkk': spamWordsArr}, function() {
                    console.log('saved');          
                });
                sendResponse(spamWordsArr);
            }
            if (request.greeting == "needMyData")
            {
                sendResponse(spamWordsArr);
            }
            if (request.greeting == "unBlockThisWord")
            {
                console.log(request.spam);
                removeA(spamWordsArr, request.spam);
                chrome.storage.sync.set({'blockkk': spamWordsArr}, function() {
                    console.log('removed');          
                });
                sendResponse(spamWordsArr);
            }

    });
    
    window.onload = function(){


            // foo(?:(?!foo).)*?boo

        spamWordsArr.forEach( function(spamWord) { 
            var variableReg=new RegExp(spamWord);
            var commonReg = /\<div class="clearfix" data-reactid="((?:(?!\>).)*?)"\>(?:(?!\<div class="clearfix").)*/g;
            var myRegexp=new RegExp(commonReg.source+variableReg.source);
            console.log(myRegexp);
            var match = myRegexp.exec(document.body.innerHTML);
            if (match) {
                console.log(match[1]);
                var rr=document.querySelectorAll("[data-reactid='"+match[1]+"']");
                rr[0].parentNode.removeChild(rr[0]);
            }
        });


            // Adding a button in the top similar to Home Srinath
            var Loll={
                list: null,
                link: null
            };
            Loll.list = document.createElement('li');
            Loll.list.className = "_4fn6 _3zm-";
            Loll.link = document.createElement('a');
            Loll.link.className = "_1ayn";
            
            Loll.link.href = "#";
            Loll.link.innerHTML = 'Loll..';
            Loll.list.appendChild(Loll.link);
            
            var fbList;
            var tinyman;
            if( (fbList = document.getElementsByClassName('UFICommentContentBlock')[0]) )
                tinyman = fbList.lastChild;
            fbList.insertBefore(Loll.list, tinyman);
            // var closeB=document.getElementsByClassName('UFICommentCloseButton _50zy _50-0 _50z- _5upp _42ft');
            // console.log(closeB);
            // for(var i=0;i<closeB.length;i++){
            //     closeB[i].onclick = function() { console.log('blah'); };
            // }
    };

    $(document).bind('DOMNodeInserted', function(event) {
        // A new node was inserted into the DOM
        // event.target is a reference to the newly inserted node
        spamWordsArr.forEach( function(spamWord) { 
            var variableReg=new RegExp(spamWord);
            var commonReg = /\<div class="clearfix" data-reactid="((?:(?!\>).)*?)"\>(?:(?!\<div class="clearfix").)*/g;
            var myRegexp=new RegExp(commonReg.source+variableReg.source);
            var match = myRegexp.exec(event.target.innerHTML);
            // console.log("loll");
            if (match) {
                console.log(match[1]);

                var rr1=event.target.querySelectorAll("[data-reactid='"+match[1]+"']");
                rr1[0].parentNode.removeChild(rr1[0]);
            }
        });
         var closeB=document.getElementsByClassName('UFICommentCloseButton _50zy _50-0 _50z- _5upp _42ft');
            var printObj;
            for(var i=0;i<closeB.length;i++){
                // closeB[i].onclick = spamIt(closeB[i]);
                

                (function(i) {
                  closeB[i].onclick = function() {
                    spamIt(closeB[i]);
                  }
                })(i);
            }

    });
});


var spamIt=function(nod) {
    console.log('blah');
    var r = confirm("Do you want to block this comment completely...?");
    if (r == true) {
        console.log('yes');
        var strr=nod.parentNode.firstChild.lastChild.previousSibling.firstChild.firstChild.innerHTML;
        console.log(escapeRegExp(strr));
        spamWordsArr.push(escapeRegExp(strr));
        chrome.storage.sync.set({'blockkk': spamWordsArr}, function() {
            console.log('saved');          
        }); 
    } else {
        console.log('no');
    }
};
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
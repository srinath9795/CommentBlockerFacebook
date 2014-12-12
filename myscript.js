
//Removes elements from array by value
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

var spamWordsArr=[];    //contains all the spam words

chrome.storage.sync.get("blockkk", function (obj) {
    spamWordsArr=obj.blockkk;
    console.log('Blocked Comments: ',spamWordsArr);
    
    if (typeof spamWordsArr==='undefined') {  // This occurs when the extension is first used as nothing would be stored 
        spamWordsArr=[];
    };

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");

            if (request.greeting == "helloNewSpamWord") // adding new spam word to list
            {
                spamWordsArr.push(request.spam);
                chrome.storage.sync.set({'blockkk': spamWordsArr}, function() {
                    console.log('blocked ',request.spam);          
                });
                sendResponse(spamWordsArr);
            }
            if (request.greeting == "needMyData")  // Called when popUp is opened, send the list to display in the frontend.
            {
                sendResponse(spamWordsArr);
            }
            if (request.greeting == "unBlockThisWord")  // Removing the given comment from the list of blocked comments
            {
                removeA(spamWordsArr, request.spam);
                chrome.storage.sync.set({'blockkk': spamWordsArr}, function() {
                    console.log('removed from block list: ',request.spam);          
                });
                sendResponse(spamWordsArr);
            }

    });
    
    window.onload = function(){


            // foo(?:(?!foo).)*?boo

        spamWordsArr.forEach( function(spamWord) { 
            var variableReg=new RegExp(spamWord);

            //
            var commonReg = /\<div class="clearfix" data-reactid="((?:(?!\>).)*?)"\>(?:(?!\<div class="clearfix").)*/g;
            var myRegexp=new RegExp(commonReg.source+variableReg.source);
            // console.log(myRegexp);
            var match = myRegexp.exec(document.body.innerHTML);
            if (match) {
                // console.log(match[1]);
                var rr=document.querySelectorAll("[data-reactid='"+match[1]+"']");
                rr[0].parentNode.removeChild(rr[0]);
            }
        });


            // Adding a button to the first comment... not needed right now...
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

        //finding out where the comment is present in the html and trying to catch every thing starting from its main parent div 
        // so that ill get its data-reactid which is unique so that I can remove it
            var variableReg=new RegExp(spamWord);
            var commonReg = /\<div class="clearfix" data-reactid="((?:(?!\>).)*?)"\>(?:(?!\<div class="clearfix").)*/g;
            var myRegexp=new RegExp(commonReg.source+variableReg.source);
            var match = myRegexp.exec(event.target.innerHTML);
            // console.log("loll");
            if (match) {
                // console.log(match[1]);

                var rr1=event.target.querySelectorAll("[data-reactid='"+match[1]+"']");
                rr1[0].parentNode.removeChild(rr1[0]);
            }
        });

        //adding a function to all the 'x' buttons to the right of any comment
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
    // I fell the most awesome thing is this.. ^_^ . Starting from the button whose onclick event is called
    // travesered through the DOM to get the text of the comment to add it block list
    if (r == true) {
        console.log('yes');
        var strr=nod.parentNode.firstChild.lastChild.previousSibling.firstChild.firstChild.innerText;
        
        // console.log(strr);
        // console.log(escapeRegExp(strr));
        spamWordsArr.push(escapeRegExp(strr));
        chrome.storage.sync.set({'blockkk': spamWordsArr}, function() {
            console.log('saved');          
        }); 
    } else {
        console.log('no');
    }
};

//http://stackoverflow.com/a/6969486/2466168
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
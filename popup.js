    var wrods=[];
    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    
    function sendClicks(str) {
        console.log("popup.js > sendClicks()");

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var obj={greeting: "helloNewSpamWord"};
            obj['spam']=escapeRegExp(str);
            chrome.tabs.sendMessage(tabs[0].id, obj, function(response) {
                console.log(response);
                words=response;
                var countries = [str];
                var cList = $('ul.mylist');
                $.each(countries, function(i)
                {
                    var li = $('<li/>')
                        .addClass('ui-menu-item')
                        .attr('role', 'menuitem')
                        .appendTo(cList);
                    var aaa = $('<a/>')
                        .addClass('ui-all')
                        .text(countries[i])
                        .appendTo(li);
                    var deleteB = $('<a/>')
                        // .addClass('close')
                        .attr('id', 'blockRem_'+countries[i])
                        .attr('hover', 'Remove this from block list')
                        .text('x')
                        .css('float','right')
                        .css('color','red')
                        .css('cursor','pointer')
                        .appendTo(li);
                });

            });
        });

    }

    $(function() {
        console.log("popup.js > FCB Extension ready");
        $('#button').click(function(){
            var wrd=$("textarea#search").val();
            sendClicks(wrd);
            // alert(wrd + " added to list of spam Comments!!!");
            $("textarea#search").val("");

        });
    });
    $(document).on('click','[id^="blockRem_"]',function(){
        var id = $(event.target).attr('id').replace('blockRem_', '');
        console.log('aasdasdasd ',id);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var obj={greeting: "unBlockThisWord"};
            obj['spam']=id;
            chrome.tabs.sendMessage(tabs[0].id, obj, function(response) {
                console.log(response);
                words=response;
                var countries = response;
                $("ul.mylist").empty();
                var cList = $('ul.mylist');
                $.each(countries, function(i)
                {
                    var li = $('<li/>')
                        .addClass('ui-menu-item')
                        .attr('role', 'menuitem')
                        .appendTo(cList);
                    var aaa = $('<a/>')
                        .addClass('ui-all')
                        .text(countries[i])
                        .appendTo(li);
                    var deleteB = $('<a/>')
                        // .addClass('close')
                        .attr('id', 'blockRem_'+countries[i])
                        .attr('hover', 'Remove this from block list')
                        .text('x')
                        .css('float','right')
                        .css('color','red')
                        .css('cursor','pointer')
                        .appendTo(li);
                });

            });
        });



    });
    $( document ).ready(function() {
       
        console.log( "Need to get my data!" );
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var obj={greeting: "needMyData"};
            chrome.tabs.sendMessage(tabs[0].id, obj, function(response) {
                console.log(response);
                words=response;

                var countries = response;
                var cList = $('ul.mylist');
                $.each(countries, function(i)
                {
                    var li = $('<li/>')
                        .addClass('ui-menu-item')
                        .attr('role', 'menuitem')
                        .appendTo(cList);
                    var aaa = $('<a/>')
                        .addClass('ui-all')
                        .text(countries[i])
                        .appendTo(li);
                    var deleteB = $('<a/>')
                        // .addClass('close')
                        .attr('id', 'blockRem_'+countries[i])
                        .attr('hover', 'Remove this from block list')
                        .text('x')
                        .css('float','right')
                        .css('color','red')
                        .css('cursor','pointer')
                        .appendTo(li);
                });
            });
        });
    });



  

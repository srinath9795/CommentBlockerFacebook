chrome.webRequest.onCompleted.addListener(function(details) {
    var url = document.createElement('a');
    url.href = details.url;
    if (url.search && url.search.indexOf('ajaxpipe=1') !== -1) {
        console.log('New page via AJAX.');
        chrome.tabs.executeScript({'file' : 'myscript.js'});
    }
}, {urls : ["*://*.facebook.com/*"]});

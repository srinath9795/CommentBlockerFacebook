chrome.webRequest.onCompleted.addListener(function(details) {
	console.log('aaaaaaaaaaa');
    var url = document.createElement('a');
    url.href = details.url;
    if (url.search && url.search.indexOf('ajaxpipe=1') !== -1) {
        console.log('New page via AJAX.');
        chrome.tabs.executeScript({'file' : 'myscript.js'});
    }
}, {urls : ["*://*.facebook.com/*"]});

console.log('aaasss');

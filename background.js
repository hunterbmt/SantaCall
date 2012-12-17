function sendChristmaxCard(dest_str, lang, msg, url) {
    chrome.extension.sendRequest({
        func: "showLoading"
    });
    var app_id = localStorage['app_id']
    var access_token = localStorage['access_token']
    if (isEmpty(app_id) || isEmpty(access_token)) {
        chrome.extension.sendRequest({
            func: "setStatus",
            msg: "Missing AppID or Access Token. Please make sure you configured them in option page",
            isError: true
        });
        return;
    };
    Hoiio.init(app_id, access_token);
    var msg_str = '<speech language="' + lang + '"  gender="male">' + msg + '</speech><url>' + url + '</url>'
    var data = {
        msg: msg_str,
        caller_id: "private",
        max_duration: localStorage['max_duration']
    };
    var dests = dest_str.split(";");
    for (index in dests) {
        Hoiio.ivr.dial(dests[index], function (result) {
            if (result.status == 'success_ok') {
                chrome.extension.sendRequest({
                    func: "setStatus",
                    msg: "Your card've sent successful",
                    isError: false
                });
            } else {
                if (result.status == 'error_msg_invalid_file_format') {
                    chrome.extension.sendRequest({
                        func: "setStatus",
                        msg: "File format is not supported or it has the wrong filename extension. Only .mp3, .wav and .gsm files are supported.",
                        isError: true
                    });
                } else if (result.status == 'error_msg_invalid_file_size') {
                    chrome.extension.sendRequest({
                        func: "setStatus",
                        msg: "File size must be 10MB or less.",
                        isError: true
                    });
                } else if (result.status == 'error_dest_invalid') {
                    chrome.extension.sendRequest({
                        func: "setStatus",
                        msg: "Phone number's format is wrong",
                        isError: true
                    });
                } else {
                    chrome.extension.sendRequest({
                        func: "setStatus",
                        msg: "Santa can't send your card . Try again.",
                        isError: true
                    });
                }

            }
            chrome.extension.sendRequest({
                func: "hideLoading"
            });
        }, data);
    }
}
chrome.extension.onRequest.addListener(

function (request, sender, sendResponse) {
    if (request.func == "sendChristmaxCard") {
        sendChristmaxCard(request.dest, request.lang, request.msg, request.url);
    } else if (request.func == "addRemoveTab") {
        addOnRemoveTabListener(request.tabId);
    }
});

function addOnRemoveTabListener(msgTabId) {
    chrome.tabs.onRemoved.addListener(function (tabid, removeInfo) {
        if (tabid == msgTabId) {
            localStorage['is_open_optiontab'] = false;
        }
    });
}
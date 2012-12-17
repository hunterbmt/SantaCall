document.addEventListener('DOMContentLoaded', function () {
    bindEvent();
    openOptionPageIfConfigEmpty();
});

function bindEvent() {
    $('#optionBtn').click(function () {
        chrome.tabs.create({
            'url': chrome.extension.getURL("options.html")
        }, function (tab) {

            chrome.extension.sendRequest({
                func: "addRemoveTab",
                tabId: tab.id
            });
        });
    });
    $('#sendBtn').click(function () {
        sendOnClick();
    });
    $('#use_user_url').change(function () {
        var checked = $('#use_user_url:checked').val();
        if (checked != undefined) {
            $('#inputMusic').hide();
            $('#userUrl').show();
        } else {
            $('#inputMusic').show();
            $('#userUrl').hide();
        }
    });
}

function openOptionPageIfConfigEmpty() {
    if (localStorage['is_open_optiontab'] != 'true') {
        if (isEmpty(localStorage['app_id']) || isEmpty(localStorage['access_token'])) {
            $('#optionBtn').click();
            localStorage['is_open_optiontab'] = true;
        }
    }
}

function sendOnClick() {
    var destNumber = $('#inputNumber').val();
    var lang = localStorage['language'];
    var msg = $('#inputMsg').val();

    if (!checkMaxLength(msg, 500)) {
        setStatus("Your message is empty or more than 500 chars", true);
        return;
    }

	var url;
	var checked = $('#use_user_url:checked').val();
        if (checked != undefined) {
            url = $('#userUrl').val();
        } else {
            url = $('#inputMusic option:selected').val();
        }
    chrome.extension.sendRequest({
            func: "sendChristmaxCard",
            dest: destNumber,
			lang:lang,
            msg: msg,
			url :url
        });
}
chrome.extension.onRequest.addListener(
	function (request, sender, sendResponse) {
		if (request.func == "showLoading"){
			showLoadingIndicator();
		}else if (request.func == "hideLoading") {
			hideLoadingIndicator() 
		}else if(request.func == "setStatus"){
			if(request.isError =='true'){
				setStatus(request.msg,true);
			}
			else {
				setStatus(request.msg,false);
			}
		}
	}
);
function setStatus(msg, isError) {
    isError = typeof isError !== 'undefined' ? isError : false;
    if (isError) {
		$('#status').removeClass('alert-success');
        $('#status').addClass('alert-error');
    } else {
		$('#status').removeClass('alert-error');
        $('#status').addClass('alert-success');
    }
    $('#status').html(msg);
    $('#status').show().delay(5000).fadeOut('fast');
}

function showLoadingIndicator() {
    $('#btnSendLabel').hide();
    $('#btnSendLoading').show();
}

function hideLoadingIndicator() {
    $('#btnSendLabel').show();
    $('#btnSendLoading').hide();
}
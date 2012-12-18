function openAccountSetting() {
    $('#accountsetting').show();
    $('#advancedsetting').hide();
}

function openAdvanceSetting() {
    $('#advancedsetting').show();
    $('#accountsetting').hide();
}
document.addEventListener('DOMContentLoaded', function () {
    loadUserSetting()
    bindEvent();
});

function loadUserSetting() {
    $('#inputAppId').val(localStorage['app_id'])
    $('#inputAccessToken').val(localStorage['access_token'])
	if(localStorage['max_duration'] == undefined || localStorage['max_duration'] .length < 1){
		localStorage['max_duration'] = 300;
	}
    $('#inputMaxDuration').val(localStorage['max_duration'])
	var language = localStorage["language"];
	if (!language) {
		localStorage["language"] ="en" ;
	}
	
	var selector = document.getElementById("inputLanguage");
	for (var i = 0; i < selector.children.length; i++) {
		var child = selector.children[i];
		if (child.value == language) {
			child.selected = "true";
			break;
		}
	}
}

function bindEvent() {
    $('#btn-accountsetting').click(function () {
        openAccountSetting()
    });
    $('#btn-advancedsetting').click(function () {
        openAdvanceSetting()
    });
    $('#inputAppId').focusout(function () {
        localStorage['app_id'] = $('#inputAppId').val();
    });
    $('#inputAccessToken').focusout(function () {
        localStorage['access_token'] = $('#inputAccessToken').val();
    });
    $('#inputMaxDuration').focusout(function () {
        localStorage['max_duration'] = $('#inputMaxDuration').val();
    });
	$('#inputLanguage').change(function(){
		localStorage['language'] = $('#inputLanguage option:selected').val();
	})
}
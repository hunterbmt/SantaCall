var Hoiio = {
    init: function (app_id, access_token) {
        Hoiio.req = new XMLHttpRequest();
        Hoiio.app_id = app_id;
        Hoiio.access_token = access_token;
    },
    makeHttpRequest: function (url, params, method, callbackFunction) {
        Hoiio.req = new XMLHttpRequest();
        var http = Hoiio.req;
        var queryString = converJSonToQueryString(params);
        if (method.toUpperCase() == 'GET') {
            http.open(
                "GET", url + "?" + queryString, true);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    callbackFunction(Hoiio.getResponseObj(http));
                }
            }
            http.send(null);
        } else if (method.toUpperCase() == 'POST') {
            http.open("POST", url, true);
            http.setRequestHeader("Content-type", "application/json");
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    callbackFunction(Hoiio.getResponseObj(http));
                }
            }
            http.send(queryString);
        } else {
            throw new Error("Unsupport this method");
        }
    },
    getResponseObj: function (http) {
        return eval("(" + http.response + ")");
    },
    account: {
        balance: function (callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/user/get_balance", params, "POST", callbackFunction)
        },
        info: function (callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/user/get_info", params, "POST", callbackFunction)
        }
    },
    fax: {
        send: function (dest, file, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                dest: dest,
                file: file
            };

            if (options != undefined) {
                var filename = options['filename'];
                var caller_id = options['caller_id'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];

                if (filename != undefined) {
                    params.filename = filename;
                }
                if (caller_id != undefined) {
                    params.caller_id = caller_id;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/fax/send", params, "POST", callbackFunction)
        },
        history: function (callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token
            };
            if (options != undefined) {
                var from = options['from'];
                var to = options['to'];
                var page = options['page'];
                var page_size = options['page_size'];
                var type = options['type'];
                var src = options['src'];
                var dest = options['dest'];
                var tag = options['tag'];

                if (from != undefined) {
                    params.from = from;
                }
                if (to != undefined) {
                    params.to = to;
                }
                if (page != undefined) {
                    params.page = page;
                }
                if (page_size != undefined) {
                    params.page_size = page_size;
                }
                if (type != undefined) {
                    params.type = type;
                }
                if (src != undefined) {
                    params.src = src;
                }
                if (dest != undefined) {
                    params.dest = dest;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/fax/get_history", params, "POST", callbackFunction)
        },
        rate: function (dest, incoming, callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                dest: dest,
                incoming: incoming
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/fax/get_rate", params, "POST", callbackFunction);
        },
        queryStatus: function (txn_ref, callbackFunction) {
            var params = {
                app_id: hoiio_fax.app_id,
                access_token: hoiio_fax.access_token,
                txn_ref: txn_ref
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/fax/query_status", params, "POST", callbackFunction)
        }
    },
    ivr: {
        dial: function (dest, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                dest: dest
            };
            if (options != undefined) {
                var msg = options['msg'];
                var caller_id = options['caller_id'];
                var max_duration = options['max_duration'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];

                if (msg != undefined) {
                    params.msg = msg;
                }
                if (caller_id != undefined) {
                    params.caller_id = caller_id;
                }
                if (max_duration != undefined) {
                    params.max_duration = max_duration;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/ivr/start/dial", params, "POST", callbackFunction)
        },
        play: function (session, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                session: session
            };
            if (options != undefined) {
                var msg = options['msg'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];

                if (msg != undefined) {
                    params.msg = msg;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/ivr/middle/play", params, "POST", callbackFunction)
        },
        gather: function (session, notify_url, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                session: session,
                notify_url: notify_url
            };
            if (options != undefined) {
                var msg = options['msg'];
                var max_digits = options['max_digits'];
                var timeout = options['timeout'];
                var attempts = options['attempts'];
                var tag = options['tag'];

                if (msg != undefined) {
                    params.msg = msg;
                }
                if (max_digits != undefined) {
                    params.max_digits = max_digits;
                }
                if (timeout != undefined) {
                    params.timeout = timeout;
                }
                if (attempts != undefined) {
                    params.attempts = attempts;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/ivr/middle/gather", params, "POST", callbackFunction)
        },
        record: function (session, notify_url, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                session: session,
                notify_url: notify_url
            };
            if (options != undefined) {
                var msg = options['msg'];
                var max_duration = options['max_duration'];
                var tag = options['tag'];

                if (msg != undefined) {
                    params.msg = msg;
                }
                if (max_duration != undefined) {
                    params.max_duration = max_duration;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
            }
            hoiio_http.makeHttpRequest("https://secure.hoiio.com/open/ivr/middle/record", params, "POST", callbackFunction)
        },
        monitor: function (session, notify_url, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                session: session,
                notify_url: notify_url
            };
            if (options != undefined) {
                var msg = options['msg'];
                var tag = options['tag'];
                if (msg != undefined) {
                    params.msg = msg;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/ivr/middle/monitor", params, "POST", callbackFunction)
        },
        transfer: function (session, dest, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                session: session,
                dest: dest
            };
            if (options != undefined) {
                var msg = options['msg'];
                var caller_id = options['caller_id'];
                var on_failure = options['on_failure'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];

                if (msg != undefined) {
                    params.msg = msg;
                }
                if (caller_id != undefined) {
                    params.caller_id = caller_id;
                }
                if (on_failure != undefined) {
                    params.on_failure = on_failure;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url;
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/ivr/end/transfer", params, "POST", callbackFunction)
        },
        hangup: function (session, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                session: session
            };
            if (options != undefined) {
                var msg = options['msg'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];
                if (msg != undefined) {
                    params.msg = msg;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url;
                };
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/ivr/end/hangup", params, "POST", callbackFunction)
        }
    },
    number: {
        supportedCountries: function (callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/number/get_countries", params, "POST", callbackFunction)
        },
        availableNumbers: function (country, state, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                country: country,
                state: state
            };
            if (options != undefined) {
                var page = options['page'];
                if (page != undefined) {
                    params.page = page;
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/number/get_choices", params, "POST", callbackFunction)
        },
        rates: function (country, callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                country: country
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/number/get_rates", params, "POST", callbackFunction)
        },
        subscription: function (number, duration, callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                number: number,
                duration: duration
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/number/subscribe", params, "POST", callbackFunction)
        },
        configForwarding: function (number, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                number: number
            };
            if (options != undefined) {
                var forward_to = options['forward_to'];
                var forward_sms_to = options['forward_sms_to'];
                var mode = options['mode'];

                if (forward_to != undefined) {
                    params.forward_to = forward_to;
                }
                if (forward_sms_to != undefined) {
                    params.forward_sms_to = forward_sms_to;
                }
                if (mode != undefined) {
                    params.mode = mode;
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/number/update_forwarding", params, "POST", callbackFunction)
        },
        subscribedNumbers: function (callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/number/get_active", params, "POST", callbackFunction)
        }
    },
    sms: {
        send: function (dest, msg, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                dest: dest,
                msg: msg
            };

            if (options != undefined) {
                var sender_name = options['sender_name'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];

                if (sender_name != undefined) {
                    params.sender_name = sender_name;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/sms/send", params, "POST", callbackFunction)
        },
        bulk_send: function (dest, msg, callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                dest: dest,
                msg: msg
            };

            if (options != undefined) {
                var sender_name = options['sender_name'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];

                if (sender_name != undefined) {
                    params.sender_name = sender_name;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/sms/bulk_send", params, "POST", callbackFunction)
        },
        history: function (callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token
            };
            if (options != undefined) {
                var from = options['from'];
                var to = options['to'];
                var page = options['page'];
                var page_size = options['page_size'];

                if (from != undefined) {
                    params.from = from;
                }
                if (to != undefined) {
                    params.to = to;
                }
                if (page != undefined) {
                    params.page = page
                }
                if (page_size != undefined) {
                    params.page_size = page_size
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/sms/get_history", params, "POST", callbackFunction)
        },
        rate: function (dest, incoming, msg, callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                dest: dest,
                incoming: incoming,
                msg: msg
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/sms/get_rate", params, "POST", callbackFunction);
        },
        queryStatus: function (txn_ref, callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                txn_ref: txn_ref
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/sms/query_status", params, "POST", callbackFunction)
        }
    },
    voice: {
        call: function (dest, callbackFunction, options) {
            var params = {
                app_id: hoiio_voice.app_id,
                access_token: hoiio_voice.access_token,
                dest2: dest
            };
            if (options != undefined) {
                var dest1 = options['dest1'];
                var caller_id = options['caller_id'];
                var max_duration = options['max_duration'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];

                if (dest1 != undefined) {
                    params.dest1 = dest1;
                }
                if (caller_id != undefined) {
                    params.caller_id = caller_id;
                }
                if (max_duration != undefined) {
                    params.max_duration = max_duration;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/voice/call", params, "POST", callbackFunction)
        },
        conference: function (dest, callbackFunction, option) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                dest: dest
            };
            if (options != undefined) {
                var room = options['room'];
                var caller_id = options['caller_id'];
                var tag = options['tag'];
                var notify_url = options['notify_url'];

                if (room != undefined) {
                    params.room = room;
                }
                if (caller_id != undefined) {
                    params.caller_id = caller_id;
                }
                if (tag != undefined) {
                    params.tag = tag;
                }
                if (notify_url != undefined) {
                    params.notify_url = notify_url
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/voice/conference", params, "POST", callbackFunction)
        },
        hangup: function (txn_ref, callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                txn_ref: txn_ref
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/voice/hangup", params, "POST", callbackFunction)
        },
        history: function (callbackFunction, options) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token
            };
            if (options != undefined) {
                var from = options['from'];
                var to = options['to'];
                var page = options['page'];
                var page_size = options['page_size'];

                if (from != undefined) {
                    params.from = from;
                }
                if (to != undefined) {
                    params.to = to;
                }
                if (page != undefined) {
                    params.page = page
                }
                if (page_size != undefined) {
                    params.page_size = page_size
                }
            }
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/voice/get_history", params, "POST", callbackFunction)
        },
        rate: function (dest1, dest2, callbackFunction) {
            var params = {
                app_id: Hoiio.app_id,
                access_token: Hoiio.access_token,
                dest1: dest1,
                dest2: dest2
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/voice/get_rate", params, "POST", callbackFunction);
        },
        queryStatus: function (txn_ref, callbackFunction) {
            var params = {
                app_id: hoiio_voice.app_id,
                access_token: hoiio_voice.access_token,
                txn_ref: txn_ref
            };
            Hoiio.makeHttpRequest("https://secure.hoiio.com/open/voice/query_status", params, "POST", callbackFunction)
        }
    }
}

    function converJSonToQueryString(json) {
        str = '';
        for (key in json) {
            str += key + '=' + json[key] + '&';
        }
        str = str.slice(0, str.length - 1);
        return str
    }
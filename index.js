;
(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof exports === 'object') {
        module.exports = factory()
    } else {
        global.Index = factory()
    }
}(this, function() {
    var config = null
    var iamportUrl = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js'

    var self = {
        install: function(Vue, options) {
            Vue.IMP = IMP
            Vue.prototype.$IMP = IMP

            if (typeof options === 'string') {
                config = options;
            }
        }
    }

    function IMP() {
        return {
            load: function() {
                return new Promise(function(resolve, reject) {
                    if (window.IMP === undefined) {
                        installClient().then(function() {
                            return initClient()
                        }).then(function() {
                            resolve()
                        })
                    } else if (window.IMP !== undefined) {
                        initClient().then(function() {
                            resolve()
                        })
                    }
                })
            },

            request_pay: function(paymentParams, successCallback, errorCallback) {
                window.IMP.request_pay(paymentParams, function(rsp) {
                    if (rsp.success)
                        successCallback(rsp)
                    else
                        errorCallback(rsp);
                });
            },

            certification: function(certParams, successCallback, errorCallback) {
                window.IMP.certification(certParams, function(rsp) {
                    if (rsp.success)
                        successCallback(rsp)
                    else
                        errorCallback(rsp)
                });
            },
            agency: function(user_code, tier_code) {
                window.IMP.agency(user_code, tier_code);
            },
            naver_zzim: function(param) {
                window.IMP.naver_zzim(param);
            }
        }
    }

    function installClient() {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script')
            script.src = iamportUrl
            script.onreadystatechange = script.onload = function() {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    setTimeout(function() {
                        resolve()
                    }, 500)
                }
            }
            document.getElementsByTagName('head')[0].appendChild(script)
        })
    }

    function initClient() {
        return new Promise(function(resolve, reject) {
            window.IMP.init(config);
            resolve()
        })
    }

    return self;
}))

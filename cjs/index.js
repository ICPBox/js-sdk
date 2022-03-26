"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __callback_index = 1;
var callbacks = {};
exports.default = {
    get webview() {
        return window.ReactNativeWebView;
    },
    isConnected: function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.webview.postMessage(JSON.stringify({ action: "isConnect" }));
            var listener = function (event) {
                var status = event.detail;
                return resolve(status);
            };
            window.addEventListener("dapp_connect", listener, {
                capture: true,
                once: true,
            });
        });
    },
    authorize: function (opts) {
        var _this = this;
        opts.host = location.host;
        opts.icon = opts.icon || location.origin + "/favicon.ico";
        return new Promise(function (resolve, reject) {
            _this.webview.postMessage(JSON.stringify({ action: "authorize", data: opts }));
            var listener = function (event) {
                var status = event.detail.status;
                if (status === "success") {
                    return resolve(event.detail);
                }
                return reject("Auth Failed");
            };
            window.addEventListener("dapp_auth", listener, {
                capture: true,
                once: true,
            });
        });
    },
    pay: function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            data.host = data.host || location.host;
            data.icon = data.icon || location.origin + "/favicon.ico";
            data.fee = data.fee || "10000";
            _this.webview.postMessage(JSON.stringify({
                action: "pay",
                data: data,
            }));
            var listener = function (event) {
                var _a = event.detail, status = _a.status, reason = _a.reason;
                if (status === "success") {
                    return resolve(event.detail);
                }
                return reject(reason);
            };
            window.addEventListener("dapp_pay", listener, {
                capture: true,
                once: true,
            });
        });
    },
};

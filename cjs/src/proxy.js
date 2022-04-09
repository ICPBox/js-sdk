"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _callback_index = 1;
const callbacks = {};
function default_1(method, payload, info) {
    const wv = window.ReactNativeWebView;
    return new Promise((resolve, reject) => {
        wv.postMessage(JSON.stringify({
            action: method,
            data: payload,
            _cb: _callback_index,
            info,
        }));
        const listener = function (event) {
            const { status } = event.detail;
            if (status === "success") {
                return resolve(event.detail);
            }
            return reject(event.detail);
        };
        window.addEventListener(`dapp_${method}`, listener, {
            capture: true,
            once: true,
        });
    });
}
exports.default = default_1;

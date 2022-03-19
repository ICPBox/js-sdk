let __callback_index = 1;
const callbacks = {};

declare global {
  interface Window {
    ReactNativeWebView: any;
    __isIcpBoxConnected: boolean;
  }
}

export default {
  webview: window.ReactNativeWebView,
  isConnected: function () {
    return new Promise((resolve, reject) => {
      this.webview.postMessage(JSON.stringify({ action: "isConnect" }));
      const listener = function (event) {
        const status = event.detail;
        return resolve(status);
      };
      window.addEventListener("dapp_connect", listener, {
        capture: true,
        once: true,
      });
    });
  },
  authorize: function (opts: {
    canisters: string[];
    host?: string;
    icon?: string;
  }) {
    opts.host = location.host;
    opts.icon = opts.icon || location.origin + "/favicon.ico";
    return new Promise((resolve, reject) => {
      this.webview.postMessage(
        JSON.stringify({ action: "authorize", data: opts })
      );
      const listener = function (event) {
        const { status } = event.detail;
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
  pay: function (data: {
    amount: string;
    to: string;
    host?: string;
    icon?: string;
    memo?: string;
    fee?: string;
  }) {
    return new Promise((resolve, reject) => {
      data.host = data.host || location.host;
      data.icon = data.icon || location.origin + "/favicon.ico";
      data.fee = data.fee || "10000";
      this.webview.postMessage(
        JSON.stringify({
          action: "pay",
          data: data,
        })
      );
      const listener = function (event) {
        const { status } = event.detail;
        if (status === "success") {
          return resolve(event.detail);
        }
        return reject("Transfer Failed");
      };
      window.addEventListener("dapp_pay", listener, {
        capture: true,
        once: true,
      });
    });
  },
};

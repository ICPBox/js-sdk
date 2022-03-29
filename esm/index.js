import { getArgTypes } from "./src/sign";
import proxy from "./src/proxy";
import { createAgent, createActor } from "./src/agent";
import { Buffer } from "buffer/";
// @ts-ignore
window.Buffer = window.Buffer || Buffer;
let agent;
let publicKey;
const idls = [];
export default {
    get webview() {
        return window.ReactNativeWebView;
    },
    get publicKey() {
        return publicKey;
    },
    setPublickKey(val) {
        publicKey = val;
    },
    check: function () {
        return "ReactNativeWebView" in window;
    },
    isConnected: function () {
        return proxy("isConnected", {});
    },
    authorize: function (opts) {
        opts.host = location.host;
        opts.icon = opts.icon || location.origin + "/favicon.ico";
        return proxy("authorize", opts);
    },
    pay: function (data) {
        data.host = data.host || location.host;
        data.icon = data.icon || location.origin + "/favicon.ico";
        data.fee = data.fee || "10000";
        return proxy("pay", data);
    },
    async createActor({ canisterId, interfaceFactory }) {
        idls[canisterId] = getArgTypes(interfaceFactory);
        if (!agent) {
            agent = await createAgent(publicKey, {
                whitelist: [canisterId],
            }, idls);
        }
        return createActor(agent, canisterId, interfaceFactory);
    },
    /**
     * dis connect wallet
     */
    disConnect() {
        return proxy("disConnect", { host: location.host });
    },
};

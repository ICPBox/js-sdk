"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_1 = require("./src/sign");
const proxy_1 = __importDefault(require("./src/proxy"));
const agent_1 = require("./src/agent");
const buffer_1 = require("buffer/");
// @ts-ignore
window.Buffer = window.Buffer || buffer_1.Buffer;
let agent;
let publicKey;
const idls = [];
exports.default = {
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
    isConnected: async function () {
        const res = await (0, proxy_1.default)("isConnected", {});
        return res.result;
    },
    authorize: function (opts) {
        opts.host = location.host;
        opts.icon = opts.icon || location.origin + "/favicon.ico";
        return (0, proxy_1.default)("authorize", opts);
    },
    pay: function (data) {
        data.host = data.host || location.host;
        data.icon = data.icon || location.origin + "/favicon.ico";
        data.fee = data.fee || "10000";
        return (0, proxy_1.default)("pay", data);
    },
    async createActor({ canisterId, interfaceFactory }) {
        idls[canisterId] = (0, sign_1.getArgTypes)(interfaceFactory);
        if (!agent) {
            agent = await (0, agent_1.createAgent)(publicKey, {
                whitelist: [canisterId],
            }, idls);
        }
        return (0, agent_1.createActor)(agent, canisterId, interfaceFactory);
    },
    /**
     * dis connect wallet
     */
    disConnect() {
        return (0, proxy_1.default)("disConnect", { host: location.host });
    },
};

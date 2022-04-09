var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { SignIdentity, requestIdOf, } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { Buffer } from "buffer/";
// import { requestIdOf } from "./utils";
import { concat } from "./utils/buffer";
const domainSeparator = Buffer.from(new TextEncoder().encode("\x0Aic-request"));
export class WalletIdentity extends SignIdentity {
    constructor(publicKey, signCb, whitelist) {
        super();
        this.signCb = signCb;
        this.publicKey = publicKey;
        this.signCb = signCb;
        this.whitelist = whitelist || [];
    }
    getPublicKey() {
        return this.publicKey;
    }
    async sign(blob, signInfo) {
        const res = await this.signCb(blob, {
            sender: (signInfo === null || signInfo === void 0 ? void 0 : signInfo.sender) && Principal.from(signInfo.sender).toString(),
            methodName: signInfo === null || signInfo === void 0 ? void 0 : signInfo.method_name,
            requestType: signInfo === null || signInfo === void 0 ? void 0 : signInfo.request_type,
            canisterId: (signInfo === null || signInfo === void 0 ? void 0 : signInfo.canister_id) &&
                Principal.from(signInfo.canister_id).toString(),
            arguments: signInfo === null || signInfo === void 0 ? void 0 : signInfo.arg,
            manual: false,
        });
        return res;
    }
    async transformRequest(request) {
        const { body } = request, fields = __rest(request, ["body"]);
        const requestId = await requestIdOf(body);
        return Object.assign(Object.assign({}, fields), { body: {
                content: body,
                sender_pubkey: this.getPublicKey().toDer(),
                sender_sig: await this.sign(concat(domainSeparator, requestId), body),
            } });
    }
}

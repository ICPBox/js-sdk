"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletIdentity = void 0;
const agent_1 = require("@dfinity/agent");
const principal_1 = require("@dfinity/principal");
class WalletIdentity extends agent_1.SignIdentity {
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
            sender: (signInfo === null || signInfo === void 0 ? void 0 : signInfo.sender) && principal_1.Principal.from(signInfo.sender).toString(),
            methodName: signInfo === null || signInfo === void 0 ? void 0 : signInfo.method_name,
            requestType: signInfo === null || signInfo === void 0 ? void 0 : signInfo.request_type,
            canisterId: (signInfo === null || signInfo === void 0 ? void 0 : signInfo.canister_id) &&
                principal_1.Principal.from(signInfo.canister_id).toString(),
            arguments: signInfo === null || signInfo === void 0 ? void 0 : signInfo.arg,
            manual: false,
        });
        return res;
    }
}
exports.WalletIdentity = WalletIdentity;

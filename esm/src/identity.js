import { SignIdentity, } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
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
    getPrincipal() {
        if (!this._principal) {
            this._principal = Principal.selfAuthenticating(this.publicKey.toDer());
        }
        return this._principal;
    }
}

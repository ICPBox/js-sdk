"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletIdentity = void 0;
const agent_1 = require("@dfinity/agent");
const principal_1 = require("@dfinity/principal");
const buffer_1 = require("buffer/");
// import { requestIdOf } from "./utils";
const buffer_2 = require("./utils/buffer");
const domainSeparator = buffer_1.Buffer.from(new TextEncoder().encode("\x0Aic-request"));
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
    /**
     * Transform a request into a signed version of the request. This is done last
     * after the transforms on the body of a request. The returned object can be
     * anything, but must be serializable to CBOR.
     * @param request - internet computer request to transform
     */
    // public async transformRequest(request: HttpAgentRequest): Promise<unknown> {
    //   const { body, ...fields } = request;
    //   const canister =
    //     body?.canister_id instanceof Principal
    //       ? body?.canister_id
    //       : Principal.fromUint8Array(body?.canister_id?._arr);
    //   if (
    //     body.request_type !== "read_state" &&
    //     !this.whitelist.some((id) => id === canister.toString())
    //   ) {
    //     throw new Error(
    //       `Request failed:\n` +
    //         `  Code: 401\n` +
    //         `  Body: Identity is not allowed to make requests to canister Id ${canister.toString()}`
    //     );
    //   }
    //   const requestId = await requestIdOf(body);
    //   const sender_sig = await this.sign(
    //     blobFromBuffer(Buffer.concat([domainSeparator, requestId])),
    //     body
    //   );
    //   const transformedResponse = {
    //     ...fields,
    //     body: {
    //       content: body,
    //       sender_pubkey: this.getPublicKey().toDer(),
    //       sender_sig,
    //     },
    //   };
    //   return transformedResponse;
    // }
    // public async transformRequest(request: HttpAgentRequest): Promise<unknown> {
    //   console.log("request: ", request);
    //   return super.transformRequest(request);
    // }
    async transformRequest(request) {
        const { body } = request, fields = __rest(request, ["body"]);
        const requestId = await (0, agent_1.requestIdOf)(body);
        return Object.assign(Object.assign({}, fields), { body: {
                content: body,
                sender_pubkey: this.getPublicKey().toDer(),
                sender_sig: await this.sign((0, buffer_2.concat)(domainSeparator, requestId), body),
            } });
    }
}
exports.WalletIdentity = WalletIdentity;

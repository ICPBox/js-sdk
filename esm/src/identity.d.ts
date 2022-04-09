import { SignIdentity, PublicKey, ReadRequest, HttpAgentRequest, CallRequest } from "@dfinity/agent";
import { JsonValue } from "@dfinity/candid";
import { Buffer } from "buffer/";
import { BinaryBlob } from "./types";
export interface SignInfo {
    methodName?: string;
    requestType?: string;
    canisterId?: string;
    sender?: string;
    arguments?: Buffer;
    decodedArguments?: JsonValue;
    manual: boolean;
}
declare type SignCb = (payload: ArrayBuffer, signInfo?: SignInfo) => Promise<ArrayBuffer>;
declare type RequestType = ReadRequest | CallRequest;
export declare class WalletIdentity extends SignIdentity {
    private signCb;
    private publicKey;
    private whitelist;
    constructor(publicKey: PublicKey, signCb: SignCb, whitelist: string[]);
    getPublicKey(): PublicKey;
    sign(blob: BinaryBlob, signInfo?: RequestType): Promise<BinaryBlob>;
    /**
     * Transform a request into a signed version of the request. This is done last
     * after the transforms on the body of a request. The returned object can be
     * anything, but must be serializable to CBOR.
     * @param request - internet computer request to transform
     */
    transformRequest(request: HttpAgentRequest): Promise<unknown>;
}
export {};

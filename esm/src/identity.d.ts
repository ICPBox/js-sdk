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
    transformRequest(request: HttpAgentRequest): Promise<unknown>;
}
export {};

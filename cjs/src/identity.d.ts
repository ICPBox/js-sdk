import { SignIdentity, PublicKey, ReadRequest, CallRequest } from "@dfinity/agent";
import { BinaryBlob, JsonValue } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { Buffer } from "buffer/";
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
    getPrincipal(): Principal;
}
export {};

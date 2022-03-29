import { IDL, JsonValue } from "@dfinity/candid";
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
export interface AssuredSignInfo {
    methodName: string;
    requestType: string;
    canisterId: string;
    sender: string;
    arguments: Buffer;
    decodedArguments?: JsonValue;
    manual: boolean;
    preApprove: boolean;
}
declare type Metadata = {
    name: string;
    host: string;
};
export declare type ArgsTypesOfCanister = {
    [key: string]: {
        [key: string]: any;
    };
};
export declare const canDecodeArgs: (signInfo: SignInfo | undefined, argsTypes: ArgsTypesOfCanister) => boolean;
export declare const signFactory: (argsTypes: ArgsTypesOfCanister, metadata: Metadata, preApprove?: boolean) => (payload: ArrayBuffer, signInfo?: SignInfo) => Promise<ArrayBuffer>;
export declare const getArgTypes: (interfaceFactory: IDL.InterfaceFactory) => {};
export {};

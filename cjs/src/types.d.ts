import { Buffer } from "buffer/";
export declare type BinaryBlob = any;
export declare type DerEncodedBlob = any;
export declare function blobFromHex(hex: any): Buffer;
export declare function derBlobFromBlob(blob: any): any;
export declare function blobFromUint8Array(arr: any): Buffer;
export declare function blobFromBuffer(b: any): any;
/**
 * Encode a positive number (or bigint) into a Buffer. The number will be floored to the
 * nearest integer.
 * @param value The number to encode.
 */
export declare function lebEncode(value: bigint | number): ArrayBuffer;
export declare function blobToHex(blob: any): any;

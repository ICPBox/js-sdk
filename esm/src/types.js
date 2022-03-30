import { Buffer } from "buffer/";
export function blobFromHex(hex) {
    return Buffer.from(hex, "hex");
}
export function derBlobFromBlob(blob) {
    return blob;
}
export function blobFromUint8Array(arr) {
    return Buffer.from(arr);
}

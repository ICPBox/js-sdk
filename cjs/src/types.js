"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobToHex = exports.lebEncode = exports.blobFromBuffer = exports.blobFromUint8Array = exports.derBlobFromBlob = exports.blobFromHex = void 0;
const buffer_1 = require("buffer/");
const buffer_2 = require("./utils/buffer");
function blobFromHex(hex) {
    return buffer_1.Buffer.from(hex, "hex");
}
exports.blobFromHex = blobFromHex;
function derBlobFromBlob(blob) {
    return blob;
}
exports.derBlobFromBlob = derBlobFromBlob;
function blobFromUint8Array(arr) {
    return buffer_1.Buffer.from(arr);
}
exports.blobFromUint8Array = blobFromUint8Array;
function blobFromBuffer(b) {
    return b;
}
exports.blobFromBuffer = blobFromBuffer;
/**
 * Encode a positive number (or bigint) into a Buffer. The number will be floored to the
 * nearest integer.
 * @param value The number to encode.
 */
function lebEncode(value) {
    if (typeof value === "number") {
        value = BigInt(value);
    }
    if (value < BigInt(0)) {
        throw new Error("Cannot leb encode negative values.");
    }
    const byteLength = (value === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value)))) + 1;
    const pipe = new buffer_2.PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
    while (true) {
        const i = Number(value & BigInt(0x7f));
        value /= BigInt(0x80);
        if (value === BigInt(0)) {
            pipe.write(new Uint8Array([i]));
            break;
        }
        else {
            pipe.write(new Uint8Array([i | 0x80]));
        }
    }
    return pipe.buffer;
}
exports.lebEncode = lebEncode;
function blobToHex(blob) {
    return blob.toString("hex");
}
exports.blobToHex = blobToHex;

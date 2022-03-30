"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobFromUint8Array = exports.derBlobFromBlob = exports.blobFromHex = void 0;
const buffer_1 = require("buffer/");
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

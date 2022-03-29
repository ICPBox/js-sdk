"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveParseBigint = void 0;
const json_bigint_1 = __importDefault(require("json-bigint"));
// eslint-disable-next-line
const recursiveParseBigint = (obj) => obj ? json_bigint_1.default.parse(json_bigint_1.default.stringify(obj)) : undefined;
exports.recursiveParseBigint = recursiveParseBigint;

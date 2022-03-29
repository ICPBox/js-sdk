"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArgTypes = exports.signFactory = exports.canDecodeArgs = void 0;
const candid_1 = require("@dfinity/candid");
const bigint_1 = require("./bigint");
const proxy_1 = __importDefault(require("./proxy"));
const canDecodeArgs = (signInfo, argsTypes) => {
    var _a;
    return !!((signInfo === null || signInfo === void 0 ? void 0 : signInfo.canisterId) &&
        (signInfo === null || signInfo === void 0 ? void 0 : signInfo.methodName) &&
        (signInfo === null || signInfo === void 0 ? void 0 : signInfo.arguments) &&
        ((_a = argsTypes[signInfo.canisterId]) === null || _a === void 0 ? void 0 : _a[signInfo.methodName]));
};
exports.canDecodeArgs = canDecodeArgs;
const decodeArgs = (signInfo, argsTypes) => {
    if ((0, exports.canDecodeArgs)(signInfo, argsTypes)) {
        const assuredSignInfo = signInfo;
        const funArgumentsTypes = argsTypes[assuredSignInfo.canisterId][assuredSignInfo.methodName];
        return candid_1.IDL.decode(funArgumentsTypes, assuredSignInfo.arguments);
    }
};
const getDomainMetadata = () => {
    return {
        name: "",
        host: location.host,
    };
};
const signFactory = (argsTypes, metadata, preApprove = false) => async (payload, signInfo) => {
    const payloadArr = new Uint8Array(payload);
    if (signInfo)
        signInfo.decodedArguments = signInfo.arguments
            ? (0, bigint_1.recursiveParseBigint)(decodeArgs(signInfo, argsTypes))
            : [];
    const res = await (0, proxy_1.default)("requestSign", [
        payloadArr,
        metadata,
        Object.assign(Object.assign({}, signInfo), { preApprove }),
    ]);
    return res.result.data;
};
exports.signFactory = signFactory;
const getArgTypes = (interfaceFactory) => {
    const service = interfaceFactory({ IDL: candid_1.IDL });
    const methodArgType = {};
    service._fields.forEach(([methodName, fun]) => (methodArgType[methodName] = fun.argTypes));
    return methodArgType;
};
exports.getArgTypes = getArgTypes;

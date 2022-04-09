import { IDL } from "@dfinity/candid";
import proxy from "./proxy";
export const canDecodeArgs = (signInfo, argsTypes) => {
    var _a;
    return !!((signInfo === null || signInfo === void 0 ? void 0 : signInfo.canisterId) &&
        (signInfo === null || signInfo === void 0 ? void 0 : signInfo.methodName) &&
        (signInfo === null || signInfo === void 0 ? void 0 : signInfo.arguments) &&
        ((_a = argsTypes[signInfo.canisterId]) === null || _a === void 0 ? void 0 : _a[signInfo.methodName]));
};
const decodeArgs = (signInfo, argsTypes) => {
    if (canDecodeArgs(signInfo, argsTypes)) {
        const assuredSignInfo = signInfo;
        const funArgumentsTypes = argsTypes[assuredSignInfo.canisterId][assuredSignInfo.methodName];
        return IDL.decode(funArgumentsTypes, assuredSignInfo.arguments);
    }
};
const decoder = new TextDecoder();
export const signFactory = (argsTypes, metadata, preApprove = false) => async (payload, signInfo) => {
    const payloadArr = new Uint8Array(payload);
    if (signInfo)
        signInfo.decodedArguments = signInfo.arguments
            ? decodeArgs(signInfo, argsTypes)
            : [];
    const res = await proxy("requestSign", [
        payloadArr,
        metadata,
        Object.assign(Object.assign({}, signInfo), { arguments: decoder.decode(signInfo === null || signInfo === void 0 ? void 0 : signInfo.arguments), preApprove }),
    ]);
    return res.result.data;
};
export const getArgTypes = (interfaceFactory) => {
    const service = interfaceFactory({ IDL });
    const methodArgType = {};
    service._fields.forEach(([methodName, fun]) => (methodArgType[methodName] = fun.argTypes));
    return methodArgType;
};

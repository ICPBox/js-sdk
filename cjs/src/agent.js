"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActor = exports.createAgent = void 0;
const agent_1 = require("@dfinity/agent");
const constants_1 = require("./constants");
const identity_1 = require("./identity");
const sign_1 = require("./sign");
const publicKey_1 = __importDefault(require("./publicKey"));
const types_1 = require("./types");
const DEFAULT_HOST = constants_1.IC_MAINNET_URLS[0];
/* eslint-disable @typescript-eslint/no-unused-vars */
const DEFAULT_CREATE_AGENT_ARGS = {
    whitelist: [],
    host: DEFAULT_HOST,
};
const createAgent = async (publicKey, { whitelist = DEFAULT_CREATE_AGENT_ARGS.whitelist, host = DEFAULT_CREATE_AGENT_ARGS.host, }, idls, preApprove = false) => {
    const key = publicKey_1.default.fromRaw((0, types_1.blobFromHex)(publicKey));
    const identity = new identity_1.WalletIdentity(key, (0, sign_1.signFactory)(idls, { host, name: "host" }, preApprove), whitelist);
    const agent = new agent_1.HttpAgent({
        identity,
        host,
    });
    if (!constants_1.IC_MAINNET_URLS.includes(host)) {
        await agent.fetchRootKey();
    }
    return agent;
};
exports.createAgent = createAgent;
const createActor = async (agent, canisterId, interfaceFactory) => {
    return agent_1.Actor.createActor(interfaceFactory, {
        agent: agent,
        canisterId,
    });
};
exports.createActor = createActor;

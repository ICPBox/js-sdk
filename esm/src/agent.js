import { HttpAgent, Actor } from "@dfinity/agent";
import { IC_MAINNET_URLS } from "./constants";
import { WalletIdentity } from "./identity";
import { signFactory } from "./sign";
import PublicKey from "./publicKey";
import { blobFromHex } from "@dfinity/candid";
const DEFAULT_HOST = IC_MAINNET_URLS[0];
/* eslint-disable @typescript-eslint/no-unused-vars */
const DEFAULT_CREATE_AGENT_ARGS = {
    whitelist: [],
    host: DEFAULT_HOST,
};
export const createAgent = async (publicKey, { whitelist = DEFAULT_CREATE_AGENT_ARGS.whitelist, host = DEFAULT_CREATE_AGENT_ARGS.host, }, idls, preApprove = false) => {
    const key = PublicKey.fromRaw(blobFromHex(publicKey));
    const identity = new WalletIdentity(key, signFactory(idls, { host, name: "host" }, preApprove), whitelist);
    const agent = new HttpAgent({
        identity,
        host,
    });
    if (!IC_MAINNET_URLS.includes(host)) {
        await agent.fetchRootKey();
    }
    return agent;
};
export const createActor = async (agent, canisterId, interfaceFactory) => {
    return Actor.createActor(interfaceFactory, {
        agent: agent,
        canisterId,
    });
};

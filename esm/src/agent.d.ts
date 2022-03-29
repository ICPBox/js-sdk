import { HttpAgent, ActorSubclass } from "@dfinity/agent";
export interface CreateAgentParams {
    whitelist?: string[];
    host?: string;
}
export declare const createAgent: (publicKey: string, { whitelist, host, }: CreateAgentParams, idls: any, preApprove?: boolean) => Promise<HttpAgent>;
export declare const createActor: <T>(agent: any, canisterId: string, interfaceFactory: any) => Promise<ActorSubclass<T>>;

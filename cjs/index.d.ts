declare global {
    interface Window {
        ReactNativeWebView: any;
        __isIcpBoxConnected: boolean;
    }
}
declare type PayType = {
    amount: string;
    to: string;
    host?: string;
    icon?: string;
    memo?: string;
    fee?: string;
};
declare const _default: {
    readonly webview: any;
    readonly publicKey: any;
    setPublickKey(val: any): void;
    check: () => boolean;
    isConnected: () => Promise<{
        result: any;
        status: string;
    }>;
    authorize: (opts: {
        canisters: string[];
        host?: string;
        icon?: string;
    }) => Promise<{
        result: any;
        status: string;
    }>;
    pay: (data: PayType) => Promise<{
        result: any;
        status: string;
    }>;
    createActor({ canisterId, interfaceFactory }: {
        canisterId: any;
        interfaceFactory: any;
    }): Promise<import("@dfinity/agent").Actor>;
    /**
     * dis connect wallet
     */
    disConnect(): Promise<{
        result: any;
        status: string;
    }>;
};
export default _default;

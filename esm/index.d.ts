declare global {
    interface Window {
        ReactNativeWebView: any;
        __isIcpBoxConnected: boolean;
    }
}
declare const _default: {
    readonly webview: any;
    check: () => boolean;
    isConnected: () => Promise<unknown>;
    authorize: (opts: {
        canisters: string[];
        host?: string;
        icon?: string;
    }) => Promise<unknown>;
    pay: (data: {
        amount: string;
        to: string;
        host?: string;
        icon?: string;
        memo?: string;
        fee?: string;
    }) => Promise<unknown>;
};
export default _default;

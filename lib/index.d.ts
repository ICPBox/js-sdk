declare global {
    interface Window {
        ReactNativeWebView: any;
    }
}
declare const _default: {
    webview: any;
    isConnected: () => void;
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

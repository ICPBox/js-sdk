export default function (method: string, payload: Record<string, string | number | string[]>, info?: any): Promise<{
    result: any;
    status: string;
}>;

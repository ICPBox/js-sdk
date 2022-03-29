export default function (method: string, payload: Record<string, string | number | string[]>): Promise<{
    result: any;
    status: string;
}>;

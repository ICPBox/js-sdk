import type { Principal } from "@dfinity/principal";
export interface ErrorInfo {
  code: number;
  message: string;
}
export type GetQuotaActorResponse = { Ok: number } | { Err: ErrorInfo };
export type QuotaType = { LenEq: number } | { LenGte: number };

export default interface _SERVICE {
  get_quota: (
    arg_0: Principal,
    arg_1: QuotaType
  ) => Promise<GetQuotaActorResponse>;
}

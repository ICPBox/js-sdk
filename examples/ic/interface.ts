import type { Principal } from "@dfinity/principal";
export interface ErrorInfo {
  code: number;
  message: string;
}
export interface PriceTable {
  icp_xdr_conversion_rate: bigint;
  items: Array<PriceTableItem>;
}

export interface PriceTableItem {
  len: number;
  price_in_icp_e8s: bigint;
  price_in_xdr_permyriad: bigint;
}

export type GetQuotaActorResponse = { Ok: number } | { Err: ErrorInfo };
export type QuotaType = { LenEq: number } | { LenGte: number };
export type GetPriceTableResponse = { Ok: PriceTable } | { Err: ErrorInfo };

export default interface _SERVICE {
  get_price_table: () => Promise<GetPriceTableResponse>;

  get_quota: (
    arg_0: Principal,
    arg_1: QuotaType
  ) => Promise<GetQuotaActorResponse>;
}

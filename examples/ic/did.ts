export const idlFactory = ({ IDL }) => {
  const QuotaType = IDL.Variant({ LenEq: IDL.Nat8, LenGte: IDL.Nat8 });
  const ErrorInfo = IDL.Record({ code: IDL.Nat32, message: IDL.Text });

  const PriceTableItem = IDL.Record({
    len: IDL.Nat8,
    price_in_icp_e8s: IDL.Nat64,
    price_in_xdr_permyriad: IDL.Nat64,
  });

  const PriceTable = IDL.Record({
    icp_xdr_conversion_rate: IDL.Nat64,
    items: IDL.Vec(PriceTableItem),
  });

  const GetQuotaActorResponse = IDL.Variant({
    Ok: IDL.Nat32,
    Err: ErrorInfo,
  });

  const GetPriceTableResponse = IDL.Variant({
    Ok: PriceTable,
    Err: ErrorInfo,
  });

  return IDL.Service({
    get_price_table: IDL.Func([], [GetPriceTableResponse], []),
    get_quota: IDL.Func(
      [IDL.Principal, QuotaType],
      [GetQuotaActorResponse],
      ["query"]
    ),
  });
};
export const init = ({ IDL }) => {
  return [];
};

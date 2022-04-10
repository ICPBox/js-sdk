export const idlFactory = ({ IDL }) => {
  const QuotaType = IDL.Variant({ LenEq: IDL.Nat8, LenGte: IDL.Nat8 });
  const ErrorInfo = IDL.Record({ code: IDL.Nat32, message: IDL.Text });

  const GetQuotaActorResponse = IDL.Variant({
    Ok: IDL.Nat32,
    Err: ErrorInfo,
  });

  return IDL.Service({
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

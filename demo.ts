//@ts-nocheck
window.global = window;
import icpbox from "./index";
(async function () {
  const check = async function () {
    const connected = await icpbox.isConnected();
    document.getElementById("status-connect").innerText = connected
      ? "connectd"
      : "not connected";
  };

  const auth = async function () {
    try {
      const data = await icpbox.authorize({
        canisters: [
          "quctq-dsfdf-asdfs-dsfds-asd",
          "quctq-dsfdf-asdfs-dsfds-a2d",
        ],
      });
      icpbox.setPublickKey(data.publicKey);
      console.log("auth ok: ", data, icpbox.publicKey);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const callUpdate = async function () {
    const nnsCanisterId = "qoctq-giaaa-aaaaa-aaaea-cai";

    const nnsPartialInterfaceFactory = ({ IDL }) => {
      const BlockHeight = IDL.Nat64;
      const Stats = IDL.Record({
        latest_transaction_block_height: BlockHeight,
        seconds_since_last_ledger_sync: IDL.Nat64,
        sub_accounts_count: IDL.Nat64,
        hardware_wallet_accounts_count: IDL.Nat64,
        accounts_count: IDL.Nat64,
        earliest_transaction_block_height: BlockHeight,
        transactions_count: IDL.Nat64,
        block_height_synced_up_to: IDL.Opt(IDL.Nat64),
        latest_transaction_timestamp_nanos: IDL.Nat64,
        earliest_transaction_timestamp_nanos: IDL.Nat64,
      });
      return IDL.Service({
        get_stats: IDL.Func([], [Stats], ["query"]),
      });
    };

    // Create an actor to interact with the NNS Canister
    try {
      const NNSUiActor = await icpbox.createActor({
        canisterId: nnsCanisterId,
        interfaceFactory: nnsPartialInterfaceFactory,
      });

      const stats = await NNSUiActor.get_stats();
      console.log("NNS stats", stats);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const buy = async function () {
    try {
      const data = await icpbox.pay({
        amount: "0.01",
        to: "icpnftfi.icp",
        memo: "392432",
      });
    } catch (error) {
      console.log(error);
    }
  };

  $("document").ready(function () {
    $("#check").on("click", check);
    $("#auth").on("click", auth);
    $("#buy").on("click", buy);
    $("#call-canister").on("click", callUpdate);
  });
})();

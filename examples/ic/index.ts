import { idlFactory } from "./did";
import IC from "./interface";
import icpbox from "../../index";

import { ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export default async () => {
  const canisterId = "onof3-pyaaa-aaaal-qac6a-cai";

  const actor = await icpbox.createActor<IC>({
    canisterId,
    interfaceFactory: idlFactory,
  });

  const quota = await actor.get_quota(
    Principal.fromText(
      "nmfh2-f7y7y-gkelu-x2z7h-rjynj-wcn4n-u47my-hxi7f-irne2-nungu-4ae"
    ),
    { LenGte: 7 }
  );

  const table = await actor.get_price_table();

  console.log("quota: ", quota, table);
};

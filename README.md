## js-sdk


### install

```
npm login --registry=https://npm.pkg.github.com --scope=@icpbox

npm install @icpbox/js-sdk
```


### import

```
import icpbox from "@icpbox/js-sdk";
```


### check env



```
icpbox.check();
```

### check if dapp is connected

```js
const isChecked = icpbox.isconnected();
```


### connect dapp


| option    | required | type               | example                         |
| --------- | -------- | ------------------ | ------------------------------- |
| canisters | true     | string \| string[] | []                              |
| logo      | false    | string             | http://placeholder.org/test.png |

```js
await icpbox.authorize({
  canisters: [
    ['canister_id', 'name', 'icon'],
    'canister_id'
  ]
}); 
```

### create actor
- authorize is required to create actor

```
  const nnsCanisterId = 'qoctq-giaaa-aaaaa-aaaea-cai';

  const nnsPartialInterfaceFactory = ({ IDL }) => {
    const BlockHeight = IDL.Nat64;
    const Stats = IDL.Record({
      'latest_transaction_block_height': BlockHeight,
      'seconds_since_last_ledger_sync': IDL.Nat64,
      'sub_accounts_count': IDL.Nat64,
      'hardware_wallet_accounts_count': IDL.Nat64,
      'accounts_count': IDL.Nat64,
      'earliest_transaction_block_height': BlockHeight,
      'transactions_count': IDL.Nat64,
      'block_height_synced_up_to': IDL.Opt(IDL.Nat64),
      'latest_transaction_timestamp_nanos': IDL.Nat64,
      'earliest_transaction_timestamp_nanos': IDL.Nat64,
    });
    return IDL.Service({
      'get_stats': IDL.Func([], [Stats], ['query']),
    });
  };

  // Create an actor to interact with the NNS Canister
  try {
    const NNSUiActor = await icpbox.createActor({
      canisterId: nnsCanisterId,
      interfaceFactory: nnsPartialInterfaceFactory,
    });

    const stats = await NNSUiActor.get_stats();
    console.log('NNS stats', stats);
  } catch (error) {
    console.log('error: ', error);
  }
```

### make payment

| option | required | type   | example      |
| ------ | -------- | ------ | ------------ |
| amount | true     | string |              |
| fee    | false    | strubg |              |
| to     | true     | string |              |
| memo   | true     | string | order_number |

```js
await icpbox.buy({
  to: "icpnftfi.icp",
  amount: "2",
  memo: "1232" // normally an order number is supplied
});
```

### disconnect dapp

```
icpbox.disConnect();
```
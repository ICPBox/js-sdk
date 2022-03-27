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
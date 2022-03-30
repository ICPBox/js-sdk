var K=Object.defineProperty,P=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var w=(t,r,e)=>r in t?K(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,f=(t,r)=>{for(var e in r||(r={}))T.call(r,e)&&w(t,e,r[e]);if(m)for(var e of m(r))v.call(r,e)&&w(t,e,r[e]);return t},b=(t,r)=>P(t,S(r));import{J as E,I as F,d as q,S as x,P as d,b as p,H as B,A as U}from"./vendor.ce23620d.js";const C=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const a of c)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(c){const a={};return c.integrity&&(a.integrity=c.integrity),c.referrerpolicy&&(a.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?a.credentials="include":c.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(c){if(c.ep)return;c.ep=!0;const a=e(c);fetch(c.href,a)}};C();const H=t=>t?E.parse(E.stringify(t)):void 0;let W=1;function l(t,r){const e=window.ReactNativeWebView;return new Promise((o,c)=>{e.postMessage(JSON.stringify({action:t,data:r,_cb:W}));const a=function(n){const{status:i}=n.detail;return i==="success"?o(n.detail):c(n.detail)};window.addEventListener(`dapp_${t}`,a,{capture:!0,once:!0})})}const D=(t,r)=>{var e;return!!((t==null?void 0:t.canisterId)&&(t==null?void 0:t.methodName)&&(t==null?void 0:t.arguments)&&((e=r[t.canisterId])==null?void 0:e[t.methodName]))},L=(t,r)=>{if(D(t,r)){const e=t,o=r[e.canisterId][e.methodName];return q(o,e.arguments)}},O=(t,r,e=!1)=>async(o,c)=>{const a=new Uint8Array(o);return c&&(c.decodedArguments=c.arguments?H(L(c,t)):[]),(await l("requestSign",[a,r,b(f({},c),{preApprove:e})])).result.data},G=t=>{const r=t({IDL:F}),e={};return r._fields.forEach(([o,c])=>e[o]=c.argTypes),e},g=["https://mainnet.dfinity.network","ic0.app"];class X extends x{constructor(r,e,o){super();this.signCb=e,this.publicKey=r,this.signCb=e,this.whitelist=o||[]}getPublicKey(){return this.publicKey}async sign(r,e){return await this.signCb(r,{sender:(e==null?void 0:e.sender)&&d.from(e.sender).toString(),methodName:e==null?void 0:e.method_name,requestType:e==null?void 0:e.request_type,canisterId:(e==null?void 0:e.canister_id)&&d.from(e.canister_id).toString(),arguments:e==null?void 0:e.arg,manual:!1})}getPrincipal(){return this._principal||(this._principal=d.selfAuthenticating(this.publicKey.toDer())),this._principal}}function Y(t){return p.Buffer.from(t,"hex")}function A(t){return p.Buffer.from(t)}const s=class{static fromRaw(t){return new s(t)}static fromDer(t){return new s(this.derDecode(t))}static from(t){return this.fromDer(t.toDer())}static derEncode(t){if(t.byteLength!==s.RAW_KEY_LENGTH){const e=t.byteLength;throw new TypeError(`secp256k1 public key must be ${s.RAW_KEY_LENGTH} bytes long (is ${e})`)}const r=Uint8Array.from([...s.DER_PREFIX,...new Uint8Array(t)]);return A(r)}static derDecode(t){const r=s.DER_PREFIX.length+s.RAW_KEY_LENGTH;if(t.byteLength!==r){const o=t.byteLength;throw new TypeError(`secp256k1 DER-encoded public key must be ${r} bytes long (is ${o})`)}const e=A(t.subarray(s.DER_PREFIX.length));if(!this.derEncode(e).equals(t))throw new TypeError(`secp256k1 DER-encoded public key is invalid. A valid secp256k1 DER-encoded public key must have the following prefix: ${s.DER_PREFIX}`);return e}constructor(t){this.rawKey=t,this.derKey=s.derEncode(t)}toDer(){return this.derKey}toRaw(){return this.rawKey}};let _=s;_.RAW_KEY_LENGTH=65;_.DER_PREFIX=Uint8Array.from([48,86,48,16,6,7,42,134,72,206,61,2,1,6,5,43,129,4,0,10,3,66,0]);const z=g[0],N={whitelist:[],host:z},J=async(t,{whitelist:r=N.whitelist,host:e=N.host},o,c=!1)=>{const a=_.fromRaw(Y(t)),n=new X(a,O(o,{host:e,name:"host"},c),r),i=new B({identity:n,host:e});return g.includes(e)||await i.fetchRootKey(),i},M=async(t,r,e)=>U.createActor(e,{agent:t,canisterId:r});window.Buffer=window.Buffer||p.Buffer;let y,h;const R=[];var u={get webview(){return window.ReactNativeWebView},get publicKey(){return h},setPublickKey(t){h=t},check:function(){return"ReactNativeWebView"in window},isConnected:function(){return l("isConnected",{})},authorize:function(t){return t.host=location.host,t.icon=t.icon||location.origin+"/favicon.ico",l("authorize",t)},pay:function(t){return t.host=t.host||location.host,t.icon=t.icon||location.origin+"/favicon.ico",t.fee=t.fee||"10000",l("pay",t)},async createActor({canisterId:t,interfaceFactory:r}){return R[t]=G(r),y||(y=await J(h,{whitelist:[t]},R)),M(y,t,r)},disConnect(){return l("disConnect",{host:location.host})}};window.global=window;(async function(){const t=async function(){const c=await u.isConnected();document.getElementById("status-connect").innerText=c?"connectd":"not connected"},r=async function(){try{const c=await u.authorize({canisters:["quctq-dsfdf-asdfs-dsfds-asd","quctq-dsfdf-asdfs-dsfds-a2d"]});u.setPublickKey(c.publicKey),console.log("auth ok: ",c,u.publicKey)}catch(c){console.log("error: ",c)}},e=async function(){const c="qoctq-giaaa-aaaaa-aaaea-cai",a=({IDL:n})=>{const i=n.Nat64,k=n.Record({latest_transaction_block_height:i,seconds_since_last_ledger_sync:n.Nat64,sub_accounts_count:n.Nat64,hardware_wallet_accounts_count:n.Nat64,accounts_count:n.Nat64,earliest_transaction_block_height:i,transactions_count:n.Nat64,block_height_synced_up_to:n.Opt(n.Nat64),latest_transaction_timestamp_nanos:n.Nat64,earliest_transaction_timestamp_nanos:n.Nat64});return n.Service({get_stats:n.Func([],[k],["query"])})};try{const i=await(await u.createActor({canisterId:c,interfaceFactory:a})).get_stats();console.log("NNS stats",i)}catch(n){console.log("error: ",n)}},o=async function(){try{const c=await u.pay({amount:"0.01",to:"icpnftfi.icp",memo:"392432"})}catch(c){console.log(c)}};$("document").ready(function(){$("#check").on("click",t),$("#auth").on("click",r),$("#buy").on("click",o),$("#call-canister").on("click",e)})})();

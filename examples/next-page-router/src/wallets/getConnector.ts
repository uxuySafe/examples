"use client";
import  type { WalletTgSdk} from "@uxuycom/web3-tg-sdk";
let sdkModule: { WalletTgSdk } | null = null;
if(typeof window!== "undefined"){
    sdkModule = require("@uxuycom/web3-tg-sdk")
}

export default (options?:initOptions) => {
    if (typeof window !== "undefined") return new sdkModule.WalletTgSdk(options);
    return null;
}
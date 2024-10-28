import type { WalletTgSdk } from '@uxuycom/web3-tg-sdk';

let SDk: WalletTgSdk | undefined;
if (typeof window !== 'undefined') {
    const { WalletTgSdk } = require('@uxuycom/web3-tg-sdk');
    SDk = new WalletTgSdk();
}


export  function getSdk(){
    return SDk; 
}   

export function getTgEthereum(){
    return SDk?.ethereum;
}

export function getSolana(){
    return SDk?.solana;
}



export default {
    getSdk,
    getTgEthereum,
    getSolana
};
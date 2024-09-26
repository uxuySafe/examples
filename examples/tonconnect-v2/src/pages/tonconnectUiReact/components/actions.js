// @ts-nocheck
import { TonConnectButton, useTonAddress, useTonWallet, Locales, useTonConnectUI, useTonConnectModal, useIsConnectionRestored } from "@tonconnect/ui-react"
import { useEffect } from "react";
import { loadMessageRelaxed,  loadMessage, loadTransaction, beginCell, toNano, Address, BitBuilder, BitReader, Cell, Dictionary, address, JettonMaster, TonClient, internal, storeMessage, storeMessageRelaxed } from '@ton/ton'
import TonWeb from "tonweb"


function delay(ms=500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function getTokenData(params) {
    const defaultDecimals = 9;
    try {

        const provider = new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC')
        const tonweb = new TonWeb(
            provider
        );

        const tokenData = await provider.send("getTokenData", {
            address: params.tokenAddr,
        })


    

        // const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, { address: params.tokenAddr });
        // const data = await jettonMinter.getJettonData();
        // console.log('Total supply:', data.totalSupply.toString());
        // console.log('URI to off-chain metadata:', data.jettonContentUri);



        // const json = tokenData?.jetton_content?.data?.uri


        //    const jsondata = await axios.get(json)
        // debugger
        return tokenData?.jetton_content?.data?.decimals


        // return defaultDecimals;
    } catch (err) {

        console.log(err);
        // TODO: handle error
        throw new Error('Failed to get token data');

    }
    return defaultDecimals;
}


export const ModalControl = () => {
    const { state, open, close } = useTonConnectModal();

    return (
        <div>
            <div>Modal state: {state?.status}</div>
            <button onClick={open}>Open modal</button>
            <button onClick={close}>Close modal</button>
        </div>
    );
};

export const Wallet = () => {
    const wallet = useTonWallet();

    return (
        wallet && (
            <div>
                <span>Connected wallet: {wallet.name}</span>
                <span>Device: {wallet.device.appName}</span>
            </div>
        )
    );
};

export const AddressBlock = () => {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    return (
        rawAddress && (
            <div>
                <span>User-friendly address: {userFriendlyAddress}</span>
                <span>Raw address: {rawAddress}</span>
            </div>
        )
    );
};




export const Methods = () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();
    // const rawAddress = useTonAddress(false);
    const rawAddress = useTonAddress();

    const onLanguageChange = (lang) => {
        setOptions({ language: lang });
    };
    async function deployContract() {
        let code = TonWeb.boc.Cell.oneFromBoc(TonWeb.utils.base64ToBytes('te6cckEBAgEARAABFP8A9KQT9LzyyAsBAGrTMAGCCGlJILmRMODQ0wMx+kAwi0ZG9nZYcCCAGMjLBVAEzxaARfoCE8tqEssfAc8WyXP7AN4uuM8='));
        let data = new TonWeb.boc.Cell();
        data.bits.writeUint(Math.floor(new Date()), 64);

        let state_init = new TonWeb.boc.Cell();
        state_init.bits.writeUint(6, 5);
        state_init.refs.push(code);
        state_init.refs.push(data);

        let state_init_boc = TonWeb.utils.bytesToBase64(await state_init.toBoc());
        console.log(state_init_boc);
        //  te6ccsEBBAEAUwAABRJJAgE0AQMBFP8A9KQT9LzyyAsCAGrTMAGCCGlJILmRMODQ0wMx+kAwi0ZG9nZYcCCAGMjLBVAEzxaARfoCE8tqEssfAc8WyXP7AAAQAAABhltsPJ+MirEd

        let doge_address = '0:' + TonWeb.utils.bytesToHex(await state_init.hash());
        console.log();
        //  0:1c7c35ed634e8fa796e02bbbe8a2605df0e2ab59d7ccb24ca42b1d5205c735ca

        const tx = {
            validUntil: Math.floor(new Date() / 1000) + 360,
            messages: [
                {
                    address: doge_address,
                    amount: "69000000",
                    payload: "te6ccsEBAQEAHQAAADYAAAAAVE9OIENvbm5lY3QgMiB0dXRvcmlhbCFdy+mw",
                    stateInit: state_init_boc
                }
            ]
        }
        console.log(tx)
        const result = await tonConnectUI.sendTransaction(tx)

        console.log({
            result,
            tx

        })
        return result
    }

    async function sendTon() {
        const myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
            messages: [
                {
                    address: "UQCiLpPEi53uFdA4r3fNSZc_XMBJrtG24B4nzL7dPhQ3nytp",
                    amount: "1",
                    // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
                },
                // {
                //     address: "UQAvIWV8KxUsqWk5k639PLID_9NlaiVSqGbVcc-IdKPZOrjc",
                //     amount: "600000",
                //     // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
                // }
            ]
        }
        const result = await tonConnectUI.sendTransaction(myTransaction)
        return result
    }

    async function sendTokens() {

        const tonkenAddr = "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs"
        const tonkenAddr2 = "EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS"
     
        // transfer#0f8a7ea5 query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress
        // response_destination:MsgAddress custom_payload:(Maybe ^Cell)
        // forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell)
        // = InternalMsgBody;
        const decimals = await getTokenData({
            tokenAddr: tonkenAddr
        })
        await delay()
        const decimals2 = await getTokenData({
            tokenAddr: tonkenAddr2
        })
        await delay()

        async function getUserWalletAddress({
            walletAddr,
            tokenAddr
        }) {
            const client = new TonClient({
                endpoint: 'https://toncenter.com/api/v2/jsonRPC',
            });
            const userAddressCell = beginCell().storeAddress(walletAddr).endCell()
            const response = await client.runMethod(tokenAddr, "get_wallet_address", [
                {type: "slice", cell: userAddressCell}
            ])
            return response.stack.readAddress()
        }

        async function getJettonWalletAddr(params) {
            const tonweb = new TonWeb();

            const masterAddr = new TonWeb.utils.Address(params.tokenAddr);

            const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, { address: masterAddr });
            const WalletAddress = await jettonMinter.getJettonWalletAddress(new TonWeb.utils.Address(params.walletAddr));

            const jettonWalletAddr = WalletAddress.toString(true, true, true, false);

            return jettonWalletAddr;
        }


        // const jettonMasterAddress = Address.parse(tonkenAddr) // for example EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE
        // const jettonMasterAddress2 = Address.parse(tonkenAddr2) // for example EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE
        // // const userAddress = Address.parse(userFriendlyAddress)

        await delay()
        const jettonWalletContract = await getJettonWalletAddr({
            tokenAddr: tonkenAddr,
            walletAddr: rawAddress
        })
        await delay()
        const jettonWalletContract2 = await getJettonWalletAddr({
            tokenAddr: tonkenAddr2,
            walletAddr: rawAddress
        })
   

        // const jettonWalletContractto2 = await getJettonWalletAddr({
        //     tokenAddr: tonkenAddr2,
        //     walletAddr: "UQAvIWV8KxUsqWk5k639PLID_9NlaiVSqGbVcc-IdKPZOrjc"
        // })




  
   
        const body = beginCell()
            .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
            .storeUint(0, 64)
            .storeCoins(BigInt(10 ** Number(decimals) * "0.02")) // jetton amount, amount * 10^9
            // .storeAddress(Address.parse('UQCUrA0OWr6im22OT39CkfjNnHSwOF8sPySNcenEdL4IM1a4'))
            .storeAddress(Address.parse('UQBU71lsTYGpm6yAj5fiJewayGmcqi_qod75Ddn7DA3n383b'))
            .storeAddress(Address.parse(rawAddress)) // response destination
            .storeBit(0) // no custom payload
            .storeCoins(toNano(0.002)) // forward amount - if >0, will send notification message
            .storeBit(false) // we store forwardPayload as a reference
            .storeCoins(BigInt("1"))
            .storeBit(false)
            .endCell();

        const forwardPayload = beginCell()
            .storeUint(0, 32) // 0 opcode means we have a comment
            .storeStringTail('Hello')
            .endCell();

        const body2 = beginCell()
            .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
            .storeUint(0, 64)
            .storeCoins(BigInt(10 ** decimals2 * '1')) // jetton amount, amount * 10^9
            // .storeAddress(Address.parse('UQAvIWV8KxUsqWk5k639PLID_9NlaiVSqGbVcc-IdKPZOrjc'))
            .storeAddress(Address.parse('UQBU71lsTYGpm6yAj5fiJewayGmcqi_qod75Ddn7DA3n383b'))
            .storeAddress(Address.parse(rawAddress)) // response destination
            .storeBit(0) // no custom payload
            .storeCoins(toNano(0.002)) // forward amount - if >0, will send notification message
            .storeBit(false) // we store forwardPayload as a reference
            .storeCoins(BigInt("1"))
            .storeBit(false)
            .endCell();
        // .storeRef(forwardPayload)
        // .endCell();






        const myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
            messages: [
                {
                    address: jettonWalletContract, // sender jetton wallet
                    amount: toNano("0.05").toString(), // for commission fees, excess will be returned
                    payload: body.toBoc().toString("base64") // payload with jetton transfer and comment body
                },
                {
                    address: jettonWalletContract2, // sender jetton wallet
                    amount: toNano("0.05").toString(), // for commission fees, excess will be returned
                    payload: body2.toBoc().toString("base64") // payload with jetton transfer and comment body
                }
            ]
        }

        console.log(myTransaction)

        const result = await tonConnectUI.sendTransaction(myTransaction)
        return result



    }

    



    return (
        <div>
            <button onClick={() => deployContract()}>
                deployContract
            </button>
            <button onClick={() => sendTon()}>
                Send Ton
            </button>

            <button onClick={() => sendTokens()}>
                Send Tokens
            </button>

            <div>
                <label>language</label>
                <select onChange={e => onLanguageChange(e.target.value)}>
                    <option value="en">en</option>
                    <option value="ru">ru</option>
                </select>
            </div>
        </div>
    );
};





async function SetConnectRequestParameters(tonConnectUI) {



    // enable ui loader
    tonConnectUI.setConnectRequestParameters({ state: 'loading' });

    // fetch you tonProofPayload from the backend
    const tonProofPayload = await new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve("base64bocblahblahblah==");
        }, 10000);

    })

    if (!tonProofPayload) {
        // remove loader, connect request will be without any additional parameters
        tonConnectUI.setConnectRequestParameters(null);
    } else {
        // add tonProof to the connect request
        tonConnectUI.setConnectRequestParameters({
            state: "ready",
            value: { tonProof: tonProofPayload }
        });
    }
}



export const TonConnectUI = () => {
    const [tonConnectUI] = useTonConnectUI();
    const connectionRestored = useIsConnectionRestored()


    useEffect(() => {
        SetConnectRequestParameters(tonConnectUI);
    }, []);

    useEffect(() => tonConnectUI.onStatusChange(wallet => {
        if (wallet?.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {

            console.log('proof', wallet.connectItems.tonProof.proof)
        }
    }), []);

    if (!connectionRestored) {
        return <div>Please wait...</div>;
    }
    return (

        <div>
            <button onClick={() => tonConnectUI.openSingleWalletModal("uxuyTonWallet")}>Connect to UXUY Wallet</button>
            <TonConnectButton>
                Connect to TON UI
            </TonConnectButton>

            <AddressBlock />

            <Wallet />
            <ModalControl />
            <Methods />

        </div>
    );
}





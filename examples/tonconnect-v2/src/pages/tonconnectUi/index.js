import { Address } from '@ton/ton';
import { TonConnectUI, isWalletInfoRemote, isWalletInfoCurrentlyInjected } from '@tonconnect/ui'
import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';





const tonConnectUI =  new TonConnectUI({
    // onClick
    restoreConnection: true,
    walletsListConfiguration: {
        includeWallets: [
            {


                name: "UXUY Wallet",
                appName: "uxuyTonWallet",


                // we will support tonconnect-v2 in the future
                // jsBridgeKey: "uxuyTonWallet",
                // injected: true,

                universalLink: "https://t.me/UXUYbot/app",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                imageUrl: "https://raw.githubusercontent.com/uxuycom/uxuy-docsite/main/static/assets/UXUYWallet-logo/UXUYWallet_logo_circle.svg",
                platforms: ["android", "ios", "linux", "windows", "macos"],
            },
            {
                name: "tonwallet.app",
                appName: "tonkeeper Wallet",
                jsBridgeKey: "tonkeeper",
                injected: true,

                // universalLink: "https://link.uxuy.id",
                // bridgeUrl: "https://link.uxuy.id/bridge.html",
                imageUrl: "https://tonkeeper.com/assets/tonconnect-icon.png",
                platforms: ['chrome', 'firefox', 'safari'],
            },

        ]
    },
    // tonConnectUI: 
    // buttonRootId: "tonConnectUI",

    manifestUrl: "https://raw.githubusercontent.com/uxuySafe/examples/bb930d695232f2a9d900dfe69f429604dc00bbea/examples/tonconnect-v2/public/tonconnect-manifest.json",
})

export function TonConnectUiSdk() {

    const [loading, setLoading] = useState(false)

    const [wallets, setWallets] = useState([])
    const [wallet, setWallet] = useState({})


    useLayoutEffect(() => {


        const unsubscribe = tonConnectUI.onStatusChange(
            walletInfo => {
                console.log("onStatusChange", {
                    walletInfo,
                    tonConnectUI
                });
                setWallet(walletInfo)

            }
        );
        return () => {
            unsubscribe()
        }

    }, [])
    return (
        <div>
            <h1>Wallets use </h1>
            {
                wallets.map((walletInfo, index) => {
                    return <button key={index} id={walletInfo.name} onClick={
                        async () => {
                            setLoading(true)
                            let resultR
                            if (isWalletInfoRemote(walletInfo)) {
                                try {
                                    await tonConnectUI.disconnect()
                                } catch (error) {

                                }

                                resultR = await tonConnectUI.connect({
                                    universalLink: walletInfo.universalLink,
                                    bridgeUrl: walletInfo.bridgeUrl
                                }, {

                                });


                                window.open(resultR);

                            }

                            if (isWalletInfoCurrentlyInjected(walletInfo)) {
                                try {
                                    await tonConnectUI.disconnect()
                                } catch (error) {

                                }

                                resultR = await tonConnectUI.connect({
                                    jsBridgeKey: walletInfo.jsBridgeKey
                                });


                            }

                            setLoading(false)
                        }
                    }>
                        {walletInfo.name}
                    </button>
                })
            }


            <button onClick={() => tonConnectUI.openSingleWalletModal("uxuyTonWallet")}>Connect to UXUY Wallet</button>

            <button onClick={async () => { tonConnectUI.openModal() }}>openModal</button>
            {
                wallet?.account && <div>
                    <h1>Account</h1>
                    <p>Address: {wallet.account.address}</p>
                    {/* <p>Balance: {wallet.account.walletStateInit}</p> */}
                </div>
            }
            {
                wallet?.name && <div>
                    <h1>Wallet</h1>
                    <p>Name: {wallet.name}</p>
                    <p>App Name: {wallet.appName}</p>
                </div>

            }
            <button onClick={async () => { tonConnectUI.disconnect() }}>disconnect</button>



            <button onClick={async () => {
                const transaction = {
                    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
                    messages: [
                        {
                            address: "UQA_ofPvh6hDWmGGIC9ZTaULpC18HxSEDSyuRxZSH4z3mDJk",
                            amount: "100000",
                        },
                        {
                            address: "UQA_ofPvh6hDWmGGIC9ZTaULpC18HxSEDSyuRxZSH4z3mDJk",
                            amount: "600000",

                        }
                    ]
                }
                const result = await tonConnectUI.sendTransaction(transaction);


            }}>
                sendTransaction
            </button>
        </div>

    )
}

export default () => {

    return <TonConnectUiSdk />
}
import TonConnect, {
    isWalletInfoCurrentlyInjected,
    isWalletInfoRemote,
} from '@tonconnect/sdk';
import { useLayoutEffect, useState } from 'react';


const connector = new TonConnect({

    manifestUrl: "https://raw.githubusercontent.com/uxuySafe/examples/bb930d695232f2a9d900dfe69f429604dc00bbea/examples/tonconnect-v2/public/tonconnect-manifest.json"
});

export default function TonConnectUiSdk() {

    const [loading, setLoading] = useState(false)

    const [wallets, setWallets] = useState([])


    const customWallet = [
        {

            name: "UXUY Wallet",
            appName: "UXUY Wallet",

            // we will support 
            // jsBridgeKey: "uxuyTonWallet",
            // injected: true,

            universalLink: "https://t.me/UXUYbot/app",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            imageUrl: "https://raw.githubusercontent.com/uxuycom/uxuy-docsite/main/static/assets/UXUYWallet-logo/UXUYWallet_logo_circle.svg",
            platform: ['ios', "android"]

        },
        {
            name: "tonkeeper injected",
            injected: true,
            jsBridgeKey: "tonkeeper",
            platform: ['ios', "android"]
        }
    ]
    

    useLayoutEffect(() => {
        connector.restoreConnection();

        connector.getWallets().then((res) => {
            setWallets([...customWallet, ...res])
        })

        const unsubscribe = connector.onStatusChange(
            walletInfo => {
                console.log("onStatusChange", {
                    walletInfo,
                    connector
                });

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
                                    await connector.disconnect()
                                } catch (error) {

                                }
                                resultR = await connector.connect({
                                    universalLink: walletInfo.universalLink,
                                    bridgeUrl: walletInfo.bridgeUrl
                                });
                                window.open(resultR);

                            }

                            if (isWalletInfoCurrentlyInjected(walletInfo)) {
                                try {
                                    await connector.disconnect()
                                } catch (error) {

                                }

                                resultR = await connector.connect({
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
                const result = await connector.sendTransaction(transaction);


            }}>
                sendTransaction
            </button>
        </div>

    )
}
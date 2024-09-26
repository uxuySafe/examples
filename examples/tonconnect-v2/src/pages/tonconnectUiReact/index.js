
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TonConnectUI } from './components/actions';
import { useLocation } from 'react-router-dom';
export default function TonConnectUiReact() {
    return (
        <TonConnectUIProvider
            manifestUrl={`https://raw.githubusercontent.com/uxuySafe/examples/bb930d695232f2a9d900dfe69f429604dc00bbea/examples/tonconnect-v2/public/tonconnect-manifest.json`}
            walletsListConfiguration={{

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
            }}


        >
            <TonConnectUI />
        </TonConnectUIProvider>
    )
}



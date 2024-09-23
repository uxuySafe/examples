## use @rainbow-me/rainbowkit 

uxuyWallet is a wallet that integrates with the UXUY Wallet SDK. It allows users to connect their UXUY Wallet to the dApp.

[uxuyWallet](/src/wallets/uxuyWallet.ts)
``` ts 
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet,  walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

import { WagmiProvider, createConfig, http } from 'wagmi';

const logoUrl = "<app-logo-url>"
const uxuyWallet = ({
    walletConnectParameters,
    projectId,
}: DefaultWalletOptions): Wallet => {
    let provider: unknown | EIP1193Provider
    return {
        id: 'uxuyWallet',
        name: 'UXUY Wallet',
        // iconUrl: sdk.getAppInfo().logo,
        iconUrl: logoUrl,
        installed: true,
        iconBackground: '#000000',
        createConnector: (walletDetails) => {
            return createConnector((config) => ({
                ...injected({
                    // shimDisconnect: false
                })(config),
                ...walletDetails,
                getProvider: async () => {
                    if (provider) return provider
                    const { WalletTgSdk } = (await import("@uxuycom/web3-tg-sdk")).default
                    const sdk = new WalletTgSdk({
                        // @ts-ignore
                        metaData: {
                            icon: walletConnectParameters?.metadata?.icons?.[0],
                            name: walletConnectParameters?.metadata?.name,
                            description: walletConnectParameters?.metadata?.description,
                            url: walletConnectParameters?.metadata?.url,
                        }
                    })
                    provider = sdk.ethereum
                    return provider
                },
            }))
        },

    };
};

const chains: readonly [Chain, ...Chain[]] = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
];


const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [uxuyWallet, rainbowWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'test demo',
    projectId: 'YOUR_PROJECT_ID',
  }
);

const config = createConfig({
  // use rainbowkit wallets
  connectors,

  // only use wagmin connectors
  // connectors:[uxuyWalletConnector, injected()],
  chains: chains,
  // https://wagmi.sh/react/api/transports
  transports: {
    [mainnet.id]: http("<YOUR_RPC_URL>")
  }
});


```


## use wagmi

uxuyWallet is a wallet that integrates with the UXUY Wallet SDK. It allows users to connect their UXUY Wallet to the dApp.

[uxuyWalletConnector](/src/wallets/uxuyWallet.ts)
``` ts 

import { createConnector, Connector, createConfig, http } from "wagmi"
import { injected } from 'wagmi/connectors';


const logoUrl = "<app-logo-url>"

export const uxuyWalletConnector = createConnector((config) => {
    const sdk = new WalletTgSdk()
    return {
        ...injected(
            {
                shimDisconnect: false,
                target: () => ({
                    id: "uxuyWallet",
                    name: "UXUY Wallet",
                    icon: logoUrl,
                    provider: sdk.ethereum as EIP1193Provider,
                })
            }
        )(config)
    }
})

const config = createConfig({
  connectors:[uxuyWalletConnector, injected()],
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  ],
  // https://wagmi.sh/react/api/transports
  transports: {
    [mainnet.id]: http("<YOUR_RPC_URL>"),
    [polygon.id]: http("<YOUR_RPC_URL>"),
    [optimism.id]: http("<YOUR_RPC_URL>"),
    [arbitrum.id]: http("<YOUR_RPC_URL>"),
    [base.id]: http("<YOUR_RPC_URL>"),
  }
});

```
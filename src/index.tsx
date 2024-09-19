import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
import React from 'react';



import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



import { WagmiProvider, createConfig, http } from 'wagmi';
import {
  Chain,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from '@rainbow-me/rainbowkit';

import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  // sepolia,
} from 'wagmi/chains';


import {
  Wallet,
  getWalletConnectConnector,
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import {
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { AuthenticationProvider } from "./adapter/authenticationAdapter"


import { injected } from "wagmi/connectors"
import { uxuyWallet, uxuyWalletConnector } from "./wallets/uxuyWallet"


import App from './App';


const queryClient = new QueryClient();




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
      // @ts-ignore
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
    [mainnet.id]: http("<YOUR_RPC_URL>"),
    [polygon.id]: http("<YOUR_RPC_URL>"),
    [optimism.id]: http("<YOUR_RPC_URL>"),
    [arbitrum.id]: http("<YOUR_RPC_URL>"),
    [base.id]: http("<YOUR_RPC_URL>"),
  }
});








const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <WagmiProvider config={config} >
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <RainbowKitProvider>
            <App />
          </RainbowKitProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

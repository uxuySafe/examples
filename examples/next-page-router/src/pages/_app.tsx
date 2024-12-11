
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { WagmiProvider, createConfig, http } from 'wagmi';


import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  // sepolia,

} from 'wagmi/chains';


import {
  Chain,
  Wallet,
  getWalletConnectConnector,
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
  getDefaultConfig,
  Locale
} from '@rainbow-me/rainbowkit';

import {
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { AuthenticationProvider } from "../adapter/authenticationAdapter"


import { injected } from "wagmi/connectors"
import { uxuyWallet, uxuyWalletConnector } from "../wallets/uxuyWallet"



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






function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  return (
    <WagmiProvider config={config} >
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;

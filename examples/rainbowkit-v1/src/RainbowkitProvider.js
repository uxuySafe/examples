// import binanceWallet from "@binance/w3w-rainbow-connector";
import { RainbowKitProvider, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import {
  bitgetWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  okxWallet,
  phantomWallet,
  rainbowWallet,
  tokenPocketWallet,
  trustWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { uxuyWallet } from "./wallets/uxuyWallet"

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { bsc, goerli, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";



const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet, goerli, bsc], [publicProvider()]);

const projectId = "<YOUR_PROJECT_ID>";

const AppInfo = {
  appName: "GMGN",
  projectId,
};

const connectors = connectorsForWallets([
  // ...wallets,
  {
    groupName: "Popular",
    wallets: [
      uxuyWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      zerionWallet({ projectId, chains }),
      tokenPocketWallet({ chains, projectId }),
      bitgetWallet({ projectId, chains }),
      okxWallet({ projectId, chains }),
      phantomWallet({ chains }),
      walletConnectWallet({ projectId, chains, version: "2" }),
      // binanceWallet({ chains }),
      trustWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: AppInfo.appName }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const RainbowkitProvider = ({ children }: any) => {
 
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={[]}
        // initialChain=
        // theme={darkTheme({
        //   accentColor: colors.increase,
        // })}
        appInfo={AppInfo}
        locale="en-US"
        // initialChain={}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowkitProvider;

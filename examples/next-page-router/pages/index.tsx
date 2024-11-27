import Image from "next/image";
import localFont from "next/font/local";

import { getSolana } from "../sdk/uxuyWallet"
import * as  solanaWeb3 from '@solana/web3.js';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <button onClick={async () => {
          const solana = await getSolana();
          solana?.connect()
        }}>connect to Solana</button>


        <button onClick={async () => {
          const solana = await getSolana();
          // const connection = new solanaWeb3.Connection("<your endpoint>");
          const transaction = new solanaWeb3.Transaction()
          transaction.add(
            solanaWeb3.SystemProgram.transfer({
              fromPubkey: new solanaWeb3.PublicKey("Qu7RKqrqLW2rYCRMdSmoxuhA3V71bY79Pf1aFDkXKXf"),
              toPubkey: new solanaWeb3.PublicKey("Qu7RKqrqLW2rYCRMdSmoxuhA3V71bY79Pf1aFDkXKXf"),
              lamports: 0.00001 * 1e9, // 10^9 = 1 SOL
            })
          );
          transaction.feePayer = new solanaWeb3.PublicKey("Qu7RKqrqLW2rYCRMdSmoxuhA3V71bY79Pf1aFDkXKXf");
          transaction.recentBlockhash = await fetch("/api/solana-blockhash").then(response => response.json()).then(data => data.blockhash); // 最新的交易hash
          // transaction.recentBlockhash = (await connection.getRecentBlockhash())?.blockhash; // 最新的交易hash
          solana?.signTransaction(transaction)
        }}>signTransaction</button>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

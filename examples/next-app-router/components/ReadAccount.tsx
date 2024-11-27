'use client'

import React, { useState } from 'react'
import Image from "next/image";
import useUXUYSDK from '@/hooks/useUXUYSDK';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Spoiler } from '@telegram-apps/telegram-ui';

type ReadAccountProps = { }

const ReadAccount: React.FC<ReadAccountProps> = ({ }) => {

  const lp = useLaunchParams()

  const sdk = useUXUYSDK()

  const [address, setAddress] = useState()

  const handleEVMClick = () => {
    sdk?.ethereum?.enable?.().then(res => {
        sdk?.ethereum
          ?.request({ method: "eth_accounts" })
          .then((accounts) => {
              const address = accounts[0]
              setAddress(address)
          })
          .catch(err => {
            console.log(err)
          })
    })
  }

  const handleSOLClick = () => {
    sdk?.solana?.connect?.({}, false)
  }

  return (
    <>
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          NAME:
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold w-screen">
            {lp.initData?.user?.firstName} {lp.initData?.user?.lastName}
          </code>
        </li>
        <li>
          PLATEFORM:
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold w-screen">
            {lp.platform}
          </code>
        </li>
      </ol>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          onClick={handleEVMClick}
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          Connect EVM Account - {address}
        </a>
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={handleSOLClick}
          rel="noopener noreferrer"
        >
          Connect SOL Account
        </a>
      </div>
      <Spoiler>
        <div
          style={{
            background: "yellowgreen",
            height: 200,
            width: 200,
          }}
        />
      </Spoiler>
    </>
  );
}

export default ReadAccount

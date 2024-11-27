'use client'

import React from 'react'
import Image from "next/image";
import useUXUYSDK from '@/hooks/useUXUYSDK';

type ReadAccountProps = { }

const ReadAccount: React.FC<ReadAccountProps> = ({ }) => {

  const sdk = useUXUYSDK()

  const handleEVMClick = () => {
    console.log(sdk, sdk?.ethereum)
    sdk?.ethereum?.enable?.()
  }

  return (
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
        Get EVM Account
      </a>
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read our docs
      </a>
    </div>
  )
}

export default ReadAccount

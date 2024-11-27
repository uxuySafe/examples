import { useLayoutEffect, useState } from "react"
import type { WalletTgSdk } from '@uxuycom/web3-tg-sdk'

const useUXUYSDK = () => {
  const [tgSdk, setTgSdk] = useState<WalletTgSdk | null>(null)

  useLayoutEffect(() => {
    import("@uxuycom/web3-tg-sdk")
      .then(module => module.WalletTgSdk)
      .then(WalletTgSdk => {
        setTgSdk(new WalletTgSdk())
      })
  }, [])


  return tgSdk
}

export default useUXUYSDK

// @ts-ignore
import { SiweMessage } from 'siwe';
// import  type { } from "siwe/dist/types"
// import { verifyMessage, } from "ethers"
import {
    createAuthenticationAdapter,
    RainbowKitAuthenticationProvider,
    AuthenticationStatus
} from '@rainbow-me/rainbowkit';
import { useContext, useState, createContext, useEffect, useRef } from 'react';








const AUTHENTICATION_STATUS = "unauthenticated"



export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {

    const [ status, setStatus ]  = useState<AuthenticationStatus>(AUTHENTICATION_STATUS)

    
    const authenticationAdapter = useRef(createAuthenticationAdapter({
        // Check if the nonce is alphanumeric and bigger then 8 characters */
        getNonce: async () => {
            return Math.floor(Math.random() * 100000000).toString()
        },
        createMessage: ({ nonce, address, chainId }) => {
            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: 'Sign in with Ethereum to the app.',
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce,
            });
            return message
        },
        getMessageBody: ({ message }) => {
            return message.prepareMessage();
        },
        verify: async ({ message, signature }: { message: SiweMessage, signature: string }) => {
            const result = await message.verify({
                signature: signature
            })
            if(result.success){
                setStatus("authenticated")
            }
            return result.success
        },
        signOut: async () => {
    
        },
    }))

  
    
    return <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter.current}
        status={status}
    >
        {children}
    </RainbowKitAuthenticationProvider>

}

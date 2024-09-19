import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useSendTransaction, useSignTypedData } from 'wagmi'

import { parseEther } from 'viem'
import { useState } from 'react';




function SigMessage() {
  const [result, setReuslt] = useState("")
  const { signTypedDataAsync } = useSignTypedData()

  return (
    <>
      <p>{result}</p>
      <button
        onClick={async () =>
          setReuslt(
            await signTypedDataAsync({
              types: {
                Person: [
                  { name: 'name', type: 'string' },
                  { name: 'wallet', type: 'address' },
                ],
                Mail: [
                  { name: 'from', type: 'Person' },
                  { name: 'to', type: 'Person' },
                  { name: 'contents', type: 'string' },
                ],
              },
              primaryType: 'Mail',
              message: {
                from: {
                  name: 'Cow',
                  wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                },
                to: {
                  name: 'Bob',
                  wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                },
                contents: 'Hello, Bob!',
              },
            })
          )

        }
      >
        Sign message
      </button>
    </>


  )
}

function SendTransaction() {
  const [result, setReuslt] = useState("")
  const { sendTransactionAsync } = useSendTransaction()

  return <>
   <p>{result}</p>
    <button
      onClick={ async () =>
        setReuslt(
          await sendTransactionAsync({
            to: '0x0F9171aFF2dbd8c02Dd9cFEaBDB61fDd8D2675c5',
            value: parseEther('0.01'),
          })
        )
      
      }
    >
      Send transaction
    </button >

  </>
}

const App = () => {

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton />



      </div>


      <SigMessage />
      <SendTransaction />
    </div>

  );
};

export default App;

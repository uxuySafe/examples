import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useSendTransaction, useSignTypedData, useSignMessage, useEnsAddress, useAccount } from 'wagmi'

import { parseEther } from 'viem'
import { useState } from 'react';



// @ts-ignore







// function SignSiweMessage() {
//   const account = useAccount()
//   const [result, setReuslt] = useState("")
//   const { signMessageAsync } = useSignMessage()



//   return (
//     <>
//       <p>{result}</p>
//       <button
//         onClick={async () => {
//           debugger
//           const message = authenticationAdapter.createMessage({
//             nonce: await authenticationAdapter.getNonce(),
//             // @ts-ignore
//             address: account.address,
//             // @ts-ignore
//             chainId: account.chainId,
//           })  
//           debugger

//           setReuslt(
//             await signMessageAsync({
//               // @ts-ignore
//               account: account,
//                             // @ts-ignore
//               message: message
//             })
//           )
//         }
//         }
//       >
//         Sign message
//       </button>
//     </>)
// }


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
      onClick={async () =>
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

      {/* <SignSiweMessage /> */}
      <SigMessage />
      <SendTransaction />
    </div>

  );
};

function Test() {

  const list = [1, 2, 3, 4, 5]

  return list.map(item => <p key={item}>{item}</p>)
}



export default App;


import RainbowkitProvider from "./RainbowkitProvider"
import WalletAction from "./walletActions"
import './App.css';



function App() {
  return (
    <div className="App">
      <RainbowkitProvider>
        <WalletAction />
      </RainbowkitProvider>
    </div>
  );
}

export default App;

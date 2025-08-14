"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected, walletConnect, metaMask, coinbaseWallet, safe } from "wagmi/connectors";

export default function Connect(){
  const { address, chainId, isConnected } = useAccount();
  const { connect, status } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {!isConnected ? (
        <div className="row">
          <button onClick={()=>connect({ connector: injected() })}>Injected</button>
          <button onClick={()=>connect({ connector: metaMask() })}>MetaMask</button>
          <button onClick={()=>connect({ connector: coinbaseWallet({ appName: "Coinagotchi" }) })}>Coinbase</button>
          <button onClick={()=>connect({ connector: walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_ID! }) })}>WalletConnect</button>
          <button onClick={()=>connect({ connector: safe() })}>Safe</button>
        </div>
      ) : (
        <div className="row">
          <span className="badge">Verbunden: {address?.slice(0,6)}…{address?.slice(-4)}</span>
          <span className="badge">Chain: {chainId}</span>
          <button onClick={()=>disconnect()}>Disconnect</button>
        </div>
      )}
      <div className="small" style={{marginTop:8}}>{status === "pending" ? "Verbinde..." : ""}</div>
    </div>
  );
}

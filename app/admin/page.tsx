"use client";
import { useAccount, useWriteContract } from "wagmi";
import { useState } from "react";
import { tokenAddress, tokenAbi } from "../lib/token";

export default function AdminPage(){
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [webhook, setWebhook] = useState<string>("");

  async function mint() {
    const amt = BigInt(Math.floor(Number(amount) * 1e18));
    await writeContractAsync({ address: tokenAddress, abi: tokenAbi, functionName:"mint", args: [to as `0x${string}`, amt] });
    alert("Mint submitted");
  }

  async function saveWebhook() {
    const res = await fetch("/api/notify", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ webhook }) });
    alert(res.ok ? "Webhook gespeichert" : "Fehler");
  }

  return (
    <div className="card">
      <h2>Admin Panel</h2>
      <div className="small">Nur Benutzer mit MINTER_ROLE können minten.</div>
      <div className="row" style={{marginTop:12}}>
        <input placeholder="Empfänger 0x..." value={to} onChange={e=>setTo(e.target.value)} style={{flex:2}} />
        <input placeholder="Menge (CGT)" value={amount} onChange={e=>setAmount(e.target.value)} style={{flex:1}} />
        <button onClick={mint} disabled={isPending}>Mint</button>
      </div>
      <div style={{marginTop:16}}>
        <h3>Admin-Notifications</h3>
        <div className="row">
          <input placeholder="Webhook URL" value={webhook} onChange={e=>setWebhook(e.target.value)} style={{flex:2}} />
          <button onClick={saveWebhook}>Speichern</button>
        </div>
        <div className="small" style={{marginTop:8}}>Der Server-Script <code>npm run notify</code> sendet Events an den Webhook.</div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

type Transfer = { from: string; to: string; value: string; blockNumber: number };

export default function EventFeed(){
  const [rows, setRows] = useState<Transfer[]>([]);

  useEffect(()=>{
    async function load(){
      const res = await fetch("/api/events");
      const data = await res.json();
      setRows(data.transfers || []);
    }
    load();
    const id = setInterval(load, 10000);
    return ()=>clearInterval(id);
  }, []);

  return (
    <table className="table">
      <thead>
        <tr><th>Block</th><th>From</th><th>To</th><th>Value (CGT)</th></tr>
      </thead>
      <tbody>
        {rows.map((t,i)=>(
          <tr key={i}>
            <td>{t.blockNumber}</td>
            <td className="small">{t.from}</td>
            <td className="small">{t.to}</td>
            <td>{t.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

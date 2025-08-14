"use client";
import { useEffect, useState } from "react";

export default function PriceBadge(){
  const [price, setPrice] = useState<string>("—");

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch("/api/events?price=1");
        const data = await res.json();
        if (data && typeof data.price === "number") {
          setPrice(data.price.toFixed(4) + " USD");
        } else { setPrice("N/A"); }
      } catch { setPrice("N/A"); }
    }
    load();
  }, []);

  return <div className="badge">MATIC/USD: {price}</div>;
}

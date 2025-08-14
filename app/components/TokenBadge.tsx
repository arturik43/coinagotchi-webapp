"use client";
import { useState, useEffect } from "react";

export default function TokenBadge() {
  const [symbol, setSymbol] = useState("CGT");
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    // Tokenlist von ENV laden
    const url = process.env.NEXT_PUBLIC_TOKENLIST;
    if (!url) return;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const token = data.tokens?.[0];
        if (token?.symbol) setSymbol(token.symbol);
        if (token?.logoURI) setLogo(token.logoURI);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex items-center gap-2">
      {logo && <img src={logo} alt={symbol} className="w-6 h-6 rounded-full" />}
      <span className="font-medium">{symbol}</span>
    </div>
  );
}

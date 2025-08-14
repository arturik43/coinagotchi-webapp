"use client";
import * as React from "react";
import TokenBadge from "./TokenBadge";
import AddToMetamask from "./AddToMetamask";

export default function HeaderRight() {
  // Client-only render (Hydration-sicher)
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border" />
          <span className="font-medium">CGT</span>
        </div>
        <div className="px-3 py-1 rounded-xl border opacity-50 select-none">
          CGT zu MetaMask hinzufügen
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <TokenBadge />
      <AddToMetamask />
    </div>
  );
}

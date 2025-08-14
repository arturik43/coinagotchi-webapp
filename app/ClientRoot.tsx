"use client";

import * as React from "react";
import Providers from "./providers";
import dynamic from "next/dynamic";

// HeaderRight (TokenBadge + MetaMask-Button) ebenfalls client-only
const HeaderRight = dynamic(() => import("./components/HeaderRight"), { ssr: false });

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  // Warten bis der Client gemountet ist (zusätzliche Sicherheit)
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="max-w-[960px] mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Coinagotchi</h1>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full border" />
            <span className="font-medium">CGT</span>
            <div className="px-3 py-1 rounded-xl border opacity-50 select-none">CGT zu MetaMask hinzufügen</div>
          </div>
        </header>
        <main>{/* loading… */}</main>
      </div>
    );
  }
  return (
    <Providers>
      <div className="max-w-[960px] mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Coinagotchi</h1>
          <HeaderRight />
        </header>
        <main>{children}</main>
      </div>
    </Providers>
  );
}

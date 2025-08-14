# Coinagotchi Webapp (Next.js + wagmi + viem)

## Setup
```bash
cd webapp
cp .env.local.example .env.local
# Trage NEXT_PUBLIC_TOKEN (Adresse nach Deploy), NEXT_PUBLIC_FEED und ggf. WEBHOOK_URL ein

npm i
npm run dev
```

- **Wallets:** Injected, MetaMask, Coinbase, WalletConnect, Safe
- **Preis:** liest Chainlink AggregatorV3 (Adresse via `NEXT_PUBLIC_FEED`)
- **Events:** `/api/events` holt die letzten Transfers
- **Admin-Notifications:** `npm run notify` startet einen Event-Watcher und sendet Transfers an `WEBHOOK_URL`

Routen:
- `/` Dashboard (Wallet, Preis, Transfers)
- `/admin` Admin-Panel (Mint, Webhook speichern)

import { http, createConfig } from "wagmi";
import type { Chain } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { walletConnect } from "wagmi/connectors";

// Amoy-Chain manuell definieren (stabil, unabhängig von Packages)
export const polygonAmoy: Chain = {
  id: 80002,
  name: "Polygon Amoy",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-amoy.polygon.technology"] },
    public:  { http: ["https://rpc-amoy.polygon.technology"] },
  },
  blockExplorers: {
    default: { name: "Polygonscan", url: "https://amoy.polygonscan.com" },
  },
};

const RPC = process.env.NEXT_PUBLIC_RPC ?? "https://rpc-amoy.polygon.technology";
const WC_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

// Connectors: Injected immer, WalletConnect nur wenn Project ID vorhanden
const connectors = [
  injected(),
  ...(WC_ID ? [walletConnect({ projectId: WC_ID })] : []),
];

export const config = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(RPC),
  },
  connectors,
});

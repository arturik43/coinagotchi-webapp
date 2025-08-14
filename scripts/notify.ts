import { createPublicClient, http, parseAbi } from "viem";
import { polygonAmoy } from "viem/chains";
import fs from "node:fs";
import path from "node:path";

const token = process.env.NEXT_PUBLIC_TOKEN as `0x${string}`;
const rpc = process.env.NEXT_PUBLIC_RPC || "https://rpc-amoy.polygon.technology";
const WEBHOOK = process.env.WEBHOOK_URL || (()=>{
  const p = path.join(process.cwd(), "webhook_url.txt");
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8").trim() : "";
})();

if (!WEBHOOK) {
  console.error("Keine Webhook-URL gefunden. Setze WEBHOOK_URL in .env oder POST /api/notify.");
  process.exit(1);
}
if (!token) {
  console.error("Setze NEXT_PUBLIC_TOKEN in .env.local");
  process.exit(1);
}

const client = createPublicClient({ chain: polygonAmoy, transport: http(rpc) });

const abi = parseAbi([
  "event Transfer(address indexed from, address indexed to, uint256 value)"
]);

async function main(){
  console.log("Starte Admin-Notifications für", token);
  client.watchEvent({
    address: token,
    abi,
    eventName: "Transfer",
    onLogs: async (logs) => {
      for (const l of logs) {
        const payload = {
          type: "transfer",
          blockNumber: Number(l.blockNumber),
          from: (l as any).args.from,
          to: (l as any).args.to,
          value: String((l as any).args.value),
          tx: l.transactionHash,
        };
        await fetch(WEBHOOK, {
          method: "POST",
          headers: { "content-type":"application/json" },
          body: JSON.stringify(payload),
        });
        console.log("Webhook gesendet:", payload);
      }
    },
    pollingInterval: 6000,
  });
}

main().catch((e)=>{
  console.error(e);
  process.exit(1);
});

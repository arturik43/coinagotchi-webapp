import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, parseAbi, parseEventLogs, formatUnits } from "viem";
import { polygonAmoy } from "viem/chains";

const client = createPublicClient({ chain: polygonAmoy, transport: http(process.env.NEXT_PUBLIC_RPC) });

const token = process.env.NEXT_PUBLIC_TOKEN as `0x${string}` | undefined;
const feed = process.env.NEXT_PUBLIC_FEED as `0x${string}` | undefined;

const erc20Abi = parseAbi([
  "event Transfer(address indexed from, address indexed to, uint256 value)"
]);

const aggAbi = [
  { "inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function" },
  { "inputs":[],"name":"latestRoundData","outputs":[
    {"internalType":"uint80","name":"roundId","type":"uint80"},
    {"internalType":"int256","name":"answer","type":"int256"},
    {"internalType":"uint256","name":"startedAt","type":"uint256"},
    {"internalType":"uint256","name":"updatedAt","type":"uint256"},
    {"internalType":"uint80","name":"answeredInRound","type":"uint80"}
  ],"stateMutability":"view","type":"function" }
] as const;

export async function GET(req: NextRequest){
  try {
    const { searchParams } = new URL(req.url);
    const wantPrice = searchParams.get("price");

    let price: number | null = null;
    if (wantPrice && feed) {
      try {
        const [decimals, lr]: any = await Promise.all([
          client.readContract({ address: feed, abi: aggAbi, functionName:"decimals" }),
          client.readContract({ address: feed, abi: aggAbi, functionName:"latestRoundData" }),
        ]);
        price = Number(lr[1]) / (10 ** Number(decimals));
      } catch {}
    }

    let transfers: any[] = [];
    if (token) {
      const latest = await client.getBlockNumber();
      const fromBlock = latest > 600n ? latest - 600n : 0n;
      const logs = await client.getLogs({
        address: token,
        fromBlock,
        toBlock: latest,
      });
      const parsed = parseEventLogs({ abi: erc20Abi, logs, eventName: "Transfer" });
      transfers = parsed.slice(-20).reverse().map((l:any)=> ({
        from: l.args.from,
        to: l.args.to,
        value: (Number(l.args.value) / 1e18).toString(),
        blockNumber: Number(l.blockNumber),
      }));
    }

    return NextResponse.json({ price, transfers });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || "error" }, { status: 500 });
  }
}

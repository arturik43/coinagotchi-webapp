import { createPublicClient, http } from "viem";
import { polygonAmoy } from "viem/chains";

const client = createPublicClient({ chain: polygonAmoy, transport: http(process.env.NEXT_PUBLIC_RPC) });

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

export async function readMaticUsd(feed: `0x${string}`) {
  const [decimals, lr]: any = await Promise.all([
    client.readContract({ address: feed, abi: aggAbi, functionName:"decimals" }),
    client.readContract({ address: feed, abi: aggAbi, functionName:"latestRoundData" }),
  ]);
  const price = Number(lr[1]) / (10 ** Number(decimals));
  return price;
}

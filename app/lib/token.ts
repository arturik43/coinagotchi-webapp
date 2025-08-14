export const tokenAddress = process.env.NEXT_PUBLIC_TOKEN as `0x${string}`;
export const tokenAbi = [
  { "type":"function", "name":"mint", "stateMutability":"nonpayable",
    "inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],
    "outputs":[]
  },
  { "type":"event", "name":"Transfer",
    "inputs":[
      {"name":"from","type":"address","indexed":true},
      {"name":"to","type":"address","indexed":true},
      {"name":"value","type":"uint256","indexed":false}
    ],
    "anonymous":false
  }
] as const;

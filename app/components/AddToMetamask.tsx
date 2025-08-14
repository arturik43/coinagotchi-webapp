"use client";
export default function AddToMetamask() {
  const addToken = async () => {
    try {
      const tokenAddress = process.env.NEXT_PUBLIC_TOKEN;
      const tokenSymbol = "CGT";
      const tokenDecimals = 18;
      const tokenImage = process.env.NEXT_PUBLIC_TOKENLIST
        ? process.env.NEXT_PUBLIC_TOKENLIST.replace("tokenlist.json", "token.png")
        : undefined;

      if (!window.ethereum) {
        alert("MetaMask nicht gefunden");
        return;
      }

      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log("Token erfolgreich zu MetaMask hinzugefügt!");
      } else {
        console.log("Token wurde nicht hinzugefügt.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={addToken}
      className="px-3 py-1 rounded-xl border hover:bg-gray-100 transition"
    >
      CGT zu MetaMask hinzufügen
    </button>
  );
}

import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = new WalletConnectProvider({
  rpc: {
    4002: "https://rpc.testnet.fantom.network	",
  },
});

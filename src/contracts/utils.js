import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = new WalletConnectProvider({
  rpc: {
    43114: "https://rpc.ankr.com/avalanche",
  },
});

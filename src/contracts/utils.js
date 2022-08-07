import WalletConnectProvider from "@walletconnect/web3-provider";

export const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

export const providerOptions = new WalletConnectProvider({
  rpc: {
    4002: "https://rpc.testnet.fantom.network	",
  },
});

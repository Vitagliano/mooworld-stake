import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers, providers } from "ethers";
import { providerOptions } from "../contracts/utils";
import {
  CHAIN_ID,
  SITE_ERROR,
  SMARCONTRACT_INI_ABI,
  SMARTCONTRACT_ABI_ERC20,
  SMARTCONTRACT_ADDRESS_ERC20,
  StakingContract_ABI,
  StakingContract_Address,
  StakingContract_Address_NFT,
} from "../../config";
import NFTCard from "../components/NFTCard";
import { errorAlertCenter, successAlert } from "../components/toastGroup";
import UnNFTCard from "../components/UnNFTCard";
import { PageLoading } from "../components/Loading";
import Hero from "../components/Hero";
import Container from "../components/container";
import MooTag from "../components/MooTag";

let web3Modal = undefined;
let contract = undefined;
let contract_20 = undefined;
let contract_nft = undefined;

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [signerAddress, setSignerAddress] = useState("");
  const [nftHolded, setNftHolded] = useState();
  const [unstakedNFTs, setUnstakedNFTs] = useState();
  const [stakedNFTs, setStakedNFTs] = useState();
  const [loading, setLoading] = useState(false);
  const [totalStaked, setTotalStaked] = useState(0);
  const [stakeAllLoading, setStakeAllLoading] = useState(false);
  const [unstakeAllLoading, setUnstakeAllLoading] = useState(false);
  const [claimAllLoading, setClaimAllLoading] = useState(false);
  const [dailyRewardRate, setDailyRewardRate] = useState(0);

  const connectWallet = async () => {
    if (await checkNetwork()) {
      setLoading(true);
      web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions, // required
      });
      try {
        const provider = await web3Modal.connect();
        const web3Provider = new providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();

        setConnected(true);
        setSignerAddress(address);

        contract = new ethers.Contract(
          StakingContract_Address,
          StakingContract_ABI,
          signer
        );

        contract_nft = new ethers.Contract(
          StakingContract_Address_NFT,
          SMARCONTRACT_INI_ABI,
          signer
        );

        contract_20 = new ethers.Contract(
          SMARTCONTRACT_ADDRESS_ERC20,
          SMARTCONTRACT_ABI_ERC20,
          signer
        );

        setDailyRewardRate((await contract.getRewardRate()) * 0.9);
        // setDailyRewardRate(
        //   (await contract.getRewardRate()) / Math.pow(10, 18) / 25
        // );

        /////////////////
        updatePage(address);
        /////////////////

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
          console.log(accounts[0], "--------------");
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updatePage = async (address) => {
    setLoading(true);
    let unstaked = [];
    let staked = [];
    const balance = await contract_nft.balanceOf(address);
    const totalSupply = await contract.getTotalStaked();
    let total = 0;
    try {
      let promise_index = [];
      for (let i = 0; i < parseInt(balance); i++) {
        promise_index.push(contract_nft.tokenOfOwnerByIndex(address, i));
      }
      const indexData = await Promise.all(promise_index);
      for (let i = 0; i < indexData.length; i++) {
        unstaked.push({
          id: parseInt(indexData[i]),
          tokenId: parseInt(indexData[i]),
        });
      }

      let promise = [];
      for (let i = 0; i < parseInt(totalSupply); i++) {
        promise.push(contract.viewStake(i));
      }
      const data = await Promise.all(promise);
      const now = new Date().getTime() / 1000;
      const rate = parseFloat(await contract.getRewardRate()) * 0.9;
      // const rate =
      //   parseFloat(await contract.getRewardRate()) / Math.pow(10, 18);

      for (let i = 0; i < data.length; i++) {
        if (data[i].status === 1) {
          total++;
          if (data[i].staker.toLowerCase() === address.toLowerCase()) {
            staked.push({
              id: i,
              tokenId: data[i].tokenId.toNumber(),
              status: data[i].status,
              stakingId: data[i].StakingId.toNumber(),
            });
          }
        }
        if (data[i].status === 0) {
          total++;
          if (data[i].staker.toLowerCase() === address.toLowerCase()) {
            staked.push({
              id: i,
              tokenId: data[i].tokenId.toNumber(),
              status: data[i].status,
              stakingId: data[i].StakingId.toNumber(),
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setNftHolded(parseInt(balance));
    setUnstakedNFTs(unstaked);
    setStakedNFTs(staked);
    setTotalStaked(total);
    setLoading(false);
  };

  const checkNetwork = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const chainId = await web3.eth.getChainId();
    if (chainId === CHAIN_ID) {
      return true;
    } else {
      errorAlertCenter(SITE_ERROR[0]);
      return false;
    }
  };

  const onStakeAll = async () => {
    setStakeAllLoading(true);
    let unstaked = [];
    for (let item of unstakedNFTs) {
      unstaked.push(item.id);
    }
    try {
      const approved = await contract_nft.isApprovedForAll(
        signerAddress,
        StakingContract_Address
      );
      console.log(approved, "approved");
      if (!approved) {
        const approve = await contract_nft.setApprovalForAll(
          StakingContract_Address,
          true
        );
        await approve.wait();
      }
      const stake = await contract.callStakeToken(
        StakingContract_Address_NFT,
        unstaked
      );
      await stake.wait();
      successAlert("Staking is successful.");
      updatePage(signerAddress);
    } catch (error) {
      setStakeAllLoading(false);
      console.log(error);
    }
    setStakeAllLoading(false);
  };

  const onUnstakeAll = async () => {
    setUnstakeAllLoading(true);
    let staked = [];
    for (let item of stakedNFTs) {
      staked.push(item.id);
    }
    try {
      const unstake = await contract.cancelStake(staked);
      await unstake.wait();
      successAlert("Unstaking is successful.");
      updatePage(signerAddress);
    } catch (error) {
      setUnstakeAllLoading(false);
      console.log(error);
    }
    setUnstakeAllLoading(false);
  };

  const onClaimAll = async () => {
    setClaimAllLoading(true);
    let staked = [];
    for (let item of stakedNFTs) {
      staked.push(item.id);
    }
    try {
      const unstake = await contract.claimStake(staked);
      await unstake.wait();
      successAlert("Claiming is successful.");
      updatePage(signerAddress);
    } catch (error) {
      setClaimAllLoading(false);
      console.log(error);
    }
    setClaimAllLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (typeof window.ethereum !== "undefined") {
        if (await checkNetwork()) {
          await connectWallet();
          ethereum.on("accountsChanged", function (accounts) {
            window.location.reload();
          });
          if (ethereum.selectedAddress !== null) {
            setSignerAddress(ethereum.selectedAddress);
            setConnected(true);
          }
          ethereum.on("chainChanged", (chainId) => {
            checkNetwork();
          });
        }
      } else {
        errorAlertCenter(SITE_ERROR[1]);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>Moo World</title>
        <meta
          name="description"
          content="2000 Cows discovering the universe of Avalanche.
          But now they must exploit the biodiversity of these planets to survive!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header
          signerAddress={signerAddress}
          connectWallet={() => connectWallet()}
          connected={connected}
        />
        <Hero />

        <Container>
          {!connected && (
            <div className="flex justify-center items-center w-full mt-4 lg:mt-0 z-50">
              <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
                <h4 className="text-white text-[28px] text-center">
                  Connect your wallet
                </h4>
                <p className="text-white text-[20px] text-center">
                  We couldn’t detect a wallet. Connect a wallet to stake.
                </p>
                <div className="flex justify-center">
                  <button
                    className="mt-4 p-[12px] px-10 mr-4 backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300 text-[22px]"
                    onClick={() => connectWallet()}
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            </div>
          )}

          {connected && (
            <>
              <div className="flex justify-center items-center w-full lg:mt-0 mb-10 z-50">
                <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-12 xl:pb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h1 className="text-xl sm:text-3xl w-full text-white">
                        Stake your Moo
                      </h1>
                      <h1 className="text-lg sm:text-1xl  text-white">
                        Daily reward rate:{" "}
                        {dailyRewardRate === 0 ? "-- " : dailyRewardRate} $MILK
                        • Total staked NFT: {totalStaked}
                      </h1>
                    </div>
                    <MooTag
                      mooQuantity={unstakedNFTs?.length + stakedNFTs?.length}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="grid overflow-hidden lg grid-cols-2 grid-rows-1 gap-1 grid-flow-row relative z-50"> */}
              <div className="flex items-center justify-center w-full relative z-50">
                <div className="flex gap-6 md:w-11/12 xl:w-10/12 ">
                  {/* <div className="box row-start-1 row-end-1 col-start-1 col-end-1"> */}
                  <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-12 xl:pb-8">
                    <div className="flex flex-row justify-between items-center">
                      <h4 className="text-white text-[28px]">
                        Your NFT{" "}
                        {unstakedNFTs?.length && `(${unstakedNFTs?.length})`}
                      </h4>
                      <button
                        className={
                          stakeAllLoading
                            ? "w-[120px] h-[50px] leading-4 mb-0 p-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                            : "leading-4 mb-0 p-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                        }
                        onClick={onStakeAll}
                        disabled={stakeAllLoading}
                      >
                        {stakeAllLoading ? (
                          <div className="btn-loading">
                            <PageLoading />
                          </div>
                        ) : (
                          <>STAKE ALL</>
                        )}
                      </button>
                    </div>

                    <div className="mt-4 grid overflow-hidden grid-cols-3 grid-rows-1 gap-6 grid-flow-row">
                      {loading ? (
                        <PageLoading />
                      ) : (
                        unstakedNFTs &&
                        unstakedNFTs.length !== 0 &&
                        unstakedNFTs.map((item, key) => (
                          <NFTCard
                            id={item.id}
                            key={key}
                            status={item.status}
                            tokenId={item.tokenId}
                            signerAddress={signerAddress}
                            updatePage={() => updatePage(signerAddress)}
                            contract={contract}
                            contract_nft={contract_nft}
                          />
                        ))
                      )}
                    </div>
                  </div>
                  {/* </div>
                <div className="box row-start-1 row-end-1 col-start-2 col-end-2"> */}
                  <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-12 xl:pb-8">
                    <div className="flex flex-row justify-between items-center">
                      <h4 className="text-white text-[28px]">
                        Staked NFT
                        {stakedNFTs?.length && ` (${stakedNFTs?.length})`}
                      </h4>
                      <div className="flex flex-row gap-4">
                        <button
                          className={
                            unstakeAllLoading
                              ? "w-[136px] h-[50px] leading-4 mb-0 p-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                              : "leading-4 mb-0 p-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                          }
                          onClick={onUnstakeAll}
                          disabled={unstakeAllLoading}
                        >
                          {unstakeAllLoading ? (
                            <div className="btn-loading">
                              <PageLoading />
                            </div>
                          ) : (
                            <>UNSTAKE ALL</>
                          )}
                        </button>
                        <button
                          className={
                            claimAllLoading
                              ? "w-[111px] h-[50px] leading-4 mb-0 p-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                              : "leading-4 mb-0 p-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                          }
                          onClick={onClaimAll}
                          disabled={claimAllLoading}
                        >
                          {claimAllLoading ? (
                            <div className="btn-loading">
                              <PageLoading />
                            </div>
                          ) : (
                            <>CLAIM ALL</>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid overflow-hidden grid-cols-3 grid-rows-1 gap-6 grid-flow-row">
                      {loading ? (
                        <PageLoading />
                      ) : (
                        stakedNFTs &&
                        stakedNFTs.length !== 0 &&
                        stakedNFTs.map((item, key) => (
                          <UnNFTCard
                            key={key}
                            id={item.id}
                            status={item.status}
                            stakingId={item.stakingId}
                            tokenId={item.tokenId}
                            signerAddress={signerAddress}
                            updatePage={() => updatePage(signerAddress)}
                            contract={contract}
                            contract_nft={contract_nft}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </>
          )}
        </Container>
      </main>
    </>
  );
}

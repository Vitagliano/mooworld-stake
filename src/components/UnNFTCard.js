import { useEffect, useState } from "react";
import {
  StakingContract_Address,
  StakingContract_Address_NFT,
} from "../../config";
import { ScaleLoader } from "react-spinners";
import { successAlert } from "./toastGroup";
import { PageLoading } from "./Loading";

export default function UnNFTCard({
  id,
  stakingId,
  status,
  nftName,
  tokenId,
  signerAddress,
  updatePage,
  contract,
  contract_nft,
}) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [reward, setReward] = useState(0);
  const getNftDetail = async () => {
    const uri = await contract_nft?.tokenURI(tokenId);
    await fetch(uri)
      .then((resp) => resp.json())
      .catch((e) => {
        console.log(e);
      })
      .then((json) => {
        setImage(json?.image);
      });
  };

  const getReward = async () => {
    const now = new Date().getTime() / 1000;
    const rate = parseFloat(await contract.getRewardRate()) * 0.9;
    // const rate = parseFloat(await contract.getRewardRate()) / Math.pow(10, 18);
    const data = await contract.viewStake(id);
    const reward =
      ((now - parseFloat(data.releaseTime)) * rate) / (24 * 60 * 60) / 25;
    setReward(reward);
  };

  const showReward = () => {
    getReward();
    setInterval(() => {
      getReward();
    }, 10000);
  };

  const onUnStake = async () => {
    setLoading(true);
    try {
      const unstake = await contract.cancelStake([id]);
      await unstake.wait();
      successAlert("Unstaking is successful.");
      updatePage(signerAddress);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  const onClaim = async () => {
    setLoading(true);
    try {
      const unstake = await contract.claimStake([id]);
      await unstake.wait();
      successAlert("Claiming is successful.");
      updatePage(signerAddress);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNftDetail();
    showReward();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute bottom-0 p-2 text-white ">
          <p>Moo #{tokenId}</p>
          <p>Reward:</p>
          <span>{parseFloat(reward).toLocaleString()} MILK</span>
        </div>
        {loading && (
          <div className="card-loading">
            <PageLoading />
          </div>
        )}
        <div className="media">
          {image === "" ? (
            <span className="empty-image empty-image-skeleton"></span>
          ) : (
            // eslint-disable-next-line
            <img
              src={image}
              alt={tokenId}
              className="rounded-xl"
              style={{ opacity: loading ? 0 : 1 }}
            />
          )}
        </div>
        <div
          className={
            loading
              ? "hidden ease-in-out duration-300"
              : "hidden group-hover:absolute top-0 group-hover:flex items-center w-full h-full justify-center gap-4 flex-col backdrop-blur-xl border-[1px] border-white/10 rounded-xl bg-gradient-to-r from-indigo-300/10 to-blue/80 ease-in-out duration-300"
          }
        >
          <button
            className="leading-4 mb-0 py-[10px] px-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
            onClick={onUnStake}
          >
            UNSTAKE
          </button>
          <button
            className="leading-4 mb-0 py-[10px] px-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
            onClick={onClaim}
          >
            CLAIM
          </button>
        </div>
      </div>
    </div>
  );
}
//after

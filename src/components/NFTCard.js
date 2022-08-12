import { useEffect, useState } from "react";
import {
  StakingContract_Address,
  StakingContract_Address_NFT,
} from "../../config";
import { ScaleLoader } from "react-spinners";
import { successAlert } from "./toastGroup";
import { PageLoading } from "./Loading";

export default function NFTCard({
  id,
  nftName,
  status,
  tokenId,
  signerAddress,
  updatePage,
  contract,
  contract_nft,
}) {
  const [loading, setLoading] = useState(false);
  const [kingdom, setIsKingdom] = useState(false);
  const [image, setImage] = useState("");

  const getNftDetail = async () => {
    let index = 0;
    const owner = signerAddress;
    for (let i = 0; i < 2000; i++) {
      const token = await contract_nft.ownerOf(index);
      if (token === owner) {
        const uri = await contract_nft?.tokenURI(tokenId);
        await fetch(uri)
          .then((resp) => resp.json())
          .catch((e) => {
            console.log(e);
          })
          .then((json) => {
            setImage(json.image);
          });
      }
    }
  };

  const checkKingdom = async () => {
    const isKing = await contract.kingdomOnly();
    setIsKingdom(isKing);
  };

  const onStake = async () => {
    setLoading(true);
    try {
      const approved = await contract_nft.isApprovedForAll(
        signerAddress,
        StakingContract_Address
      );
      if (!approved) {
        const approve = await contract_nft.setApprovalForAll(
          StakingContract_Address,
          true
        );
        await approve.wait();
      }
      const stake = await contract.callStakeToken(StakingContract_Address_NFT, [
        id,
      ]);
      await stake.wait();
      successAlert("Staking is successful.");
      updatePage(signerAddress);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getNftDetail();
    checkKingdom();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="w-full">
      <div className="relative group">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <PageLoading status={loading} />
          </div>
        )}

        {image === "" ? (
          <img
            className="rounded-xl"
            src="https://ipfs.io/ipfs/bafybeicsxlgdsvw7xeni4wavifengbdhonwihdxhwsm5n4kmwodyw7ls3m/moo-world-unrevealed.gif"
            alt="moo"
          />
        ) : (
          // eslint-disable-next-line
          <img
            src={
              image
                ? image.replace("ipfs://", "https://ipfs.io/ipfs/")
                : "https://ipfs.io/ipfs/bafybeicsxlgdsvw7xeni4wavifengbdhonwihdxhwsm5n4kmwodyw7ls3m/moo-world-unrevealed.gif"
            }
            alt={tokenId}
            className="rounded-xl"
            style={{ opacity: loading ? 0 : 1 }}
          />
        )}
        <div
          className={
            loading
              ? "hidden ease-in-out duration-300"
              : "hidden group-hover:absolute top-0 group-hover:flex items-center w-full h-full justify-center gap-4 flex-col backdrop-blur-xl border-[1px] border-white/10 rounded-xl bg-gradient-to-r from-indigo-300/10 to-blue/80 ease-in-out duration-300"
          }
        >
          <p className="text-xl text-white">Moo #{tokenId}</p>
          {!kingdom && (
            <button
              className="leading-4 mb-0 py-[10px] px-[16px] flex justify-center items-center backdrop-blur-lg rounded-xl border-[1px] border-white/10  bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
              onClick={onStake}
            >
              STAKE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
//after

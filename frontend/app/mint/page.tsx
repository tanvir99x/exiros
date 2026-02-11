"use client";

import Image from "next/image";
import BottomNav from "../../components/BottomNav";
import ProfileSlide from "../../components/ProfileSlide";
import { useState } from "react";

const nftList = [
  {
    id: 1,
    name: "Exiros Genesis I",
    file: "/nfts/1.gif",
    live: false,
    price: "TBA",
  },
  {
    id: 2,
    name: "Exiros Genesis II",
    file: "/nfts/2.gif",
    live: false,
    price: "TBA",
  },
  {
    id: 3,
    name: "Exiros Genesis III",
    file: "/nfts/3.gif",
    live: false,
    price: "TBA",
  },
  {
    id: 4,
    name: "Exiros Genesis IV",
    file: "/nfts/4.gif",
    live: false,
    price: "TBA",
  },
];

export default function MintPage() {
  const [profileOpen, setProfileOpen] = useState(false);

  const liveNFTs = nftList.filter((nft) => nft.live);
  const upcomingNFTs = nftList.filter((nft) => !nft.live);

  return (
    <main style={{ padding: 20 }}>
      
      {/* 🔥 LIVE SECTION */}
      {liveNFTs.length > 0 && (
        <>
          <h2 className="mint-section-title live-title">
            🔥 Live Mint
          </h2>

          <div className="mint-grid">
            {liveNFTs.map((nft) => (
              <div key={nft.id} className="mint-card live-card">
                <Image
                  src={nft.file}
                  alt={nft.name}
                  width={300}
                  height={300}
                  className="mint-gif"
                />

                <div className="mint-info">
                  <h3>{nft.name}</h3>
                  <p className="mint-price">
                    Min Price: {nft.price}
                  </p>

                  <button className="mint-btn">
                    Mint Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🕒 UPCOMING SECTION */}
      <h2 className="mint-section-title">
        🕒 Upcoming NFTs
      </h2>

      <div className="mint-grid">
        {upcomingNFTs.map((nft) => (
          <div key={nft.id} className="mint-card">
            <Image
              src={nft.file}
              alt={nft.name}
              width={300}
              height={300}
              className="mint-gif"
            />

            <div className="mint-info">
              <h3>{nft.name}</h3>
              <p className="mint-price">
                Min Price: {nft.price}
              </p>

              <span className="upcoming-badge">
                Coming Soon
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PROFILE SLIDE */}
      <ProfileSlide
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      {/* BOTTOM NAV */}
      <BottomNav onProfile={() => setProfileOpen(true)} />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useProfile } from "@farcaster/auth-kit";

export default function ProfileSlide({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { address } = useAccount();
  const { profile } = useProfile();

  const [exi, setExi] = useState(0);
  const [rank, setRank] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    if (open && address) {
      fetch("http://127.0.0.1:8000/add-exi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet: address,
          amount: 0,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setExi(data.exi || 0);
          setRank(data.rank || null);
        });

      fetch("http://127.0.0.1:8000/leaderboard")
        .then((res) => res.json())
        .then((data) => setLeaderboard(data));
    }
  }, [open, address]);

  const getLevel = (exi: number) => {
    if (exi >= 3500) return 5;
    if (exi >= 2200) return 4;
    if (exi >= 1200) return 3;
    if (exi >= 500) return 2;
    return 1;
  };

  const getNextTarget = (level: number) => {
    const targets: Record<number, number> = {
      1: 500,
      2: 1200,
      3: 2200,
      4: 3500,
      5: 5000,
    };
    return targets[level] || 5000;
  };

  const level = getLevel(exi);
  const nextTarget = getNextTarget(level);
  const progress = Math.min((exi / nextTarget) * 100, 100);

  return (
    <div className={`profile-slide ${open ? "open" : ""}`}>
      <h3>Profile</h3>

      {/* Wallet */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 14, opacity: 0.7 }}>Wallet</p>
        <p style={{ fontWeight: 600 }}>
          {address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "Not connected"}
        </p>
      </div>

      {/* Farcaster */}
      {profile && (
        <div style={{ marginBottom: 20 }}>
          <img
            src={profile.pfpUrl}
            alt="pfp"
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              marginBottom: 10,
            }}
          />
          <p style={{ fontWeight: 600 }}>@{profile.username}</p>
          <p style={{ fontSize: 14, opacity: 0.7 }}>
            Neynar Score: {profile?.score || 0}
          </p>
        </div>
      )}

      {/* EXI Balance */}
      <div style={{ marginBottom: 20 }}>
        <h2>{exi} EXI</h2>
        <p style={{ fontSize: 14, opacity: 0.7 }}>
          Level {level}
        </p>

        <div
          style={{
            width: "100%",
            height: 10,
            background: "#1a1a24",
            borderRadius: 6,
            marginTop: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #2f80ff, #56ccf2)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <p style={{ fontSize: 13, marginTop: 6 }}>
          {exi} / {nextTarget} EXI
        </p>
      </div>

      {/* Rank */}
      {rank && (
        <div style={{ marginBottom: 20 }}>
          <h4>Your Rank</h4>
          <p>#{rank}</p>
        </div>
      )}

      {/* Leaderboard */}
      <div>
        <h4>Leaderboard</h4>

        {leaderboard.map((user, index) => (
          <div key={index} style={{ fontSize: 14 }}>
            #{index + 1}{" "}
            {user.wallet.slice(0, 6)}... — {user.exi} EXI
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: 25,
          padding: 10,
          width: "100%",
          borderRadius: 10,
          background: "#2f80ff",
          color: "#fff",
          border: "none",
        }}
      >
        Close
      </button>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useConnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";
import { useEffect } from "react";
import FarcasterConnect from "../../components/FarcasterConnect";
import { useProfile } from "@farcaster/auth-kit";

export default function ConnectPage() {
  const router = useRouter();
  const { connect } = useConnect();
  const { isConnected } = useAccount();
  const { profile } = useProfile();

  useEffect(() => {
    if (isConnected || profile) router.push("/home");
  }, [isConnected, profile, router]);

  return (
    <main className="connect">
      <div className="connect-card">
        <Image src="/logo.png" alt="Exiros" width={120} height={120} />

        <h1>Welcome to Exiros</h1>
        <p>Connect your Base or Farcaster account</p>

        {/* BASE */}
        <button
          className="connect-btn base"
          onClick={() => connect({ connector: injected() })}
        >
          <Image src="/base.png" alt="Base" width={22} height={22} />
          Connect Base Wallet
        </button>

        {/* FARCASTER */}
        <FarcasterConnect onSuccess={() => router.push("/home")} />
      </div>
    </main>
  );
}

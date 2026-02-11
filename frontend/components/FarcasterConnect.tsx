"use client";

import { SignInButton, useProfile } from "@farcaster/auth-kit";

export default function FarcasterConnect({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { profile } = useProfile();

  if (profile) {
    onSuccess();
    return null;
  }

  return (
    <SignInButton>
      <button className="connect-btn farcaster">
        <img src="/farcaster.png" width={22} height={22} />
        Connect Farcaster
      </button>
    </SignInButton>
  );
}


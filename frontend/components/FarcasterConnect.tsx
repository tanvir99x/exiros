"use client";

import { SignInButton } from "@farcaster/auth-kit";

export default function FarcasterConnect({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return (
    <SignInButton
      onSuccess={onSuccess}
      render={({ signIn }) => (
        <button
          className="connect-btn farcaster"
          onClick={() => signIn()}
        >
          <img src="/farcaster.png" width={22} height={22} />
          Connect Farcaster
        </button>
      )}
    />
  );
}

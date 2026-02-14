"use client";

import { useSignIn } from "@farcaster/auth-kit";

export default function FarcasterConnect({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { signIn, isSuccess } = useSignIn({
    onSuccess: () => {
      onSuccess();
    },
  });

  return (
    <button
      className="connect-btn farcaster"
      onClick={() => signIn()}
    >
      <img src="/farcaster.png" width={22} height={22} />
      Connect Farcaster
    </button>
  );
}

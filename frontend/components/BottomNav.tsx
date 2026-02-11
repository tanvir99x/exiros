"use client";

export default function BottomNav({
  onProfile,
}: {
  onProfile: () => void;
}) {
  return (
    <div className="bottom-nav">
      <button onClick={() => window.location.href = "/mint"}>
        Mint
      </button>

      <button onClick={() => window.location.href = "/"}>
        Home
      </button>

      <button onClick={onProfile}>
        Profile
      </button>
    </div>
  );
}

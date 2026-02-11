"use client";

import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

type Props = {
  title: string;
  link?: string;
  fee?: string;
  onDone: () => void;
};

export default function TaskCard({
  title,
  link,
  fee = "0.01",
  onDone,
}: Props) {
  const { address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [opened, setOpened] = useState(false);
  const [state, setState] = useState<
    "idle" | "ready" | "paying" | "done"
  >("idle");

  const OWNER = "0x3fA9a0f76DBCA2F78Bef63A77875B6652eeFcDEC";

  // 🔥 TITLE CLICK
  function handleOpen() {
    if (link) {
      window.open(link, "_blank");
    }

    setOpened(true);
    setState("ready");
  }

  // 💰 CLAIM CLICK
  async function handleClaim(e: any) {
    e.stopPropagation();

    if (!address) {
      alert("Please connect wallet first");
      return;
    }

    if (state !== "ready") return;

    try {
      setState("paying");

      await sendTransactionAsync({
        to: OWNER,
        value: parseEther(fee),
      });

      setState("done");

      setTimeout(() => {
        onDone();
      }, 500);
    } catch (err) {
      console.log(err);
      setState("ready");
    }
  }

  return (
    <div
      className={`task-card ${
        state === "done" ? "completed" : ""
      }`}
    >
      <div className="task-content">
        <span
          className="task-title"
          onClick={handleOpen}
        >
          {title}
        </span>

        <button
          className="claim-btn"
          disabled={state !== "ready"}
          onClick={handleClaim}
        >
          {state === "idle" && "Locked"}
          {state === "ready" && "Claim"}
          {state === "paying" && "Processing..."}
          {state === "done" && "✓"}
        </button>
      </div>
    </div>
  );
}

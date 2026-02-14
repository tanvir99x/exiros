"use client";

import { useState } from "react";
import { claimTaskOnchain } from "../lib/claimTask";

export default function ClaimButton({ taskId }: { taskId: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function onClaim() {
    try {
      setState("loading");

      // Call your onchain fee function
      await claimTaskOnchain("0.01"); 
      // If different tasks have different fees,
      // you can pass fee dynamically later

      setState("done");
    } catch (e) {
      console.error(e);
      setState("idle");
      alert("Transaction failed");
    }
  }

  if (state === "done") {
    return <div className="checkmark">✓</div>;
  }

  return (
    <button
      className="claim-btn"
      onClick={onClaim}
      disabled={state === "loading"}
    >
      {state === "loading" ? "Processing..." : "Claim"}
    </button>
  );
}

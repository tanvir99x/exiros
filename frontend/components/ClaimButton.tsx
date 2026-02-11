"use client";

import { useState } from "react";
import { claimTask } from "@/lib/claimTask";

export default function ClaimButton({ taskId }: { taskId: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function onClaim() {
    try {
      setState("loading");
      await claimTask(taskId);
      setState("done");
    } catch (e) {
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

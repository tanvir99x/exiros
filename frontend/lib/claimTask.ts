import { ethers } from "ethers";
import { EXIROS_FEE_ADDRESS, EXIROS_FEE_ABI } from "../config/contracts";
import { TASK_FEES } from "../config/taskFees";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function claimTaskOnchain(taskId: string) {
  if (!window.ethereum) {
    throw new Error("Wallet not found");
  }

  const fee = TASK_FEES[taskId];
  if (!fee) {
    throw new Error("Invalid task fee");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    EXIROS_FEE_ADDRESS,
    EXIROS_FEE_ABI,
    signer
  );

  const tx = await contract.payTaskFee(taskId, {
    value: ethers.parseEther(fee),
  });

  await tx.wait();
}

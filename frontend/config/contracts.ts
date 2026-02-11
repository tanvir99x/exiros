// Base network – Exiros Fee Contract

export const EXIROS_FEE_ADDRESS =
  "0x9f60DE3194ffB9f4F26e19d237938c67744Ab56D";

export const EXIROS_FEE_ABI = [
  "function payTaskFee(string taskId) payable",
  "function hasPaid(address user, string taskId) view returns (bool)"
];

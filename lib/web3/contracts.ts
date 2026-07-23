import { ethers } from "ethers";
import { TREASURY_ABI } from "./abi/treasury";
import { ESCROW_ABI } from "./abi/escrow";
import { BATCH_PAYOUT_ABI } from "./abi/batchPayout";

// FinFlowTreasury was deployed and verified before this rebuild — see
// contracts/reference/FinFlowTreasury.sol. It is NOT redeployed by this repo.
export const TREASURY_ADDRESS =
  process.env.NEXT_PUBLIC_TREASURY_ADDRESS || "0x41BF49FD0606e525b73866BF54e063De5556F4bF";

// Escrow and BatchPayout are deployed by scripts/deploy.js — addresses land
// here via env vars once that's run. Empty until then.
export const ESCROW_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_ADDRESS || "";
export const BATCH_PAYOUT_ADDRESS = process.env.NEXT_PUBLIC_BATCHPAYOUT_ADDRESS || "";

export function getTreasuryContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(TREASURY_ADDRESS, TREASURY_ABI, signerOrProvider);
}

export function getEscrowContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  if (!ESCROW_ADDRESS) throw new Error("Escrow contract not deployed yet — see scripts/deploy.js");
  return new ethers.Contract(ESCROW_ADDRESS, ESCROW_ABI, signerOrProvider);
}

export function getBatchPayoutContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  if (!BATCH_PAYOUT_ADDRESS) throw new Error("BatchPayout contract not deployed yet — see scripts/deploy.js");
  return new ethers.Contract(BATCH_PAYOUT_ADDRESS, BATCH_PAYOUT_ABI, signerOrProvider);
}

export function contractsConfigured() {
  return Boolean(ESCROW_ADDRESS && BATCH_PAYOUT_ADDRESS);
}

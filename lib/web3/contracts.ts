import { ethers } from "ethers";
import { TREASURY_ABI } from "./abi/treasury";
import { ESCROW_ABI } from "./abi/escrow";
import { BATCH_PAYOUT_ABI } from "./abi/batchPayout";

// FinFlowTreasury was deployed and verified before this rebuild — see
// contracts/reference/FinFlowTreasury.sol. It is NOT redeployed by this repo.
export const TREASURY_ADDRESS =
  process.env.NEXT_PUBLIC_TREASURY_ADDRESS || "0x41BF49FD0606e525b73866BF54e063De5556F4bF";

// Deployed and verified on Arc Testnet via scripts/deploy.js — see
// https://testnet.arcscan.app/address/0x337bC1C478172A799aBe2134a98aBBAcA3418FF2
// and .../0x823B02D1857B191FcA211d9679C8377D8Abe3B09. Env vars override
// these if you redeploy your own copies.
export const ESCROW_ADDRESS =
  process.env.NEXT_PUBLIC_ESCROW_ADDRESS || "0x337bC1C478172A799aBe2134a98aBBAcA3418FF2";
export const BATCH_PAYOUT_ADDRESS =
  process.env.NEXT_PUBLIC_BATCHPAYOUT_ADDRESS || "0x823B02D1857B191FcA211d9679C8377D8Abe3B09";

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

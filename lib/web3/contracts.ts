import { ethers } from "ethers";
import { TREASURY_ABI } from "./abi/treasury";
import { ESCROW_ABI } from "./abi/escrow";
import { BATCH_PAYOUT_ABI } from "./abi/batchPayout";
import { ARC_DEPLOYMENT, ARC_IS_MAINNET } from "./chain";

function configuredAddress(value: string | undefined, fallback: string) {
  const address = value || fallback;
  if (!address) return "";
  const checked = ethers.getAddress(address);
  if (checked === ethers.ZeroAddress) throw new Error("A FinFlow contract address cannot be zero");
  // CREATE addresses can be identical on different chains when the wallet
  // uses the same nonce. Bind mainnet configuration to its confirmed
  // deployment record instead of assuming a testnet address is invalid.
  if (ARC_IS_MAINNET && (!fallback || checked.toLowerCase() !== fallback.toLowerCase())) {
    throw new Error("Contract address does not match the confirmed Arc Mainnet deployment manifest");
  }
  return checked;
}

export const TREASURY_ADDRESS = configuredAddress(process.env.NEXT_PUBLIC_TREASURY_ADDRESS, ARC_DEPLOYMENT.contracts.FinFlowTreasury.address);
export const ESCROW_ADDRESS = configuredAddress(process.env.NEXT_PUBLIC_ESCROW_ADDRESS, ARC_DEPLOYMENT.contracts.FinFlowEscrow.address);
export const BATCH_PAYOUT_ADDRESS = configuredAddress(process.env.NEXT_PUBLIC_BATCHPAYOUT_ADDRESS, ARC_DEPLOYMENT.contracts.FinFlowBatchPayout.address);

export function getTreasuryContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  if (!TREASURY_ADDRESS) throw new Error("FinFlow payments are temporarily unavailable");
  return new ethers.Contract(TREASURY_ADDRESS, TREASURY_ABI, signerOrProvider);
}

export function getEscrowContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  if (!ESCROW_ADDRESS) throw new Error("FinFlow escrow is temporarily unavailable");
  return new ethers.Contract(ESCROW_ADDRESS, ESCROW_ABI, signerOrProvider);
}

export function getBatchPayoutContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  if (!BATCH_PAYOUT_ADDRESS) throw new Error("FinFlow payouts are temporarily unavailable");
  return new ethers.Contract(BATCH_PAYOUT_ADDRESS, BATCH_PAYOUT_ABI, signerOrProvider);
}

export function contractsConfigured() {
  return Boolean(TREASURY_ADDRESS && ESCROW_ADDRESS && BATCH_PAYOUT_ADDRESS);
}

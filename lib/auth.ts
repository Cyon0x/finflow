import { ethers } from "ethers";

// FinFlow has no email/password login — every wallet IS the account. Writes
// that mutate an ownerAddress's data (creating a payment link, inviting a
// team member, minting an API key) must prove control of that wallet via a
// personal_sign signature, otherwise anyone could POST as anyone else's
// address. This is a lightweight stand-in for full SIWE session cookies:
// no server-side session, just a freshly-signed message per mutating call.

const FRESHNESS_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

export function buildAuthMessage(address: string, timestamp: number) {
  return `FinFlow API request\naddress:${address.toLowerCase()}\ntimestamp:${timestamp}`;
}

export type AuthPayload = {
  address: string;
  signature: string;
  timestamp: number;
};

export function verifyOwnerSignature({ address, signature, timestamp }: AuthPayload): boolean {
  if (!address || !signature || !timestamp) return false;
  if (Math.abs(Date.now() - timestamp) > FRESHNESS_WINDOW_MS) return false;

  try {
    const message = buildAuthMessage(address, timestamp);
    const recovered = ethers.verifyMessage(message, signature);
    return recovered.toLowerCase() === address.toLowerCase();
  } catch {
    return false;
  }
}

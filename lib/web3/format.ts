import { ethers } from "ethers";

// Every USDC amount on Arc in this app is native, 18-decimal wei. These
// helpers exist so no call site ever hand-rolls parseUnits/formatUnits with
// the wrong decimals argument — see the note in chain.ts.

/** Human-entered USDC amount (e.g. "500" or "12.5") -> wei bigint string. */
export function usdcToWei(amount: string | number): bigint {
  return ethers.parseUnits(String(amount), 18);
}

/** Wei bigint (or numeric string of wei) -> human USDC string, e.g. "500.0". */
export function weiToUsdc(wei: bigint | string): string {
  return ethers.formatUnits(wei, 18);
}

/** Wei -> locale-formatted USDC string for display, e.g. "2,840.50". */
export function formatUsdc(wei: bigint | string, maximumFractionDigits = 2): string {
  const asNumber = Number(weiToUsdc(wei));
  return asNumber.toLocaleString("en-US", { maximumFractionDigits, minimumFractionDigits: 0 });
}

export function shortAddr(addr?: string | null): string {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

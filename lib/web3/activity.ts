import { ethers } from "ethers";
import { ARC_TESTNET } from "./chain";
import { getTreasuryContract, getEscrowContract, getBatchPayoutContract, TREASURY_ADDRESS, ESCROW_ADDRESS, BATCH_PAYOUT_ADDRESS } from "./contracts";

// FinFlowTreasury's deployment block on Arc Testnet — event scans start here,
// never from block 0 (the chain is already past block 53M; scanning from
// genesis would be enormously wasteful and likely to hit RPC range limits).
export const TREASURY_DEPLOY_BLOCK = 40305528;

export function getServerReadProvider() {
  return new ethers.JsonRpcProvider(ARC_TESTNET.rpcUrls[0]);
}

export type InvoiceOnChain = {
  id: number;
  merchant: string;
  memo: string;
  amountWei: bigint;
  paid: boolean;
  payer: string;
  createdAt: number;
  paidAt: number;
};

export async function getInvoiceOnChain(provider: ethers.Provider, id: number): Promise<InvoiceOnChain | null> {
  const treasury = getTreasuryContract(provider);
  const result = await treasury.getInvoice(id);
  const [chainId, merchant, memo, amount, paid, payer, createdAt, paidAt] = result;
  if (Number(chainId) === 0) return null;
  return {
    id: Number(chainId),
    merchant,
    memo,
    amountWei: amount,
    paid,
    payer,
    createdAt: Number(createdAt),
    paidAt: Number(paidAt),
  };
}

export type EscrowOnChain = {
  id: number;
  depositor: string;
  contractor: string;
  amountWei: bigint;
  milestone: string;
  deadline: number;
  released: boolean;
  refunded: boolean;
  createdAt: number;
};

export async function getEscrowOnChain(provider: ethers.Provider, id: number): Promise<EscrowOnChain | null> {
  const escrow = getEscrowContract(provider);
  const result = await escrow.getEscrow(id);
  const [chainId, depositor, contractor, amount, milestone, deadline, released, refunded, createdAt] = result;
  if (Number(chainId) === 0) return null;
  return {
    id: Number(chainId),
    depositor,
    contractor,
    amountWei: amount,
    milestone,
    deadline: Number(deadline),
    released,
    refunded,
    createdAt: Number(createdAt),
  };
}

/**
 * Scans event logs for a contract in bounded chunks so a single call never
 * requests more than `chunkSize` blocks at once (most RPC providers cap
 * eth_getLogs ranges) and never scans more than `maxBlocksPerRun` blocks
 * total (so a serverless invocation can't run indefinitely). Returns the
 * events found plus the last block actually scanned, so the caller can
 * persist a cursor and continue next run if there's more history left.
 */
export async function scanEventsInRange(
  contract: ethers.Contract,
  eventNames: string[],
  fromBlock: number,
  toBlock: number,
  { chunkSize = 10_000, maxBlocksPerRun = 200_000 }: { chunkSize?: number; maxBlocksPerRun?: number } = {}
): Promise<{ events: ethers.EventLog[]; lastScannedBlock: number; reachedEnd: boolean }> {
  const events: ethers.EventLog[] = [];
  let cursor = fromBlock;
  const hardStop = Math.min(toBlock, fromBlock + maxBlocksPerRun);

  while (cursor <= hardStop) {
    const end = Math.min(cursor + chunkSize - 1, hardStop);
    for (const name of eventNames) {
      const filter = contract.filters[name]();
      const chunkEvents = await contract.queryFilter(filter, cursor, end);
      for (const e of chunkEvents) {
        if ("args" in e) events.push(e as ethers.EventLog);
      }
    }
    cursor = end + 1;
  }

  return { events, lastScannedBlock: hardStop, reachedEnd: hardStop >= toBlock };
}

export function contractsReady() {
  return Boolean(TREASURY_ADDRESS && ESCROW_ADDRESS && BATCH_PAYOUT_ADDRESS);
}

export { getTreasuryContract, getEscrowContract, getBatchPayoutContract };

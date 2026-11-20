import { NextResponse } from "next/server";
import { ARC_CHAIN_ID_DECIMAL, ARC_NETWORK_NAME, ARC_NETWORK, ARC_DEPLOYMENT } from "@/lib/web3/chain";
import { TREASURY_ADDRESS, ESCROW_ADDRESS, BATCH_PAYOUT_ADDRESS } from "@/lib/web3/contracts";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    network: ARC_NETWORK_NAME,
    chainId: ARC_CHAIN_ID_DECIMAL,
    name: ARC_NETWORK.chainName,
    rpcUrl: ARC_NETWORK.rpcUrls[0],
    explorerUrl: ARC_NETWORK.blockExplorerUrls[0],
    nativeCurrency: ARC_NETWORK.nativeCurrency,
    contracts: { treasury: TREASURY_ADDRESS, escrow: ESCROW_ADDRESS, batchPayout: BATCH_PAYOUT_ADDRESS },
    deployment: ARC_DEPLOYMENT,
  });
}

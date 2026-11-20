import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";
import { ARC_CHAIN_ID_DECIMAL } from "@/lib/web3/chain";
import { getServerReadProvider, getBatchPayoutContract } from "@/lib/web3/activity";
import { BATCH_PAYOUT_ADDRESS } from "@/lib/web3/contracts";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payouts = await prisma.batchPayoutRecord.findMany({
    where: { ownerAddress: owner, chainId: ARC_CHAIN_ID_DECIMAL },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ payouts });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { txHash, recipientCount, totalNative, feeNative } = body;
  if (!txHash || !recipientCount || !totalNative || feeNative === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^0x[\da-fA-F]{64}$/.test(txHash)) return NextResponse.json({ error: "Invalid transaction hash" }, { status: 400 });
  let payoutEvent;
  try {
    const provider = getServerReadProvider();
    const receipt = await provider.getTransactionReceipt(txHash);
    const contract = getBatchPayoutContract(provider);
    for (const log of receipt?.logs || []) {
      if (log.address.toLowerCase() !== BATCH_PAYOUT_ADDRESS.toLowerCase()) continue;
      try {
        const event = contract.interface.parseLog(log);
        if (event?.name === "BatchPayoutExecuted" && event.args.sender.toLowerCase() === owner) payoutEvent = event;
      } catch { /* ignore unrelated events */ }
    }
    if (receipt?.status !== 1 || !payoutEvent) return NextResponse.json({ error: "Payout must match a confirmed transaction from your wallet on this network" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Unable to verify the payout on Arc. Please try again." }, { status: 503 });
  }

  const payout = await prisma.batchPayoutRecord.create({
    data: {
      ownerAddress: owner,
      chainId: ARC_CHAIN_ID_DECIMAL,
      txHash,
      recipientCount: Number(payoutEvent.args.recipientCount),
      totalNative: payoutEvent.args.totalPaid.toString(),
      feeNative: payoutEvent.args.fee.toString(),
    },
  });

  return NextResponse.json({ payout }, { status: 201 });
}

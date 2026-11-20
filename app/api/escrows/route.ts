import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";
import { ARC_CHAIN_ID_DECIMAL } from "@/lib/web3/chain";
import { getServerReadProvider, getEscrowOnChain, getEscrowContract } from "@/lib/web3/activity";
import { ESCROW_ADDRESS } from "@/lib/web3/contracts";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const escrows = await prisma.escrowRecord.findMany({ where: { ownerAddress: owner, chainId: ARC_CHAIN_ID_DECIMAL }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ escrows });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { chainEscrowId, contractor, amountNative, milestone, deadline, txHashCreate } = body;
  if (!chainEscrowId || !contractor || !amountNative || !milestone || !deadline) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!Number.isSafeInteger(Number(chainEscrowId)) || Number(chainEscrowId) < 1 || !/^\d+$/.test(String(amountNative)) || BigInt(amountNative) <= 0n || !/^0x[\da-fA-F]{40}$/.test(contractor) || !/^0x[\da-fA-F]{64}$/.test(txHashCreate || "") || !Number.isFinite(new Date(deadline).getTime())) {
    return NextResponse.json({ error: "Invalid escrow details" }, { status: 400 });
  }
  let onChain;
  try {
    const provider = getServerReadProvider();
    const [escrowState, receipt] = await Promise.all([getEscrowOnChain(provider, Number(chainEscrowId)), provider.getTransactionReceipt(txHashCreate)]);
    const contract = getEscrowContract(provider);
    const created = receipt?.logs.some((log) => {
      if (log.address.toLowerCase() !== ESCROW_ADDRESS.toLowerCase()) return false;
      try { const event = contract.interface.parseLog(log); return event?.name === "EscrowCreated" && Number(event.args.id) === Number(chainEscrowId); } catch { return false; }
    });
    if (!escrowState || escrowState.depositor.toLowerCase() !== owner || escrowState.contractor.toLowerCase() !== contractor.toLowerCase() || escrowState.amountWei !== BigInt(amountNative) || escrowState.deadline !== Math.floor(new Date(deadline).getTime() / 1000) || receipt?.status !== 1 || !created) {
      return NextResponse.json({ error: "Escrow must match a confirmed transaction from your wallet on this network" }, { status: 400 });
    }
    onChain = escrowState;
  } catch {
    return NextResponse.json({ error: "Unable to verify the escrow on Arc. Please try again." }, { status: 503 });
  }

  const escrow = await prisma.escrowRecord.create({
    data: {
      chainId: ARC_CHAIN_ID_DECIMAL,
      chainEscrowId: Number(chainEscrowId),
      ownerAddress: owner,
      contractor,
      amountNative: String(amountNative),
      milestone,
      deadline: new Date(deadline),
      released: onChain.released,
      txHashCreate: txHashCreate || null,
    },
  });

  return NextResponse.json({ escrow }, { status: 201 });
}

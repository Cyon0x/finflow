import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerReadProvider, getEscrowOnChain } from "@/lib/web3/activity";

// Same pattern as /api/invoices/[id]/sync — re-reads chain truth rather than
// trusting a client-asserted "released" claim.
export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const escrow = await prisma.escrowRecord.findUnique({ where: { id: params.id } });
  if (!escrow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const onChain = await getEscrowOnChain(getServerReadProvider(), escrow.chainEscrowId);
  if (!onChain) return NextResponse.json({ error: "Escrow not found on-chain" }, { status: 404 });

  const updated = await prisma.escrowRecord.update({
    where: { id: escrow.id },
    data: { released: onChain.released },
  });

  return NextResponse.json({ escrow: updated, onChain: { released: onChain.released, refunded: onChain.refunded } });
}

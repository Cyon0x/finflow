import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const escrows = await prisma.escrowRecord.findMany({ where: { ownerAddress: owner }, orderBy: { createdAt: "desc" } });
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

  const escrow = await prisma.escrowRecord.create({
    data: {
      chainEscrowId: Number(chainEscrowId),
      ownerAddress: owner,
      contractor,
      amountNative: String(amountNative),
      milestone,
      deadline: new Date(deadline),
      txHashCreate: txHashCreate || null,
    },
  });

  return NextResponse.json({ escrow }, { status: 201 });
}

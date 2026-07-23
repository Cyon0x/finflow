import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payouts = await prisma.batchPayoutRecord.findMany({
    where: { ownerAddress: owner },
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

  const payout = await prisma.batchPayoutRecord.create({
    data: {
      ownerAddress: owner,
      txHash,
      recipientCount: Number(recipientCount),
      totalNative: String(totalNative),
      feeNative: String(feeNative),
    },
  });

  return NextResponse.json({ payout }, { status: 201 });
}

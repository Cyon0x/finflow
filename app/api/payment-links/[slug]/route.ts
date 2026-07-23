import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public, unauthenticated — anyone with the link needs to be able to load
// what they're paying for.
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const link = await prisma.paymentLink.findUnique({
    where: { slug: params.slug },
    include: { invoice: true },
  });
  if (!link || !link.active) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ link });
}

// Called after a successful on-chain payment against this link to bump the
// paid counter for display purposes. Chain state remains the source of
// truth for whether the underlying invoice is actually paid.
export async function POST(_req: NextRequest, { params }: { params: { slug: string } }) {
  const link = await prisma.paymentLink.update({
    where: { slug: params.slug },
    data: { paidCount: { increment: 1 } },
  });
  return NextResponse.json({ link });
}

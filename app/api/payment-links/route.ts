import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";
import { rateLimit } from "@/lib/rateLimit";

function randomSlug() {
  return Math.random().toString(36).slice(2, 8);
}

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const links = await prisma.paymentLink.findMany({
    where: { ownerAddress: owner },
    orderBy: { createdAt: "desc" },
    include: { invoice: { select: { chainInvoiceId: true, status: true } } },
  });
  return NextResponse.json({ links });
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "payment-links-create", { limit: 20, windowMs: 60_000 });
  if (limited) return limited;

  const body = await req.json();
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, amountNative, type, note, invoiceId } = body;
  if (!title) return NextResponse.json({ error: "Missing title" }, { status: 400 });
  if (type !== "OPEN" && !amountNative) return NextResponse.json({ error: "Missing amount" }, { status: 400 });

  let slug = randomSlug();
  for (let attempt = 0; attempt < 5; attempt++) {
    const exists = await prisma.paymentLink.findUnique({ where: { slug } });
    if (!exists) break;
    slug = randomSlug();
  }

  const link = await prisma.paymentLink.create({
    data: {
      slug,
      ownerAddress: owner,
      title,
      amountNative: String(amountNative || "0"),
      type: type || "ONE_TIME",
      note: note || null,
      invoiceId: invoiceId || null,
    },
  });

  return NextResponse.json({ link }, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";
import { rateLimit } from "@/lib/rateLimit";
import { ARC_CHAIN_ID_DECIMAL } from "@/lib/web3/chain";

function randomSlug() {
  return Math.random().toString(36).slice(2, 8);
}

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const links = await prisma.paymentLink.findMany({
    where: { ownerAddress: owner, chainId: ARC_CHAIN_ID_DECIMAL },
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

  const { title, amountNative, type, note, invoiceId, businessName } = body;
  if (!title) return NextResponse.json({ error: "Missing title" }, { status: 400 });
  if (type !== "OPEN" && type !== "ONE_TIME") return NextResponse.json({ error: "Choose a one-time or open amount link" }, { status: 400 });
  if (type !== "OPEN" && !amountNative) return NextResponse.json({ error: "Missing amount" }, { status: 400 });
  if (type === "ONE_TIME") {
    const invoice = invoiceId ? await prisma.invoice.findFirst({ where: { id: invoiceId, ownerAddress: owner, chainId: ARC_CHAIN_ID_DECIMAL } }) : null;
    if (!invoice || !invoice.chainInvoiceId) return NextResponse.json({ error: "A one-time link needs an invoice on this network" }, { status: 400 });
    if (invoice.amountNative !== String(amountNative)) return NextResponse.json({ error: "Link amount must match the invoice" }, { status: 400 });
  } else if (invoiceId) {
    return NextResponse.json({ error: "Open amount links cannot reference an invoice" }, { status: 400 });
  }

  let slug = randomSlug();
  for (let attempt = 0; attempt < 5; attempt++) {
    const exists = await prisma.paymentLink.findUnique({ where: { slug } });
    if (!exists) break;
    slug = randomSlug();
  }

  const link = await prisma.paymentLink.create({
    data: {
      slug,
      chainId: ARC_CHAIN_ID_DECIMAL,
      ownerAddress: owner,
      businessName: businessName || null,
      title,
      amountNative: String(amountNative || "0"),
      type: type || "ONE_TIME",
      note: note || null,
      invoiceId: invoiceId || null,
    },
  });

  return NextResponse.json({ link }, { status: 201 });
}

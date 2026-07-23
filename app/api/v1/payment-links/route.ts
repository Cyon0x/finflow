import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateApiKey } from "@/lib/apiKeyAuth";
import { rateLimit } from "@/lib/rateLimit";

// Public developer API — auth via `Authorization: Bearer <api key>` from
// Settings → API & Dev, not a wallet signature. Only creates OPEN-type
// links: FinFlow is non-custodial, so a fixed-amount ONE_TIME link needs an
// on-chain FinFlowTreasury.createInvoice() call signed by the merchant's own
// wallet — an API key alone has no key to sign with. OPEN links need no
// upfront transaction (the payer sends directly at payment time), so this
// is the one link type a server-to-server API call can honestly create.
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "v1-payment-links", { limit: 30, windowMs: 60_000 });
  if (limited) return limited;

  const owner = await authenticateApiKey(req);
  if (!owner) return NextResponse.json({ error: "Invalid or missing API key" }, { status: 401 });

  const { title, note } = await req.json().catch(() => ({}));
  if (!title) return NextResponse.json({ error: "Missing 'title'" }, { status: 400 });

  let slug = Math.random().toString(36).slice(2, 8);
  for (let i = 0; i < 5 && (await prisma.paymentLink.findUnique({ where: { slug } })); i++) {
    slug = Math.random().toString(36).slice(2, 8);
  }

  const link = await prisma.paymentLink.create({
    data: { slug, ownerAddress: owner, title, type: "OPEN", amountNative: "0", note: note || null },
  });

  return NextResponse.json({ id: link.id, slug: link.slug, url: `/pay/${link.slug}`, type: link.type }, { status: 201 });
}

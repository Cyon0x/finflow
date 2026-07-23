import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Deliberately unauthenticated (no signature required) — joining a waitlist
// isn't a sensitive write, and requiring a wallet signature here would just
// add friction. Off-ramp itself is "Coming Soon": FinFlow doesn't have a
// licensed fiat off-ramp partner integrated yet (see README) — this stores
// interest so a real partner integration can prioritize currencies/regions.
export async function POST(req: NextRequest) {
  const { address, email, currency } = await req.json();
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
  }

  await prisma.offrampWaitlistEntry.create({
    data: { address: address.toLowerCase(), email: email || null, currency: currency || "NGN" },
  });

  const count = await prisma.offrampWaitlistEntry.count();
  return NextResponse.json({ ok: true, waitlistCount: count }, { status: 201 });
}

export async function GET() {
  const count = await prisma.offrampWaitlistEntry.count();
  return NextResponse.json({ waitlistCount: count });
}

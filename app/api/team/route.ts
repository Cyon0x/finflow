import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";
import { rateLimit } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const members = await prisma.teamMember.findMany({ where: { ownerAddress: owner }, orderBy: { createdAt: "asc" } });
  return NextResponse.json({ members });
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "team-invite", { limit: 15, windowMs: 60_000 });
  if (limited) return limited;

  const body = await req.json();
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { memberAddress, memberLabel, role } = body;
  if (!memberAddress || !/^0x[a-fA-F0-9]{40}$/.test(memberAddress)) {
    return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
  }

  const member = await prisma.teamMember.upsert({
    where: { ownerAddress_memberAddress: { ownerAddress: owner, memberAddress: memberAddress.toLowerCase() } },
    update: { role: role || "VIEWER", memberLabel: memberLabel || null },
    create: {
      ownerAddress: owner,
      memberAddress: memberAddress.toLowerCase(),
      memberLabel: memberLabel || null,
      role: role || "VIEWER",
    },
  });

  return NextResponse.json({ member }, { status: 201 });
}

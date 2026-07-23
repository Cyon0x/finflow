import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthBody } from "@/lib/apiAuth";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => ({}));
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const member = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!member || member.ownerAddress !== owner) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.teamMember.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

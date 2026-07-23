import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";
import { rateLimit } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const webhooks = await prisma.webhook.findMany({ where: { ownerAddress: owner }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ webhooks });
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "webhooks-create", { limit: 10, windowMs: 60_000 });
  if (limited) return limited;

  const body = await req.json();
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { url } = body;
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const secret = `whsec_${randomBytes(16).toString("hex")}`;
  const webhook = await prisma.webhook.create({ data: { ownerAddress: owner, url, secret } });
  return NextResponse.json({ webhook }, { status: 201 });
}

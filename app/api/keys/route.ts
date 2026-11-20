import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { extractAuthFromQuery, verifyAuthBody } from "@/lib/apiAuth";
import { rateLimit } from "@/lib/rateLimit";
import { ARC_API_KEY_ENV, ARC_CHAIN_ID_DECIMAL } from "@/lib/web3/chain";

export async function GET(req: NextRequest) {
  const owner = extractAuthFromQuery(req);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const keys = await prisma.apiKey.findMany({
    where: { ownerAddress: owner, revokedAt: null, chainId: ARC_CHAIN_ID_DECIMAL, env: ARC_API_KEY_ENV },
    orderBy: { createdAt: "desc" },
    select: { id: true, label: true, env: true, keyPrefix: true, lastUsedAt: true, createdAt: true },
  });
  return NextResponse.json({ keys });
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "keys-create", { limit: 10, windowMs: 60_000 });
  if (limited) return limited;

  const body = await req.json();
  const owner = verifyAuthBody(body.auth);
  if (!owner) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (body.env && body.env !== ARC_API_KEY_ENV) return NextResponse.json({ error: "Choose an API key for the current network" }, { status: 400 });
  const env = ARC_API_KEY_ENV;
  const label = body.label || (env === "LIVE" ? "Live key" : "Test key");

  const secretBody = randomBytes(24).toString("base64url");
  const prefix = `ff_${env.toLowerCase()}_${secretBody.slice(0, 8)}`;
  const fullKey = `${prefix}_${secretBody.slice(8)}`;
  const keyHash = createHash("sha256").update(fullKey).digest("hex");

  await prisma.apiKey.create({
    data: { ownerAddress: owner, chainId: ARC_CHAIN_ID_DECIMAL, label, env, keyPrefix: prefix, keyHash },
  });

  // Full secret is only ever shown here, once — the DB stores just the hash.
  return NextResponse.json({ key: fullKey, prefix, env, label }, { status: 201 });
}

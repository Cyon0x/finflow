import { NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "./prisma";

/** Validates `Authorization: Bearer ff_live_...` / `ff_test_...` against stored key hashes. Returns the owning wallet address, or null. */
export async function authenticateApiKey(req: NextRequest): Promise<string | null> {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const key = header.slice(7).trim();
  if (!key) return null;

  const keyHash = createHash("sha256").update(key).digest("hex");
  const record = await prisma.apiKey.findFirst({ where: { keyHash, revokedAt: null } });
  if (!record) return null;

  await prisma.apiKey.update({ where: { id: record.id }, data: { lastUsedAt: new Date() } });
  return record.ownerAddress;
}

import { NextRequest, NextResponse } from "next/server";

// Best-effort, in-memory, per-instance rate limiting. Honest caveat: Vercel
// serverless functions are stateless across cold starts and can run as
// multiple concurrent instances, so this does NOT give a hard distributed
// guarantee — a determined attacker spreading requests across instances
// can exceed it. It still stops naive spam/bots within a warm instance,
// which is most real abuse. For a hard guarantee, enable Vercel's Firewall
// / Attack Challenge Mode in the dashboard (no code required) or move this
// to Upstash Redis.

const buckets = new Map<string, { count: number; resetAt: number }>();

function getClientKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** Returns null if the request is allowed, or a 429 NextResponse if it should be blocked. */
export function rateLimit(req: NextRequest, routeKey: string, { limit = 10, windowMs = 60_000 } = {}): NextResponse | null {
  const key = `${routeKey}:${getClientKey(req)}`;
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  bucket.count++;
  if (bucket.count > limit) {
    return NextResponse.json({ error: "Too many requests — slow down and try again shortly." }, { status: 429 });
  }
  return null;
}

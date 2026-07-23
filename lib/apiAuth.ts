import { NextRequest } from "next/server";
import { verifyOwnerSignature, type AuthPayload } from "./auth";

/** Reads {address,signature,timestamp} from query params (GET) or a parsed JSON body's `auth` field (POST/PATCH/DELETE), and verifies the signature. Returns the verified lowercased address, or null if missing/invalid. */
export function extractAuthFromQuery(req: NextRequest): string | null {
  const address = req.nextUrl.searchParams.get("address");
  const signature = req.nextUrl.searchParams.get("signature");
  const timestamp = req.nextUrl.searchParams.get("timestamp");
  if (!address || !signature || !timestamp) return null;
  const payload: AuthPayload = { address, signature, timestamp: Number(timestamp) };
  return verifyOwnerSignature(payload) ? address.toLowerCase() : null;
}

export function verifyAuthBody(auth: AuthPayload | undefined | null): string | null {
  if (!auth) return null;
  return verifyOwnerSignature(auth) ? auth.address.toLowerCase() : null;
}

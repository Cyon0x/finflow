"use client";

import { useCallback } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";

/**
 * Thin fetch wrapper that attaches a fresh (or cached) wallet signature to
 * mutating/authenticated requests. See lib/auth.ts for what the server does
 * with { address, signature, timestamp }.
 */
export function useApi() {
  const { signAuthPayload } = useWallet();

  const authedFetch = useCallback(
    async (url: string, init: RequestInit = {}) => {
      const auth = await signAuthPayload();
      const method = init.method || "GET";
      const isBodyMethod = method !== "GET" && method !== "HEAD";

      const target = isBodyMethod ? url : appendAuthQuery(url, auth);
      const res = await fetch(target, {
        ...init,
        method,
        headers: { "Content-Type": "application/json", ...(init.headers || {}) },
        body: isBodyMethod ? JSON.stringify({ ...(init.body ? JSON.parse(init.body as string) : {}), auth }) : undefined,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      return res.json();
    },
    [signAuthPayload]
  );

  return { authedFetch };
}

function appendAuthQuery(url: string, auth: { address: string; signature: string; timestamp: number }) {
  const u = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://localhost");
  u.searchParams.set("address", auth.address);
  u.searchParams.set("signature", auth.signature);
  u.searchParams.set("timestamp", String(auth.timestamp));
  return u.pathname + u.search;
}

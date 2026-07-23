import { NextResponse } from "next/server";

// Real, no-key-required FX rates (USDC is USD-pegged, so USD rates are used
// directly as the USDC rate — same convention Circle itself uses). Cached
// for 5 minutes at the edge/CDN layer since this updates roughly daily
// upstream anyway.
const CURRENCIES = ["NGN", "KES", "GHS", "ZAR"] as const;

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 300 } });
    const data = await res.json();
    if (data.result !== "success") throw new Error("Upstream FX provider error");

    const rates: Record<string, number> = {};
    for (const c of CURRENCIES) rates[c] = data.rates[c];

    return NextResponse.json({ rates, updatedAt: data.time_last_update_utc, source: "open.er-api.com" });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}

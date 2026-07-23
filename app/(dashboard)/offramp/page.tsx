"use client";

import { useState } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { useFxRates } from "@/lib/hooks/useFxRates";

const CURRENCIES = [
  { code: "NGN", label: "🇳🇬 Nigerian Naira", symbol: "₦" },
  { code: "KES", label: "🇰🇪 Kenyan Shilling", symbol: "Ksh" },
  { code: "GHS", label: "🇬🇭 Ghanaian Cedi", symbol: "GH₵" },
  { code: "ZAR", label: "🇿🇦 South African Rand", symbol: "R" },
] as const;

export default function OfframpPage() {
  const { address } = useWallet();
  const { showToast } = useToast();
  const { rates, updatedAt } = useFxRates();
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]["code"]>("NGN");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);

  async function joinWaitlist() {
    if (!address) return showToast("🔗", "Connect a wallet first.", "error");
    setSubmitting(true);
    try {
      const res = await fetch("/api/offramp-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, email: email || undefined, currency }),
      });
      if (!res.ok) throw new Error("Failed to join waitlist");
      setJoined(true);
      showToast("🏦", "You're on the list — we'll email you when off-ramp goes live.", "success");
    } catch (err) {
      showToast("❌", (err as Error).message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <h2 className="section-heading">🏦 Convert USDC to Bank</h2>
      <div className="section-sub">
        Withdraw USDC directly to a local bank account. This needs a licensed fiat off-ramp partner (KYC + money transmission) —
        FinFlow doesn&apos;t have one wired up yet, so this is honestly a waitlist, not a working withdrawal, for now.
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <span className="card-title">Live Exchange Rates</span>
          <span style={{ fontSize: 12, color: "var(--ink3)" }}>{updatedAt ? `Updated ${new Date(updatedAt).toLocaleString()}` : "Loading…"}</span>
        </div>
        <div className="card-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {CURRENCIES.map((c) => (
              <div key={c.code} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: "var(--ink3)", marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>1 USDC → {c.code}</div>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1.3rem", fontWeight: 700 }}>
                  {rates ? `${c.symbol} ${rates[c.code].toFixed(2)}` : "…"}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 12 }}>
            Live USD/FX rates via open.er-api.com, used as a USDC proxy (USDC is USD-pegged). Not yet connected to an off-ramp execution partner.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Join the Off-Ramp Waitlist</span></div>
        <div className="card-body">
          {joined ? (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <div className="empty-title">You're on the list</div>
              <div className="empty-desc">We&apos;ll reach out when bank withdrawal for {currency} is live.</div>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Preferred Currency</label>
                <select className="form-input" value={currency} onChange={(e) => setCurrency(e.target.value as typeof currency)}>
                  {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Email (optional)</label>
                <input className="form-input" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={joinWaitlist} disabled={submitting}>
                {submitting ? "Joining…" : "Join Waitlist"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

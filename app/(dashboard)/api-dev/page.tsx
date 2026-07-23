"use client";

import { useState, type CSSProperties } from "react";
import { useApiKeys } from "@/lib/hooks/useApiKeys";
import { useWebhooks } from "@/lib/hooks/useWebhooks";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";

export default function ApiDevPage() {
  const { address } = useWallet();
  const { keys, generateKey, revokeKey } = useApiKeys();
  const { webhooks, addWebhook, removeWebhook } = useWebhooks();
  const { showToast } = useToast();
  const [justGenerated, setJustGenerated] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");

  async function handleGenerate(env: "LIVE" | "TEST") {
    if (!address) return showToast("🔗", "Connect a wallet first.", "error");
    try {
      const { key } = await generateKey(env);
      setJustGenerated(key);
      showToast("🔑", "New API key generated — copy it now, it won't be shown again.", "success");
    } catch (err) {
      showToast("❌", (err as Error).message, "error");
    }
  }

  async function handleAddWebhook() {
    try {
      new URL(webhookUrl);
    } catch {
      return showToast("❌", "Enter a valid URL.", "error");
    }
    try {
      await addWebhook(webhookUrl);
      setWebhookUrl("");
      showToast("✅", "Webhook saved!", "success");
    } catch (err) {
      showToast("❌", (err as Error).message, "error");
    }
  }

  return (
    <div>
      <h2 className="section-heading" style={{ marginBottom: 4 }}>🔌 API &amp; Developer</h2>
      <div className="section-sub">Real, key-gated endpoints for payment links and batch payouts — non-custodial, so payout calls return unsigned transactions for you to sign</div>

      <div className="two-col" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">API Keys</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => handleGenerate("TEST")}>+ Test Key</button>
              <button className="btn btn-primary btn-sm" onClick={() => handleGenerate("LIVE")}>+ Live Key</button>
            </div>
          </div>
          <div className="card-body">
            {justGenerated && (
              <div style={{ background: "var(--surface2)", border: "1px solid var(--accent)", borderRadius: 8, padding: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "var(--ink3)", marginBottom: 4 }}>NEW KEY — copy now, shown once:</div>
                <div className="mono" style={{ fontSize: 12, wordBreak: "break-all", color: "var(--accent)" }}>{justGenerated}</div>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 8 }}
                  onClick={() => { navigator.clipboard.writeText(justGenerated); showToast("📋", "Copied!"); }}
                >
                  Copy
                </button>
              </div>
            )}
            {keys.length === 0 ? (
              <div className="empty-desc">No API keys yet.</div>
            ) : (
              keys.map((k) => (
                <div className="fee-row" key={k.id}>
                  <span>
                    <span className={`badge ${k.env === "LIVE" ? "badge-blue" : "badge-gray"}`} style={{ marginRight: 8 }}>{k.env}</span>
                    <span className="mono">{k.keyPrefix}…</span>
                  </span>
                  <button className="btn btn-danger btn-sm" onClick={() => revokeKey(k.id)}>Revoke</button>
                </div>
              ))
            )}

            <div className="divider" />
            <div className="form-group">
              <label className="form-label">WEBHOOK URL</label>
              <input className="form-input" placeholder="https://yourdomain.com/webhook/finflow" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
            </div>
            <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={handleAddWebhook}>Save Webhook</button>
            {webhooks.map((w) => (
              <div className="fee-row" key={w.id}>
                <span className="mono" style={{ fontSize: 12 }}>{w.url}</span>
                <button className="btn btn-danger btn-sm" onClick={() => removeWebhook(w.id)}>Remove</button>
              </div>
            ))}
            <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 8 }}>
              Fired daily by the reconciliation job (see /api/cron/sync) on invoice.paid and escrow.released events, with an HMAC-style secret in the X-FinFlow-Secret header.
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Quick Reference</span></div>
          <div className="card-body">
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "var(--ink3)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.06em" }}>CREATE PAYMENT LINK (open amount)</div>
              <pre style={codeBlockStyle}>
{`POST /api/v1/payment-links
Authorization: Bearer ff_live_...
{
  "title": "Invoice #42",
  "note": "optional"
}`}
              </pre>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--ink3)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.06em" }}>BUILD A BATCH PAYOUT TX</div>
              <pre style={codeBlockStyle}>
{`POST /api/v1/payouts/batch
Authorization: Bearer ff_live_...
{
  "recipients": [
    { "address": "0x...", "amount": 300 }
  ]
}
→ returns { to, data, value, chainId }
  for YOUR wallet to sign & send`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const codeBlockStyle: CSSProperties = {
  background: "var(--ink)",
  borderRadius: 8,
  padding: 12,
  fontFamily: "'JetBrains Mono',monospace",
  fontSize: 11.5,
  color: "#4AFFC4",
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  overflowX: "auto",
};

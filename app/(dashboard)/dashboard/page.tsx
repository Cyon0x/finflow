"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useModal } from "@/lib/modals";
import { useInvoices } from "@/lib/hooks/useInvoices";
import { useEscrows } from "@/lib/hooks/useEscrows";
import { useFxRates } from "@/lib/hooks/useFxRates";
import { formatUsdc } from "@/lib/web3/format";
import { explorerTxUrl } from "@/lib/web3/chain";
import { StatusBadge } from "@/components/StatusBadge";

const FREE_TIER_LIMIT = 50;

export default function DashboardPage() {
  const { address, balanceWei } = useWallet();
  const { open } = useModal();
  const { invoices } = useInvoices();
  const { escrows } = useEscrows();
  const { rates, updatedAt } = useFxRates();

  const stats = useMemo(() => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const totalReceived30d = invoices
      .filter((i) => i.status === "PAID" && new Date(i.updatedAt).getTime() > thirtyDaysAgo)
      .reduce((sum, i) => sum + BigInt(i.amountNative), 0n);
    const pending = invoices.filter((i) => i.status === "PENDING" || i.status === "OVERDUE");
    const pendingTotal = pending.reduce((sum, i) => sum + BigInt(i.amountNative), 0n);
    const escrowLocked = escrows.filter((e) => !e.released).reduce((sum, e) => sum + BigInt(e.amountNative), 0n);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    const invoicesThisMonth = invoices.filter((i) => new Date(i.createdAt) >= thisMonth).length;

    return { totalReceived30d, pending, pendingTotal, escrowLocked, invoicesThisMonth };
  }, [invoices, escrows]);

  const recent = useMemo(() => invoices.slice(0, 4), [invoices]);
  const activeInvoices = useMemo(() => invoices.filter((i) => i.status !== "PAID" && i.status !== "CANCELLED").slice(0, 3), [invoices]);

  return (
    <div>
      <div className="rate-strip">
        <div>
          <div className="rate-label">LIVE RATES {updatedAt ? `· ${new Date(updatedAt).toLocaleTimeString()}` : ""}</div>
          <div className="rate-value">1 USDC = {rates ? `₦${rates.NGN.toFixed(2)}` : "…"} NGN</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="rate-label">1 USDC =</div>
          <div className="rate-value">{rates ? `KES ${rates.KES.toFixed(2)}` : "…"}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="rate-label">1 USDC =</div>
          <div className="rate-value">{rates ? `GHS ${rates.GHS.toFixed(2)}` : "…"}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="rate-label">NETWORK</div>
          <div className="rate-value">Arc Testnet</div>
        </div>
      </div>

      {!address && (
        <div className="card" style={{ marginBottom: 24, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, color: "var(--ink2)" }}>Connect a wallet to see your real balance, invoices, and activity.</div>
          <button className="btn btn-primary btn-sm" onClick={() => open("wallet")}>Connect Wallet</button>
        </div>
      )}

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">USDC BALANCE</div>
          <div className="metric-value">{balanceWei !== null ? formatUsdc(balanceWei) : "—"}</div>
          <div className="metric-sub metric-neutral">Native Arc balance</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">RECEIVED (30D)</div>
          <div className="metric-value">{formatUsdc(stats.totalReceived30d)}</div>
          <div className="metric-sub metric-neutral">{invoices.filter((i) => i.status === "PAID").length} paid invoices total</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">PENDING INVOICES</div>
          <div className="metric-value">{formatUsdc(stats.pendingTotal)}</div>
          <div className="metric-sub metric-amber">⏳ {stats.pending.length} awaiting payment</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">ESCROW LOCKED</div>
          <div className="metric-value">{formatUsdc(stats.escrowLocked)}</div>
          <div className="metric-sub metric-neutral">{escrows.filter((e) => !e.released).length} active contracts</div>
        </div>
      </div>

      <div className="content-grid">
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <span className="card-title">Recent Transactions</span>
              <Link href="/invoices" className="card-action">View all →</Link>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {recent.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🧾</div>
                  <div className="empty-title">No invoices yet</div>
                  <div className="empty-desc">Create your first invoice to see activity here.</div>
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>DESCRIPTION</th><th>CLIENT</th><th>AMOUNT</th><th>STATUS</th><th>DATE</th></tr></thead>
                    <tbody>
                      {recent.map((inv) => (
                        <tr key={inv.id}>
                          <td>
                            <div style={{ fontWeight: 500 }}>#{inv.chainInvoiceId} · {inv.description.slice(0, 30)}</div>
                            {inv.txHashCreate && (
                              <a className="arc-chain" style={{ marginTop: 4, width: "fit-content" }} href={explorerTxUrl(inv.txHashCreate)} target="_blank" rel="noreferrer">
                                Arc · {inv.txHashCreate.slice(0, 8)}…
                              </a>
                            )}
                          </td>
                          <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--ink3)" }}>{inv.clientName}</td>
                          <td style={{ fontWeight: 600, color: "var(--green)", fontFamily: "'JetBrains Mono',monospace" }}>{formatUsdc(inv.amountNative)} USDC</td>
                          <td><StatusBadge status={inv.status} /></td>
                          <td style={{ color: "var(--ink3)", fontSize: 12 }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><span className="card-title">Quick Actions</span></div>
            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => open("payment-link")}>🔗 Create Payment Link</button>
              <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => open("create-invoice")}>🧾 New Invoice</button>
              <Link href="/payouts" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>🚀 Batch Payout</Link>
              <Link href="/offramp" className="btn btn-green" style={{ width: "100%", justifyContent: "center" }}>🏦 Convert to Bank</Link>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><span className="card-title">Active Invoices</span></div>
            <div className="card-body" style={{ padding: "12px 20px" }}>
              {activeInvoices.length === 0 ? (
                <div className="empty-desc" style={{ padding: "12px 0" }}>Nothing outstanding.</div>
              ) : (
                activeInvoices.map((inv) => (
                  <div className="activity-item" key={inv.id}>
                    <div className="activity-icon" style={{ background: inv.status === "OVERDUE" ? "var(--red-light)" : "var(--amber-light)" }}>🧾</div>
                    <div className="activity-info">
                      <div className="activity-name">#{inv.chainInvoiceId} · {inv.clientName}</div>
                      <div className="activity-detail">Due {new Date(inv.dueDate).toLocaleDateString()} · <StatusBadge status={inv.status} /></div>
                    </div>
                    <div className="activity-amount">{formatUsdc(inv.amountNative)} USDC</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">Platform Limits</span></div>
            <div className="card-body">
              <div style={{ fontSize: 11, color: "var(--ink3)", marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
                FREE PLAN · {stats.invoicesThisMonth}/{FREE_TIER_LIMIT} INVOICES THIS MONTH
              </div>
              <div className="progress-bar" style={{ marginBottom: 12 }}>
                <div className="progress-fill" style={{ width: `${Math.min(100, (stats.invoicesThisMonth / FREE_TIER_LIMIT) * 100)}%` }} />
              </div>
              <Link href="/settings" className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>⚡ Upgrade to Pro</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

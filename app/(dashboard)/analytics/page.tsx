"use client";

import { useMemo } from "react";
import { useInvoices } from "@/lib/hooks/useInvoices";
import { useEscrows } from "@/lib/hooks/useEscrows";
import { formatUsdc } from "@/lib/web3/format";

export default function AnalyticsPage() {
  const { invoices } = useInvoices();
  const { escrows } = useEscrows();

  const monthly = useMemo(() => {
    const months: { label: string; total: bigint }[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ label: d.toLocaleString("en", { month: "short" }), total: 0n });
    }
    for (const inv of invoices) {
      if (inv.status !== "PAID") continue;
      const paidDate = new Date(inv.updatedAt);
      const monthsAgo = (now.getFullYear() - paidDate.getFullYear()) * 12 + (now.getMonth() - paidDate.getMonth());
      if (monthsAgo >= 0 && monthsAgo < 12) {
        months[11 - monthsAgo].total += BigInt(inv.amountNative);
      }
    }
    return months;
  }, [invoices]);

  const maxMonth = useMemo(() => monthly.reduce((m, x) => (x.total > m ? x.total : m), 1n), [monthly]);

  const totals = useMemo(() => {
    const volume = invoices.reduce((s, i) => s + BigInt(i.amountNative), 0n);
    const paidVolume = invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + BigInt(i.amountNative), 0n);
    const escrowVolume = escrows.reduce((s, e) => s + BigInt(e.amountNative), 0n);
    return { volume, paidVolume, escrowVolume };
  }, [invoices, escrows]);

  const hasData = invoices.length > 0 || escrows.length > 0;

  return (
    <div>
      <h2 className="section-heading" style={{ marginBottom: 4 }}>Analytics</h2>
      <div className="section-sub">Revenue, volume, and activity — derived from your real invoices and escrow contracts</div>

      <div className="metrics-grid" style={{ marginTop: 16 }}>
        <div className="metric-card"><div className="metric-label">TOTAL INVOICED</div><div className="metric-value">{formatUsdc(totals.volume)}</div><div className="metric-sub metric-neutral">USDC all-time</div></div>
        <div className="metric-card"><div className="metric-label">TOTAL COLLECTED</div><div className="metric-value">{formatUsdc(totals.paidVolume)}</div><div className="metric-sub metric-neutral">from paid invoices</div></div>
        <div className="metric-card"><div className="metric-label">ESCROW VOLUME</div><div className="metric-value">{formatUsdc(totals.escrowVolume)}</div><div className="metric-sub metric-neutral">{escrows.length} contracts</div></div>
        <div className="metric-card"><div className="metric-label">INVOICES CREATED</div><div className="metric-value">{invoices.length}</div><div className="metric-sub metric-neutral">all-time</div></div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Monthly Collected (12mo)</span></div>
        <div className="card-body">
          {!hasData ? (
            <div className="empty-state">
              <div className="empty-icon">📈</div>
              <div className="empty-title">No activity yet</div>
              <div className="empty-desc">Create and get paid on your first invoice to see analytics here.</div>
            </div>
          ) : (
            <>
              <div className="chart-area">
                {monthly.map((m, i) => (
                  <div key={i} className="chart-bar green" style={{ height: `${Math.max(4, Number((m.total * 100n) / maxMonth))}%` }} title={`${m.label}: ${formatUsdc(m.total)} USDC`} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "var(--ink3)", fontFamily: "'JetBrains Mono',monospace" }}>
                {monthly.map((m, i) => <span key={i}>{m.label}</span>)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useInvoices } from "@/lib/hooks/useInvoices";
import { useModal } from "@/lib/modals";
import { useToast } from "@/components/Toast";
import { StatusBadge } from "@/components/StatusBadge";
import { formatUsdc } from "@/lib/web3/format";
import { downloadInvoicePdf } from "@/lib/pdf";

const TABS = ["All", "Paid", "Pending", "Overdue"] as const;

export default function InvoicesPage() {
  const { invoices, loading, syncInvoice } = useInvoices();
  const { open } = useModal();
  const { showToast } = useToast();
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (tab === "All") return invoices;
    const statusMap = { Paid: "PAID", Pending: "PENDING", Overdue: "OVERDUE" } as const;
    return invoices.filter((i) => i.status === statusMap[tab as "Paid" | "Pending" | "Overdue"]);
  }, [invoices, tab]);

  const totals = useMemo(() => {
    const totalInvoiced = invoices.reduce((s, i) => s + BigInt(i.amountNative), 0n);
    const collected = invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + BigInt(i.amountNative), 0n);
    const outstanding = invoices.filter((i) => i.status === "PENDING" || i.status === "OVERDUE").reduce((s, i) => s + BigInt(i.amountNative), 0n);
    const rate = invoices.length ? (invoices.filter((i) => i.status === "PAID").length / invoices.length) * 100 : 0;
    return { totalInvoiced, collected, outstanding, rate };
  }, [invoices]);

  async function handleSync(id: string) {
    setSyncingId(id);
    try {
      await syncInvoice(id);
      showToast("🔄", "Synced with on-chain status.", "success");
    } catch (e) {
      showToast("❌", (e as Error).message, "error");
    } finally {
      setSyncingId(null);
    }
  }

  function copyLink(slug?: string) {
    if (!slug) return showToast("❌", "This invoice has no payment link.", "error");
    const url = `${window.location.origin}/pay/${slug}`;
    navigator.clipboard.writeText(url);
    showToast("🔗", `Copied: ${url}`, "success");
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 className="section-heading">Invoices</h2>
          <div className="section-sub">Create, send and track USDC invoices on Arc Testnet</div>
        </div>
        <button className="btn btn-primary" onClick={() => open("create-invoice")}>+ New Invoice</button>
      </div>

      <div className="three-col" style={{ marginBottom: 24 }}>
        <div className="metric-card"><div className="metric-label">TOTAL INVOICED</div><div className="metric-value">{formatUsdc(totals.totalInvoiced)}</div><div className="metric-sub metric-neutral">USDC all-time</div></div>
        <div className="metric-card"><div className="metric-label">OUTSTANDING</div><div className="metric-value">{formatUsdc(totals.outstanding)}</div><div className="metric-sub metric-amber">⏳ unpaid</div></div>
        <div className="metric-card"><div className="metric-label">COLLECTED</div><div className="metric-value">{formatUsdc(totals.collected)}</div><div className="metric-sub metric-up">↑ {totals.rate.toFixed(1)}% collection rate</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">All Invoices</span>
          <div className="tabs" style={{ margin: 0, border: "none" }}>
            {TABS.map((t) => (
              <button key={t} className={`tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {loading ? (
            <div className="empty-state"><div className="empty-desc">Loading…</div></div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🧾</div>
              <div className="empty-title">No invoices here yet</div>
              <div className="empty-desc">Connect your wallet and create one to get started.</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>INVOICE #</th><th>CLIENT</th><th>AMOUNT</th><th>DUE DATE</th><th>STATUS</th><th>ACTION</th></tr></thead>
                <tbody>
                  {filtered.map((inv) => (
                    <tr key={inv.id}>
                      <td className="mono">#{inv.chainInvoiceId}</td>
                      <td style={{ fontWeight: 500 }}>{inv.clientName}</td>
                      <td className="mono" style={{ fontWeight: 600 }}>{formatUsdc(inv.amountNative)} USDC</td>
                      <td style={{ color: "var(--ink3)" }}>{new Date(inv.dueDate).toLocaleDateString()}</td>
                      <td><StatusBadge status={inv.status} /></td>
                      <td style={{ display: "flex", gap: 6 }}>
                        {inv.status !== "PAID" && inv.paymentLink && (
                          <button className="btn btn-secondary btn-sm" onClick={() => copyLink(inv.paymentLink?.slug)}>Copy Link</button>
                        )}
                        <button className="btn btn-secondary btn-sm" onClick={() => downloadInvoicePdf(inv)}>PDF</button>
                        {inv.status !== "PAID" && (
                          <button className="btn btn-secondary btn-sm" onClick={() => handleSync(inv.id)} disabled={syncingId === inv.id}>
                            {syncingId === inv.id ? "…" : "↻ Sync"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

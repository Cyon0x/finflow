"use client";

import { useState } from "react";
import { usePaymentLinks } from "@/lib/hooks/usePaymentLinks";
import { useInvoices } from "@/lib/hooks/useInvoices";
import { useModal } from "@/lib/modals";
import { useToast } from "@/components/Toast";
import { StatusBadge } from "@/components/StatusBadge";
import { formatUsdc } from "@/lib/web3/format";
import { explorerTxUrl } from "@/lib/web3/chain";

export default function PaymentsPage() {
  const { links, loading: linksLoading } = usePaymentLinks();
  const { invoices, loading: invoicesLoading } = useInvoices();
  const { open } = useModal();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  function copyLink(slug: string) {
    const url = `${window.location.origin}/pay/${slug}`;
    navigator.clipboard.writeText(url);
    showToast("🔗", `Copied: ${url}`, "success");
  }

  const filteredInvoices = invoices.filter((inv) => {
    if (statusFilter !== "All Status" && inv.status !== statusFilter.toUpperCase()) return false;
    if (search && !inv.clientName.toLowerCase().includes(search.toLowerCase()) && !inv.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="two-col" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">🔗 Payment Links</span>
            <button className="btn btn-primary btn-sm" onClick={() => open("payment-link")}>+ Create</button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {linksLoading ? (
              <div className="empty-state"><div className="empty-desc">Loading…</div></div>
            ) : links.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔗</div>
                <div className="empty-title">No payment links yet</div>
                <div className="empty-desc">Create one to start receiving USDC by URL.</div>
              </div>
            ) : (
              <table>
                <thead><tr><th>LINK NAME</th><th>AMOUNT</th><th>PAID</th><th>STATUS</th></tr></thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{link.title}</div>
                        <div style={{ fontSize: 11, color: "var(--accent)", fontFamily: "'JetBrains Mono',monospace", marginTop: 2, cursor: "pointer" }} onClick={() => copyLink(link.slug)}>
                          finflow.io/pay/{link.slug} 📋
                        </div>
                      </td>
                      <td className="mono">{link.type === "OPEN" ? "Any amount" : `${formatUsdc(link.amountNative)} USDC`}</td>
                      <td className="mono">{link.paidCount}</td>
                      <td>
                        {link.invoice ? <StatusBadge status={link.invoice.status} /> : <span className="badge badge-blue">Open</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">ℹ️ How payments work</span></div>
          <div className="card-body" style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.7 }}>
            <p>Every <strong>One-time</strong> payment link is backed by a real invoice on FinFlowTreasury — the payer&apos;s wallet calls <code>payInvoice()</code> directly, funds land in your wallet in the same transaction, with automatic overpayment refunds.</p>
            <p style={{ marginTop: 10 }}><strong>Open Amount</strong> links let the payer send any amount straight to the treasury contract — good for tips or flexible payments.</p>
            <p style={{ marginTop: 10, color: "var(--ink3)" }}>FinFlow never custodies funds — everything settles peer-to-peer on Arc Testnet.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">All Invoices &amp; Payments</span>
          <div style={{ display: "flex", gap: 8 }}>
            <input className="form-input" placeholder="🔍 Search…" style={{ width: 200, padding: "7px 12px" }} value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="form-input" style={{ width: 140, padding: "7px 12px" }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All Status</option><option>Paid</option><option>Pending</option><option>Overdue</option>
            </select>
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {invoicesLoading ? (
            <div className="empty-state"><div className="empty-desc">Loading…</div></div>
          ) : filteredInvoices.length === 0 ? (
            <div className="empty-state"><div className="empty-desc">No matching transactions.</div></div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>INVOICE #</th><th>CLIENT</th><th>AMOUNT (USDC)</th><th>STATUS</th><th>DATE</th><th>EXPLORER</th></tr></thead>
                <tbody>
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id}>
                      <td className="mono" style={{ color: "var(--ink3)" }}>#{inv.chainInvoiceId}</td>
                      <td className="mono" style={{ fontSize: 12 }}>{inv.clientName}</td>
                      <td className="mono" style={{ color: "var(--green)", fontWeight: 600 }}>{formatUsdc(inv.amountNative)}</td>
                      <td><StatusBadge status={inv.status} /></td>
                      <td style={{ color: "var(--ink3)", fontSize: 12 }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td>
                        {inv.txHashPay || inv.txHashCreate ? (
                          <a href={explorerTxUrl(inv.txHashPay || inv.txHashCreate || "")} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontSize: 12 }}>View →</a>
                        ) : "—"}
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

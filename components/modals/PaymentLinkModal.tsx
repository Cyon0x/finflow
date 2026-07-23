"use client";

import { useState } from "react";
import { useModal } from "@/lib/modals";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { usePaymentLinks } from "@/lib/hooks/usePaymentLinks";
import { useInvoices } from "@/lib/hooks/useInvoices";
import { getTreasuryContract } from "@/lib/web3/contracts";
import { usdcToWei } from "@/lib/web3/format";

// Payment links come in two real flavors:
//  - ONE_TIME: backed by a real FinFlowTreasury invoice (payInvoice(id)) —
//    fixed amount, closes itself once paid, overpayment auto-refunded by
//    the contract.
//  - OPEN: payer sends any amount directly to the treasury contract
//    (its receive() fallback) — no fixed target, reusable indefinitely.
// Recurring billing isn't implemented: the deployed contract has no
// subscription logic, and faking recurrence with a plain link would be
// exactly the kind of decorative feature this rebuild is trying to avoid.

export function PaymentLinkModal() {
  const { modal, close } = useModal();
  const open = modal === "payment-link";
  const { getSigner, address } = useWallet();
  const { showToast } = useToast();
  const { createPaymentLink } = usePaymentLinks();
  const { createInvoice } = useInvoices();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", type: "ONE_TIME", note: "" });

  if (!open) return null;

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit() {
    if (!address) return showToast("🔗", "Connect a wallet first.", "error");
    if (!form.name) return showToast("❌", "Give this link a name.", "error");
    if (form.type === "ONE_TIME" && !form.amount) return showToast("❌", "Enter an amount.", "error");

    setSubmitting(true);
    try {
      let invoiceId: string | undefined;
      let amountNative = "0";

      if (form.type === "ONE_TIME") {
        const signer = await getSigner();
        const treasury = getTreasuryContract(signer);
        const amountWei = usdcToWei(form.amount);
        amountNative = amountWei.toString();

        showToast("✍️", "Confirm the transaction in your wallet…");
        const tx = await treasury.createInvoice(amountWei, form.name.slice(0, 120));
        const receipt = await tx.wait();

        let chainInvoiceId: number | null = null;
        for (const log of receipt.logs) {
          try {
            const parsed = treasury.interface.parseLog(log);
            if (parsed?.name === "InvoiceCreated") chainInvoiceId = Number(parsed.args.id);
          } catch { /* ignore */ }
        }
        if (chainInvoiceId === null) throw new Error("Could not read invoice id from receipt");

        const invoice = await createInvoice({
          clientName: form.name,
          description: form.note || form.name,
          amountNative,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          chainInvoiceId,
          txHashCreate: tx.hash,
        });
        invoiceId = invoice.id;
      }

      const link = await createPaymentLink({
        title: form.name,
        amountNative,
        type: form.type,
        note: form.note || undefined,
        invoiceId,
      });

      showToast("🔗", `Payment link created: /pay/${link.slug}`, "success");
      setForm({ name: "", amount: "", type: "ONE_TIME", note: "" });
      close();
    } catch (err) {
      showToast("❌", (err as Error).message || "Failed to create link", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="modal">
        <div className="modal-close" onClick={close}>✕</div>
        <div className="modal-title">🔗 Create Payment Link</div>
        <div className="modal-sub">Share a link to receive USDC payments instantly</div>

        <div className="form-group">
          <label className="form-label">Link Name</label>
          <input className="form-input" placeholder="e.g. Design Services, Consulting" value={form.name} onChange={set("name")} />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select className="form-input" value={form.type} onChange={set("type")}>
            <option value="ONE_TIME">One-time Payment (fixed amount, on-chain invoice)</option>
            <option value="OPEN">Open Amount (payer chooses, direct transfer)</option>
          </select>
        </div>
        {form.type === "ONE_TIME" && (
          <div className="form-group">
            <label className="form-label">Amount (USDC)</label>
            <div className="input-prefix">
              <div className="input-prefix-label">USDC</div>
              <input className="form-input" type="number" placeholder="0.00" value={form.amount} onChange={set("amount")} />
            </div>
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Note (optional)</label>
          <input className="form-input" placeholder="Invoice ref, work description…" value={form.note} onChange={set("note")} />
        </div>

        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: "var(--ink3)" }}>
          <span style={{ fontWeight: 500, color: "var(--ink2)" }}>Fee:</span> $0 platform fee — FinFlowTreasury takes no cut, you receive the full amount. Payer only pays Arc network gas.
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleSubmit} disabled={submitting}>
            {submitting ? <span className="spinner" /> : null} {submitting ? "Working…" : "Generate Link"}
          </button>
          <button className="btn btn-secondary" onClick={close} disabled={submitting}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

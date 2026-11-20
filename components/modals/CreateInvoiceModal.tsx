"use client";

import { ARC_NETWORK_LABEL } from "@/lib/web3/chain";

import { useState } from "react";
import { useModal } from "@/lib/modals";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { useInvoices } from "@/lib/hooks/useInvoices";
import { usePaymentLinks } from "@/lib/hooks/usePaymentLinks";
import { getTreasuryContract } from "@/lib/web3/contracts";
import { arcTransactionOverrides } from "@/lib/web3/gas";
import { usdcToWei, formatUsdc } from "@/lib/web3/format";
import { getSavedBusinessName, saveBusinessName } from "@/lib/businessProfile";
import { PaymentLinkShare } from "@/components/PaymentLinkShare";

const emptyForm = () => ({
  businessName: getSavedBusinessName(),
  clientName: "",
  clientEmail: "",
  amount: "",
  dueDate: "",
  description: "",
});

export function CreateInvoiceModal() {
  const { modal, close } = useModal();
  const open = modal === "create-invoice";
  const { getSigner, address, refreshBalance } = useWallet();
  const { showToast } = useToast();
  const { createInvoice } = useInvoices();
  const { createPaymentLink } = usePaymentLinks();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState<{ url: string; title: string; amountLabel: string } | null>(null);

  if (!open) return null;

  function handleClose() {
    setForm(emptyForm());
    setSuccess(null);
    close();
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit() {
    if (!address) {
      showToast("🔗", "Connect a wallet first.", "error");
      return;
    }
    if (!form.clientName || !form.amount || !form.dueDate || !form.description) {
      showToast("❌", "Fill in all fields.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const signer = await getSigner();
      const treasury = getTreasuryContract(signer);
      const memo = form.description.slice(0, 120);
      const amountWei = usdcToWei(form.amount);

      showToast("✍️", "Confirm the transaction in your wallet…");
      const tx = await treasury.createInvoice(amountWei, memo, await arcTransactionOverrides(signer));
      showToast("⏳", `Waiting for confirmation on ${ARC_NETWORK_LABEL}…`);
      const receipt = await tx.wait();

      let chainInvoiceId: number | null = null;
      for (const log of receipt.logs) {
        try {
          const parsed = treasury.interface.parseLog(log);
          if (parsed?.name === "InvoiceCreated") {
            chainInvoiceId = Number(parsed.args.id);
            break;
          }
        } catch {
          /* not one of our events */
        }
      }
      if (chainInvoiceId === null) throw new Error("Could not find InvoiceCreated event in receipt");

      const invoice = await createInvoice({
        businessName: form.businessName || undefined,
        clientName: form.clientName,
        clientEmail: form.clientEmail || undefined,
        description: form.description,
        amountNative: amountWei.toString(),
        dueDate: form.dueDate,
        chainInvoiceId,
        txHashCreate: tx.hash,
      });

      const link = await createPaymentLink({
        title: `Invoice — ${form.clientName}`,
        amountNative: amountWei.toString(),
        type: "ONE_TIME",
        invoiceId: invoice.id,
        businessName: form.businessName || undefined,
      });

      if (form.businessName) saveBusinessName(form.businessName);
      refreshBalance();
      setSuccess({
        url: `${window.location.origin}/pay/${link.slug}`,
        title: `Invoice for ${form.clientName}`,
        amountLabel: `${formatUsdc(amountWei)} USDC`,
      });
    } catch (err) {
      showToast("❌", (err as Error).message || "Failed to create invoice", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal">
        <div className="modal-close" onClick={handleClose}>✕</div>

        {success ? (
          <>
            <PaymentLinkShare url={success.url} title={success.title} amountLabel={success.amountLabel} />
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} onClick={handleClose}>
              Done
            </button>
          </>
        ) : (
          <>
            <div className="modal-title">🧾 Create Invoice</div>
            <div className="modal-sub">Bill your client in USDC, get paid on-chain — creates a real FinFlowTreasury invoice</div>

            <div className="form-group">
              <label className="form-label">Your Business Name (optional)</label>
              <input className="form-input" placeholder="e.g. Kwame Asante Design Studio" value={form.businessName} onChange={set("businessName")} />
            </div>
            <div className="form-group">
              <label className="form-label">Client Name</label>
              <input className="form-input" placeholder="Acme Corp" value={form.clientName} onChange={set("clientName")} />
            </div>
            <div className="form-group">
              <label className="form-label">Client Email (optional)</label>
              <input className="form-input" placeholder="client@company.com" value={form.clientEmail} onChange={set("clientEmail")} />
            </div>
            <div className="form-group">
              <label className="form-label">Amount (USDC)</label>
              <div className="input-prefix">
                <div className="input-prefix-label">USDC</div>
                <input className="form-input" type="number" placeholder="0.00" value={form.amount} onChange={set("amount")} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input className="form-input" type="date" value={form.dueDate} onChange={set("dueDate")} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" rows={3} placeholder="Work description, scope of services… (used as the on-chain memo, max 120 chars)" value={form.description} onChange={set("description")} />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleSubmit} disabled={submitting}>
                {submitting ? <span className="spinner" /> : null} {submitting ? "Confirming on-chain…" : "Create & Send"}
              </button>
              <button className="btn btn-secondary" onClick={handleClose} disabled={submitting}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

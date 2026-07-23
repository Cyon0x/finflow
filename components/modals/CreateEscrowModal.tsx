"use client";

import { useState } from "react";
import { useModal } from "@/lib/modals";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { useEscrows } from "@/lib/hooks/useEscrows";
import { getEscrowContract, ESCROW_ADDRESS } from "@/lib/web3/contracts";
import { usdcToWei } from "@/lib/web3/format";

export function CreateEscrowModal() {
  const { modal, close } = useModal();
  const open = modal === "create-escrow";
  const { getSigner, address, refreshBalance } = useWallet();
  const { showToast } = useToast();
  const { recordEscrow } = useEscrows();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ contractor: "", amount: "", milestone: "", deadline: "" });

  if (!open) return null;

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit() {
    if (!address) return showToast("🔗", "Connect a wallet first.", "error");
    if (!ESCROW_ADDRESS) return showToast("🚧", "Escrow contract isn't deployed yet — run `npm run contracts:deploy`.", "error");
    if (!form.contractor || !form.amount || !form.milestone || !form.deadline) {
      return showToast("❌", "Fill in all fields.", "error");
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(form.contractor)) return showToast("❌", "Invalid contractor address.", "error");

    setSubmitting(true);
    try {
      const signer = await getSigner();
      const escrow = getEscrowContract(signer);
      const amountWei = usdcToWei(form.amount);
      const deadlineTs = Math.floor(new Date(form.deadline).getTime() / 1000);

      showToast("✍️", "Confirm the transaction in your wallet…");
      const tx = await escrow.createEscrow(form.contractor, form.milestone.slice(0, 200), deadlineTs, { value: amountWei });
      showToast("⏳", "Waiting for confirmation on Arc Testnet…");
      const receipt = await tx.wait();

      let chainEscrowId: number | null = null;
      for (const log of receipt.logs) {
        try {
          const parsed = escrow.interface.parseLog(log);
          if (parsed?.name === "EscrowCreated") chainEscrowId = Number(parsed.args.id);
        } catch { /* ignore */ }
      }
      if (chainEscrowId === null) throw new Error("Could not read escrow id from receipt");

      await recordEscrow({
        chainEscrowId,
        contractor: form.contractor,
        amountNative: amountWei.toString(),
        milestone: form.milestone,
        deadline: form.deadline,
        txHashCreate: tx.hash,
      });

      showToast("🔒", `Escrow #${chainEscrowId} funded on Arc Testnet!`, "success");
      setForm({ contractor: "", amount: "", milestone: "", deadline: "" });
      refreshBalance();
      close();
    } catch (err) {
      showToast("❌", (err as Error).message || "Failed to create escrow", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="modal">
        <div className="modal-close" onClick={close}>✕</div>
        <div className="modal-title">🔒 New Escrow Contract</div>
        <div className="modal-sub">Lock USDC on-chain until milestone conditions are met</div>

        <div className="form-group">
          <label className="form-label">Contractor Wallet</label>
          <input className="form-input" placeholder="0x… (recipient address)" value={form.contractor} onChange={set("contractor")} />
        </div>
        <div className="form-group">
          <label className="form-label">Amount (USDC)</label>
          <div className="input-prefix">
            <div className="input-prefix-label">USDC</div>
            <input className="form-input" type="number" placeholder="0.00" value={form.amount} onChange={set("amount")} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Milestone / Condition</label>
          <input className="form-input" placeholder="e.g. Final website delivery" value={form.milestone} onChange={set("milestone")} />
        </div>
        <div className="form-group">
          <label className="form-label">Deadline</label>
          <input className="form-input" type="date" value={form.deadline} onChange={set("deadline")} />
        </div>

        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: "var(--ink3)" }}>
          Funds locked in FinFlowEscrow on Arc Testnet. You (the depositor) control release — 1% fee on release. If you never release, you can reclaim funds after the deadline passes.
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleSubmit} disabled={submitting}>
            {submitting ? <span className="spinner" /> : null} {submitting ? "Locking funds…" : "Lock Funds"}
          </button>
          <button className="btn btn-secondary" onClick={close} disabled={submitting}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

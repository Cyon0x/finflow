"use client";

import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { getBatchPayoutContract, BATCH_PAYOUT_ADDRESS } from "@/lib/web3/contracts";
import { usdcToWei, formatUsdc } from "@/lib/web3/format";
import { explorerTxUrl, ARC_TESTNET } from "@/lib/web3/chain";

type Row = { address: string; amount: string };

export default function PayoutsPage() {
  const { address, getSigner } = useWallet();
  const { showToast } = useToast();
  const [rows, setRows] = useState<Row[]>([{ address: "", amount: "" }]);
  const [submitting, setSubmitting] = useState(false);
  const [feeBps, setFeeBps] = useState(100);
  const [lastTx, setLastTx] = useState<string | null>(null);

  useEffect(() => {
    if (!BATCH_PAYOUT_ADDRESS) return;
    const provider = new ethers.JsonRpcProvider(ARC_TESTNET.rpcUrls[0]);
    getBatchPayoutContract(provider)
      .feeBps()
      .then((bps: bigint) => setFeeBps(Number(bps)))
      .catch(() => {});
  }, []);

  const totals = useMemo(() => {
    let subtotal = 0n;
    let validRows = 0;
    for (const r of rows) {
      if (!r.address || !r.amount) continue;
      try {
        subtotal += usdcToWei(r.amount);
        validRows++;
      } catch { /* invalid number, ignore */ }
    }
    const fee = (subtotal * BigInt(feeBps)) / 10_000n;
    return { subtotal, fee, total: subtotal + fee, validRows };
  }, [rows, feeBps]);

  function updateRow(i: number, key: keyof Row, value: string) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  }
  function addRow() {
    setRows((prev) => [...prev, { address: "", amount: "" }]);
  }
  function removeRow(i: number) {
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit() {
    if (!address) return showToast("🔗", "Connect a wallet first.", "error");
    if (!BATCH_PAYOUT_ADDRESS) return showToast("🚧", "BatchPayout contract isn't deployed yet — run `npm run contracts:deploy`.", "error");

    const validRows = rows.filter((r) => r.address && r.amount);
    if (validRows.length === 0) return showToast("❌", "Add at least one recipient.", "error");
    for (const r of validRows) {
      if (!/^0x[a-fA-F0-9]{40}$/.test(r.address)) return showToast("❌", `Invalid address: ${r.address}`, "error");
    }

    setSubmitting(true);
    try {
      const signer = await getSigner();
      const contract = getBatchPayoutContract(signer);
      const recipients = validRows.map((r) => r.address);
      const amounts = validRows.map((r) => usdcToWei(r.amount));

      showToast("✍️", "Confirm the transaction in your wallet…");
      const tx = await contract.disperseNative(recipients, amounts, { value: totals.total });
      showToast("⏳", "Waiting for confirmation on Arc Testnet…");
      await tx.wait();

      setLastTx(tx.hash);
      showToast("🚀", `Batch payout of ${formatUsdc(totals.subtotal)} USDC sent to ${validRows.length} wallets!`, "success");
      setRows([{ address: "", amount: "" }]);
    } catch (err) {
      showToast("❌", (err as Error).message || "Batch payout failed", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="two-col" style={{ marginBottom: 24 }}>
      <div className="card">
        <div className="card-header"><span className="card-title">🚀 Batch Payout</span></div>
        <div className="card-body">
          <div style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 16 }}>
            Send USDC to multiple wallets in a single on-chain transaction via the FinFlowBatchPayout contract.
          </div>

          {!BATCH_PAYOUT_ADDRESS && (
            <div style={{ background: "var(--amber-light)", border: "1px solid var(--amber)", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: "var(--amber)" }}>
              BatchPayout contract not deployed yet. Run <code>npm run contracts:deploy</code> and set NEXT_PUBLIC_BATCHPAYOUT_ADDRESS.
            </div>
          )}

          <div>
            {rows.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px auto", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <input className="form-input" placeholder="Wallet address (0x…)" value={row.address} onChange={(e) => updateRow(i, "address", e.target.value)} />
                <input className="form-input" placeholder="USDC" type="number" value={row.amount} onChange={(e) => updateRow(i, "amount", e.target.value)} />
                <button className="btn btn-danger btn-sm" onClick={() => removeRow(i)} disabled={rows.length === 1}>✕</button>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }} onClick={addRow}>+ Add Recipient</button>

          <div className="divider" />
          <div className="fee-row"><span style={{ color: "var(--ink3)" }}>Subtotal</span><span className="mono">{formatUsdc(totals.subtotal)} USDC</span></div>
          <div className="fee-row"><span style={{ color: "var(--ink3)" }}>Platform Fee ({(feeBps / 100).toFixed(2)}%)</span><span className="mono" style={{ color: "var(--red)" }}>-{formatUsdc(totals.fee)} USDC</span></div>
          <div className="fee-row"><span style={{ color: "var(--ink3)" }}>Network Fee</span><span className="mono" style={{ color: "var(--ink3)" }}>~$0.001</span></div>
          <div className="fee-row"><span>Total Deducted</span><span className="mono">{formatUsdc(totals.total)} USDC</span></div>

          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={handleSubmit} disabled={submitting || totals.validRows === 0}>
            {submitting ? <span className="spinner" /> : null} {submitting ? "Sending…" : "Send Batch Payout"}
          </button>

          {lastTx && (
            <div style={{ marginTop: 12, fontSize: 12, textAlign: "center" }}>
              <a href={explorerTxUrl(lastTx)} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>View last payout on Arc Explorer →</a>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">💼 How it works</span></div>
        <div className="card-body" style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.8 }}>
          <p>Add each recipient&apos;s wallet address and the USDC amount they should receive.</p>
          <p style={{ marginTop: 10 }}>Everything sends in <strong>one transaction</strong> via <code>disperseNative()</code> — recipients get their exact listed amount, and the platform fee is added on top, not deducted from what they receive.</p>
          <p style={{ marginTop: 10, color: "var(--ink3)" }}>Up to 200 recipients per batch. Team &amp; payroll wallet presets are on the roadmap — for now, paste addresses directly.</p>
        </div>
      </div>
    </div>
  );
}

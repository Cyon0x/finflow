"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { useInvoices } from "@/lib/hooks/useInvoices";
import { getEscrowContract, getBatchPayoutContract, ESCROW_ADDRESS, BATCH_PAYOUT_ADDRESS } from "@/lib/web3/contracts";
import { ARC_TESTNET } from "@/lib/web3/chain";

const FREE_TIER_LIMIT = 50;

export default function SettingsPage() {
  const { address, getSigner } = useWallet();
  const { showToast } = useToast();
  const { invoices } = useInvoices();
  const [escrowFeeBps, setEscrowFeeBps] = useState<number | null>(null);
  const [payoutFeeBps, setPayoutFeeBps] = useState<number | null>(null);
  const [escrowOwner, setEscrowOwner] = useState<string | null>(null);
  const [payoutOwner, setPayoutOwner] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const isEscrowOwner = address && escrowOwner && address.toLowerCase() === escrowOwner.toLowerCase();
  const isPayoutOwner = address && payoutOwner && address.toLowerCase() === payoutOwner.toLowerCase();

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider(ARC_TESTNET.rpcUrls[0]);
    if (ESCROW_ADDRESS) {
      const c = getEscrowContract(provider);
      c.feeBps().then((v: bigint) => setEscrowFeeBps(Number(v))).catch(() => {});
      c.owner().then(setEscrowOwner).catch(() => {});
    }
    if (BATCH_PAYOUT_ADDRESS) {
      const c = getBatchPayoutContract(provider);
      c.feeBps().then((v: bigint) => setPayoutFeeBps(Number(v))).catch(() => {});
      c.owner().then(setPayoutOwner).catch(() => {});
    }
  }, []);

  async function saveFee(contractType: "escrow" | "payout", bpsValue: number) {
    setSaving(true);
    try {
      const signer = await getSigner();
      const contract = contractType === "escrow" ? getEscrowContract(signer) : getBatchPayoutContract(signer);
      const tx = await contract.setFeeBps(bpsValue);
      showToast("⏳", "Confirming fee update on-chain…");
      await tx.wait();
      showToast("✅", "Fee updated on-chain!", "success");
    } catch (err) {
      showToast("❌", (err as Error).message || "Failed to update fee", "error");
    } finally {
      setSaving(false);
    }
  }

  const invoicesThisMonth = invoices.filter((i) => {
    const d = new Date(i.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div>
      <h2 className="section-heading" style={{ marginBottom: 20 }}>Settings</h2>
      <div className="two-col">
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><span className="card-title">Account</span></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Connected Wallet</label>
                <input className="form-input mono" value={address || "Not connected"} readOnly />
              </div>
              <div style={{ fontSize: 12, color: "var(--ink3)" }}>
                FinFlow has no separate login — your wallet address is your account. There is nothing else to configure here.
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">Protocol Fee Configuration</span></div>
            <div className="card-body">
              <div style={{ fontSize: 12, color: "var(--ink3)", marginBottom: 16 }}>
                On-chain, owner-gated settings for FinFlowEscrow and FinFlowBatchPayout (capped at 3%). FinFlowTreasury charges no fee at all.
              </div>

              <div className="form-group">
                <label className="form-label">Escrow Release Fee (bps){!isEscrowOwner && ESCROW_ADDRESS ? " — read-only, not the contract owner" : ""}</label>
                <input
                  className="form-input"
                  type="number"
                  value={escrowFeeBps ?? ""}
                  disabled={!isEscrowOwner || saving}
                  onChange={(e) => setEscrowFeeBps(Number(e.target.value))}
                />
              </div>
              <button className="btn btn-secondary btn-sm" disabled={!isEscrowOwner || saving || escrowFeeBps === null} onClick={() => escrowFeeBps !== null && saveFee("escrow", escrowFeeBps)}>
                Update Escrow Fee
              </button>

              <div className="divider" />

              <div className="form-group">
                <label className="form-label">Batch Payout Fee (bps){!isPayoutOwner && BATCH_PAYOUT_ADDRESS ? " — read-only, not the contract owner" : ""}</label>
                <input
                  className="form-input"
                  type="number"
                  value={payoutFeeBps ?? ""}
                  disabled={!isPayoutOwner || saving}
                  onChange={(e) => setPayoutFeeBps(Number(e.target.value))}
                />
              </div>
              <button className="btn btn-secondary btn-sm" disabled={!isPayoutOwner || saving || payoutFeeBps === null} onClick={() => payoutFeeBps !== null && saveFee("payout", payoutFeeBps)}>
                Update Payout Fee
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Plans</span></div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="plan-card">
              <div className="plan-name">Free</div>
              <div className="plan-price">$0 <span>/ month</span></div>
              <div style={{ marginTop: 12 }}>
                <div className="plan-feature">{FREE_TIER_LIMIT} invoices / month</div>
                <div className="plan-feature">Payment links, escrow, payouts</div>
                <div className="plan-feature">API access</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <span className="badge badge-green">Current Plan · {invoicesThisMonth}/{FREE_TIER_LIMIT} used this month</span>
              </div>
            </div>
            <div className="plan-card featured">
              <div className="feature-tag">⚡ ROADMAP</div>
              <div className="plan-name">Pro</div>
              <div className="plan-price">$29 <span>/ month</span></div>
              <div style={{ marginTop: 12 }}>
                <div className="plan-feature">Unlimited invoices</div>
                <div className="plan-feature">Priority support</div>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 12, width: "100%", justifyContent: "center" }} disabled>
                Billing not built yet — usage limits aren&apos;t enforced
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

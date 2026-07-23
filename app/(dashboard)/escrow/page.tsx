"use client";

import { useMemo, useState } from "react";
import { useEscrows } from "@/lib/hooks/useEscrows";
import { useModal } from "@/lib/modals";
import { useToast } from "@/components/Toast";
import { useWallet } from "@/lib/web3/WalletProvider";
import { getEscrowContract, ESCROW_ADDRESS } from "@/lib/web3/contracts";
import { formatUsdc } from "@/lib/web3/format";
import { explorerTxUrl, explorerAddressUrl } from "@/lib/web3/chain";

export default function EscrowPage() {
  const { escrows, loading, syncEscrow } = useEscrows();
  const { open } = useModal();
  const { showToast } = useToast();
  const { getSigner } = useWallet();
  const [busyId, setBusyId] = useState<string | null>(null);

  const totals = useMemo(() => {
    const locked = escrows.filter((e) => !e.released).reduce((s, e) => s + BigInt(e.amountNative), 0n);
    const released = escrows.filter((e) => e.released).reduce((s, e) => s + BigInt(e.amountNative), 0n);
    return { locked, released, active: escrows.filter((e) => !e.released).length };
  }, [escrows]);

  async function handleRelease(escrowId: string, chainEscrowId: number) {
    setBusyId(escrowId);
    try {
      const signer = await getSigner();
      const contract = getEscrowContract(signer);
      showToast("✍️", "Confirm the release in your wallet…");
      const tx = await contract.release(chainEscrowId);
      showToast("⏳", "Waiting for confirmation…");
      await tx.wait();
      await syncEscrow(escrowId);
      showToast("✅", "Escrow released!", "success");
    } catch (err) {
      showToast("❌", (err as Error).message || "Release failed", "error");
    } finally {
      setBusyId(null);
    }
  }

  async function handleRefund(escrowId: string, chainEscrowId: number) {
    setBusyId(escrowId);
    try {
      const signer = await getSigner();
      const contract = getEscrowContract(signer);
      showToast("✍️", "Confirm the refund in your wallet…");
      const tx = await contract.refundExpired(chainEscrowId);
      await tx.wait();
      await syncEscrow(escrowId);
      showToast("↩️", "Funds reclaimed after deadline.", "success");
    } catch (err) {
      showToast("❌", (err as Error).message || "Refund failed", "error");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 className="section-heading">🔒 Escrow System</h2>
          <div className="section-sub">Lock funds until conditions are met — secure, transparent, on-chain (FinFlowEscrow)</div>
        </div>
        <button className="btn btn-primary" onClick={() => open("create-escrow")}>+ New Escrow</button>
      </div>

      {!ESCROW_ADDRESS && (
        <div style={{ background: "var(--amber-light)", border: "1px solid var(--amber)", borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 12, color: "var(--amber)" }}>
          Escrow contract not deployed yet. Run <code>npm run contracts:deploy</code> and set NEXT_PUBLIC_ESCROW_ADDRESS.
        </div>
      )}

      <div className="three-col" style={{ marginBottom: 24 }}>
        <div className="metric-card"><div className="metric-label">LOCKED IN ESCROW</div><div className="metric-value">{formatUsdc(totals.locked)}</div><div className="metric-sub metric-neutral">USDC</div></div>
        <div className="metric-card"><div className="metric-label">ACTIVE CONTRACTS</div><div className="metric-value">{totals.active}</div><div className="metric-sub metric-neutral">awaiting release</div></div>
        <div className="metric-card"><div className="metric-label">TOTAL RELEASED</div><div className="metric-value">{formatUsdc(totals.released)}</div><div className="metric-sub metric-up">↑ All-time</div></div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Escrow Contracts</span></div>
        <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {loading ? (
            <div className="empty-desc">Loading…</div>
          ) : escrows.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔒</div>
              <div className="empty-title">No escrow contracts yet</div>
              <div className="empty-desc">Lock funds for a contractor to see them here.</div>
            </div>
          ) : (
            escrows.map((e) => {
              const isExpired = new Date(e.deadline).getTime() < Date.now();
              return (
                <div className="invoice-card" key={e.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>ESC-{e.chainEscrowId} · {e.milestone}</div>
                      <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 2 }}>
                        Contractor: <a href={explorerAddressUrl(e.contractor)} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>{e.contractor.slice(0, 8)}…{e.contractor.slice(-4)}</a>
                      </div>
                    </div>
                    <span className={`badge ${e.released ? "badge-green" : isExpired ? "badge-red" : "badge-amber"}`}>
                      {e.released ? "✓ Released" : isExpired ? "Expired" : "Awaiting Release"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
                    <div><div className="metric-label">LOCKED</div><div className="mono" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{formatUsdc(e.amountNative)} USDC</div></div>
                    <div><div className="metric-label">DEADLINE</div><div style={{ fontWeight: 500, fontSize: 13 }}>{new Date(e.deadline).toLocaleDateString()}</div></div>
                  </div>
                  {!e.released && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn btn-green btn-sm" onClick={() => handleRelease(e.id, e.chainEscrowId)} disabled={busyId === e.id}>
                        {busyId === e.id ? "…" : "Release Funds"}
                      </button>
                      {isExpired && (
                        <button className="btn btn-secondary btn-sm" onClick={() => handleRefund(e.id, e.chainEscrowId)} disabled={busyId === e.id}>
                          Reclaim (expired)
                        </button>
                      )}
                      {e.txHashCreate && (
                        <a href={explorerTxUrl(e.txHashCreate)} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">View on Arc Explorer →</a>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

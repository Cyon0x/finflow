"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { WalletModal } from "@/components/WalletModal";
import { getTreasuryContract } from "@/lib/web3/contracts";
import { usdcToWei, formatUsdc, shortAddr } from "@/lib/web3/format";
import { explorerTxUrl } from "@/lib/web3/chain";
import type { ClientPaymentLink } from "@/lib/types";

export default function PayLinkPage({ params }: { params: { slug: string } }) {
  const { address, getSigner, refreshBalance } = useWallet();
  const { showToast } = useToast();
  const [link, setLink] = useState<ClientPaymentLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [openAmount, setOpenAmount] = useState("");
  const [paying, setPaying] = useState(false);
  const [paidTx, setPaidTx] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/payment-links/${params.slug}`)
      .then((r) => r.json())
      .then((json) => setLink(json.link || null))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const alreadyPaid = link?.invoice?.status === "PAID";

  async function handlePay() {
    if (!address) return setWalletModalOpen(true);
    if (!link) return;

    setPaying(true);
    try {
      const signer = await getSigner();

      if (link.invoice) {
        const treasury = getTreasuryContract(signer);
        showToast("✍️", "Confirm the payment in your wallet…");
        const tx = await treasury.payInvoice(link.invoice.chainInvoiceId, { value: BigInt(link.amountNative) });
        showToast("⏳", "Waiting for confirmation on Arc Testnet…");
        await tx.wait();
        setPaidTx(tx.hash);

        await fetch(`/api/payment-links/${params.slug}`, { method: "POST" });
        // Re-derive from chain: sync the invoice DB row so the merchant's
        // dashboard reflects payment immediately without waiting for the
        // daily cron reconciliation pass.
        if (link.invoiceId) await fetch(`/api/invoices/${link.invoiceId}/sync`, { method: "POST" }).catch(() => {});
      } else {
        if (!openAmount || Number(openAmount) <= 0) {
          showToast("❌", "Enter an amount.", "error");
          setPaying(false);
          return;
        }
        showToast("✍️", "Confirm the payment in your wallet…");
        // Open Amount links are peer-to-peer, straight to the link creator's
        // own wallet — never through the shared FinFlowTreasury contract.
        // Treasury is single-owner (only its owner can withdraw funds it
        // holds), so routing arbitrary merchants' Open Amount payments
        // through it would trap their money under someone else's key.
        const tx = await signer.sendTransaction({ to: link.ownerAddress, value: usdcToWei(openAmount) });
        showToast("⏳", "Waiting for confirmation on Arc Testnet…");
        await tx.wait();
        setPaidTx(tx.hash);
        await fetch(`/api/payment-links/${params.slug}`, { method: "POST" });
      }

      refreshBalance();
      showToast("🎉", "Payment sent!", "success");
    } catch (err) {
      showToast("❌", (err as Error).message || "Payment failed", "error");
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return <CenteredShell><div className="empty-desc">Loading…</div></CenteredShell>;
  }

  if (!link || !link.active) {
    return (
      <CenteredShell>
        <div className="empty-state">
          <div className="empty-icon">🔗</div>
          <div className="empty-title">Link not found</div>
          <div className="empty-desc">This payment link doesn&apos;t exist or has been deactivated.</div>
        </div>
      </CenteredShell>
    );
  }

  return (
    <CenteredShell>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div className="ff-logo" style={{ color: "var(--ink)", fontSize: "1.6rem" }}>Fin<span style={{ color: "var(--accent)" }}>Flow</span></div>
        <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 2 }}>Secure payment on Arc Testnet</div>
      </div>

      <div className="card">
        <div className="card-body">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "var(--ink3)", marginBottom: 4 }}>{link.note || "Payment request"}</div>
            <div className="modal-title" style={{ fontSize: "1.3rem" }}>{link.title}</div>
            {link.invoice ? (
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "2.2rem", fontWeight: 700, marginTop: 10 }}>
                {formatUsdc(link.amountNative)} <span style={{ fontSize: "1rem", color: "var(--ink3)" }}>USDC</span>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 6 }}>Open amount — you choose how much to send</div>
            )}
          </div>

          {alreadyPaid || paidTx ? (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <div className="empty-title">Payment received</div>
              {paidTx && <a href={explorerTxUrl(paidTx)} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontSize: 12 }}>View on Arc Explorer →</a>}
            </div>
          ) : (
            <>
              {!link.invoice && (
                <div className="form-group">
                  <label className="form-label">Amount (USDC)</label>
                  <div className="input-prefix">
                    <div className="input-prefix-label">USDC</div>
                    <input className="form-input" type="number" placeholder="0.00" value={openAmount} onChange={(e) => setOpenAmount(e.target.value)} />
                  </div>
                </div>
              )}

              {address ? (
                <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={handlePay} disabled={paying}>
                  {paying ? <span className="spinner" /> : null} {paying ? "Processing…" : `Pay with ${shortAddr(address)}`}
                </button>
              ) : (
                <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={() => setWalletModalOpen(true)}>
                  🔗 Connect Wallet to Pay
                </button>
              )}
              <div style={{ fontSize: 11, color: "var(--ink3)", textAlign: "center", marginTop: 12 }}>
                Non-custodial — you approve this transaction directly from your wallet on Arc Testnet.
              </div>
            </>
          )}
        </div>
      </div>

      <WalletModal open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </CenteredShell>
  );
}

function CenteredShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>{children}</div>
    </div>
  );
}

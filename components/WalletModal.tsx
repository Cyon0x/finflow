"use client";

import { useEffect, type CSSProperties } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";
import { ARC_FAUCET_URL } from "@/lib/web3/chain";

export function WalletModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { connectMetaMask, connectCoinbase, connectDemo, connecting, address } = useWallet();

  useEffect(() => {
    if (address && open) onClose();
  }, [address, open, onClose]);

  return (
    <div className={`modal-overlay${open ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-close" onClick={onClose}>✕</div>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: 8 }}>🔗</div>
          <div className="modal-title">Connect Wallet</div>
          <div className="modal-sub">Connect to FinFlow on Arc Testnet — Circle's stablecoin-native L1</div>
        </div>

        {connecting && (
          <div
            style={{
              fontSize: 12,
              color: "var(--accent)",
              fontFamily: "'JetBrains Mono',monospace",
              textAlign: "center",
              background: "var(--accent-light)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: 8,
              marginBottom: 12,
            }}
          >
            Opening wallet… confirm the connection there.
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <button className="btn btn-secondary" style={walletBtnStyle} onClick={connectMetaMask} disabled={connecting}>
            <span style={iconBoxStyle}>🦊</span>
            <span style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>MetaMask</div>
              <div style={{ fontSize: 12, color: "var(--ink3)" }}>Browser extension · Real connection</div>
            </span>
          </button>

          <button className="btn btn-secondary" style={walletBtnStyle} onClick={connectCoinbase} disabled={connecting}>
            <span style={iconBoxStyle}>🔵</span>
            <span style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Coinbase Wallet</div>
              <div style={{ fontSize: 12, color: "var(--ink3)" }}>Extension or injected mobile app</div>
            </span>
          </button>

          <button
            className="btn"
            style={{ ...walletBtnStyle, background: "var(--accent-light)", border: "1px dashed var(--accent)" }}
            onClick={connectDemo}
            disabled={connecting}
          >
            <span style={iconBoxStyle}>⚡</span>
            <span style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Demo Mode</div>
              <div style={{ fontSize: 12, color: "var(--ink3)" }}>Explore the UI, view-only — can&apos;t sign real transactions</div>
            </span>
          </button>
        </div>

        <div
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg,var(--accent),var(--accent2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "1rem",
            }}
          >
            ⛓️
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>Arc Testnet · Circle&apos;s L1</div>
            <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 1 }}>Native USDC gas · Sub-second finality · EVM compatible</div>
          </div>
          <a href={ARC_FAUCET_URL} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "var(--accent)", fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap", textDecoration: "none", marginLeft: "auto" }}>
            Get USDC →
          </a>
        </div>

        <div style={{ fontSize: 11, color: "var(--ink3)", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
          Your funds stay in your wallet — FinFlow is non-custodial.
        </div>
      </div>
    </div>
  );
}

const walletBtnStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "14px 16px",
  borderRadius: 12,
  width: "100%",
  justifyContent: "flex-start",
};

const iconBoxStyle: CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 10,
  background: "var(--surface3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.4rem",
  flexShrink: 0,
};

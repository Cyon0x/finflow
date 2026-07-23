"use client";

import { useState } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useTheme } from "@/lib/theme";
import { shortAddr } from "@/lib/web3/format";
import { NotifPanel } from "./NotifPanel";

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  payments: "Payments",
  payouts: "Payouts",
  invoices: "Invoices",
  offramp: "Off-Ramp",
  escrow: "Escrow",
  analytics: "Analytics",
  team: "Team Wallets",
  "api-dev": "API & Dev",
  settings: "Settings",
};

export function Topbar({
  section,
  onMenuClick,
  onOpenWalletModal,
  onNewPayment,
}: {
  section: string;
  onMenuClick: () => void;
  onOpenWalletModal: () => void;
  onNewPayment: () => void;
}) {
  const { address, disconnect } = useWallet();
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button className="menu-toggle" onClick={onMenuClick}>☰</button>
        <span className="page-title">{PAGE_TITLES[section] || section}</span>
      </div>
      <div className="topbar-right">
        <div className="arc-chain">Arc Testnet</div>
        <div style={{ position: "relative" }}>
          <button className="topbar-btn notif-dot" onClick={() => setNotifOpen((o) => !o)}>🔔</button>
          <NotifPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>
        <button className="topbar-btn theme-toggle" onClick={toggleTheme} title="Toggle dark/light mode" style={{ fontSize: 16, padding: "7px 10px" }}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button className="topbar-btn primary" onClick={onNewPayment}>+ New Payment</button>
        {address ? (
          <button className="topbar-btn" style={{ borderColor: "var(--green)", color: "var(--green)" }} onClick={disconnect} title="Click to disconnect">
            ✓ {shortAddr(address)}
          </button>
        ) : (
          <button className="topbar-btn" style={{ borderColor: "var(--accent)", color: "var(--accent)" }} onClick={onOpenWalletModal}>
            🔗 Connect Wallet
          </button>
        )}
        <div className="avatar">{address ? address.slice(2, 4).toUpperCase() : "FF"}</div>
      </div>
    </header>
  );
}

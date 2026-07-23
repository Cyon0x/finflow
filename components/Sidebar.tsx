"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/lib/web3/WalletProvider";
import { formatUsdc, shortAddr } from "@/lib/web3/format";

const NAV_SECTIONS: { label: string; items: { href: string; icon: string; label: string; badge?: string }[] }[] = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", icon: "📊", label: "Dashboard" },
      { href: "/payments", icon: "💳", label: "Payments" },
      { href: "/payouts", icon: "🚀", label: "Payouts" },
      { href: "/invoices", icon: "🧾", label: "Invoices" },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/offramp", icon: "🏦", label: "Off-Ramp" },
      { href: "/escrow", icon: "🔒", label: "Escrow" },
      { href: "/analytics", icon: "📈", label: "Analytics" },
    ],
  },
  {
    label: "Team",
    items: [
      { href: "/team", icon: "👥", label: "Team Wallets" },
      { href: "/api-dev", icon: "🔌", label: "API & Dev" },
      { href: "/settings", icon: "⚙️", label: "Settings" },
    ],
  },
];

export function Sidebar({
  open,
  onNavigate,
  onOpenWalletModal,
}: {
  open: boolean;
  onNavigate: () => void;
  onOpenWalletModal: () => void;
}) {
  const pathname = usePathname();
  const { address, kind, balanceWei } = useWallet();

  return (
    <aside className={`sidebar${open ? " open" : ""}`}>
      <div className="sidebar-header">
        <div>
          <div className="ff-logo">
            Fin<span>Flow</span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(200,216,240,0.4)", marginTop: 1, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.06em" }}>
            PAYMENTS PLATFORM
          </div>
        </div>
      </div>

      <div className="arc-badge" style={{ marginTop: 12 }}>
        <div className="arc-badge-text">ARC TESTNET</div>
        <div className="testnet-dot" />
      </div>

      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          <div className="nav-section-label">{section.label}</div>
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item${pathname?.startsWith(item.href) ? " active" : ""}`}
              onClick={onNavigate}
            >
              <span className="nav-icon">{item.icon}</span> {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </Link>
          ))}
        </div>
      ))}

      <div className="sidebar-footer">
        <div className="wallet-pill" onClick={onOpenWalletModal}>
          <div className="wallet-label">{address ? `${kind?.toUpperCase()} CONNECTED` : "WALLET"}</div>
          <div className="wallet-addr">{address ? shortAddr(address) : "Not connected"}</div>
          <div className="wallet-net">
            {address ? `Arc Testnet · ${balanceWei !== null ? formatUsdc(balanceWei) : "…"} USDC` : "Connect your wallet"}
          </div>
        </div>
      </div>
    </aside>
  );
}

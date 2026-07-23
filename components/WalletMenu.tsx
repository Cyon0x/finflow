"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { shortAddr, formatUsdc } from "@/lib/web3/format";
import { explorerAddressUrl } from "@/lib/web3/chain";

export function WalletMenu({ trigger, openDirection = "down" }: { trigger: ReactNode; openDirection?: "up" | "down" }) {
  const { address, kind, balanceWei, disconnect } = useWallet();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!address) return null;

  function copyAddress() {
    navigator.clipboard.writeText(address!);
    showToast("📋", "Address copied.");
    setOpen(false);
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          style={{
            position: "absolute",
            [openDirection === "down" ? "top" : "bottom"]: "calc(100% + 8px)",
            right: 0,
            width: 240,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            zIndex: 600,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 10, color: "var(--ink3)", letterSpacing: "0.06em", fontFamily: "'JetBrains Mono',monospace" }}>
              {kind?.toUpperCase()} CONNECTED
            </div>
            <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 2 }}>{shortAddr(address)}</div>
            <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 2 }}>{balanceWei !== null ? `${formatUsdc(balanceWei)} USDC` : "…"}</div>
          </div>
          <MenuItem icon="📋" label="Copy Address" onClick={copyAddress} />
          <a href={explorerAddressUrl(address)} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem icon="🔍" label="View on Explorer" onClick={() => setOpen(false)} />
          </a>
          <MenuItem icon="🚪" label="Disconnect" onClick={() => { disconnect(); setOpen(false); }} danger />
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label, onClick, danger }: { icon: string; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        fontSize: 13,
        cursor: "pointer",
        color: danger ? "var(--red)" : "var(--ink2)",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface2)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span>{icon}</span> {label}
    </div>
  );
}

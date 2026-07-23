"use client";

import { useEffect, useRef } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useInvoices } from "@/lib/hooks/useInvoices";
import { formatUsdc } from "@/lib/web3/format";

export function NotifPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { address } = useWallet();
  const { invoices } = useInvoices();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose]);

  const notifs = invoices
    .filter((i) => i.status === "PAID" || i.status === "OVERDUE")
    .slice(0, 6)
    .map((i) => ({
      icon: i.status === "PAID" ? "💰" : "⏰",
      bg: i.status === "PAID" ? "var(--green-light)" : "var(--amber-light)",
      title: i.status === "PAID" ? "Payment received" : "Invoice overdue",
      desc: `${i.clientName} · ${formatUsdc(i.amountNative)} USDC`,
      time: new Date(i.updatedAt).toLocaleDateString(),
    }));

  return (
    <div className={`notif-panel${open ? " open" : ""}`} ref={ref}>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 600, fontSize: 14 }}>Notifications</span>
      </div>
      {!address ? (
        <div className="empty-state" style={{ padding: 24 }}>
          <div className="empty-desc">Connect a wallet to see activity.</div>
        </div>
      ) : notifs.length === 0 ? (
        <div className="empty-state" style={{ padding: 24 }}>
          <div className="empty-desc">No notifications yet.</div>
        </div>
      ) : (
        notifs.map((n, idx) => (
          <div className="notif-item" key={idx}>
            <div className="notif-icon" style={{ background: n.bg }}>{n.icon}</div>
            <div className="notif-content">
              <div className="notif-title">{n.title}</div>
              <div className="notif-desc">{n.desc}</div>
              <div className="notif-time">{n.time}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

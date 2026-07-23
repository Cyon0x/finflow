"use client";

import { useRouter } from "next/navigation";
import { useModal } from "@/lib/modals";

export function SendPaymentModal() {
  const { modal, open, close } = useModal();
  const router = useRouter();
  const isOpen = modal === "send-payment";
  if (!isOpen) return null;

  const options = [
    { icon: "🔗", title: "Payment Link", desc: "Shareable URL", action: () => open("payment-link") },
    { icon: "🧾", title: "Invoice", desc: "Bill a client", action: () => open("create-invoice") },
    { icon: "🚀", title: "Batch Payout", desc: "Multi-wallet", action: () => { close(); router.push("/payouts"); } },
    { icon: "🔒", title: "Escrow", desc: "Lock funds", action: () => open("create-escrow") },
  ];

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="modal">
        <div className="modal-close" onClick={close}>✕</div>
        <div className="modal-title">💳 New Payment</div>
        <div className="modal-sub">Send, link, invoice, or schedule</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {options.map((opt) => (
            <div
              key={opt.title}
              style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 14, cursor: "pointer", textAlign: "center" }}
              onClick={opt.action}
            >
              <div style={{ fontSize: "1.5rem" }}>{opt.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 6 }}>{opt.title}</div>
              <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 2 }}>{opt.desc}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={close}>Close</button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTeam } from "@/lib/hooks/useTeam";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useToast } from "@/components/Toast";
import { shortAddr } from "@/lib/web3/format";
import type { TeamRole } from "@/lib/types";

const PERMISSIONS: { label: string; roles: TeamRole[] }[] = [
  { label: "View Transactions", roles: ["ADMIN", "FINANCE", "VIEWER"] },
  { label: "Send Payments / Payouts", roles: ["ADMIN", "FINANCE"] },
  { label: "Create Invoices & Links", roles: ["ADMIN", "FINANCE"] },
  { label: "Release Escrow", roles: ["ADMIN"] },
  { label: "Manage Team & API Keys", roles: ["ADMIN"] },
];

export default function TeamPage() {
  const { address } = useWallet();
  const { members, loading, inviteMember, removeMember } = useTeam();
  const { showToast } = useToast();
  const [form, setForm] = useState({ address: "", label: "", role: "VIEWER" as TeamRole });
  const [submitting, setSubmitting] = useState(false);

  async function handleInvite() {
    if (!address) return showToast("🔗", "Connect a wallet first.", "error");
    if (!/^0x[a-fA-F0-9]{40}$/.test(form.address)) return showToast("❌", "Invalid wallet address.", "error");
    setSubmitting(true);
    try {
      await inviteMember({ memberAddress: form.address, memberLabel: form.label || undefined, role: form.role });
      showToast("👥", "Team member added.", "success");
      setForm({ address: "", label: "", role: "VIEWER" });
    } catch (err) {
      showToast("❌", (err as Error).message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 className="section-heading">👥 Team Wallets</h2>
          <div className="section-sub">Give other wallets scoped access to your FinFlow workspace</div>
        </div>
      </div>

      <div style={{ background: "var(--accent-light)", border: "1px solid var(--border)", borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 12, color: "var(--ink2)" }}>
        ℹ️ Roles here are app-level permissions that gate what the FinFlow UI shows a connected wallet — they are not enforced by a smart contract. FinFlowTreasury and FinFlowEscrow are owned by a single wallet; anyone with direct contract access bypasses these UI-level roles.
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header"><span className="card-title">Team Members</span></div>
          <div className="card-body" style={{ padding: "12px 20px" }}>
            {loading ? (
              <div className="empty-desc">Loading…</div>
            ) : members.length === 0 ? (
              <div className="empty-desc" style={{ padding: "12px 0" }}>No team members yet — invite one below.</div>
            ) : (
              members.map((m) => (
                <div className="member-row" key={m.id}>
                  <div className="member-avatar" style={{ background: "linear-gradient(135deg,#1B4FFF,#6B8FFF)" }}>{(m.memberLabel || m.memberAddress).slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{m.memberLabel || shortAddr(m.memberAddress)}</div>
                    <div style={{ fontSize: 12, color: "var(--ink3)", fontFamily: "'JetBrains Mono',monospace" }}>{shortAddr(m.memberAddress)}</div>
                  </div>
                  <span className={`badge ${m.role === "ADMIN" ? "badge-blue" : m.role === "FINANCE" ? "badge-green" : "badge-gray"}`}>{m.role}</span>
                  <button className="btn btn-danger btn-sm" style={{ marginLeft: 8 }} onClick={() => removeMember(m.id)}>Remove</button>
                </div>
              ))
            )}

            <div className="divider" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "center" }}>
              <input className="form-input" placeholder="0x… wallet address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
              <input className="form-input" placeholder="Label (optional)" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} />
              <select className="form-input" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as TeamRole }))}>
                <option value="ADMIN">Admin</option>
                <option value="FINANCE">Finance</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>
            <button className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={handleInvite} disabled={submitting}>
              {submitting ? "Adding…" : "+ Add Member"}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Roles &amp; Permissions</span></div>
          <div className="card-body" style={{ padding: 0 }}>
            <table>
              <thead><tr><th>PERMISSION</th><th>ADMIN</th><th>FINANCE</th><th>VIEWER</th></tr></thead>
              <tbody>
                {PERMISSIONS.map((p) => (
                  <tr key={p.label}>
                    <td>{p.label}</td>
                    {(["ADMIN", "FINANCE", "VIEWER"] as TeamRole[]).map((r) => (
                      <td key={r} style={{ color: p.roles.includes(r) ? "var(--green)" : "var(--red)" }}>{p.roles.includes(r) ? "✓" : "✕"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

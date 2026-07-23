const MAP: Record<string, { cls: string; label: string }> = {
  PAID: { cls: "badge-green", label: "✓ Paid" },
  PENDING: { cls: "badge-amber", label: "⏳ Pending" },
  OVERDUE: { cls: "badge-red", label: "⚠ Overdue" },
  CANCELLED: { cls: "badge-gray", label: "Cancelled" },
  CONFIRMED: { cls: "badge-green", label: "✓ Confirmed" },
  RELEASED: { cls: "badge-green", label: "✓ Released" },
  LOCKED: { cls: "badge-amber", label: "🔒 Locked" },
};

export function StatusBadge({ status }: { status: string }) {
  const m = MAP[status] || MAP.PENDING;
  return <span className={`badge ${m.cls}`}>{m.label}</span>;
}

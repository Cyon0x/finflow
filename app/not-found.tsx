import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 20 }}>
      <div className="empty-state" style={{ maxWidth: 420 }}>
        <div className="empty-icon">🧭</div>
        <div className="empty-title">Page not found</div>
        <div className="empty-desc" style={{ marginBottom: 16 }}>That page doesn&apos;t exist, or the link is out of date.</div>
        <Link href="/dashboard" className="btn btn-primary btn-sm">Back to Dashboard</Link>
      </div>
    </div>
  );
}

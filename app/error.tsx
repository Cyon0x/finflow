"use client";

import { useEffect } from "react";

export default function RootError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 20 }}>
      <div className="empty-state" style={{ maxWidth: 420 }}>
        <div className="empty-icon">⚠️</div>
        <div className="empty-title">Something went wrong</div>
        <div className="empty-desc" style={{ marginBottom: 16 }}>{error.message || "An unexpected error occurred."}</div>
        <button className="btn btn-primary btn-sm" onClick={reset}>Try again</button>
      </div>
    </div>
  );
}

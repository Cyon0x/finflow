"use client";

import { useEffect } from "react";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Dashboard page error:", error);
  }, [error]);

  return (
    <div className="empty-state" style={{ padding: "64px 20px" }}>
      <div className="empty-icon">⚠️</div>
      <div className="empty-title">Something went wrong loading this page</div>
      <div className="empty-desc" style={{ marginBottom: 16 }}>
        {error.message || "An unexpected error occurred."}
      </div>
      <button className="btn btn-primary btn-sm" onClick={reset}>Try again</button>
    </div>
  );
}

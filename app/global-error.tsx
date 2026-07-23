"use client";

// Only fires if the root layout itself throws (font loading, providers,
// etc.) — everything else is caught by app/error.tsx and
// app/(dashboard)/error.tsx instead. Must render its own <html>/<body>
// since it replaces the root layout entirely when active.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", background: "#070D1E", color: "#E4EDFF", margin: 0 }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ textAlign: "center", maxWidth: 420 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>⚠️</div>
            <h2 style={{ marginBottom: 8 }}>FinFlow hit an unexpected error</h2>
            <p style={{ color: "#A8BEDD", marginBottom: 16, fontSize: 14 }}>{error.message || "Something went wrong."}</p>
            <button
              onClick={reset}
              style={{ background: "#4A8AEF", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

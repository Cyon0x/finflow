"use client";

import { ARC_NETWORK_LABEL } from "@/lib/web3/chain";

import { useRef, useState } from "react";
import { BrandedQRCode, type BrandedQRCodeHandle } from "./BrandedQRCode";

export function PaymentLinkShare({
  url,
  title,
  amountLabel,
}: {
  url: string;
  title: string;
  amountLabel?: string;
}) {
  const qrRef = useRef<BrandedQRCodeHandle>(null);
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function downloadPdf() {
    const dataUrl = await qrRef.current?.getPngDataUrl();
    if (!dataUrl) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: [380, 520] });

    doc.setFillColor(11, 23, 53);
    doc.rect(0, 0, 380, 90, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("FinFlow", 32, 50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Scan to pay in USDC on Arc", 32, 68);

    doc.setTextColor(11, 23, 53);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title, 32, 130, { maxWidth: 316 });
    if (amountLabel) {
      doc.setFontSize(20);
      doc.text(amountLabel, 32, 158);
    }

    const qrSize = 260;
    doc.addImage(dataUrl, "PNG", (380 - qrSize) / 2, 180, qrSize, qrSize);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 100, 120);
    const urlLines = doc.splitTextToSize(url, 316);
    doc.text(urlLines, 190, 460, { align: "center" });
    doc.text(`Non-custodial — powered by FinFlow on ${ARC_NETWORK_LABEL}`, 190, 495, { align: "center" });

    doc.save("finflow-payment-qr.pdf");
  }

  const shareText = `Pay ${title}${amountLabel ? ` — ${amountLabel}` : ""} via FinFlow: ${url}`;
  const shareLinks = [
    { label: "WhatsApp", icon: "💬", href: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
    { label: "Telegram", icon: "✈️", href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Pay ${title}${amountLabel ? ` — ${amountLabel}` : ""} via FinFlow`)}` },
    { label: "Email", icon: "✉️", href: `mailto:?subject=${encodeURIComponent(`Payment request: ${title}`)}&body=${encodeURIComponent(shareText)}` },
    { label: "X", icon: "𝕏", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, lineHeight: 1 }} aria-hidden="true">✅</div>
        <div className="modal-title" style={{ marginTop: 8 }}>Ready to share</div>
        <div className="modal-sub" style={{ marginBottom: 0 }}>{title}{amountLabel ? ` · ${amountLabel}` : ""}</div>
      </div>

      <div className="link-box" style={{ width: "100%" }}>
        <span>{url}</span>
      </div>

      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        <button
          type="button"
          className={`btn btn-secondary copy-btn${copied ? " copied" : ""}`}
          style={{ flex: 1, justifyContent: "center" }}
          onClick={copyLink}
          aria-label="Copy payment link"
        >
          📋 Copy Link
          <span className="copy-check" aria-hidden={!copied}>✓ Copied</span>
        </button>
        <a href={url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
          ↗ Open Link
        </a>
      </div>

      <BrandedQRCode ref={qrRef} value={url} />

      <div className="download-row" style={{ width: "100%", justifyContent: "center" }}>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => qrRef.current?.downloadPng()}>
          ⬇ PNG
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => qrRef.current?.downloadSvg()}>
          ⬇ SVG
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={downloadPdf}>
          ⬇ PDF
        </button>
      </div>

      <div style={{ width: "100%" }}>
        <div style={{ fontSize: 11, color: "var(--ink3)", textAlign: "center", marginBottom: 10, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Share
        </div>
        <div className="share-row">
          {shareLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="share-btn"
              aria-label={`Share via ${s.label}`}
              title={`Share via ${s.label}`}
            >
              <span aria-hidden="true">{s.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

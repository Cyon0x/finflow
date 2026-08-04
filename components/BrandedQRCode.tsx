"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type QRCodeStyling from "qr-code-styling";

export type BrandedQRCodeHandle = {
  downloadPng: (filename?: string) => void;
  downloadSvg: (filename?: string) => void;
  /** Renders a PNG data URL — used to embed the QR into a PDF. */
  getPngDataUrl: () => Promise<string | null>;
};

const SIZE = 240;

// FinFlow's brand palette (matches --accent/--accent2 in globals.css) used
// directly here since qr-code-styling renders to its own canvas/svg, outside
// the CSS custom-property cascade.
const BRAND_BLUE = "#1540C0";
const BRAND_BLUE_LIGHT = "#639DFF";

export const BrandedQRCode = forwardRef<BrandedQRCodeHandle, { value: string; size?: number; className?: string }>(
  function BrandedQRCode({ value, size = SIZE, className }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const qrRef = useRef<QRCodeStyling | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      let cancelled = false;

      (async () => {
        const { default: QRCodeStylingCtor } = await import("qr-code-styling");
        if (cancelled) return;

        const qr = new QRCodeStylingCtor({
          width: size,
          height: size,
          type: "svg",
          data: value,
          margin: 10,
          qrOptions: { errorCorrectionLevel: "H" },
          image: "/finflow-mark.svg",
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.22,
            margin: 6,
            crossOrigin: "anonymous",
          },
          dotsOptions: {
            type: "rounded",
            gradient: {
              type: "linear",
              rotation: Math.PI / 4,
              colorStops: [
                { offset: 0, color: BRAND_BLUE },
                { offset: 1, color: BRAND_BLUE_LIGHT },
              ],
            },
          },
          cornersSquareOptions: { type: "extra-rounded", color: BRAND_BLUE },
          cornersDotOptions: { type: "dot", color: BRAND_BLUE_LIGHT },
          backgroundOptions: { color: "#FFFFFF" },
        });

        qrRef.current = qr;
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          qr.append(containerRef.current);
        }
        setReady(true);
      })();

      return () => {
        cancelled = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, size]);

    useImperativeHandle(
      ref,
      () => ({
        downloadPng: (filename = "finflow-payment-qr") => qrRef.current?.download({ name: filename, extension: "png" }),
        downloadSvg: (filename = "finflow-payment-qr") => qrRef.current?.download({ name: filename, extension: "svg" }),
        getPngDataUrl: async () => {
          if (!qrRef.current) return null;
          const blob = (await qrRef.current.getRawData("png")) as Blob | null;
          if (!blob) return null;
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        },
      }),
      []
    );

    return (
      <div
        className={`qr-card${ready ? " qr-card--ready" : ""}${className ? ` ${className}` : ""}`}
        role="img"
        aria-label={`QR code — scan to open the FinFlow payment page at ${value}`}
      >
        <div ref={containerRef} className="qr-canvas" style={{ width: size, height: size }} />
        {!ready && <div className="qr-canvas-skeleton" style={{ width: size, height: size }} aria-hidden="true" />}
      </div>
    );
  }
);

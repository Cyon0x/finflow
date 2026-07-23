import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FinFlow — Stablecoin Payments on Arc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1735 0%, #060F24 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 96, fontWeight: 700, color: "#fff", letterSpacing: -3 }}>
          Fin
          <span style={{ color: "#639DFF" }}>Flow</span>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "rgba(200,216,240,0.7)", marginTop: 20 }}>
          Stablecoin payments &amp; treasury on Arc
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 40,
            padding: "10px 20px",
            borderRadius: 10,
            background: "rgba(74,144,255,0.12)",
            border: "1px solid rgba(74,144,255,0.3)",
            fontSize: 22,
            color: "#7EB8FF",
          }}
        >
          USDC · Arc Testnet · Non-custodial
        </div>
      </div>
    ),
    { ...size }
  );
}

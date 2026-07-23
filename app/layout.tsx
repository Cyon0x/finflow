import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "./providers";
import { NO_FLASH_THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

const SITE_URL = "https://finflow-ebon-iota.vercel.app";
const TITLE = "FinFlow — Stablecoin Payments on Arc";
const DESCRIPTION =
  "Send, receive, and manage USDC payments on Arc Testnet. Invoices, payment links, escrow, and payroll — non-custodial.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: SITE_URL, siteName: "FinFlow", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Bricolage+Grotesque:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <Script id="no-flash-theme" strategy="beforeInteractive">
          {NO_FLASH_THEME_SCRIPT}
        </Script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

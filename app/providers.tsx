"use client";

import React from "react";
import { ThemeProvider } from "@/lib/theme";
import { ToastProvider } from "@/components/Toast";
import { WalletProvider } from "@/lib/web3/WalletProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WalletProvider>{children}</WalletProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

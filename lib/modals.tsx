"use client";

import React, { createContext, useContext, useState } from "react";

export type ModalKey = "wallet" | "send-payment" | "payment-link" | "create-invoice" | "create-escrow" | null;

const ModalContext = createContext<{ modal: ModalKey; open: (m: ModalKey) => void; close: () => void } | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalKey>(null);
  return (
    <ModalContext.Provider value={{ modal, open: setModal, close: () => setModal(null) }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

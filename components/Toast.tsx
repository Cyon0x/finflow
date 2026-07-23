"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastType = "" | "success" | "error" | "info";

type ToastState = {
  icon: string;
  msg: string;
  type: ToastType;
  show: boolean;
};

type ToastContextValue = {
  showToast: (icon: string, msg: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const BG: Record<ToastType, string> = {
  "": "var(--ink)",
  success: "#0A4A2A",
  error: "#7B1717",
  info: "#0D2E80",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({ icon: "", msg: "", type: "", show: false });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((icon: string, msg: string, type: ToastType = "") => {
    setToast({ icon, msg, type, show: true });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`toast${toast.show ? " show" : ""}`} style={{ background: BG[toast.type], color: "#fff" }}>
        <span className="toast-icon">{toast.icon}</span>
        <span>{toast.msg}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

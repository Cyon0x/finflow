"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { WalletModal } from "@/components/WalletModal";
import { SendPaymentModal } from "@/components/modals/SendPaymentModal";
import { PaymentLinkModal } from "@/components/modals/PaymentLinkModal";
import { CreateInvoiceModal } from "@/components/modals/CreateInvoiceModal";
import { CreateEscrowModal } from "@/components/modals/CreateEscrowModal";
import { ModalProvider, useModal } from "@/lib/modals";

function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { modal, open, close } = useModal();
  const pathname = usePathname();
  const section = pathname?.split("/")[1] || "dashboard";

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} onOpenWalletModal={() => open("wallet")} />
      <main className="main">
        <Topbar
          section={section}
          onMenuClick={() => setSidebarOpen((o) => !o)}
          onOpenWalletModal={() => open("wallet")}
          onNewPayment={() => open("send-payment")}
        />
        <div className="content">{children}</div>
      </main>

      <WalletModal open={modal === "wallet"} onClose={close} />
      <SendPaymentModal />
      <PaymentLinkModal />
      <CreateInvoiceModal />
      <CreateEscrowModal />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <Shell>{children}</Shell>
    </ModalProvider>
  );
}

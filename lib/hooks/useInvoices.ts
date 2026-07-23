"use client";

import { useCallback } from "react";
import { useApi } from "@/lib/useApi";
import { useOwnerResource } from "./useOwnerResource";
import type { ClientInvoice } from "@/lib/types";

export function useInvoices() {
  const { data, loading, error, refetch } = useOwnerResource<ClientInvoice>("/api/invoices", "invoices");
  const { authedFetch } = useApi();

  const createInvoice = useCallback(
    async (input: {
      clientName: string;
      clientEmail?: string;
      description: string;
      amountNative: string;
      dueDate: string;
      chainInvoiceId: number;
      txHashCreate: string;
    }) => {
      const json = await authedFetch("/api/invoices", { method: "POST", body: JSON.stringify(input) });
      await refetch();
      return json.invoice as ClientInvoice;
    },
    [authedFetch, refetch]
  );

  const syncInvoice = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/invoices/${id}/sync`, { method: "POST" });
      const json = await res.json();
      await refetch();
      return json;
    },
    [refetch]
  );

  return { invoices: data, loading, error, refetch, createInvoice, syncInvoice };
}

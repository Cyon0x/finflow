"use client";

import { useCallback } from "react";
import { useApi } from "@/lib/useApi";
import { useOwnerResource } from "./useOwnerResource";
import type { ClientPaymentLink } from "@/lib/types";

export function usePaymentLinks() {
  const { data, loading, error, refetch } = useOwnerResource<ClientPaymentLink>("/api/payment-links", "links");
  const { authedFetch } = useApi();

  const createPaymentLink = useCallback(
    async (input: { title: string; amountNative?: string; type?: string; note?: string; invoiceId?: string }) => {
      const json = await authedFetch("/api/payment-links", { method: "POST", body: JSON.stringify(input) });
      await refetch();
      return json.link as ClientPaymentLink;
    },
    [authedFetch, refetch]
  );

  return { links: data, loading, error, refetch, createPaymentLink };
}

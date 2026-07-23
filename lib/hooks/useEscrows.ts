"use client";

import { useCallback } from "react";
import { useApi } from "@/lib/useApi";
import { useOwnerResource } from "./useOwnerResource";
import type { ClientEscrowRecord } from "@/lib/types";

export function useEscrows() {
  const { data, loading, error, refetch } = useOwnerResource<ClientEscrowRecord>("/api/escrows", "escrows");
  const { authedFetch } = useApi();

  const recordEscrow = useCallback(
    async (input: {
      chainEscrowId: number;
      contractor: string;
      amountNative: string;
      milestone: string;
      deadline: string;
      txHashCreate: string;
    }) => {
      const json = await authedFetch("/api/escrows", { method: "POST", body: JSON.stringify(input) });
      await refetch();
      return json.escrow as ClientEscrowRecord;
    },
    [authedFetch, refetch]
  );

  const syncEscrow = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/escrows/${id}/sync`, { method: "POST" });
      const json = await res.json();
      await refetch();
      return json;
    },
    [refetch]
  );

  return { escrows: data, loading, error, refetch, recordEscrow, syncEscrow };
}

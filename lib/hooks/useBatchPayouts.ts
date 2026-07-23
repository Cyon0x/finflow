"use client";

import { useCallback } from "react";
import { useApi } from "@/lib/useApi";
import { useOwnerResource } from "./useOwnerResource";
import type { ClientBatchPayoutRecord } from "@/lib/types";

export function useBatchPayouts() {
  const { data, loading, error, refetch } = useOwnerResource<ClientBatchPayoutRecord>("/api/payouts", "payouts");
  const { authedFetch } = useApi();

  const recordPayout = useCallback(
    async (input: { txHash: string; recipientCount: number; totalNative: string; feeNative: string }) => {
      const json = await authedFetch("/api/payouts", { method: "POST", body: JSON.stringify(input) });
      await refetch();
      return json.payout as ClientBatchPayoutRecord;
    },
    [authedFetch, refetch]
  );

  return { payouts: data, loading, error, refetch, recordPayout };
}

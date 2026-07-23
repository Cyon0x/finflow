"use client";

import { useCallback } from "react";
import { useApi } from "@/lib/useApi";
import { useOwnerResource } from "./useOwnerResource";
import type { ClientApiKey } from "@/lib/types";

export function useApiKeys() {
  const { data, loading, error, refetch } = useOwnerResource<ClientApiKey>("/api/keys", "keys");
  const { authedFetch } = useApi();

  const generateKey = useCallback(
    async (env: "LIVE" | "TEST", label?: string) => {
      const json = await authedFetch("/api/keys", { method: "POST", body: JSON.stringify({ env, label }) });
      await refetch();
      return json as { key: string; prefix: string; env: string; label: string };
    },
    [authedFetch, refetch]
  );

  const revokeKey = useCallback(
    async (id: string) => {
      await authedFetch(`/api/keys/${id}`, { method: "DELETE" });
      await refetch();
    },
    [authedFetch, refetch]
  );

  return { keys: data, loading, error, refetch, generateKey, revokeKey };
}

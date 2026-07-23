"use client";

import { useCallback } from "react";
import { useApi } from "@/lib/useApi";
import { useOwnerResource } from "./useOwnerResource";
import type { ClientWebhook } from "@/lib/types";

export function useWebhooks() {
  const { data, loading, error, refetch } = useOwnerResource<ClientWebhook>("/api/webhooks", "webhooks");
  const { authedFetch } = useApi();

  const addWebhook = useCallback(
    async (url: string) => {
      const json = await authedFetch("/api/webhooks", { method: "POST", body: JSON.stringify({ url }) });
      await refetch();
      return json.webhook as ClientWebhook;
    },
    [authedFetch, refetch]
  );

  const removeWebhook = useCallback(
    async (id: string) => {
      await authedFetch(`/api/webhooks/${id}`, { method: "DELETE" });
      await refetch();
    },
    [authedFetch, refetch]
  );

  return { webhooks: data, loading, error, refetch, addWebhook, removeWebhook };
}

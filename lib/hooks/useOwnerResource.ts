"use client";

import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@/lib/web3/WalletProvider";
import { useApi } from "@/lib/useApi";

/**
 * Fetches an owner-scoped list resource (invoices, payment links, team,
 * keys, webhooks, escrows) whenever the connected wallet changes, and
 * exposes a refetch you can call after a mutation.
 */
export function useOwnerResource<T>(url: string, key: string) {
  const { address } = useWallet();
  const { authedFetch } = useApi();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!address) {
      setData([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const json = await authedFetch(url);
      setData(json[key] || []);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, url, key]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

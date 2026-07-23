"use client";

import { useEffect, useState } from "react";

export type FxRates = { NGN: number; KES: number; GHS: number; ZAR: number };

export function useFxRates() {
  const [rates, setRates] = useState<FxRates | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/fx")
      .then((r) => r.json())
      .then((json) => {
        if (cancelled || json.error) return;
        setRates(json.rates);
        setUpdatedAt(json.updatedAt);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return { rates, updatedAt };
}

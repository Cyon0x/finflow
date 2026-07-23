"use client";

import { useCallback } from "react";
import { useApi } from "@/lib/useApi";
import { useOwnerResource } from "./useOwnerResource";
import type { ClientTeamMember } from "@/lib/types";

export function useTeam() {
  const { data, loading, error, refetch } = useOwnerResource<ClientTeamMember>("/api/team", "members");
  const { authedFetch } = useApi();

  const inviteMember = useCallback(
    async (input: { memberAddress: string; memberLabel?: string; role: string }) => {
      const json = await authedFetch("/api/team", { method: "POST", body: JSON.stringify(input) });
      await refetch();
      return json.member as ClientTeamMember;
    },
    [authedFetch, refetch]
  );

  const removeMember = useCallback(
    async (id: string) => {
      await authedFetch(`/api/team/${id}`, { method: "DELETE" });
      await refetch();
    },
    [authedFetch, refetch]
  );

  return { members: data, loading, error, refetch, inviteMember, removeMember };
}

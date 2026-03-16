import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { ApiResponse } from "../types/dashboard";
import type { CampaignResponse, PageCampaignResponse, CampaignCreateRequest } from "../types/campaign";

export const useCampaigns = (
  page: number = 0,
  size: number = 10,
  search?: string,
  status?: string
) => {
  return useQuery({
    queryKey: ["campaigns", { page, size, search, status }],
    queryFn: async () => {
      // Construction of query parameters for specification and pageable
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("size", size.toString());

      // Based on API Docs, specification parameters can be directly appended (Spring Data REST typically handles them if mapped correctly)
      if (search) {
          params.append("name", search);
      }
      if (status) {
          params.append("status", status);
      }

      const { data } = await api.get<ApiResponse<PageCampaignResponse>>(`/api/v1/campaigns?${params.toString()}`);
      return data.data;
    },
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCampaign: CampaignCreateRequest) => {
      const { data } = await api.post<ApiResponse<CampaignResponse>>("/api/v1/campaigns", newCampaign);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] }); // Invalidate dashboard as well to reflect new campaigns
    },
  });
};

export const useUpdateCampaignStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: "DRAFT" | "ACTIVE" | "PAUSED" | "ENDED" }) => {
      const { data } = await api.put<ApiResponse<CampaignResponse>>(`/api/v1/campaigns/${id}/status?status=${status}`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

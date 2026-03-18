import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/api";
import type {
  ApiResponsePageDistributionResponse,
  ApiResponseDistributionResponse,
  DistributionCreateRequest,
} from "./types";

export const distributionKeys = {
  all: ["distributions"] as const,

  lists: () => [...distributionKeys.all, "list"] as const,
  list: (params: {
    page: number;
    size: number;
    status?: string;
    channel?: string;
    customerId?: number;
    voucherId?: number;
  }) => [...distributionKeys.lists(), params] as const,
  details: () => [...distributionKeys.all, "detail"] as const,
  detail: (id: number) => [...distributionKeys.details(), id] as const,
};

export function useDistributions(
  params: {
    page?: number;
    size?: number;
    status?: string;
    channel?: string;
    customerId?: number;
    voucherId?: number;
  } = {},
) {
  const {
    page = 0,
    size = 10,
    status,
    channel,
    customerId,
    voucherId,
  } = params;

  return useQuery({
    queryKey: distributionKeys.list({
      page,
      size,
      status,
      channel,
      customerId,
      voucherId,
    }),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      if (status) searchParams.append("status", status);
      if (channel) searchParams.append("channel", channel);
      if (customerId) searchParams.append("customerId", customerId.toString());
      if (voucherId) searchParams.append("voucherId", voucherId.toString());

      const response = await apiClient.get<ApiResponsePageDistributionResponse>(
        `/api/v1/distributions?${searchParams.toString()}`,
      );
      return response.data?.data;
    },
  });
}

export function useDistribution(id: number) {
  return useQuery({
    queryKey: distributionKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponseDistributionResponse>(
        `/api/v1/distributions/${id}`,
      );
      return response.data?.data;
    },
    enabled: !!id,
  });
}

export function useCreateDistribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DistributionCreateRequest) => {
      const response = await apiClient.post<ApiResponseDistributionResponse>(
        "/api/v1/distributions",
        data,
      );
      return response.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: distributionKeys.lists() });
    },
  });
}

export function useRetryDistribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiClient.post<ApiResponseDistributionResponse>(
        `/api/v1/distributions/${id}/retry`,
      );
      return response.data?.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: distributionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: distributionKeys.lists() });
    },
  });
}

export function useResendDistribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiClient.post<ApiResponseDistributionResponse>(
        `/api/v1/distributions/${id}/resend`,
      );
      return response.data?.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: distributionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: distributionKeys.lists() });
    },
  });
}

export function useDeleteDistribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiClient.delete(`/api/v1/distributions/${id}`);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: distributionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: distributionKeys.lists() });
    },
  });
}

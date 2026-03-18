import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type {
  ApiResponsePageApiKeyResponse,
  ApiResponseApiKeyResponse,
  ApiKeyCreateRequest,
  RateLimitUpdateRequest,
  ApiResponseApiKeyUsageResponse,
} from "./types";

export const apiKeyKeys = {
  all: ["api-keys"] as const,
  lists: () => [...apiKeyKeys.all, "list"] as const,
  list: (params: { page: number; size: number }) => [...apiKeyKeys.lists(), params] as const,
  details: () => [...apiKeyKeys.all, "detail"] as const,
  detail: (id: number) => [...apiKeyKeys.details(), id] as const,
  usages: () => [...apiKeyKeys.all, "usage"] as const,
  usage: (id: number) => [...apiKeyKeys.usages(), id] as const,
};

export function useApiKeys(page = 0, size = 10) {
  return useQuery({
    queryKey: apiKeyKeys.list({ page, size }),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      const response = await api.get<ApiResponsePageApiKeyResponse>(
        `/api/v1/api-keys?${searchParams.toString()}`
      );
      return response.data?.data;
    },
  });
}

export function useApiKey(id: number) {
  return useQuery({
    queryKey: apiKeyKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<ApiResponseApiKeyResponse>(
        `/api/v1/api-keys/${id}`
      );
      return response.data?.data;
    },
    enabled: !!id,
  });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ApiKeyCreateRequest) => {
      const response = await api.post<ApiResponseApiKeyResponse>(
        "/api/v1/api-keys",
        data
      );
      return response.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.lists() });
    },
  });
}

export function useUpdateApiKeyRateLimit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: RateLimitUpdateRequest }) => {
      const response = await api.put<ApiResponseApiKeyResponse>(
        `/api/v1/api-keys/${id}/rate-limit`,
        data
      );
      return response.data?.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.lists() });
    },
  });
}

export function useDeactivateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.put<ApiResponseApiKeyResponse>(
        `/api/v1/api-keys/${id}/deactivate`
      );
      return response.data?.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.lists() });
    },
  });
}

export function useApiKeyUsage(id: number) {
  return useQuery({
    queryKey: apiKeyKeys.usage(id),
    queryFn: async () => {
      const response = await api.get<ApiResponseApiKeyUsageResponse>(
        `/api/v1/api-keys/${id}/usage`
      );
      return response.data?.data;
    },
    enabled: !!id,
  });
}

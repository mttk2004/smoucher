import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type { ApiResponsePageApiRequestLog } from "./types";

export const apiLogKeys = {
  all: ["api-logs"] as const,
  lists: () => [...apiLogKeys.all, "list"] as const,
  list: (params: {
    page: number;
    size: number;
    endpoint?: string;
    method?: string;
    status?: number;
    apiKeyId?: number;
    minResponseTime?: number;
    maxResponseTime?: number;
    ipAddress?: string;
    startDate?: string;
    endDate?: string;
  }) => [...apiLogKeys.lists(), params] as const,
};

export function useApiLogs(
  params: {
    page?: number;
    size?: number;
    endpoint?: string;
    method?: string;
    status?: number;
    apiKeyId?: number;
    minResponseTime?: number;
    maxResponseTime?: number;
    ipAddress?: string;
    startDate?: string;
    endDate?: string;
  } = {},
) {
  const {
    page = 0,
    size = 10,
    endpoint,
    method,
    status,
    apiKeyId,
    minResponseTime,
    maxResponseTime,
    ipAddress,
    startDate,
    endDate,
  } = params;

  return useQuery({
    queryKey: apiLogKeys.list({
      page,
      size,
      endpoint,
      method,
      status,
      apiKeyId,
      minResponseTime,
      maxResponseTime,
      ipAddress,
      startDate,
      endDate,
    }),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      if (endpoint) searchParams.append("endpoint", endpoint);
      if (method) searchParams.append("method", method);
      if (status) searchParams.append("status", status.toString());
      if (apiKeyId) searchParams.append("apiKeyId", apiKeyId.toString());
      if (minResponseTime)
        searchParams.append("minResponseTime", minResponseTime.toString());
      if (maxResponseTime)
        searchParams.append("maxResponseTime", maxResponseTime.toString());
      if (ipAddress) searchParams.append("ipAddress", ipAddress);
      if (startDate) searchParams.append("startDate", startDate);
      if (endDate) searchParams.append("endDate", endDate);

      const response = await api.get<ApiResponsePageApiRequestLog>(
        `/api/v1/request-logs?${searchParams.toString()}`,
      );
      return response.data?.data;
    },
  });
}

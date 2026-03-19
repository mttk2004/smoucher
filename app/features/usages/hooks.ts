import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type { ApiResponse, PageVoucherUsageResponse } from "./types";

interface UseUsagesParams {
  page?: number;
  size?: number;
  externalOrderId?: string;
  externalBranchId?: string;
  usedAtFrom?: string;
  usedAtTo?: string;
}

export const useUsages = (params: UseUsagesParams) => {
  return useQuery({
    queryKey: ["usages", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.page !== undefined) searchParams.append("page", params.page.toString());
      if (params.size !== undefined) searchParams.append("size", params.size.toString());
      if (params.externalOrderId) searchParams.append("externalOrderId", params.externalOrderId);
      if (params.externalBranchId) searchParams.append("externalBranchId", params.externalBranchId);
      if (params.usedAtFrom) searchParams.append("usedAtFrom", params.usedAtFrom);
      if (params.usedAtTo) searchParams.append("usedAtTo", params.usedAtTo);

      const { data } = await api.get<ApiResponse<PageVoucherUsageResponse>>(`/api/v1/usages?${searchParams.toString()}`);
      return data.data;
    },
  });
};

export const exportUsagesCsv = async (params: Omit<UseUsagesParams, "page" | "size">) => {
  const searchParams = new URLSearchParams();
  if (params.externalOrderId) searchParams.append("externalOrderId", params.externalOrderId);
  if (params.externalBranchId) searchParams.append("externalBranchId", params.externalBranchId);
  if (params.usedAtFrom) searchParams.append("usedAtFrom", params.usedAtFrom);
  if (params.usedAtTo) searchParams.append("usedAtTo", params.usedAtTo);

  const response = await api.get(`/api/v1/usages/export?${searchParams.toString()}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "usage_history.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

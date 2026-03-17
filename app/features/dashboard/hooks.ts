import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type { ApiResponse, DashboardOverviewResponse, UsageTrendResponse } from "../dashboard/types";

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<DashboardOverviewResponse>>("/api/v1/dashboard/overview");
      return data.data;
    },
  });
};

export const useUsageTrend = (from: string, to: string, groupBy: string = "DAY") => {
  return useQuery({
    queryKey: ["dashboard", "usageTrend", { from, to, groupBy }],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<UsageTrendResponse[]>>("/api/v1/dashboard/usage-trend", {
        params: { from, to, groupBy },
      });
      return data.data;
    },
    enabled: !!from && !!to,
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type { ApiResponse, VoucherResponse } from "../dashboard/types";
import type { PageVoucherResponse, VoucherCreateRequest, UniqueCodeGenerateRequest, UniqueCodeGenerateResponse } from "../vouchers/types";

export const useVouchers = (
  page: number = 0,
  size: number = 10,
  search?: string,
  status?: string,
  campaignId?: string
) => {
  return useQuery({
    queryKey: ["vouchers", { page, size, search, status, campaignId }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("size", size.toString());

      if (search) params.append("code", search);
      if (status) params.append("status", status);
      if (campaignId) params.append("campaignId", campaignId);

      const { data } = await api.get<ApiResponse<PageVoucherResponse>>(`/api/v1/vouchers?${params.toString()}`);
      return data.data;
    },
  });
};

export const useCreateVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newVoucher: VoucherCreateRequest) => {
      const { data } = await api.post<ApiResponse<VoucherResponse>>("/api/v1/vouchers", newVoucher);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const usePauseVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.put<ApiResponse<VoucherResponse>>(`/api/v1/vouchers/${id}/pause`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
  });
};

export const useResumeVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.put<ApiResponse<VoucherResponse>>(`/api/v1/vouchers/${id}/resume`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
  });
};

export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete<ApiResponse<null>>(`/api/v1/vouchers/${id}`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
  });
};

export const useGenerateVoucherCodes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, request }: { id: number; request: UniqueCodeGenerateRequest }) => {
      const { data } = await api.post<ApiResponse<UniqueCodeGenerateResponse>>(`/api/v1/vouchers/${id}/codes/generate`, request);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
  });
};

export const useCloneVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.post<ApiResponse<VoucherResponse>>(`/api/v1/vouchers/${id}/clone`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
  });
};

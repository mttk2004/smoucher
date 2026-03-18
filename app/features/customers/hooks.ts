import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type {
  ApiResponsePageCustomerResponse,
  ApiResponseCustomerResponse,
  CustomerCreateRequest,
  PageCustomerVoucherResponse,
  PageCustomerUsageResponse
} from "./types";

export const customerKeys = {
  all: ["customers"] as const,
  lists: () => [...customerKeys.all, "list"] as const,
  list: (params: { page: number; size: number; search?: string }) =>
    [...customerKeys.lists(), params] as const,
  details: () => [...customerKeys.all, "detail"] as const,
  detail: (id: number) => [...customerKeys.details(), id] as const,
  vouchers: (id: number, params: { page: number; size: number }) =>
    [...customerKeys.detail(id), "vouchers", params] as const,
  usages: (id: number, params: { page: number; size: number }) =>
    [...customerKeys.detail(id), "usages", params] as const,
};

export function useCustomers(page = 0, size = 10, search = "") {
  return useQuery({
    queryKey: customerKeys.list({ page, size, search }),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (search) {
        searchParams.append("search", search);
      }

      const response = await api.get<ApiResponsePageCustomerResponse>(
        `/api/v1/customers?${searchParams.toString()}`
      );
      return response.data?.data;
    },
  });
}

export function useCustomer(id: number) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<ApiResponseCustomerResponse>(
        `/api/v1/customers/${id}`
      );
      return response.data?.data;
    },
    enabled: !!id,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CustomerCreateRequest) => {
      const response = await api.post<ApiResponseCustomerResponse>(
        "/api/v1/customers",
        data
      );
      return response.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CustomerCreateRequest> }) => {
      const response = await api.put<ApiResponseCustomerResponse>(
        `/api/v1/customers/${id}`,
        data
      );
      return response.data?.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
}

export function useCustomerVouchers(id: number, page = 0, size = 10) {
  return useQuery({
    queryKey: customerKeys.vouchers(id, { page, size }),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      const response = await api.get<{ success: boolean; data: PageCustomerVoucherResponse; error?: any }>(
        `/api/v1/customers/${id}/vouchers?${searchParams.toString()}`
      );
      return response.data?.data;
    },
    enabled: !!id,
  });
}

export function useCustomerUsages(id: number, page = 0, size = 10) {
  return useQuery({
    queryKey: customerKeys.usages(id, { page, size }),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      const response = await api.get<{ success: boolean; data: PageCustomerUsageResponse; error?: any }>(
        `/api/v1/customers/${id}/usages?${searchParams.toString()}`
      );
      return response.data?.data;
    },
    enabled: !!id,
  });
}

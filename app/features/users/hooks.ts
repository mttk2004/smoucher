import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type {
  ApiResponsePageUserResponse,
  ApiResponseUserResponse,
  UserUpdateRequest,
} from "./types";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params: { page: number; size: number; search?: string; role?: string; status?: string }) =>
    [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

export function useUsers(page = 0, size = 10, search = "", role = "", status = "") {
  return useQuery({
    queryKey: userKeys.list({ page, size, search, role, status }),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (search) searchParams.append("search", search);
      if (role) searchParams.append("role", role);
      if (status) searchParams.append("status", status);

      const response = await api.get<ApiResponsePageUserResponse>(
        `/api/v1/users?${searchParams.toString()}`
      );
      return response.data?.data;
    },
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<ApiResponseUserResponse>(
        `/api/v1/users/${id}`
      );
      return response.data?.data;
    },
    enabled: !!id,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UserUpdateRequest }) => {
      const response = await api.put<ApiResponseUserResponse>(
        `/api/v1/users/${id}`,
        data
      );
      return response.data?.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useApproveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.post<ApiResponseUserResponse>(
        `/api/v1/users/${id}/approve`
      );
      return response.data?.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useRejectUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.post<ApiResponseUserResponse>(
        `/api/v1/users/${id}/reject`
      );
      return response.data?.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.post<ApiResponseUserResponse>(
        `/api/v1/users/${id}/reset-password`
      );
      return response.data?.data;
    },
  });
}

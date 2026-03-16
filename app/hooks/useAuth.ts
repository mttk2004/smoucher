import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { LoginRequest, ApiResponseLoginResponse, ApiResponseUserResponse } from "../types/auth";
import Cookies from "js-cookie";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      try {
        const response = await api.post<ApiResponseLoginResponse>(
          "/api/v1/auth/login",
          data
        );
        if (!response.data.success) {
          throw new Error(response.data.message || "Login failed");
        }
        return response.data;
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.data?.accessToken) {
        Cookies.set("accessToken", data.data.accessToken, { secure: true });
      }
      if (data.data?.refreshToken) {
        Cookies.set("refreshToken", data.data.refreshToken, { secure: true });
      }
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get<ApiResponseUserResponse>("/api/v1/auth/me");
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch user");
      }
      return response.data.data;
    },
    retry: false, // Don't retry on unauthorized
  });
};

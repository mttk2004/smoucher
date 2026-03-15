import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://smart-voucher-api.oshi.id.vn";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach access token if available
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Optionally handle global errors like 401 Unauthorized to refresh token
    // or redirect to login.
    return Promise.reject(error);
  }
);

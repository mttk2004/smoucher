export interface LoginRequest {
  username: string;
  password?: string;
}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface ErrorDetail {
  code?: string;
  details?: string;
}

export interface ApiResponseLoginResponse {
  success?: boolean;
  message?: string;
  data?: LoginResponse;
  error?: ErrorDetail;
}

export interface UserResponse {
  id?: number;
  username?: string;
  email?: string;
  fullName?: string;
  phone?: string;
  role?: "ADMIN" | "STAFF" | "USER";
  status?: "PENDING" | "ACTIVE" | "REJECTED";
  isActive?: boolean;
  createdAt?: string;
}

export interface ApiResponseUserResponse {
  success?: boolean;
  message?: string;
  data?: UserResponse;
  error?: ErrorDetail;
}

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

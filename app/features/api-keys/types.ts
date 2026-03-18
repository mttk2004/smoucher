export interface ApiKeyResponse {
  id: number;
  name: string;
  systemName: string;
  rateLimitPerMinute: number;
  rateLimitPerDay: number;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
  plainTextKey?: string; // Only returned on creation
}

export interface ApiKeyCreateRequest {
  name: string;
  systemName: string;
  expiresAt?: string;
}

export interface RateLimitUpdateRequest {
  rateLimitPerMinute: number;
  rateLimitPerDay: number;
}

export interface ApiKeyUsageResponse {
  apiKeyId: number;
  name: string;
  todayRequests: number;
  thisMinuteRequests: number;
  limitPerMinute: number;
  limitPerDay: number;
}

export interface PageApiKeyResponse {
  content: ApiKeyResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponseApiKeyResponse {
  success: boolean;
  message: string;
  data?: ApiKeyResponse;
  error?: {
    code: string;
    details: string;
  };
}

export interface ApiResponsePageApiKeyResponse {
  success: boolean;
  message: string;
  data?: PageApiKeyResponse;
  error?: {
    code: string;
    details: string;
  };
}

export interface ApiResponseApiKeyUsageResponse {
  success: boolean;
  message: string;
  data?: ApiKeyUsageResponse;
  error?: {
    code: string;
    details: string;
  };
}

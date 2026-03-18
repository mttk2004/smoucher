export interface ApiRequestLog {
  id: number;
  apiKeyId?: number;
  endpoint: string;
  method: string;
  requestBody?: string;
  responseStatus: number;
  responseBody?: string;
  responseTimeMs: number;
  ipAddress?: string;
  createdAt: string;
}

export interface PageApiRequestLog {
  content: ApiRequestLog[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponsePageApiRequestLog {
  success: boolean;
  message: string;
  data?: PageApiRequestLog;
  error?: {
    code: string;
    details: string;
  };
}

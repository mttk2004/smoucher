export type DistributionChannel = "EMAIL" | "SMS" | "WHATSAPP" | "PUSH_NOTIFICATION" | string;
export type DistributionStatus = "PENDING" | "PROCESSING" | "SENT" | "FAILED" | "DELIVERED" | string;

export interface DistributionResponse {
  id: number;
  voucherId: number;
  voucherCode: string;
  customerId: number;
  customerName: string;
  channel: DistributionChannel;
  status: DistributionStatus;
  sentAt?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface DistributionCreateRequest {
  voucherId: number;
  customerId: number;
  channel: DistributionChannel;
}

export interface PageDistributionResponse {
  content: DistributionResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponseDistributionResponse {
  success: boolean;
  message: string;
  data?: DistributionResponse;
  error?: {
    code: string;
    details: string;
  };
}

export interface ApiResponsePageDistributionResponse {
  success: boolean;
  message: string;
  data?: PageDistributionResponse;
  error?: {
    code: string;
    details: string;
  };
}

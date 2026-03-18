export interface CustomerResponse {
  id: number;
  externalId: string;
  fullName: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerCreateRequest {
  fullName: string;
  externalId: string;
  email?: string;
  phone?: string;
}

export interface PageCustomerResponse {
  content: CustomerResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface CustomerVoucherResponse {
  assignmentId: number;
  voucherId: number;
  voucherCode: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  status: "DRAFT" | "ACTIVE" | "PAUSED" | "ENDED" | "SCHEDULED" | "EXPIRED" | "DEPLETED";
  validFrom: string;
  validUntil: string;
  hasBeenUsed: boolean;
}

export interface PageCustomerVoucherResponse {
  content: CustomerVoucherResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface CustomerUsageResponse {
  id: number;
  voucherId: number;
  voucherCode: string;
  externalOrderId: string;
  discountAmount: number;
  orderTotal: number;
  usedAt: string;
}

export interface PageCustomerUsageResponse {
  content: CustomerUsageResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponseCustomerResponse {
  success: boolean;
  message: string;
  data?: CustomerResponse;
  error?: {
    code: string;
    details: string;
  };
}

export interface ApiResponsePageCustomerResponse {
  success: boolean;
  message: string;
  data?: PageCustomerResponse;
  error?: {
    code: string;
    details: string;
  };
}

export interface ErrorDetail {
  code: string;
  details: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: ErrorDetail;
}

export interface VoucherUsageResponse {
  id: number;
  voucherId: number;
  voucherCode: string;
  customerId: number;
  customerName: string;
  externalOrderId: string;
  externalBranchId: string;
  discountAmount: number;
  orderTotal: number;
  status: string;
  usedAt: string;
}

export interface PageableObject {
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  offset: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

export interface PageVoucherUsageResponse {
  totalPages: number;
  totalElements: number;
  pageable: PageableObject;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  content: VoucherUsageResponse[];
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

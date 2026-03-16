import { PageableObject } from "./campaign";
import { VoucherResponse } from "./dashboard";

export interface PageVoucherResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  numberOfElements: number;
  size: number;
  content: VoucherResponse[];
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

export interface VoucherCreateRequest {
  code: string;
  campaignId?: number;
  description?: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  maxDiscountAmount?: number;
  minOrderValue?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  applicableBranches?: string[];
  maxUsageTotal?: number;
  maxUsagePerCustomer?: number;
  isPublic?: boolean;
  validFrom: string;
  validUntil: string;
}

export interface UniqueCodeGenerateRequest {
  quantity: number;
}

export interface UniqueCodeGenerateResponse {
  generated: number;
  total: number;
}

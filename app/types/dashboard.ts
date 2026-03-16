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

export interface VoucherResponse {
  id: number;
  code: string;
  campaignId: number;
  campaignName: string;
  description: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  maxDiscountAmount: number;
  minOrderValue: number;
  applicableProducts: string[];
  applicableCategories: string[];
  applicableBranches: string[];
  maxUsageTotal: number;
  maxUsagePerCustomer: number;
  currentUsageCount: number;
  isPublic: boolean;
  validFrom: string;
  validUntil: string;
  status: "ACTIVE" | "PAUSED" | "INACTIVE" | "EXPIRED" | "FULLY_USED" | "SCHEDULED";
  createdById: number;
  createdByUsername: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardOverviewResponse {
  totalVouchers: number;
  activeVouchers: number;
  totalUsages: number;
  totalDiscountAmount: number;
  topVouchers: VoucherResponse[];
  conversionRate: number;
  revenueByDay: Record<string, number>;
  activeMerchantCount: number;
}

export interface UsageTrendResponse {
  period: string;
  usageCount: number;
  discountAmount: number;
}

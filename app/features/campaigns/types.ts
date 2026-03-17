import type { ApiResponse } from "../dashboard/types";

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PageableObject {
  unpaged: boolean;
  pageNumber: number;
  paged: boolean;
  pageSize: number;
  offset: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

export interface CampaignResponse {
  id: number;
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "DRAFT" | "ACTIVE" | "PAUSED" | "ENDED";
  createdById: number;
  createdByUsername: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageCampaignResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  numberOfElements: number;
  size: number;
  content: CampaignResponse[];
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

export interface CampaignCreateRequest {
  name: string;
  description?: string;
  budget?: number;
  startDate: string;
  endDate: string;
  status: "DRAFT" | "ACTIVE" | "PAUSED" | "ENDED";
}

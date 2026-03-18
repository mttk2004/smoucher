export type UserRole = "ADMIN" | "STAFF" | "MERCHANT_ADMIN" | "MERCHANT_STAFF" | string;
export type UserStatus = "PENDING" | "APPROVED" | "REJECTED" | string;

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  createdAt: string;
}

export interface UserUpdateRequest {
  fullName: string;
  email: string;
  role: UserRole;
}

export interface PageUserResponse {
  content: UserResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponseUserResponse {
  success: boolean;
  message: string;
  data?: UserResponse;
  error?: {
    code: string;
    details: string;
  };
}

export interface ApiResponsePageUserResponse {
  success: boolean;
  message: string;
  data?: PageUserResponse;
  error?: {
    code: string;
    details: string;
  };
}

import * as z from "zod";

export const voucherSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(50),
  campaignId: z.coerce.number().optional(),
  description: z.string().optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
  discountValue: z.coerce.number().min(0.01, "Value must be greater than 0"),
  maxDiscountAmount: z.coerce.number().min(0).optional(),
  minOrderValue: z.coerce.number().min(0).optional(),
  maxUsageTotal: z.coerce.number().min(0).optional(),
  maxUsagePerCustomer: z.coerce.number().min(0).optional(),
  isPublic: z.any().transform(val => val === "true" || val === true).default(true),
  validFrom: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid start date"),
  validUntil: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid end date"),
  applicableProducts: z.array(z.string()).default([]),
  applicableCategories: z.array(z.string()).default([]),
  applicableBranches: z.array(z.string()).default([]),
}).refine(data => new Date(data.validFrom) <= new Date(data.validUntil), {
  message: "End date cannot be before start date",
  path: ["validUntil"]
});

export type VoucherFormValues = z.infer<typeof voucherSchema>;

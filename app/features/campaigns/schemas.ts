import * as z from "zod";

export const campaignSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters").max(100),
  description: z.string().optional(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid start date"),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid end date"),
  budget: z.coerce.number().min(0, "Budget cannot be negative").optional(),
}).refine(data => new Date(data.startDate) <= new Date(data.endDate), {
  message: "End date cannot be before start date",
  path: ["endDate"]
});

export type CampaignFormValues = z.infer<typeof campaignSchema>;

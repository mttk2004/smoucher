import type { Route } from "./+types/vouchers.create";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateVoucher } from "../hooks/useVouchers";
import { useCampaigns } from "../hooks/useCampaigns";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { TagInput } from "../components/ui/TagInput";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Voucher Studio | Smoucher" },
    { name: "description", content: "Create a new voucher." },
  ];
}

const voucherSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(50),
  campaignId: z.coerce.number().optional(),
  description: z.string().optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
  discountValue: z.coerce.number().min(0.01, "Value must be greater than 0"),
  maxDiscountAmount: z.coerce.number().min(0).optional(),
  minOrderValue: z.coerce.number().min(0).optional(),
  maxUsageTotal: z.coerce.number().min(0).optional(),
  maxUsagePerCustomer: z.coerce.number().min(0).optional(),
  isPublic: z.boolean().default(true),
  validFrom: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid start date"),
  validUntil: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid end date"),
  applicableProducts: z.array(z.string()).default([]),
  applicableCategories: z.array(z.string()).default([]),
  applicableBranches: z.array(z.string()).default([]),
}).refine(data => new Date(data.validFrom) <= new Date(data.validUntil), {
  message: "End date cannot be before start date",
  path: ["validUntil"]
});

type VoucherFormValues = z.infer<typeof voucherSchema>;

export default function CreateVoucher() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createVoucher, isPending } = useCreateVoucher();

  // Fetch active campaigns for the dropdown
  const { data: campaignsData } = useCampaigns(0, 100, "", "ACTIVE");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      discountType: "PERCENTAGE",
      isPublic: true,
      applicableProducts: [],
      applicableCategories: [],
      applicableBranches: [],
    },
  });

  const discountType = watch("discountType");
  const applicableProducts = watch("applicableProducts");
  const applicableCategories = watch("applicableCategories");
  const applicableBranches = watch("applicableBranches");

  const onSubmit = (data: VoucherFormValues) => {
    // Clean up empty optional number fields before submitting
    const payload = {
      ...data,
      validFrom: new Date(data.validFrom).toISOString(),
      validUntil: new Date(data.validUntil).toISOString(),
      campaignId: data.campaignId ? Number(data.campaignId) : undefined,
      maxDiscountAmount: data.discountType === "PERCENTAGE" && data.maxDiscountAmount ? data.maxDiscountAmount : undefined,
      minOrderValue: data.minOrderValue || undefined,
      maxUsageTotal: data.maxUsageTotal || undefined,
      maxUsagePerCustomer: data.maxUsagePerCustomer || undefined,
    };

    createVoucher(payload, {
      onSuccess: () => {
        toast.success("Voucher created successfully");
        navigate("/vouchers");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to create voucher.");
      }
    });
  };

  return (
    <>
      <div className="layout-content-container flex flex-col max-w-[1024px] flex-1 gap-8">
        <div className="px-4">
          <PageHeader
            title={t("vouchersCreate.title")}
            description={t("vouchersCreate.description")}
            actions={
              <>
                <button
                  type="button"
                  onClick={() => navigate("/vouchers")}
                  className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold hover:bg-slate-300 transition-colors"
                >
                  <span className="truncate">{t("vouchersCreate.cancelBtn")}</span>
                </button>
                <button
                  type="submit"
                  form="voucher-form"
                  disabled={isPending}
                  className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <span className="truncate">{isPending ? "Saving..." : "Save Voucher"}</span>
                </button>
              </>
            }
          />
        </div>

        <form id="voucher-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  info
                </span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Voucher Code
                  </label>
                  <input
                    {...register("code")}
                    className={`w-full rounded-lg border ${errors.code ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3`}
                    placeholder="e.g. SUMMER50"
                    type="text"
                  />
                  {errors.code && <p className="text-[12px] text-red-500">{errors.code.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Campaign
                  </label>
                  <select
                    {...register("campaignId")}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3"
                  >
                    <option value="">No Campaign (General)</option>
                    {campaignsData?.content.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Internal Description
                  </label>
                  <textarea
                    {...register("description")}
                    className={`w-full rounded-lg border ${errors.description ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3 min-h-[80px]`}
                    placeholder="Brief notes for your team..."
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  sell
                </span>
                Discount Rules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t("vouchersCreate.typeLabel")}
                  </label>
                  <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setValue("discountType", "PERCENTAGE")}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${discountType === "PERCENTAGE" ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"}`}>
                      Percentage
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("discountType", "FIXED_AMOUNT")}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${discountType === "FIXED_AMOUNT" ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"}`}>
                      {t("vouchersCreate.typeFixed")}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Value
                  </label>
                  <div className="relative">
                    <input
                      {...register("discountValue")}
                      className={`w-full rounded-lg border ${errors.discountValue ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3 pr-10`}
                      placeholder={t("vouchersCreate.valuePlaceholder")}
                      type="number"
                      step="0.01"
                    />
                    <span className="absolute right-3 top-3 text-slate-400 font-bold">
                      {discountType === "PERCENTAGE" ? "%" : "$"}
                    </span>
                  </div>
                  {errors.discountValue && <p className="text-[12px] text-red-500">{errors.discountValue.message}</p>}
                </div>

                {discountType === "PERCENTAGE" && (
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Max Discount Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-400">
                        $
                      </span>
                      <input
                        {...register("maxDiscountAmount")}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3 pl-7"
                        placeholder="Unlimited"
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Min. Spend Requirement
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      $
                    </span>
                    <input
                      {...register("minOrderValue")}
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3 pl-7"
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Scope of Application (JSONB External IDs)
                  </label>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500">Applicable Products (IDs)</label>
                    <TagInput
                      tags={applicableProducts}
                      setTags={(newTags) => setValue("applicableProducts", newTags, { shouldValidate: true })}
                      placeholder="e.g. PROD-001, PROD-002 (Press Enter)"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500">Applicable Categories (IDs)</label>
                    <TagInput
                      tags={applicableCategories}
                      setTags={(newTags) => setValue("applicableCategories", newTags, { shouldValidate: true })}
                      placeholder="e.g. CAT-ELECTRONICS (Press Enter)"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500">Applicable Branches (IDs)</label>
                    <TagInput
                      tags={applicableBranches}
                      setTags={(newTags) => setValue("applicableBranches", newTags, { shouldValidate: true })}
                      placeholder="e.g. BR-DOWNTOWN (Press Enter)"
                    />
                  </div>
                  <p className="text-xs text-slate-400 italic">Leave empty to apply to all.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6">
            <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  visibility
                </span>
                Visibility
              </h3>
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg h-12">
                <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-bold transition-all">
                  <span className="truncate">Public</span>
                  <input
                    {...register("isPublic")}
                    className="invisible w-0"
                    type="radio"
                    value="true"
                  />
                </label>
                <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-bold transition-all">
                  <span className="truncate">Private</span>
                  <input
                    {...register("isPublic")}
                    className="invisible w-0"
                    type="radio"
                    value="false"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-3 italic">
                Public vouchers are visible in the user's "Available Rewards"
                tab.
              </p>
            </section>

            <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  group
                </span>
                Usage Limits
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Total Campaign Limit
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      {...register("maxUsageTotal")}
                      className="flex-1 rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3"
                      placeholder="No limit"
                      type="number"
                    />
                    <span className="text-xs text-slate-400">Claims</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Per Customer Limit
                  </label>
                  <input
                    {...register("maxUsagePerCustomer")}
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3"
                    placeholder="e.g. 1"
                    type="number"
                  />
                  <p className="text-xs text-slate-400">Leave empty for unlimited</p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  calendar_today
                </span>
                Schedule
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Start Date
                  </label>
                  <input
                    {...register("validFrom")}
                    className={`w-full rounded-lg border ${errors.validFrom ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3`}
                    type="date"
                  />
                  {errors.validFrom && <p className="text-[12px] text-red-500">{errors.validFrom.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    End Date
                  </label>
                  <input
                    {...register("validUntil")}
                    className={`w-full rounded-lg border ${errors.validUntil ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3`}
                    type="date"
                  />
                  {errors.validUntil && <p className="text-[12px] text-red-500">{errors.validUntil.message}</p>}
                </div>
              </div>
            </section>
          </div>
        </form>

        <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-start gap-4">
          <span className="material-symbols-outlined text-primary">
            analytics
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Projected Impact
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Based on current settings, this voucher is expected to be valid
              for 12,402 items across 4 branches. Estimated redemption rate:
              12-15%.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

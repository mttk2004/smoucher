import * as z from "zod";
import type { Route } from "./+types/vouchers.create";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateVoucher } from "../features/vouchers/hooks";
import { useCampaigns } from "../features/campaigns/hooks";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { voucherSchema, type VoucherFormValues } from "../features/vouchers/schemas";
import { Button } from "../components/ui/Button";

import { VoucherBasicInfo } from "../features/vouchers/components/VoucherBasicInfo";
import { VoucherConditions } from "../features/vouchers/components/VoucherConditions";
import { VoucherDistribution } from "../features/vouchers/components/VoucherDistribution";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Voucher Studio | Smoucher" },
    { name: "description", content: "Create a new voucher." },
  ];
}

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
    resolver: zodResolver(voucherSchema) as any,
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

  const onSubmit: SubmitHandler<VoucherFormValues> = (data) => {
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
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/vouchers")}
                  className="min-w-[84px]"
                >
                  {t("vouchersCreate.cancelBtn")}
                </Button>
                <Button
                  type="submit"
                  form="voucher-form"
                  disabled={isPending}
                  className="min-w-[84px]"
                >
                  {isPending ? "Saving..." : "Save Voucher"}
                </Button>
              </>
            }
          />
        </div>

        <form id="voucher-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <VoucherBasicInfo
              register={register}
              errors={errors}
              campaignsData={campaignsData}
            />

            <VoucherConditions
              register={register}
              errors={errors}
              setValue={setValue}
              discountType={discountType}
              applicableProducts={applicableProducts}
              applicableCategories={applicableCategories}
              applicableBranches={applicableBranches}
            />
          </div>

          <VoucherDistribution
            register={register}
            errors={errors}
          />
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

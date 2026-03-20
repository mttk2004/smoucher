import { useTranslation } from "react-i18next";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import type { VoucherFormValues } from "../schemas";

interface VoucherConditionsProps {
  register: UseFormRegister<VoucherFormValues>;
  errors: FieldErrors<VoucherFormValues>;
  setValue: UseFormSetValue<VoucherFormValues>;
  discountType: string;
}

export function VoucherConditions({
  register,
  errors,
  setValue,
  discountType,
}: VoucherConditionsProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-xl">
          sell
        </span>
        Discount Rules
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <Label>{t("vouchersCreate.typeLabel")}</Label>
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => setValue("discountType", "PERCENTAGE")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${discountType === "PERCENTAGE" ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"}`}
            >
              Percentage
            </button>
            <button
              type="button"
              onClick={() => setValue("discountType", "FIXED_AMOUNT")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${discountType === "FIXED_AMOUNT" ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"}`}
            >
              {t("vouchersCreate.typeFixed")}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label>Value</Label>
          <div className="relative">
            <Input
              {...register("discountValue")}
              className={`pr-10 ${errors.discountValue ? "border-red-500" : ""}`}
              placeholder={t("vouchersCreate.valuePlaceholder")}
              type="number"
              step="0.01"
            />
            <span className="absolute right-3 top-2 text-slate-400 font-bold z-10">
              {discountType === "PERCENTAGE" ? "%" : "$"}
            </span>
          </div>
          {errors.discountValue && (
            <p className="text-[12px] text-red-500">
              {errors.discountValue.message as string}
            </p>
          )}
        </div>

        {discountType === "PERCENTAGE" && (
          <div className="flex flex-col gap-3">
            <Label>Max Discount Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 z-10">
                $
              </span>
              <Input
                {...register("maxDiscountAmount")}
                className="pl-7"
                placeholder="Unlimited"
                type="number"
                step="0.01"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Label>Min. Spend Requirement</Label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 z-10">$</span>
            <Input
              {...register("minOrderValue")}
              className="pl-7"
              placeholder="0.00"
              type="number"
              step="0.01"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

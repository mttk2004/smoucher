import { useTranslation } from "react-i18next";
import type { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { TagInput } from "../../../components/ui/TagInput";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import type { VoucherFormValues } from "../schemas";

interface VoucherConditionsProps {
  register: UseFormRegister<VoucherFormValues>;
  errors: FieldErrors<VoucherFormValues>;
  setValue: UseFormSetValue<VoucherFormValues>;
  discountType: string;
  applicableProducts: string[];
  applicableCategories: string[];
  applicableBranches: string[];
}

export function VoucherConditions({
  register,
  errors,
  setValue,
  discountType,
  applicableProducts,
  applicableCategories,
  applicableBranches
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
          <Label>
            {t("vouchersCreate.typeLabel")}
          </Label>
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
          <Label>
            Value
          </Label>
          <div className="relative">
            <Input
              {...register("discountValue")}
              className={`pr-10 ${errors.discountValue ? 'border-red-500' : ''}`}
              placeholder={t("vouchersCreate.valuePlaceholder")}
              type="number"
              step="0.01"
            />
            <span className="absolute right-3 top-2 text-slate-400 font-bold z-10">
              {discountType === "PERCENTAGE" ? "%" : "$"}
            </span>
          </div>
          {errors.discountValue && <p className="text-[12px] text-red-500">{errors.discountValue.message as string}</p>}
        </div>

        {discountType === "PERCENTAGE" && (
          <div className="flex flex-col gap-3">
            <Label>
              Max Discount Amount
            </Label>
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
          <Label>
            Min. Spend Requirement
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 z-10">
              $
            </span>
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

      <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
        <div className="flex justify-between items-center mb-4">
          <Label>
            Scope of Application (JSONB External IDs)
          </Label>
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
  );
}

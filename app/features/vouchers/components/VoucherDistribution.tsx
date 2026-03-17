import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import type { VoucherFormValues } from "../schemas";

interface VoucherDistributionProps {
  register: UseFormRegister<VoucherFormValues>;
  errors: FieldErrors<VoucherFormValues>;
}

export function VoucherDistribution({ register, errors }: VoucherDistributionProps) {
  return (
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
            <Label>
              Total Campaign Limit
            </Label>
            <div className="flex items-center gap-3">
              <Input
                {...register("maxUsageTotal")}
                className="flex-1"
                placeholder="No limit"
                type="number"
              />
              <span className="text-xs text-slate-400">Claims</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              Per Customer Limit
            </Label>
            <Input
              {...register("maxUsagePerCustomer")}
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
            <Label>
              Start Date
            </Label>
            <Input
              {...register("validFrom")}
              className={errors.validFrom ? 'border-red-500' : ''}
              type="date"
            />
            {errors.validFrom && <p className="text-[12px] text-red-500">{errors.validFrom.message as string}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              End Date
            </Label>
            <Input
              {...register("validUntil")}
              className={errors.validUntil ? 'border-red-500' : ''}
              type="date"
            />
            {errors.validUntil && <p className="text-[12px] text-red-500">{errors.validUntil.message as string}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

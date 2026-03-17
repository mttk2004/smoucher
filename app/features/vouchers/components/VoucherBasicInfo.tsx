import { useTranslation } from "react-i18next";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Select } from "../../../components/ui/Select";
import type { VoucherFormValues } from "../schemas";

interface VoucherBasicInfoProps {
  register: UseFormRegister<VoucherFormValues>;
  errors: FieldErrors<VoucherFormValues>;
  campaignsData: any;
}

export function VoucherBasicInfo({ register, errors, campaignsData }: VoucherBasicInfoProps) {
  return (
    <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-xl">
          info
        </span>
        Basic Information
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <Label>
            Voucher Code
          </Label>
          <Input
            {...register("code")}
            className={errors.code ? 'border-red-500' : ''}
            placeholder="e.g. SUMMER50"
            type="text"
          />
          {errors.code && <p className="text-[12px] text-red-500">{errors.code.message as string}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Campaign
          </Label>
          <Select
            {...register("campaignId")}
          >
            <option value="">No Campaign (General)</option>
            {campaignsData?.content.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            Internal Description
          </Label>
          <textarea
            {...register("description")}
            className={`w-full rounded-lg border ${errors.description ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3 min-h-[80px]`}
            placeholder="Brief notes for your team..."
          ></textarea>
        </div>
      </div>
    </section>
  );
}

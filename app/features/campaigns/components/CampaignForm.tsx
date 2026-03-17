import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { campaignSchema, type CampaignFormValues } from "../schemas";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Button } from "../../../components/ui/Button";
import { Select } from "../../../components/ui/Select";

interface CampaignFormProps {
  onSubmit: SubmitHandler<CampaignFormValues>;
  isPending: boolean;
  onCancel: () => void;
}

export function CampaignForm({ onSubmit, isPending, onCancel }: CampaignFormProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      budget: 0,
    },
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span className="font-semibold text-sm">{t("campaignsCreate.step1")}</span>
          </div>
          <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
              2
            </span>
            <span className="font-medium text-sm">{t("campaignsCreate.step2")}</span>
          </div>
          <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
              3
            </span>
            <span className="font-medium text-sm">{t("campaignsCreate.step3")}</span>
          </div>
        </div>

        <form id="campaign-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="campaign-name">
              {t("campaignsCreate.nameLabel")}
            </Label>
            <Input
              {...register("name")}
              id="campaign-name"
              placeholder={t("campaignsCreate.namePlaceholder")}
              type="text"
              className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.name ? (
              <p className="text-[12px] text-red-500">{errors.name.message as string}</p>
            ) : (
              <p className="text-[12px] text-slate-500">
                {t("campaignsCreate.nameHelp")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">
              Description
            </Label>
            <textarea
              {...register("description")}
              className={`flex min-h-[100px] w-full rounded-lg border ${errors.description ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus-visible:ring-primary'} bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50`}
              id="description"
              placeholder={t("campaignsCreate.descPlaceholder")}
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-[12px] text-red-500">{errors.description.message as string}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="start-date">
                {t("campaignsCreate.startDate")}
              </Label>
              <div className="relative">
                <Input
                  {...register("startDate")}
                  id="start-date"
                  type="date"
                  className={errors.startDate ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
              </div>
              {errors.startDate && (
                <p className="text-[12px] text-red-500">{errors.startDate.message as string}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="end-date">
                {t("campaignsCreate.endDate")}
              </Label>
              <div className="relative">
                <Input
                  {...register("endDate")}
                  id="end-date"
                  type="date"
                  className={errors.endDate ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
              </div>
              {errors.endDate && (
                <p className="text-[12px] text-red-500">{errors.endDate.message as string}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="budget">
                {t("campaignsCreate.budget")}
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-500 font-medium z-10">
                  $
                </span>
                <Input
                  {...register("budget")}
                  id="budget"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  className={`pl-7 ${errors.budget ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
              </div>
              {errors.budget && (
                <p className="text-[12px] text-red-500">{errors.budget.message as string}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="currency">
                {t("campaignsCreate.currency")}
              </Label>
              <Select id="currency" defaultValue="usd">
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
              </Select>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-slate-50 dark:bg-slate-950/50 px-6 md:px-8 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button
            type="submit"
            form="campaign-form"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Create Campaign"}
          </Button>
        </div>
      </div>
    </div>
  );
}

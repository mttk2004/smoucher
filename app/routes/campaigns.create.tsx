import type { Route } from "./+types/campaigns.create";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateCampaign } from "../hooks/useCampaigns";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Create Campaign" },
    { name: "description", content: "Launch a new marketing initiative" },
  ];
}

const campaignSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters").max(100),
  description: z.string().optional(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid start date"),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid end date"),
  budget: z.coerce.number().min(0, "Budget cannot be negative").optional(),
}).refine(data => new Date(data.startDate) <= new Date(data.endDate), {
  message: "End date cannot be before start date",
  path: ["endDate"]
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

export default function CreateCampaign() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createCampaign, isPending } = useCreateCampaign();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      description: "",
      budget: 0,
    },
  });

  const onSubmit = (data: CampaignFormValues) => {
    // Format dates to ISO strings with UTC 'Z' for backend (basic formatting)
    const formattedData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      status: "DRAFT" as const, // Default status for new campaigns
    };

    createCampaign(formattedData, {
      onSuccess: () => {
        toast.success("Campaign created successfully");
        navigate("/campaigns");
      },
      onError: () => {
        toast.error("Failed to create campaign. Please try again.");
      },
    });
  };

  return (
    <>
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            <a
              className="text-sm font-medium hover:underline"
              href="/campaigns"
            >
              {t("campaignsCreate.back")}
            </a>
          </div>
          <PageHeader
            title={t("campaignsCreate.title")}
            description={t("campaignsCreate.description")}
          />
        </div>

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
                <label
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="campaign-name"
                >
                  {t("campaignsCreate.nameLabel")}
                </label>
                <input
                  {...register("name")}
                  className={`flex h-11 w-full rounded-lg border ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus-visible:ring-primary'} bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all`}
                  id="campaign-name"
                  placeholder={t("campaignsCreate.namePlaceholder")}
                  type="text"
                />
                {errors.name ? (
                  <p className="text-[12px] text-red-500">{errors.name.message}</p>
                ) : (
                  <p className="text-[12px] text-slate-500">
                    {t("campaignsCreate.nameHelp")}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className={`flex min-h-[100px] w-full rounded-lg border ${errors.description ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus-visible:ring-primary'} bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all`}
                  id="description"
                  placeholder={t("campaignsCreate.descPlaceholder")}
                  rows={4}
                ></textarea>
                {errors.description && (
                  <p className="text-[12px] text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    htmlFor="start-date"
                  >
                    {t("campaignsCreate.startDate")}
                  </label>
                  <div className="relative">
                    <input
                      {...register("startDate")}
                      className={`flex h-11 w-full rounded-lg border ${errors.startDate ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus-visible:ring-primary'} bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 transition-all`}
                      id="start-date"
                      type="date"
                    />
                  </div>
                  {errors.startDate && (
                    <p className="text-[12px] text-red-500">{errors.startDate.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    htmlFor="end-date"
                  >
                    {t("campaignsCreate.endDate")}
                  </label>
                  <div className="relative">
                    <input
                      {...register("endDate")}
                      className={`flex h-11 w-full rounded-lg border ${errors.endDate ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus-visible:ring-primary'} bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 transition-all`}
                      id="end-date"
                      type="date"
                    />
                  </div>
                  {errors.endDate && (
                    <p className="text-[12px] text-red-500">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    htmlFor="budget"
                  >
                    {t("campaignsCreate.budget")}
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-500 font-medium">
                      $
                    </span>
                    <input
                      {...register("budget")}
                      className={`flex h-11 w-full rounded-lg border ${errors.budget ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus-visible:ring-primary'} bg-slate-50 dark:bg-slate-950 pl-7 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 transition-all`}
                      id="budget"
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  {errors.budget && (
                    <p className="text-[12px] text-red-500">{errors.budget.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    htmlFor="currency"
                  >
                    {t("campaignsCreate.currency")}
                  </label>
                  <select
                    className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all appearance-none bg-no-repeat bg-[right_0.5rem_center]"
                    id="currency"
                    defaultValue="usd"
                  >
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/50 px-6 md:px-8 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                 navigate("/campaigns")
              }}
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                type="submit"
                form="campaign-form"
                disabled={isPending}
                className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 transition-all disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Create Campaign"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">lightbulb</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Pro Tip
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Campaigns with clear, descriptive names are 40% easier to track
              across multiple channels. Try including the year or season in the
              title.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

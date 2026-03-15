import type { Route } from "./+types/campaigns.create";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Create Campaign" },
    { name: "description", content: "Launch a new marketing initiative" },
  ];
}

export default function CreateCampaign() {
  const { t } = useTranslation();
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

            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="campaign-name"
                >
                  {t("campaignsCreate.nameLabel")}
                </label>
                <input
                  className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  id="campaign-name"
                  placeholder={t("campaignsCreate.namePlaceholder")}
                  type="text"
                />
                <p className="text-[12px] text-slate-500">
                  {t("campaignsCreate.nameHelp")}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="flex min-h-[100px] w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  id="description"
                  placeholder={t("campaignsCreate.descPlaceholder")}
                  rows={4}
                ></textarea>
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
                      className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                      id="start-date"
                      type="date"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none text-[20px]">
                      calendar_today
                    </span>
                  </div>
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
                      className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                      id="end-date"
                      type="date"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none text-[20px]">
                      calendar_today
                    </span>
                  </div>
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
                      className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-7 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                      id="budget"
                      placeholder="0.00"
                      type="number"
                    />
                  </div>
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
                  >
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-2">
                  <input
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                    id="auto-optimize"
                    type="checkbox"
                  />
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300"
                    htmlFor="auto-optimize"
                  >
                    Auto-optimize daily spend
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    defaultChecked
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                    id="notifications"
                    type="checkbox"
                  />
                  <label
                    className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300"
                    htmlFor="notifications"
                  >
                    Receive email notifications for status changes
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/50 px-6 md:px-8 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Save as Draft
            </button>
            <div className="flex gap-3">
              <a
                href="/campaigns"
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </a>
              <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 transition-all">
                Continue to {t("campaignsCreate.step2")}
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

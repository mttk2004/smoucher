import type { Route } from "./+types/vouchers.create";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Voucher Studio | Smoucher" },
    { name: "description", content: "Create a new voucher." },
  ];
}

export default function CreateVoucher() {
  const { t } = useTranslation();
  return (
    <>
      <div className="layout-content-container flex flex-col max-w-[1024px] flex-1 gap-8">
        <div className="px-4">
          <PageHeader
            title={t("vouchersCreate.title")}
            description={t("vouchersCreate.description")}
            actions={
              <>
                <a
                  href="/vouchers"
                  className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold hover:bg-slate-300 transition-colors"
                >
                  <span className="truncate">{t("vouchersCreate.cancelBtn")}</span>
                </a>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity">
                  <span className="truncate">Save Voucher</span>
                </button>
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    {t("vouchersCreate.nameLabel")}
                  </label>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3"
                    placeholder="e.g. Summer Flash Sale 2024"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Internal Description
                  </label>
                  <textarea
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3 min-h-[80px]"
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
                    <button className="flex-1 py-2 text-sm font-medium rounded-md bg-white dark:bg-slate-700 shadow-sm text-primary">
                      Percentage
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium text-slate-500 dark:text-slate-400">
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
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3 pr-10"
                      placeholder={t("vouchersCreate.valuePlaceholder")}
                      type="number"
                    />
                    <span className="absolute right-3 top-3 text-slate-400 font-bold">
                      %
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Applies To
                  </label>
                  <select className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3">
                    <option>Specific Products</option>
                    <option>Specific Categories</option>
                    <option>Storewide</option>
                    <option>Branch Specific</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Min. Spend Requirement
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      $
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3 pl-7"
                      placeholder="0.00"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Product Selectors (JSONB)
                  </label>
                  <button className="text-xs text-primary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      add_circle
                    </span>{" "}
                    Add Condition
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-sm">
                      inventory_2
                    </span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300 flex-1">
                      category_id IN ["cat_99", "cat_102"]
                    </span>
                    <button className="text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined text-sm">
                        close
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-sm">
                      storefront
                    </span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300 flex-1">
                      branch_location = "Downtown"
                    </span>
                    <button className="text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined text-sm">
                        close
                      </span>
                    </button>
                  </div>
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
                    defaultChecked
                    className="invisible w-0"
                    name="visibility"
                    type="radio"
                    value="Public"
                  />
                </label>
                <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-bold transition-all">
                  <span className="truncate">Private</span>
                  <input
                    className="invisible w-0"
                    name="visibility"
                    type="radio"
                    value="Private"
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
                  <select className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3">
                    <option>1 time only</option>
                    <option>Daily (1 per day)</option>
                    <option>Weekly (1 per week)</option>
                    <option>Unlimited</option>
                  </select>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      First-time users only
                    </span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                    </button>
                  </div>
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
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3"
                    type="date"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    End Date
                  </label>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm p-3"
                    type="date"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

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

import type { Route } from "./+types/campaigns";
import { useTranslation } from "react-i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher Admin - Campaign List" },
    { name: "description", content: "Manage marketing campaigns" },
  ];
}

export default function Campaigns() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t("campaigns.title")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t("campaigns.description")}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-px">
          <button className="px-4 py-2 text-sm font-semibold text-primary border-b-2 border-primary">
            All Campaigns
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            Active
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            Drafts
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            Paused
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            Ended
          </button>
        </div>

        <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden @container">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[35%]">
                  Campaign Details
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Duration
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[20%]">
                  Budget Utilization
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <span className="material-symbols-outlined">
                        shopping_bag
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        Summer Sale 2024
                      </p>
                      <p className="text-xs text-slate-500">
                        E-commerce • 15.2k target audience
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    ACTIVE
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm">
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      Jun 01, 2024
                    </p>
                    <p className="text-slate-500 text-xs">to Aug 31, 2024</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>$4,800 / $6,500</span>
                      <span>74%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "74%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <span className="material-symbols-outlined">
                        flash_on
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        Flash Discount
                      </p>
                      <p className="text-xs text-slate-500">
                        Social Media • 5k target audience
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    DRAFT
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm">
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      Sep 15, 2024
                    </p>
                    <p className="text-slate-500 text-xs">to Sep 16, 2024</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>$0 / $1,200</span>
                      <span>0%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">
                        celebration
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        Holiday Special
                      </p>
                      <p className="text-xs text-slate-500">
                        Cross-channel • 50k target audience
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    ENDED
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm">
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      Dec 01, 2023
                    </p>
                    <p className="text-slate-500 text-xs">to Dec 25, 2023</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>$25,000 / $25,000</span>
                      <span>100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <span className="material-symbols-outlined">hot_tub</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        Weekend Warmup
                      </p>
                      <p className="text-xs text-slate-500">
                        Email • 8.4k target audience
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    PAUSED
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm">
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      Jul 05, 2024
                    </p>
                    <p className="text-slate-500 text-xs">to Jul 07, 2024</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>$440 / $2,000</span>
                      <span>22%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "22%" }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              1-4
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-900 dark:text-slate-100">
              12
            </span>{" "}
            campaigns
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";
import type { Route } from "./+types/vouchers";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Voucher Inventory" },
    {
      name: "description",
      content: "Manage, track, and export your unique voucher issuance data.",
    },
  ];
}

const VOUCHERS_DATA = [
  {
    code: "SMCH-9283-XJ",
    status: "Issued",
    statusVariant: "info",
    initials: "AR",
    name: "Alex River",
    campaign: "Summer Blast 2024",
    expiry: "Dec 12, 2024"
  },
  {
    code: "SMCH-1102-LK",
    status: "Redeemed",
    statusVariant: "success",
    initials: "JS",
    name: "Jordan Smith",
    campaign: "Holiday Special",
    expiry: "Oct 05, 2023"
  },
  {
    code: "SMCH-7734-OP",
    status: "Expired",
    statusVariant: "error",
    initials: "CD",
    name: "Casey Doe",
    campaign: "Flash Sale",
    expiry: "Jan 20, 2024"
  },
  {
    code: "SMCH-4456-BN",
    status: "Issued",
    statusVariant: "info",
    initials: "SW",
    name: "Sam Wilson",
    campaign: "Loyalty Rewards",
    expiry: "Nov 15, 2024"
  },
  {
    code: "SMCH-2291-QM",
    status: "Redeemed",
    statusVariant: "success",
    initials: "TR",
    name: "Taylor Reed",
    campaign: "Referral Bonus",
    expiry: "Sep 30, 2023"
  }
];

export default function Vouchers() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={t("vouchers.title")}
        description={t("vouchers.description")}
        actions={
          <>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-lg">
                download
              </span>{t("table.exportCsv")}</button>
            <a
              href="/vouchers/create"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              {t("vouchers.createBtn")}
            </a>
          </>
        }
      />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
            <input
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary"
              placeholder="Search by code, customer or campaign..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold shadow-sm">{t("filters.allVouchers")}</button>
            <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">{t("table.issued")}</button>
            <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">{t("filters.redeemed")}</button>
            <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">{t("filters.expired")}</button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-base">
                filter_list
              </span>
              {t("filters.moreFilters")}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.voucherCode")}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.status")}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.customer")}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.campaign")}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.expiryDate")}</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">{t("table.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {VOUCHERS_DATA.map((voucher, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-semibold text-primary">
                    {voucher.code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={voucher.statusVariant as any}>
                    {voucher.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                      {voucher.initials}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {voucher.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {voucher.campaign}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {voucher.expiry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <Pagination start={1} end={5} total={1240} itemName="vouchers" className="mt-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Value Issued
            </span>
            <span className="material-symbols-outlined text-primary">
              payments
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              $45,230
            </span>
            <span className="text-xs font-medium text-emerald-600">
              +12% vs last month
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Redemption Rate
            </span>
            <span className="material-symbols-outlined text-primary">
              analytics
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              68.4%
            </span>
            <span className="text-xs font-medium text-slate-500">
              Above target (60%)
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Vouchers
            </span>
            <span className="material-symbols-outlined text-primary">
              timer
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              842
            </span>
            <span className="text-xs font-medium text-rose-500">
              12 expires in 24h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

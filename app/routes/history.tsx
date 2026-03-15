import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";
import type { Route } from "./+types/history";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Usage History" },
    {
      name: "description",
      content: "Detailed record of all voucher redemptions.",
    },
  ];
}

const HISTORY_DATA = [
  {
    orderId: "#ORD-9921",
    location: "Downtown Central",
    address: "Main St. 402",
    amount: "$15.00",
    status: "Completed",
    statusVariant: "success",
    timestamp: "Oct 24, 2023 14:20"
  },
  {
    orderId: "#ORD-9845",
    location: "Westside Mall",
    address: "Terminal 3, Gate B",
    amount: "$10.00",
    status: "Completed",
    statusVariant: "success",
    timestamp: "Oct 23, 2023 11:15"
  },
  {
    orderId: "#ORD-9712",
    location: "Airport Terminal 2",
    address: "International Hub",
    amount: "$25.50",
    status: "Pending",
    statusVariant: "warning",
    timestamp: "Oct 22, 2023 18:45"
  },
  {
    orderId: "#ORD-9650",
    location: "Downtown Central",
    address: "Main St. 402",
    amount: "$5.00",
    status: "Completed",
    statusVariant: "success",
    timestamp: "Oct 21, 2023 09:30"
  },
  {
    orderId: "#ORD-9588",
    location: "North Plaza",
    address: "Level 2 Food Court",
    amount: "$12.00",
    status: "Cancelled",
    statusVariant: "default",
    timestamp: "Oct 20, 2023 13:10"
  }
];

export default function History() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={t("history.title")}
        description={t("history.description")}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">download</span>{t("table.exportCsv")}</button>
        }
      />

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Search Order ID..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  calendar_today
                </span>
                {t("filters.dateRange")}
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  storefront
                </span>
                {t("filters.branch")}
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>
            </div>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Showing{" "}
            <span className="text-slate-900 dark:text-white">1,248</span>{" "}
            records
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">{t("table.externalOrderId")}</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">{t("table.branchLocation")}</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800 text-right">{t("table.discountAmount")}</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">{t("table.status")}</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">{t("table.timestamp")}</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {HISTORY_DATA.map((record, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-primary font-semibold">
                    {record.orderId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {record.location}
                    </span>
                    <span className="text-xs text-slate-500">{record.address}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {record.amount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={record.statusVariant as any}>
                    {record.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {record.timestamp}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <Pagination start={1} end={5} total={1248} itemName="records" className="mt-0" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Total Savings
            </h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            $12,450.80
          </p>
          <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
            <span className="material-symbols-outlined text-xs mr-1">
              trending_up
            </span>
            +14% {t("metrics.fromLastMonth")}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">group</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Active Users
            </h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            842
          </p>
          <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
            <span className="material-symbols-outlined text-xs mr-1">
              trending_up
            </span>
            +5.2% {t("metrics.fromLastMonth")}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Redemption Rate
            </h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            76.4%
          </p>
          <p className="text-xs text-slate-500 mt-1 flex items-center font-medium">
            {t("metrics.stablePerformance")}
          </p>
        </div>
      </div>
    </div>
  );
}

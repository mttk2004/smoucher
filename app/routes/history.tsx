import { useState } from "react";
import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";
import type { Route } from "./+types/history";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { useUsages, exportUsagesCsv } from "../features/usages/hooks";
import { useDashboardOverview } from "../features/dashboard/hooks";
import { format } from "date-fns";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Usage History" },
    {
      name: "description",
      content: "Detailed record of all voucher redemptions.",
    },
  ];
}

export default function History() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [search, setSearch] = useState("");

  const { data: usagesData, isLoading } = useUsages({
    page,
    size,
    externalOrderId: search || undefined,
  });

  const { data: overview } = useDashboardOverview();

  const handleExportCsv = async () => {
    try {
      await exportUsagesCsv({
        externalOrderId: search || undefined,
      });
    } catch (error) {
      console.error("Failed to export CSV:", error);
      // Optional: Add toast notification for error
    }
  };

  const content = usagesData?.content || [];
  const totalElements = usagesData?.totalElements || 0;

  const renderStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <Badge variant="success">{status}</Badge>;
      case "pending":
        return <Badge variant="warning">{status}</Badge>;
      case "cancelled":
        return <Badge variant="default">{status}</Badge>;
      default:
        return <Badge variant="default">{status || "Unknown"}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={t("history.title")}
        description={t("history.description")}
        actions={
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            {t("table.exportCsv")}
          </button>
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
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0); // Reset to first page on search
                }}
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
            <span className="text-slate-900 dark:text-white">{totalElements}</span>{" "}
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                    Loading...
                  </td>
                </tr>
              ) : content.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No records found
                  </td>
                </tr>
              ) : (
                content.map((record, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-primary font-semibold">
                        {record.externalOrderId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {record.externalBranchId || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        ${record.discountAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {renderStatusBadge(record.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {record.usedAt ? format(new Date(record.usedAt), "MMM dd, yyyy HH:mm") : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                        <span className="material-symbols-outlined text-lg">
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <Pagination
            start={page * size + 1}
            end={Math.min((page + 1) * size, totalElements)}
            total={totalElements}
            itemName="records"
            className="mt-0"
            // Note: Update Pagination component to support onPageChange if it doesn't already
          />
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
            ${(overview?.totalDiscountAmount || 0).toLocaleString()}
          </p>
          {overview?.savingsGrowthRate !== undefined && (
            <p className={`text-xs mt-1 flex items-center font-medium ${overview.savingsGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="material-symbols-outlined text-xs mr-1">
                {overview.savingsGrowthRate >= 0 ? 'trending_up' : 'trending_down'}
              </span>
              {overview.savingsGrowthRate > 0 ? '+' : ''}{overview.savingsGrowthRate.toFixed(1)}% {t("metrics.fromLastMonth")}
            </p>
          )}
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
            {overview?.activeCustomerCount?.toLocaleString() || "0"}
          </p>
          {overview?.activeUsersGrowthRate !== undefined && (
            <p className={`text-xs mt-1 flex items-center font-medium ${overview.activeUsersGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="material-symbols-outlined text-xs mr-1">
                {overview.activeUsersGrowthRate >= 0 ? 'trending_up' : 'trending_down'}
              </span>
              {overview.activeUsersGrowthRate > 0 ? '+' : ''}{overview.activeUsersGrowthRate.toFixed(1)}% {t("metrics.fromLastMonth")}
            </p>
          )}
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
            {overview?.conversionRate !== undefined ? `${(overview.conversionRate * 100).toFixed(1)}%` : "0%"}
          </p>
          {overview?.redemptionRateGrowth !== undefined ? (
             <p className={`text-xs mt-1 flex items-center font-medium ${overview.redemptionRateGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="material-symbols-outlined text-xs mr-1">
                {overview.redemptionRateGrowth >= 0 ? 'trending_up' : 'trending_down'}
              </span>
              {overview.redemptionRateGrowth > 0 ? '+' : ''}{overview.redemptionRateGrowth.toFixed(1)}% {t("metrics.fromLastMonth")}
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-1 flex items-center font-medium">
              {t("metrics.stablePerformance")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

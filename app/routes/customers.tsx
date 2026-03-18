import type { Route } from "./+types/customers";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";
import { useCustomers } from "../features/customers/hooks";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher Customer Directory" },
    {
      name: "description",
      content:
        "Centralized view of internal Smoucher IDs and external system mappings.",
    },
  ];
}

export default function Customers() {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
  });

  const {
    data: pageData,
    isLoading,
    error,
  } = useCustomers(searchParams.page, searchParams.size, searchParams.search);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
  };

  const CUSTOMERS_DATA = (pageData?.content || []).map((c, i) => {
    const colors = [
      "bg-primary/20 text-primary",
      "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600",
    ];
    return {
      initials: c.fullName.substring(0, 2).toUpperCase(),
      bg: colors[i % colors.length],
      name: c.fullName,
      email: c.email || "N/A",
      smId: `SM-${c.id}`,
      extId: c.externalId,
      tier: "Standard",
      tierVariant: "default",
    };
  });

  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title={t("customers.title")}
        description={t("customers.description")}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
            {t("table.exportCsv")}
          </button>
        }
      />

      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-lg text-xs font-semibold whitespace-nowrap">
          {t("filters.allCustomers")}
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap">
          {t("filters.tierGold")}{" "}
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap">
          {t("filters.externalSystem")}{" "}
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap">
          {t("filters.lastActive")}{" "}
          <span className="material-symbols-outlined text-sm">
            calendar_month
          </span>
        </button>
      </div>

      <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t("table.customerName")}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t("table.emailAddress")}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t("table.smoucherId")}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t("table.externalSystemId")}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  {t("table.loyaltyTier")}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  {t("table.action")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    <span className="material-symbols-outlined animate-spin text-2xl">
                      progress_activity
                    </span>
                  </td>
                </tr>
              ) : CUSTOMERS_DATA.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No customers found.
                  </td>
                </tr>
              ) : (
                CUSTOMERS_DATA.map((customer, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-8 rounded-full flex items-center justify-center font-bold text-xs ${customer.bg}`}
                        >
                          {customer.initials}
                        </div>
                        <span className="text-sm font-semibold">
                          {customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {customer.smId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {customer.extId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Badge variant={customer.tierVariant as any}>
                          {customer.tier}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">
                          edit_square
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <Pagination
            start={1}
            end={4}
            total={2450}
            itemName="results"
            className="mt-0"
          />
        </div>
      </div>

      {pageData && pageData.totalPages > 1 && (
        <Pagination
          currentPage={pageData.number}
          totalPages={pageData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

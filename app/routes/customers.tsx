import type { Route } from "./+types/customers";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";
import { useCustomers, useCustomerUsages } from "../features/customers/hooks";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { useState } from "react";
import { format } from "date-fns";

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
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);

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

  const { data: usageData, isLoading: isUsageLoading } = useCustomerUsages(
    selectedCustomerId || 0,
    0,
    20
  );

  const openUsageModal = (id: number) => {
    setSelectedCustomerId(id);
    setIsUsageModalOpen(true);
  };

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
      id: c.id,
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
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openUsageModal(customer.id)}
                          className="text-slate-400 hover:text-primary transition-colors"
                          title="View Usage History"
                        >
                          <span className="material-symbols-outlined text-lg">
                            history
                          </span>
                        </button>
                        <button className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">
                            edit_square
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          {!isLoading && pageData && (
            <Pagination
              start={(pageData.number * pageData.size) + 1}
              end={Math.min((pageData.number * pageData.size) + pageData.size, pageData.totalElements)}
              total={pageData.totalElements}
              itemName="customers"
              className="mt-0"
            />
          )}
        </div>
      </div>

      {isUsageModalOpen && selectedCustomerId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                Voucher Usage History
              </h3>
              <button onClick={() => setIsUsageModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-0">
              {isUsageLoading ? (
                <div className="flex h-48 items-center justify-center">
                  <span className="material-symbols-outlined animate-spin text-3xl text-slate-400">progress_activity</span>
                </div>
              ) : !usageData?.content.length ? (
                <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-2">
                  <span className="material-symbols-outlined text-4xl opacity-20">receipt_long</span>
                  <p>No usage records found for this customer.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10 shadow-sm shadow-slate-100 dark:shadow-slate-800">
                    <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                      <th className="px-6 py-3">Voucher</th>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3 text-right">Discount</th>
                      <th className="px-6 py-3 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {usageData.content.map((usage: any) => (
                      <tr key={usage.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs font-bold text-primary">{usage.voucherCode}</span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400 font-medium">{usage.externalOrderId}</td>
                        <td className="px-6 py-4 text-xs text-right font-black text-slate-900 dark:text-slate-100">${usage.discountAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-[11px] text-right text-slate-500">{format(new Date(usage.usedAt), "MMM dd, HH:mm")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 text-right">
              <button
                onClick={() => setIsUsageModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

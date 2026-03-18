import type { Route } from "./+types/distribution";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { Pagination } from "../components/ui/Pagination";
import { useDistributions, useCreateDistribution } from "../features/distributions/hooks";
import { useVouchers } from "../features/vouchers/hooks";
import { useCustomers } from "../features/customers/hooks";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { useState } from "react";
import toast from "react-hot-toast";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher | Distribution Center" },
    {
      name: "description",
      content:
        "Manage and monitor the real-time delivery status of your digital vouchers.",
    },
  ];
}

export default function Distribution() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState<number | "">("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | "">("");
  const [selectedChannel, setSelectedChannel] = useState("EMAIL");

  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(10),
    status: parseAsString.withDefault(""),
  });

  const { data: pageData, isLoading } = useDistributions({
    page: searchParams.page,
    size: searchParams.size,
    status: searchParams.status,
  });

  const { data: vouchersData } = useVouchers(0, 100, "", "ACTIVE");
  const { data: customersData } = useCustomers(0, 100);
  const { mutate: createDist, isPending: isCreating } = useCreateDistribution();

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
  };

  const handleCreateDistribution = () => {
    if (!selectedVoucherId || !selectedCustomerId) {
      toast.error("Please select both a voucher and a customer");
      return;
    }

    createDist(
      {
        voucherId: Number(selectedVoucherId),
        customerId: Number(selectedCustomerId),
        channel: selectedChannel,
      },
      {
        onSuccess: () => {
          toast.success("Distribution task created");
          setIsModalOpen(false);
          setSelectedVoucherId("");
          setSelectedCustomerId("");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={t("distribution.title")}
        description={t("distribution.description")}
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <span className="material-symbols-outlined text-[18px]">
                file_download
              </span>{" "}
              {t("table.exportCsv")}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 hover:translate-y-[-1px] transition-all">
              <span className="material-symbols-outlined text-[18px]">add</span>{" "}
              {t("distribution.newDistribution")}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-sm font-medium">
              Total Sent
            </span>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              12,840
            </span>
            <span className="text-xs font-bold text-green-500">+12.5%</span>
          </div>
          <p className="text-xs text-slate-400">{t("metrics.totalEmailSms")}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-sm font-medium">
              {t("metrics.pending")}
            </span>
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">
                schedule
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              142
            </span>
            <span className="text-xs font-bold text-amber-500">In Queue</span>
          </div>
          <p className="text-xs text-slate-400">Messages waiting in dispatch</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-sm font-medium">
              {t("metrics.failed")}
            </span>
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">
                error
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              24
            </span>
            <span className="text-xs font-bold text-red-500">0.18% Rate</span>
          </div>
          <p className="text-xs text-slate-400">
            {t("distribution.invalidAddresses")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-8">
            <button className="pb-4 border-b-2 border-primary text-primary text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                list
              </span>{" "}
              All Logs
            </button>
            <button className="pb-4 border-b-2 border-transparent text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">
                mail
              </span>{" "}
              Email
            </button>
            <button className="pb-4 border-b-2 border-transparent text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">sms</span>{" "}
              SMS
            </button>
          </div>
          <div className="flex gap-2 pb-2">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
              <span className="material-symbols-outlined">calendar_today</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                  {t("table.customer")}
                </th>
                <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                  {t("table.channel")}
                </th>
                <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                  {t("table.voucherLink")}
                </th>
                <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                  {t("table.sentDate")}
                </th>
                <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                  {t("table.status")}
                </th>
                <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 text-right">
                  {t("table.action")}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
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
              ) : !pageData?.content?.length ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No distributions found.
                  </td>
                </tr>
              ) : (
                pageData.content.map((dist) => (
                  <tr
                    key={dist.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">
                          {dist.customerName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {dist.customerName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">
                          {dist.channel === "EMAIL"
                            ? "mail"
                            : dist.channel === "SMS"
                              ? "sms"
                              : "send"}
                        </span>
                        <span className="capitalize">
                          {dist.channel.toLowerCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-primary text-xs font-medium">
                        {dist.voucherCode}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(dist.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {dist.status === "SENT" || dist.status === "DELIVERED" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          <span className="size-1.5 rounded-full bg-green-500"></span>{" "}
                          {dist.status}
                        </span>
                      ) : dist.status === "FAILED" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                          <span className="size-1.5 rounded-full bg-red-500"></span>{" "}
                          {dist.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                          <span className="size-1.5 rounded-full bg-amber-500 animate-pulse"></span>{" "}
                          {dist.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">
                          more_horiz
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pageData && pageData.totalPages > 1 && (
        <Pagination
          currentPage={pageData.number}
          totalPages={pageData.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* New Distribution Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Distribution Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select Voucher</label>
                <select
                  value={selectedVoucherId}
                  onChange={(e) => setSelectedVoucherId(Number(e.target.value))}
                  className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="">-- Choose Voucher --</option>
                  {vouchersData?.content.map((v) => (
                    <option key={v.id} value={v.id}>{v.code} ({v.discountValue}{v.discountType === 'PERCENTAGE' ? '%' : '$'})</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select Customer</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(Number(e.target.value))}
                  className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="">-- Choose Customer --</option>
                  {customersData?.content.map((c) => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.email || c.phone})</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Channel</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="channel"
                      value="EMAIL"
                      checked={selectedChannel === "EMAIL"}
                      onChange={(e) => setSelectedChannel(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="channel"
                      value="SMS"
                      checked={selectedChannel === "SMS"}
                      onChange={(e) => setSelectedChannel(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm">SMS</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDistribution}
                disabled={isCreating}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
              >
                {isCreating ? "Processing..." : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

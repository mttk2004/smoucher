import type { Route } from "./+types/distribution";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { Pagination } from "../components/ui/Pagination";
import { useDistributions } from "../features/distributions/hooks";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

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

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
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
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 hover:translate-y-[-1px] transition-all">
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
    </div>
  );
}

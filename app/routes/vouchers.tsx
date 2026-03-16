import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";
import type { Route } from "./+types/vouchers";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { useVouchers, usePauseVoucher, useResumeVoucher, useDeleteVoucher, useGenerateVoucherCodes } from "../hooks/useVouchers";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import type { VoucherResponse } from "../types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Voucher Inventory" },
    {
      name: "description",
      content: "Manage, track, and export your unique voucher issuance data.",
    },
  ];
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "PAUSED":
      return "warning";
    case "EXPIRED":
    case "INACTIVE":
    case "FULLY_USED":
      return "error";
    case "SCHEDULED":
      return "info";
    default:
      return "default";
  }
};

export default function Vouchers() {
  const { t } = useTranslation();
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedVoucherForGenerate, setSelectedVoucherForGenerate] = useState<VoucherResponse | null>(null);
  const [quantityToGenerate, setQuantityToGenerate] = useState(1);

  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
    campaignId: parseAsString.withDefault(""),
  });

  const { data: pageData, isLoading, error } = useVouchers(
    searchParams.page,
    searchParams.size,
    searchParams.search,
    searchParams.status,
    searchParams.campaignId
  );

  const { mutate: pauseVoucher, isPending: isPausing } = usePauseVoucher();
  const { mutate: resumeVoucher, isPending: isResuming } = useResumeVoucher();
  const { mutate: deleteVoucher, isPending: isDeleting } = useDeleteVoucher();
  const { mutate: generateCodes, isPending: isGenerating } = useGenerateVoucherCodes();

  const handlePause = (id: number) => {
    pauseVoucher(id, {
      onSuccess: () => toast.success("Voucher paused successfully"),
      onError: () => toast.error("Failed to pause voucher"),
    });
  };

  const handleResume = (id: number) => {
    resumeVoucher(id, {
      onSuccess: () => toast.success("Voucher resumed successfully"),
      onError: () => toast.error("Failed to resume voucher"),
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this voucher?")) {
      deleteVoucher(id, {
        onSuccess: () => toast.success("Voucher deleted successfully"),
        onError: () => toast.error("Failed to delete voucher. It might have usages associated."),
      });
    }
  };

  const openGenerateModal = (voucher: VoucherResponse) => {
    setSelectedVoucherForGenerate(voucher);
    setQuantityToGenerate(1);
    setIsGenerateModalOpen(true);
  };

  const closeGenerateModal = () => {
    setIsGenerateModalOpen(false);
    setSelectedVoucherForGenerate(null);
  };

  const handleGenerateCodes = () => {
    if (!selectedVoucherForGenerate) return;

    generateCodes(
      { id: selectedVoucherForGenerate.id, request: { quantity: quantityToGenerate } },
      {
        onSuccess: (data) => {
          toast.success(`Successfully generated ${data.generated} codes.`);
          closeGenerateModal();
        },
        onError: () => {
          toast.error("Failed to generate codes.");
        }
      }
    );
  };

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
              placeholder="Search by code..."
              type="text"
              value={searchParams.search}
              onChange={(e) => setSearchParams({ search: e.target.value, page: 0 })}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSearchParams({ status: "", page: 0 })}
              className={`px-4 py-2 rounded-lg text-xs font-semibold shadow-sm ${searchParams.status === "" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
              {t("filters.allVouchers")}
            </button>
            <button
              onClick={() => setSearchParams({ status: "ACTIVE", page: 0 })}
              className={`px-4 py-2 rounded-lg text-xs font-semibold shadow-sm ${searchParams.status === "ACTIVE" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
              Active
            </button>
            <button
              onClick={() => setSearchParams({ status: "PAUSED", page: 0 })}
              className={`px-4 py-2 rounded-lg text-xs font-semibold shadow-sm ${searchParams.status === "PAUSED" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
              Paused
            </button>
            <button
              onClick={() => setSearchParams({ status: "EXPIRED", page: 0 })}
              className={`px-4 py-2 rounded-lg text-xs font-semibold shadow-sm ${searchParams.status === "EXPIRED" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
              {t("filters.expired")}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm min-h-[400px]">
        {isLoading ? (
           <div className="flex h-64 items-center justify-center">
             <span className="material-symbols-outlined animate-spin text-4xl text-slate-400">progress_activity</span>
           </div>
        ) : error ? (
           <div className="flex h-64 items-center justify-center text-red-500">
             <p>Error loading vouchers. Please try again.</p>
           </div>
        ) : (
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.voucherCode")}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.status")}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Discount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.campaign")}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.expiryDate")}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">{t("table.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {pageData?.content.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No vouchers found.
                    </td>
                  </tr>
                ) : (
                  pageData?.content.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-semibold text-primary">
                        {voucher.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(voucher.status) as any}>
                        {voucher.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {voucher.discountType === "PERCENTAGE" ? `${voucher.discountValue}%` : `$${voucher.discountValue}`}
                        </span>
                        {voucher.maxUsageTotal > 0 && (
                          <span className="text-[10px] text-slate-500">Used: {voucher.currentUsageCount}/{voucher.maxUsageTotal}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {voucher.campaignName || "General"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {format(new Date(voucher.validUntil), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right relative group">
                      <button className="text-slate-400 hover:text-primary transition-colors focus:outline-none">
                        <span className="material-symbols-outlined text-xl">
                          more_vert
                        </span>
                      </button>

                      {/* Actions Dropdown */}
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 w-40 py-1">
                        {voucher.status === "PAUSED" ? (
                           <button
                             onClick={() => handleResume(voucher.id)}
                             disabled={isResuming}
                             className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 text-green-600 flex items-center gap-2"
                           >
                             <span className="material-symbols-outlined text-sm">play_arrow</span> Resume
                           </button>
                        ) : voucher.status === "ACTIVE" ? (
                           <button
                             onClick={() => handlePause(voucher.id)}
                             disabled={isPausing}
                             className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 text-amber-600 flex items-center gap-2"
                           >
                             <span className="material-symbols-outlined text-sm">pause</span> Pause
                           </button>
                        ) : null}

                        <button
                          onClick={() => openGenerateModal(voucher)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-indigo-600 flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">add_box</span> Generate Codes
                        </button>

                        <button
                          onClick={() => handleDelete(voucher.id)}
                          disabled={isDeleting}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 text-red-600 flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && pageData && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <Pagination
              start={pageData.pageable.offset + 1}
              end={Math.min(pageData.pageable.offset + pageData.size, pageData.totalElements)}
              total={pageData.totalElements}
              itemName="vouchers"
              className="mt-0"
            />
          </div>
        )}
      </div>

      {/* Generate Codes Modal */}
      {isGenerateModalOpen && selectedVoucherForGenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Generate Unique Codes</h3>
              <button onClick={closeGenerateModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-sm text-slate-500 mb-6">
              Generate unique codes based on voucher <strong className="text-slate-800 dark:text-slate-200 font-mono">{selectedVoucherForGenerate.code}</strong>.
              These codes will inherit all rules from the parent voucher.
            </p>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="5000"
                  value={quantityToGenerate}
                  onChange={(e) => setQuantityToGenerate(parseInt(e.target.value) || 1)}
                  className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                <p className="text-[10px] text-slate-400">Max 5000 per request</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3 justify-end">
              <button
                onClick={closeGenerateModal}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCodes}
                disabled={isGenerating || quantityToGenerate < 1 || quantityToGenerate > 5000}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "Generate Codes"}
              </button>
            </div>
          </div>
        </div>
      )}

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

import type { Route } from "./+types/campaigns";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { PageHeader } from "../components/PageHeader";
import { Pagination } from "../components/ui/Pagination";
import { Badge, type BadgeVariant } from "../components/ui/Badge";
import { useCampaigns, useUpdateCampaignStatus } from "../features/campaigns/hooks";
import { useState } from "react";
import toast from "react-hot-toast";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher Admin - Campaign List" },
    { name: "description", content: "Manage marketing campaigns" },
  ];
}

const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "DRAFT":
      return "default";
    case "PAUSED":
      return "warning";
    case "ENDED":
      return "info";
    default:
      return "default";
  }
};

export default function Campaigns() {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });

  const { data: pageData, isLoading, error } = useCampaigns(
    searchParams.page,
    searchParams.size,
    searchParams.search,
    searchParams.status
  );

  const { mutate: updateStatus, isPending: isUpdating } = useUpdateCampaignStatus();

  const handleStatusChange = (id: number, newStatus: "DRAFT" | "ACTIVE" | "PAUSED" | "ENDED") => {
    updateStatus(
      { id, status: newStatus },
      {
        onSuccess: () => {
          toast.success("Campaign status updated successfully");
        },
        onError: () => {
        },
      }
    );
  };

  const handleFilterClick = (status: string) => {
    setSearchParams({ status, page: 0 }); // Reset to first page when filtering
  };

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        <p>Error loading campaigns. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title={t("campaigns.title")}
        description={t("campaigns.description")}
      />

      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          onClick={() => handleFilterClick("")}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${searchParams.status === "" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-700"}`}
        >
          {t("filters.allCampaigns") || "All Campaigns"}
        </button>
        <button
          onClick={() => handleFilterClick("ACTIVE")}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${searchParams.status === "ACTIVE" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-700"}`}
        >
          {t("filters.active") || "Active"}
        </button>
        <button
          onClick={() => handleFilterClick("DRAFT")}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${searchParams.status === "DRAFT" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-700"}`}
        >
          {t("filters.drafts") || "Drafts"}
        </button>
        <button
          onClick={() => handleFilterClick("PAUSED")}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${searchParams.status === "PAUSED" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-700"}`}
        >
          {t("filters.paused") || "Paused"}
        </button>
        <button
          onClick={() => handleFilterClick("ENDED")}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${searchParams.status === "ENDED" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-700"}`}
        >
          {t("filters.ended") || "Ended"}
        </button>
      </div>

      <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden @container">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <span className="material-symbols-outlined animate-spin text-4xl text-slate-400">progress_activity</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[35%]">{t("table.campaignDetails") || "Campaign Details"}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t("table.status") || "Status"}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t("table.duration") || "Duration"}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[20%]">{t("table.budgetUtilization") || "Budget Utilization"}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">{t("table.actions") || "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {pageData?.content.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                pageData?.content.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400`}
                        >
                          <span className="material-symbols-outlined">
                            shopping_bag
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-slate-500">{campaign.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant={getStatusVariant(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm">
                        <p className="text-slate-900 dark:text-slate-100 font-medium">
                          {format(new Date(campaign.startDate), "MMM dd, yyyy")}
                        </p>
                        <p className="text-slate-500 text-xs">to {format(new Date(campaign.endDate), "MMM dd, yyyy")}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-medium">
                          <span>
                            $0 / ${campaign.budget.toLocaleString()}
                          </span>
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
                    <td className="px-6 py-5 text-right relative group">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 w-32 py-1">
                        <button
                          onClick={() => handleStatusChange(campaign.id, "ACTIVE")}
                          disabled={campaign.status === "ACTIVE" || isUpdating}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-green-600"
                        >
                          Set Active
                        </button>
                        <button
                          onClick={() => handleStatusChange(campaign.id, "PAUSED")}
                          disabled={campaign.status === "PAUSED" || isUpdating}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-amber-600"
                        >
                          Pause
                        </button>
                        <button
                          onClick={() => handleStatusChange(campaign.id, "ENDED")}
                          disabled={campaign.status === "ENDED" || isUpdating}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
                        >
                          End Campaign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {!isLoading && pageData && (
        <Pagination
          start={pageData.pageable.offset + 1}
          end={Math.min(pageData.pageable.offset + pageData.size, pageData.totalElements)}
          total={pageData.totalElements}
          itemName="campaigns"
        />
      )}
    </div>
  );
}

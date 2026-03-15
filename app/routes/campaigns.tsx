import type { Route } from "./+types/campaigns";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { Pagination } from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher Admin - Campaign List" },
    { name: "description", content: "Manage marketing campaigns" },
  ];
}

const CAMPAIGNS_DATA = [
  {
    icon: "shopping_bag",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    name: "Summer Sale 2024",
    type: "E-commerce • 15.2k target audience",
    status: "ACTIVE",
    statusVariant: "success",
    startDate: "Jun 01, 2024",
    endDate: "to Aug 31, 2024",
    spent: "$4,800",
    budget: "$6,500",
    progress: "74%",
  },
  {
    icon: "flash_on",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    name: "Flash Discount",
    type: "Social Media • 5k target audience",
    status: "DRAFT",
    statusVariant: "default",
    startDate: "Sep 15, 2024",
    endDate: "to Sep 16, 2024",
    spent: "$0",
    budget: "$1,200",
    progress: "0%",
  },
  {
    icon: "celebration",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    name: "Holiday Special",
    type: "Cross-channel • 50k target audience",
    status: "ENDED",
    statusVariant: "info",
    startDate: "Dec 01, 2023",
    endDate: "to Dec 25, 2023",
    spent: "$25,000",
    budget: "$25,000",
    progress: "100%",
  },
  {
    icon: "hot_tub",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    name: "Weekend Warmup",
    type: "Email • 8.4k target audience",
    status: "PAUSED",
    statusVariant: "warning",
    startDate: "Jul 05, 2024",
    endDate: "to Jul 07, 2024",
    spent: "$440",
    budget: "$2,000",
    progress: "22%",
  },
];

export default function Campaigns() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title={t("campaigns.title")}
        description={t("campaigns.description")}
      />

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
            {CAMPAIGNS_DATA.map((campaign, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-10 rounded-lg ${campaign.iconBg} flex items-center justify-center ${campaign.iconColor}`}
                    >
                      <span className="material-symbols-outlined">
                        {campaign.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {campaign.name}
                      </p>
                      <p className="text-xs text-slate-500">{campaign.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <Badge variant={campaign.statusVariant as any}>
                    {campaign.status}
                  </Badge>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm">
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      {campaign.startDate}
                    </p>
                    <p className="text-slate-500 text-xs">{campaign.endDate}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>
                        {campaign.spent} / {campaign.budget}
                      </span>
                      <span>{campaign.progress}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: campaign.progress }}
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
            ))}
          </tbody>
        </table>
      </div>

      <Pagination start={1} end={4} total={12} itemName="campaigns" />
    </div>
  );
}

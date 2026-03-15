import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher Admin Dashboard" },
    { name: "description", content: "Smart Voucher Management System" },
  ];
}

import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/dashboard/StatCard";

const REVENUE_DATA = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

const USAGE_DATA = [
  { name: "Wk 1", value: 40 },
  { name: "Wk 2", value: 85 },
  { name: "Wk 3", value: 55 },
  { name: "Wk 4", value: 70 },
];

export default function Home() {
  const { t } = useTranslation();

  const STATS = [
    {
      title: t("dashboard.activeCampaigns"),
      icon: "campaign",
      value: "12",
      trend: "+2.5%",
      trendDirection: "up" as const,
      description: t("dashboard.vsLastMonth"),
    },
    {
      title: t("dashboard.vouchersDistributed"),
      icon: "confirmation_number",
      value: "45,280",
      trend: "-5%",
      trendDirection: "down" as const,
      description: t("dashboard.demandPeak"),
    },
    {
      title: t("dashboard.usageRate"),
      icon: "bolt",
      value: "68.5%",
      trend: "+12%",
      trendDirection: "up" as const,
      progress: 68.5,
    },
    {
      title: t("dashboard.budgetVsActual"),
      icon: "account_balance_wallet",
      value: "72%",
      trend: "+8%",
      trendDirection: "up" as const,
      description: `$34,500 ${t("dashboard.remainingBudget")}`,
    },
  ];

  const ACTIVE_CAMPAIGNS = [
    {
      id: "SF",
      initials: "SF",
      colorClass: "bg-indigo-100 text-indigo-600",
      name: "Summer Foodie Fest",
      category: "Food & Beverage",
      status: "Active",
      statusColorClass:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      statusDotClass: "bg-green-600",
      usageRate: 82,
      usageBarColor: "bg-primary",
      revenue: "$42,300",
    },
    {
      id: "BS",
      initials: "BS",
      colorClass: "bg-pink-100 text-pink-600",
      name: "Back to School Promo",
      category: "Retail",
      status: "Pending",
      statusColorClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      statusDotClass: "bg-amber-600",
      usageRate: 0,
      usageBarColor: "bg-slate-300 dark:bg-slate-600",
      revenue: "$0",
    },
    {
      id: "WE",
      initials: "WE",
      colorClass: "bg-emerald-100 text-emerald-600",
      name: "Weekend Escape Vouchers",
      category: "Travel",
      status: "Active",
      statusColorClass:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      statusDotClass: "bg-green-600",
      usageRate: 45,
      usageBarColor: "bg-primary",
      revenue: "$18,900",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={t("dashboard.title")}
        description={t("dashboard.description")}
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <span className="material-symbols-outlined text-lg">
                calendar_today
              </span>
              {t("dashboard.last30Days")}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <span className="material-symbols-outlined text-lg">
                download
              </span>
              {t("dashboard.exportReport")}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("dashboard.revenueOverTime")}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  $124,500
                </span>
                <span className="text-sm font-bold text-green-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  14.2%
                </span>
              </div>
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-bold rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm">
                30d
              </button>
              <button className="px-3 py-1 text-xs font-medium rounded text-slate-500 hover:text-slate-700">
                90d
              </button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_DATA}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3211d4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3211d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3211d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#chartGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("dashboard.usageTrends")}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  8,432
                </span>
                <span className="text-sm font-medium text-slate-500">
                  {t("dashboard.redemptionsThisWeek")}
                </span>
                <span className="text-sm font-bold text-green-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  5.7%
                </span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={USAGE_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#3211d4"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 bg-primary/5 rounded-xl flex items-center gap-4">
            <div className="bg-primary/20 text-primary p-2 rounded-lg">
              <span className="material-symbols-outlined text-lg">
                lightbulb
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
              <strong className="text-primary">
                {t("dashboard.insight")}:
              </strong>{" "}
              {t("dashboard.insightText")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t("dashboard.activeCampaignsTable")}
          </h3>
          <button className="text-sm font-semibold text-primary hover:underline">
            {t("dashboard.viewAll")}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t("dashboard.campaignName")}
                </th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t("dashboard.status")}
                </th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t("dashboard.usageRate")}
                </th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t("dashboard.revenueGenerated")}
                </th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  {t("dashboard.action")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ACTIVE_CAMPAIGNS.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded flex items-center justify-center font-bold ${campaign.colorClass}`}
                      >
                        {campaign.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {campaign.name}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                          {campaign.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${campaign.statusColorClass}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${campaign.statusDotClass}`}
                      ></span>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <div
                          className={`h-full rounded-full ${campaign.usageBarColor}`}
                          style={{ width: `${campaign.usageRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {campaign.usageRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {campaign.revenue}
                    </p>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

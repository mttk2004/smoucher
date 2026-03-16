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
import { format, subDays } from "date-fns";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/dashboard/StatCard";
import { useDashboardOverview, useUsageTrend } from "../hooks/useDashboard";
import { useState } from "react";

const getInitials = (name: string) => {
  return name.substring(0, 2).toUpperCase();
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return {
        colorClass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        dotClass: "bg-green-600",
      };
    case "PAUSED":
      return {
        colorClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        dotClass: "bg-amber-600",
      };
    case "EXPIRED":
    case "INACTIVE":
      return {
        colorClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        dotClass: "bg-red-600",
      };
    case "SCHEDULED":
      return {
        colorClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        dotClass: "bg-blue-600",
      };
    default:
      return {
        colorClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
        dotClass: "bg-slate-500",
      };
  }
};

export default function Home() {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState(30);

  const today = new Date();
  const fromDate = subDays(today, dateRange).toISOString();
  const toDate = today.toISOString();

  const { data: overview, isLoading: isOverviewLoading, error: overviewError } = useDashboardOverview();
  const { data: usageTrend, isLoading: isUsageTrendLoading, error: usageTrendError } = useUsageTrend(fromDate, toDate, "DAY");

  if (isOverviewLoading || isUsageTrendLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
      </div>
    );
  }

  if (overviewError || usageTrendError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        <p>Error loading dashboard data. Please try again.</p>
      </div>
    );
  }

  const STATS = [
    {
      title: t("dashboard.totalVouchers") || "Total Vouchers",
      icon: "confirmation_number",
      value: overview?.totalVouchers.toLocaleString() || "0",
      trend: "",
      trendDirection: "up" as const,
      description: t("dashboard.totalCreatedVouchers") || "Total created vouchers",
    },
    {
      title: t("dashboard.activeVouchers") || "Active Vouchers",
      icon: "campaign",
      value: overview?.activeVouchers.toLocaleString() || "0",
      trend: "",
      trendDirection: "up" as const,
      description: t("dashboard.currentlyActiveVouchers") || "Currently active vouchers",
    },
    {
      title: t("dashboard.totalUsages") || "Total Usages",
      icon: "bolt",
      value: overview?.totalUsages.toLocaleString() || "0",
      trend: "",
      trendDirection: "up" as const,
      description: t("dashboard.totalVoucherRedemptions") || "Total voucher redemptions",
    },
    {
      title: t("dashboard.discountAmount") || "Discount Amount",
      icon: "account_balance_wallet",
      value: `$${(overview?.totalDiscountAmount || 0).toLocaleString()}`,
      trend: "",
      trendDirection: "up" as const,
      description: `${t("dashboard.conversionRate") || "Conversion Rate"}: ${((overview?.conversionRate || 0) * 100).toFixed(1)}%`,
    },
  ];

  const ACTIVE_CAMPAIGNS = (overview?.topVouchers || []).map((voucher, index) => {
    const { colorClass, dotClass } = getStatusStyles(voucher.status);
    const usageRate = voucher.maxUsageTotal > 0 ? Math.round((voucher.currentUsageCount / voucher.maxUsageTotal) * 100) : 0;

    // Assign random colors for initials background for visual variety
    const bgColors = ["bg-indigo-100 text-indigo-600", "bg-pink-100 text-pink-600", "bg-emerald-100 text-emerald-600", "bg-amber-100 text-amber-600"];
    const initialsColor = bgColors[index % bgColors.length];

    return {
      id: voucher.id,
      initials: getInitials(voucher.code),
      colorClass: initialsColor,
      name: voucher.code,
      category: voucher.campaignName || "General",
      status: voucher.status,
      statusColorClass: colorClass,
      statusDotClass: dotClass,
      usageRate: usageRate,
      usageBarColor: "bg-primary",
      revenue: `$${(voucher.discountValue || 0).toLocaleString()}`,
    };
  });

  const REVENUE_DATA = overview?.revenueByDay
    ? Object.entries(overview.revenueByDay).map(([date, value]) => ({
        name: format(new Date(date), "MMM dd"),
        value,
      }))
    : [];

  const USAGE_DATA = (usageTrend || []).map((trend) => ({
    name: format(new Date(trend.period), "MMM dd"),
    value: trend.usageCount,
  }));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Smart Voucher Management System Overview"
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <span className="material-symbols-outlined text-lg">
                calendar_today
              </span>
              Last {dateRange} Days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <span className="material-symbols-outlined text-lg">
                download
              </span>
              Export Report
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
                Revenue Over Time
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  ${(overview?.totalDiscountAmount || 0).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
              <button
                className={`px-3 py-1 text-xs font-bold rounded shadow-sm ${
                  dateRange === 30
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setDateRange(30)}
              >
                30d
              </button>
              <button
                className={`px-3 py-1 text-xs font-medium rounded ${
                  dateRange === 90
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setDateRange(90)}
              >
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
                Usage Trends
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {overview?.totalUsages.toLocaleString() || "0"}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  Total Redemptions
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
                Insight:
              </strong>{" "}
              Usage has been increasing in the last few days, consider increasing voucher limits.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Top Performing Vouchers
          </h3>
          <button className="text-sm font-semibold text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Voucher Code
                </th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Usage Rate
                </th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Discount Amount
                </th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Action
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

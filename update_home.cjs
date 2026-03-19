const fs = require('fs');

let homeTsx = fs.readFileSync('app/routes/home.tsx', 'utf8');

homeTsx = homeTsx.replace(
  /const STATS = \[([\s\S]*?)\];/,
  `const STATS = [
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
      value: \`$\${(overview?.totalDiscountAmount || 0).toLocaleString()}\`,
      trend: overview?.savingsGrowthRate !== undefined ? \`\${overview.savingsGrowthRate > 0 ? '+' : ''}\${overview.savingsGrowthRate.toFixed(1)}%\` : "",
      trendDirection: (overview?.savingsGrowthRate || 0) >= 0 ? "up" as const : "down" as const,
      description: \`\${t("dashboard.conversionRate") || "Conversion Rate"}: \${((overview?.conversionRate || 0) * 100).toFixed(1)}%\`,
    },
  ];`
);

fs.writeFileSync('app/routes/home.tsx', homeTsx);

import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Public (No auth required)
  route("login", "routes/login.tsx"),

  layout("layouts/dashboard.tsx", [
    // Both ADMIN and STAFF (Reporting, Vouchers, Distribution, Customers)
    index("routes/home.tsx"),
    route("vouchers", "routes/vouchers.tsx"),
    route("vouchers/create", "routes/vouchers.create.tsx"),
    route("history", "routes/history.tsx"),
    route("distribution", "routes/distribution.tsx"),
    route("customers", "routes/customers.tsx"),

    // ADMIN only (Campaigns, API Keys, Logs, Users Management)
    route("campaigns", "routes/campaigns.tsx"),
    route("campaigns/create", "routes/campaigns.create.tsx"),
    layout("layouts/settings.tsx", [
      route("settings/api-keys", "routes/settings.api-keys.tsx"),
      route("settings/api-logs", "routes/settings.api-logs.tsx"),
      route("settings/users", "routes/settings.users.tsx"),
    ]),
  ]),
] satisfies RouteConfig;

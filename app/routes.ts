import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("campaigns", "routes/campaigns.tsx"),
  route("campaigns/create", "routes/campaigns.create.tsx"),
  route("vouchers", "routes/vouchers.tsx"),
  route("vouchers/create", "routes/vouchers.create.tsx"),
  route("history", "routes/history.tsx"),
  route("distribution", "routes/distribution.tsx"),
  route("customers", "routes/customers.tsx"),
  route("settings/api-keys", "routes/settings.api-keys.tsx"),
  route("settings/api-logs", "routes/settings.api-logs.tsx"),
  route("settings/users", "routes/settings.users.tsx"),
] satisfies RouteConfig;

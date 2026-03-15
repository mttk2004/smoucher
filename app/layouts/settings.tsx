import { Link, Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";

export default function SettingsLayout() {
  const location = useLocation();
  const { t } = useTranslation();

  const tabs = [
    {
      name: t("settings.apiKeys"),
      path: "/settings/api-keys",
      icon: "key",
    },
    {
      name: t("settings.apiLogs"),
      path: "/settings/api-logs",
      icon: "list_alt",
    },
    {
      name: t("settings.users"),
      path: "/settings/users",
      icon: "group",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={t("settings.title")}
        description={t("settings.description")}
      />

      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="-mb-px flex gap-8">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {tab.icon}
                </span>
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <Outlet />
    </div>
  );
}

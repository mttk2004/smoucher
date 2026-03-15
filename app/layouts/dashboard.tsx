import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export default function DashboardLayout() {
  const { t } = useTranslation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">
              confirmation_number
            </span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white uppercase">
              Smoucher
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
              {t("common.adminPanel")}
            </p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <NavLink
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`
            }
            to="/"
          >
            <span className="material-symbols-outlined">dashboard</span>
            {t("nav.dashboard")}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`
            }
            to="/campaigns"
          >
            <span className="material-symbols-outlined">campaign</span>
            {t("nav.campaigns")}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`
            }
            to="/vouchers"
          >
            <span className="material-symbols-outlined">payments</span>
            {t("nav.vouchers")}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`
            }
            to="/history"
          >
            <span className="material-symbols-outlined">bar_chart</span>
            {t("nav.analytics")}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`
            }
            to="/customers"
          >
            <span className="material-symbols-outlined">group</span>
            {t("nav.customers")}
          </NavLink>
          <div className="pt-4 pb-2">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {t("nav.system")}
            </p>
          </div>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${isActive || (typeof window !== "undefined" && window.location.pathname.startsWith("/settings")) ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"}`
            }
            to="/settings/api-keys"
          >
            <span className="material-symbols-outlined">settings</span>
            {t("nav.settings")}
          </NavLink>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
          <LanguageSwitcher />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 shrink-0 flex items-center justify-between px-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-primary/20 placeholder:text-slate-500"
                placeholder={t("common.search")}
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/campaigns/create"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/40 transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-lg">
                add_circle
              </span>
              {t("common.createCampaign")}
            </Link>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800"></div>

            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 pl-2 text-left focus:outline-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                    Alex Rivera
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">
                    {t("common.marketingDirector")}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border-2 border-transparent hover:border-primary dark:hover:border-primary transition-colors cursor-pointer">
                  <img
                    alt="Profile avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzhtqww5x88k0U9bciP2sm7Xa7rCKDvDk70aFgismgBLTFtdVS7J_ATnuihDwFSZwQUMBHlxxpKY8_qVPcEom0RbnftoRrdtqMMLQEaVmJO5NphgkCutjUbYS82oheBJWk204qikn-c-Xvd_53l3Jaf6OUpnkakbK8pnoAofcIlCDhuiIiioz636txypCqjIqwff30pyfRKaaMRK01s6_WIueS9KLRs-Mz2NpkzPM__H6m3XB_mb4HHFrWVJdFt2QRQpe-YLQPNeg"
                  />
                </div>
              </button>

              {isProfileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1 sm:hidden">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Alex Rivera
                      </p>
                      <p className="text-xs text-slate-500">
                        {t("common.marketingDirector")}
                      </p>
                    </div>
                    <Link
                      to="/settings/users"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-base">
                        person
                      </span>
                      {t("nav.settings")}
                    </Link>
                    <Link
                      to="/login"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 text-left transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">
                        logout
                      </span>
                      {t("login.signOut", "Sign out")}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

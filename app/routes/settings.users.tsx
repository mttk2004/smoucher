import type { Route } from "./+types/settings.users";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher | User Management" },
    {
      name: "description",
      content:
        "Control access levels and manage permissions for your team members.",
    },
  ];
}

export default function Users() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-8">
            <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary flex items-center gap-2">
              All Users{" "}
              <span className="bg-primary/10 px-2 py-0.5 rounded text-xs font-semibold">
                24
              </span>
            </button>
            <button className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-2 transition-colors">
              Admins{" "}
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
                4
              </span>
            </button>
            <button className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-2 transition-colors">
              Staff{" "}
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
                20
              </span>
            </button>
          </div>
          <div className="pb-4">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              Filter
            </button>
          </div>
        </div>

        <div className="@container rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  Last Activity
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      JS
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Jordan Smith
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        jordan.s@smoucher.com
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase">
                    Admin
                  </span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Active
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  2 mins ago
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary/80 text-sm font-bold transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
                    Edit Role
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7aGV8hww9-orOpOqG_86SQS-W6oIcIM6of2UtGefRMjKEEV8cucLwMGOaKIFGcY8sQCAEHZDlxmod-HXGfZ_b8LxemRtx5E_yEYFM6bSJv2MTkhP7NPmGKIQAG52ElSiM3M2w745iMu6ZNVzSqGQmqgz_2cuY3zlEwLjzRaEZWH74yJaBn7tqUz6_nSM3SCFDlaCJlqIOwmpQ8sWAyk0iA4pKG-g0XOc-tM41dkVt3mSHqqDwoYsFBhrwpv3h20ZtqpsEn396uxc')",
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Sarah Chen
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        sarah.c@smoucher.com
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                    Staff
                  </span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Active
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  1 hour ago
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary/80 text-sm font-bold transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
                    Edit Role
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      MW
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Marcus Wright
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        m.wright@smoucher.com
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                    Staff
                  </span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Inactive
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  Yesterday
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary/80 text-sm font-bold transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
                    Edit Role
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMzPWcYbJ1ytpbeu9aIrfMitNC04tUHF1aErYvU2tH34vxfIqEm66R1G0se0e0PQg48MfPhd7Grgsn-e6ziaSMGeQKAtlZo6wT9GMmh7bG7bHMhVZdYX0hnMRlY-UXvnyoA2f1msf3n4pqiPf1lwXjHTlCPB-Vc-U1Fbj2xCfv_G7DByI53xedRUWHPWP04vQoI29iFNDI5NgTjYdt9T0Xi5UeB_N1oe6Fy4ku17wKGoUe-RElOrlKsPBuyowcEN4GTUoJYUwmvRU')",
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        David Lee
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        d.lee@smoucher.com
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase">
                    Admin
                  </span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Active
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  Just now
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary/80 text-sm font-bold transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
                    Edit Role
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                1
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                4
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                24
              </span>{" "}
              results
            </p>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                disabled
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>
              <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary to-indigo-900 text-white flex items-center justify-between shadow-lg">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">Scaling your team?</h3>
            <p className="text-white/80 text-sm max-w-md">
              Easily add new members and assign them predefined roles to keep
              your workflow secure and efficient.
            </p>
          </div>
          <button className="bg-white text-primary px-6 py-3 rounded-lg font-bold text-sm shadow-sm hover:bg-slate-100 transition-all">
            Bulk Invite Users
          </button>
        </div>
      </div>
    </>
  );
}

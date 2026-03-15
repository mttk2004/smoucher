import type { Route } from "./+types/history";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Usage History" },
    {
      name: "description",
      content: "Detailed record of all voucher redemptions.",
    },
  ];
}

export default function History() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Usage History
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Detailed record of all voucher redemptions across your branches.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Search Order ID..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  calendar_today
                </span>
                Date Range
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  storefront
                </span>
                Branch
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>
            </div>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Showing{" "}
            <span className="text-slate-900 dark:text-white">1,248</span>{" "}
            records
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  External Order ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  Branch Location
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800 text-right">
                  Discount Amount
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-primary font-semibold">
                    #ORD-9921
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Downtown Central
                    </span>
                    <span className="text-xs text-slate-500">Main St. 402</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    $15.00
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    <span className="size-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 24, 2023 14:20
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-primary font-semibold">
                    #ORD-9845
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Westside Mall
                    </span>
                    <span className="text-xs text-slate-500">
                      Terminal 3, Gate B
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    $10.00
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    <span className="size-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 23, 2023 11:15
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-primary font-semibold">
                    #ORD-9712
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Airport Terminal 2
                    </span>
                    <span className="text-xs text-slate-500">
                      International Hub
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    $25.50
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                    <span className="size-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 22, 2023 18:45
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-primary font-semibold">
                    #ORD-9650
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Downtown Central
                    </span>
                    <span className="text-xs text-slate-500">Main St. 402</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    $5.00
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    <span className="size-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 21, 2023 09:30
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-primary font-semibold">
                    #ORD-9588
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      North Plaza
                    </span>
                    <span className="text-xs text-slate-500">
                      Level 2 Food Court
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    $12.00
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    <span className="size-1.5 bg-slate-400 rounded-full mr-1.5"></span>
                    Cancelled
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 20, 2023 13:10
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500">Page 1 of 62</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg opacity-50 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Total Savings
            </h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            $12,450.80
          </p>
          <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
            <span className="material-symbols-outlined text-xs mr-1">
              trending_up
            </span>
            +14% from last month
          </p>
        </div>
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">group</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Active Users
            </h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            842
          </p>
          <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
            <span className="material-symbols-outlined text-xs mr-1">
              trending_up
            </span>
            +5.2% from last month
          </p>
        </div>
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Redemption Rate
            </h3>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            76.4%
          </p>
          <p className="text-xs text-slate-500 mt-1 flex items-center font-medium">
            Stable performance
          </p>
        </div>
      </div>
    </>
  );
}

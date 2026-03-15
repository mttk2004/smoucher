import type { Route } from "./+types/customers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher Customer Directory" },
    { name: "description", content: "Centralized view of internal Smoucher IDs and external system mappings." },
  ];
}

export default function Customers() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">hub</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">Smoucher</h1>
            <p className="text-xs text-slate-500 font-medium">Admin Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="/">
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-colors" href="/customers">
            <span className="material-symbols-outlined text-xl">group</span>
            <span className="text-sm font-semibold">Customers</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="/history">
            <span className="material-symbols-outlined text-xl">monitoring</span>
            <span className="text-sm font-medium">Reports</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
            <span className="material-symbols-outlined text-xl">settings_input_component</span>
            <span className="text-sm font-medium">Integrations</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" href="/settings/users">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDN0FOCpgqnG1YtNzgYs9KGD8mVp11IsZS7NFK1jEYvsVWo7_tCDUkC3eamxfCH2HidNaUbfuyZ5uvkn6WwAAm2lY332c_10ARxUsCe5JCwC1eHrCvRJjvD-BgTQ4RGtkmpAAE57krfJDlJYpaem82tMqWeFCeLf6taB3gSDa-paeJb0Uvwk1gnBwH9ybgcGe8X5qXbJDs1acIZDDLf_Gph0QQ7QcmoAWzdyY32hZjJyhB3EFcui9iwQBvE2Wl-jikR32DcO9JHS6M')" }}></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">Marcus Aurelius</p>
              <p className="text-[10px] text-slate-500 truncate">marcus@smoucher.io</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">more_vert</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Search customers by name, email or ID..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="size-10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="size-10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined">help</span>
            </button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              <span>New Customer</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Customer Directory</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Centralized view of internal Smoucher IDs and external system mappings.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-lg">download</span>
                Export CSV
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-lg text-xs font-semibold whitespace-nowrap">
              All Customers
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap">
              Tier: Gold <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap">
              External System <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap">
              Last Active <span className="material-symbols-outlined text-sm">calendar_month</span>
            </button>
          </div>

          <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Smoucher ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">External System ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Loyalty Tier</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">AR</div>
                        <span className="text-sm font-semibold">Alex Rivera</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">alex.r@example.com</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">SM-8821</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">EXT-9901</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Gold
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">edit_square</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">JS</div>
                        <span className="text-sm font-semibold">Jordan Smith</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">j.smith@provider.net</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">SM-4412</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">EXT-2234</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Silver
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">edit_square</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold text-xs">CC</div>
                        <span className="text-sm font-semibold">Casey Chen</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">casey.c@work.com</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">SM-1092</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">EXT-7721</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-100">
                          Bronze
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">edit_square</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">TW</div>
                        <span className="text-sm font-semibold">Taylor Wong</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">t.wong@service.io</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">SM-3398</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">EXT-5542</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Gold
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">edit_square</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Showing 1 to 4 of 2,450 results</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-xs font-semibold disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

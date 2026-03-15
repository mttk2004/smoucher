import type { Route } from "./+types/settings.api-logs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "API Logs - Smoucher Developer Portal" },
    { name: "description", content: "Real-time monitor of incoming traffic to your production endpoints." },
  ];
}

export default function ApiLogs() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-10 py-3 sticky top-0 z-50">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-primary">
              <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-2xl">api</span>
              </div>
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Smoucher</h2>
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/">Dashboard</a>
              <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors border-b-2 border-primary py-4 -mb-4" href="/settings/api-logs">API Logs</a>
              <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/settings/api-keys">API Keys</a>
              <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Webhooks</a>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <label className="hidden md:flex flex-col min-w-40 h-9 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-slate-400 flex items-center justify-center pl-3">
                  <span className="material-symbols-outlined text-sm">search</span>
                </div>
                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 px-3 text-sm" placeholder="Quick search..." type="text" />
              </div>
            </label>
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
              <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700">
                <span className="material-symbols-outlined text-xl">settings</span>
              </button>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-slate-200 dark:border-slate-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSGR_cYWQspYHMCs4dTWJRNoVhl441Z7KhMhTH_6nu0JJEKdUheYeMOj76fzcbmHUXTQMiEaMKdsTTiSmFhbqUrdtc2hZ3cKqMM6xlgjU9Gnieb51B3uSaJFe1DVt2eAhVqU0Jyr_MW3gsLv_To4TuXGQwZGjnxwFZnJWzk91DUP-BXIcwcAdWdt724-9cGrg0-ngJWJuw8KCgrrs66e6Lb6z4TFo2MHQTGe5BjiP2_bnOlfwgswzStf88bR3ylx01WSKqJY32rFE')" }}></div>
          </div>
        </header>

        <main className="flex-1 flex flex-col md:flex-row">
          <aside className="w-full md:w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-6 hidden md:block">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Core</p>
                <nav className="flex flex-col gap-1">
                  <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="/">
                    <span className="material-symbols-outlined text-lg">grid_view</span> Overview
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg" href="/settings/api-logs">
                    <span className="material-symbols-outlined text-lg">list_alt</span> API Logs
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="/settings/api-keys">
                    <span className="material-symbols-outlined text-lg">vpn_key</span> API Keys
                  </a>
                </nav>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Observability</p>
                <nav className="flex flex-col gap-1">
                  <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="/history">
                    <span className="material-symbols-outlined text-lg">analytics</span> Analytics
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="#">
                    <span className="material-symbols-outlined text-lg">webhook</span> Webhooks
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">API Request Logs</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time monitor of incoming traffic to your production endpoints.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-lg">download</span> Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-lg">refresh</span> Refresh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Requests</span>
                  <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-bold px-2 py-0.5 rounded-full">+12.5%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">1,284,592</div>
                <div className="text-[11px] text-slate-400 mt-1">Last 24 hours</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Latency</span>
                  <span className="text-rose-500 bg-rose-50 dark:bg-rose-500/10 text-[10px] font-bold px-2 py-0.5 rounded-full">-5.2%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">142ms</div>
                <div className="text-[11px] text-slate-400 mt-1">P95 latency</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Error Rate</span>
                  <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-bold px-2 py-0.5 rounded-full">Optimal</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">0.04%</div>
                <div className="text-[11px] text-slate-400 mt-1">5xx errors only</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Throughput</span>
                  <span className="material-symbols-outlined text-primary text-lg">trending_up</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">842 req/s</div>
                <div className="text-[11px] text-slate-400 mt-1">Current peak</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
                Status: <span className="font-bold text-primary">All</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
                Method: <span className="font-bold text-primary">POST, GET</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
                Endpoint: <span className="font-bold text-primary">/v1/*</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
              <button className="text-xs font-medium text-slate-500 hover:text-primary transition-colors">Clear all filters</button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Endpoint</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Latency</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="group hover:bg-primary/5 cursor-pointer transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">GET</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">/v1/users/me/profile</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">200 OK</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 text-right">48ms</td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-right">Just now</td>
                    </tr>
                    <tr className="group hover:bg-primary/5 cursor-pointer transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">POST</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">/v1/checkout/intent</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">201 Created</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 text-right">212ms</td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-right">12s ago</td>
                    </tr>
                    <tr className="group hover:bg-primary/5 cursor-pointer transition-colors bg-primary/5">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">POST</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">/v1/auth/token/refresh</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-amber-500"></div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">401 Unauthorized</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 text-right">15ms</td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-right">45s ago</td>
                    </tr>
                    <tr className="group hover:bg-primary/5 cursor-pointer transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest">DELETE</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">/v1/webhooks/whk_0912Xj</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">204 No Content</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 text-right">89ms</td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-right">2m ago</td>
                    </tr>
                    <tr className="group hover:bg-primary/5 cursor-pointer transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">GET</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">/v1/metrics/usage</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-rose-500 animate-pulse"></div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">500 Server Error</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 text-right font-bold text-rose-500">1,540ms</td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-right">3m ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">Request Preview</h3>
                    <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">ID: req_88x29j3</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-[10px] font-bold text-primary hover:bg-primary/10 rounded uppercase">Copy JSON</button>
                    <button className="px-2 py-1 text-[10px] font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded uppercase">Expand</button>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  <pre className="text-slate-800 dark:text-slate-300"><code>{`{
  "request": {
    "method": "POST",
    "url": "https://api.smoucher.com/v1/auth/token/refresh",
    "headers": {
      "user-agent": "Axios/1.6.0",
      "accept": "application/json",
      "content-type": "application/json"
    },
    "body": {
      "refresh_token": "rt_8829...021",
      "grant_type": "refresh_token"
    }
  },
  "response": {
    "status": 401,
    "body": {
      "error": "invalid_token",
      "message": "The provided refresh token is expired or revoked."
    }
  }
}`}</code></pre>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                <p className="text-xs text-slate-500">Showing 1 to 50 of 1,284,592 logs</p>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

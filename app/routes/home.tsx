import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher Admin Dashboard" },
    { name: "description", content: "Smart Voucher Management System" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">confirmation_number</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white uppercase">Smoucher</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary" href="/">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900" href="/campaigns">
            <span className="material-symbols-outlined">campaign</span>
            Campaigns
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900" href="/vouchers">
            <span className="material-symbols-outlined">payments</span>
            Vouchers
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900" href="/history">
            <span className="material-symbols-outlined">bar_chart</span>
            Analytics
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900" href="/customers">
            <span className="material-symbols-outlined">group</span>
            Customers
          </a>
          <div className="pt-4 pb-2">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">System</p>
          </div>
          <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900" href="/settings/api-keys">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900" href="#">
            <span className="material-symbols-outlined">help</span>
            Support
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Create Campaign
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-primary/20 placeholder:text-slate-500" placeholder="Search analytics or campaigns..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">Alex Rivera</p>
                <p className="text-[10px] text-slate-500 font-medium">Marketing Director</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border border-slate-200 dark:border-slate-800">
                <img alt="Profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzhtqww5x88k0U9bciP2sm7Xa7rCKDvDk70aFgismgBLTFtdVS7J_ATnuihDwFSZwQUMBHlxxpKY8_qVPcEom0RbnftoRrdtqMMLQEaVmJO5NphgkCutjUbYS82oheBJWk204qikn-c-Xvd_53l3Jaf6OUpnkakbK8pnoAofcIlCDhuiIiioz636txypCqjIqwff30pyfRKaaMRK01s6_WIueS9KLRs-Mz2NpkzPM__H6m3XB_mb4HHFrWVJdFt2QRQpe-YLQPNeg" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h2>
              <p className="text-slate-500 mt-1">Real-time performance metrics for Smoucher marketing initiatives.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                Last 30 Days
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <span className="material-symbols-outlined text-lg">download</span>
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Active Campaigns</span>
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg text-lg">campaign</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">12</p>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded leading-none">+2.5%</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">vs last month: 10 active</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Vouchers Distributed</span>
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg text-lg">confirmation_number</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">45,280</p>
                <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded leading-none">-5%</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Demand peak on weekends</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Usage Rate</span>
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg text-lg">bolt</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">68.5%</p>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded leading-none">+12%</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "68.5%" }}></div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Budget vs Actual</span>
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg text-lg">account_balance_wallet</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">72%</p>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded leading-none">+8%</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">$34,500 remaining budget</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Over Time</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">$124,500</span>
                    <span className="text-sm font-bold text-green-600 flex items-center">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      14.2%
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                  <button className="px-3 py-1 text-xs font-bold rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm">30d</button>
                  <button className="px-3 py-1 text-xs font-medium rounded text-slate-500 hover:text-slate-700">90d</button>
                </div>
              </div>
              <div className="h-64 w-full flex flex-col justify-end">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3211d4" stopOpacity="0.2"></stop>
                      <stop offset="100%" stopColor="#3211d4" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,120 Q50,110 80,70 T160,50 T240,90 T320,30 T400,40 L400,150 L0,150 Z" fill="url(#chartGradient)"></path>
                  <path d="M0,120 Q50,110 80,70 T160,50 T240,90 T320,30 T400,40" fill="none" stroke="#3211d4" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
                <div className="flex justify-between mt-4 px-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mon</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tue</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wed</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thu</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fri</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sat</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sun</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Usage Trends</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">8,432</span>
                    <span className="text-sm font-medium text-slate-500">Redemptions this week</span>
                    <span className="text-sm font-bold text-green-600 flex items-center">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      5.7%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-end gap-6 justify-between h-64 px-4">
                <div className="flex flex-col items-center flex-1 gap-4">
                  <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-lg relative overflow-hidden group h-24">
                    <div className="absolute bottom-0 w-full bg-primary/20 group-hover:bg-primary/40 transition-colors h-[40%] rounded-t"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wk 1</span>
                </div>
                <div className="flex flex-col items-center flex-1 gap-4">
                  <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-lg relative overflow-hidden group h-24">
                    <div className="absolute bottom-0 w-full bg-primary group-hover:bg-primary/90 transition-colors h-[85%] rounded-t"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wk 2</span>
                </div>
                <div className="flex flex-col items-center flex-1 gap-4">
                  <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-lg relative overflow-hidden group h-24">
                    <div className="absolute bottom-0 w-full bg-primary/20 group-hover:bg-primary/40 transition-colors h-[55%] rounded-t"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wk 3</span>
                </div>
                <div className="flex flex-col items-center flex-1 gap-4">
                  <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-lg relative overflow-hidden group h-24">
                    <div className="absolute bottom-0 w-full bg-primary/20 group-hover:bg-primary/40 transition-colors h-[70%] rounded-t"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wk 4</span>
                </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-xl flex items-center gap-4">
                <div className="bg-primary/20 text-primary p-2 rounded-lg">
                  <span className="material-symbols-outlined text-lg">lightbulb</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  <strong className="text-primary">Insight:</strong> Redemption rates increased by 15% when campaigns were shared on Friday mornings.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Campaigns</h3>
              <button className="text-sm font-semibold text-primary hover:underline">View all campaigns</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Campaign Name</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usage Rate</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue Generated</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">SF</div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Summer Foodie Fest</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Food & Beverage</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                          <div className="h-full bg-primary rounded-full" style={{ width: "82%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">82%</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">$42,300</p>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-pink-100 flex items-center justify-center text-pink-600 font-bold">BS</div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Back to School Promo</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Retail</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        Pending
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                          <div className="h-full bg-slate-300 dark:bg-slate-600 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">0%</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">$0</p>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">WE</div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Weekend Escape Vouchers</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Travel</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                          <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">45%</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">$18,900</p>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

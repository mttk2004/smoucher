import type { Route } from "./+types/campaigns.create";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Create Campaign" },
    { name: "description", content: "Launch a new marketing initiative" },
  ];
}

export default function CreateCampaign() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-primary">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">campaign</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Smoucher</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/">Dashboard</a>
            <a className="text-sm font-medium text-primary border-b-2 border-primary pb-0.5" href="/campaigns">Campaigns</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/history">Analytics</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
          <button className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden">
              <img alt="User Avatar" className="size-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVsYqzK_8qBh0IfbxBNAzoNEpg17LGHZ4K74lspIsZjnUD13_cQ46ccnEpaqumPX9VdFRip1Y5_MD13GuIHct7AGeE6xfU66pIPvLlZJXW7wD7SiGrtgD6ZLwa3ULh5giOxELecXJ9jPQNgEE3KMtsEPrC-xKrwsi-1XRWtKSsGibcoFZtjTj99pUUdICiD_SDFCs4scfKR14InK2SVpM2Fnu3OdCDqACrfLa8gFxP_UkFFFPfPRdrMo-ITavv80i7AtxZNGj2fyU" />
            </div>
            <span className="text-sm font-semibold hidden sm:block">Admin</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex justify-center py-10 px-4 md:px-10">
        <div className="w-full max-w-3xl flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <a className="text-sm font-medium hover:underline" href="/campaigns">Back to campaigns</a>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Create New Campaign</h1>
            <p className="text-slate-500 dark:text-slate-400">Launch a new marketing initiative to boost your engagement and sales.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col gap-8">
              <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="flex items-center gap-2 text-primary">
                  <span className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                  <span className="font-semibold text-sm">Basic Info</span>
                </div>
                <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">2</span>
                  <span className="font-medium text-sm">Targeting</span>
                </div>
                <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">3</span>
                  <span className="font-medium text-sm">Review</span>
                </div>
              </div>

              <form className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="campaign-name">Campaign Name</label>
                  <input className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all" id="campaign-name" placeholder="e.g. Summer Flash Sale 2024" type="text" />
                  <p className="text-[12px] text-slate-500">This is how your campaign will appear in reports.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="description">Description</label>
                  <textarea className="flex min-h-[100px] w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all" id="description" placeholder="Describe the objectives of this campaign..." rows={4}></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="start-date">Start Date</label>
                    <div className="relative">
                      <input className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all" id="start-date" type="date" />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none text-[20px]">calendar_today</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="end-date">End Date</label>
                    <div className="relative">
                      <input className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all" id="end-date" type="date" />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none text-[20px]">calendar_today</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="budget">Total Budget</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-slate-500 font-medium">$</span>
                      <input className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-7 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all" id="budget" placeholder="0.00" type="number" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="currency">Currency</label>
                    <select className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all appearance-none bg-no-repeat bg-[right_0.5rem_center]" id="currency">
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <input className="size-4 rounded border-slate-300 text-primary focus:ring-primary" id="auto-optimize" type="checkbox" />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300" htmlFor="auto-optimize">
                      Auto-optimize daily spend
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input defaultChecked className="size-4 rounded border-slate-300 text-primary focus:ring-primary" id="notifications" type="checkbox" />
                    <label className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300" htmlFor="notifications">
                      Receive email notifications for status changes
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 px-6 md:px-8 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <button className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Save as Draft
              </button>
              <div className="flex gap-3">
                <a href="/campaigns" className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors">
                  Cancel
                </a>
                <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 transition-all">
                  Continue to Targeting
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pro Tip</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Campaigns with clear, descriptive names are 40% easier to track across multiple channels. Try including the year or season in the title.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 px-6 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-500">© 2024 Smoucher Marketing Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

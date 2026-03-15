import type { Route } from "./+types/settings.api-keys";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "API Key Manager - Smoucher Developer Portal" },
    {
      name: "description",
      content: "Manage API keys for your Smoucher integration.",
    },
  ];
}

export default function ApiKeys() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-end gap-4">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">add</span>
            Create new secret key
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">key</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total Keys
              </p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Active Today
              </p>
              <p className="text-xl font-bold">4</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Expiring Soon
              </p>
              <p className="text-xl font-bold">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Secret Key
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Last Used
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      Production - Main Web
                    </div>
                    <div className="text-xs text-slate-500">
                      Live environment primary access
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono text-sm text-slate-600 dark:text-slate-400">
                      <span>sk_live_••••••••••••4f2a</span>
                      <button
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                        title="Copy key"
                      >
                        <span className="material-symbols-outlined text-base">
                          content_copy
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                      <span className="size-1.5 rounded-full bg-green-500"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    Oct 12, 2023
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    2 mins ago
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                      <span className="material-symbols-outlined">
                        more_horiz
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      Staging Environment
                    </div>
                    <div className="text-xs text-slate-500">
                      Integration testing key
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono text-sm text-slate-600 dark:text-slate-400">
                      <span>sk_test_••••••••••••9a1b</span>
                      <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">
                        <span className="material-symbols-outlined text-base">
                          content_copy
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                      <span className="size-1.5 rounded-full bg-green-500"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    Nov 05, 2023
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    Yesterday
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                      <span className="material-symbols-outlined">
                        more_horiz
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      Mobile App Legacy
                    </div>
                    <div className="text-xs text-slate-500">
                      Legacy support for v1.2
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono text-sm text-slate-600 dark:text-slate-400 opacity-60">
                      <span>sk_live_••••••••••••7d3e</span>
                      <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">
                        <span className="material-symbols-outlined text-base">
                          content_copy
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      <span className="size-1.5 rounded-full bg-slate-400"></span>
                      Inactive
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    Jan 20, 2024
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">Never</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                      <span className="material-symbols-outlined">
                        more_horiz
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                add_circle
              </span>
              Generate New Key
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Key Name
                </label>
                <input
                  className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="e.g. Analytics Backend Service"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Description (Optional)
                </label>
                <textarea
                  className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Describe the purpose of this key..."
                  rows={2}
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Permissions
                </label>
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                    <input
                      defaultChecked
                      className="rounded border-slate-300 text-primary focus:ring-primary/20"
                      type="checkbox"
                    />
                    <span className="text-xs font-medium">Read</span>
                  </label>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                    <input
                      defaultChecked
                      className="rounded border-slate-300 text-primary focus:ring-primary/20"
                      type="checkbox"
                    />
                    <span className="text-xs font-medium">Write</span>
                  </label>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                    <input
                      className="rounded border-slate-300 text-primary focus:ring-primary/20"
                      type="checkbox"
                    />
                    <span className="text-xs font-medium">Admin</span>
                  </label>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <button className="flex-1 bg-primary text-white font-bold py-2.5 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
                  Generate Key
                </button>
                <button className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">security</span>
                Security Best Practices
              </h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">
                    check_circle
                  </span>
                  <span>
                    Never share your secret keys or commit them to version
                    control systems like GitHub.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">
                    check_circle
                  </span>
                  <span>
                    Use environment variables to store your keys in production
                    environments.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">
                    check_circle
                  </span>
                  <span>
                    Regularly rotate your API keys to minimize the impact of
                    potential leaks.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">
                    check_circle
                  </span>
                  <span>
                    Use Restricted Keys for specific tasks to limit the blast
                    radius.
                  </span>
                </li>
              </ul>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[120px]">
                shield_lock
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

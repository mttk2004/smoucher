import type { Route } from "./+types/settings.api-keys";
import { useApiKeys, useCreateApiKey } from "../features/api-keys/hooks";
import { useQueryStates, parseAsInteger } from "nuqs";
import { Pagination } from "../components/ui/Pagination";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(10),
  });

  const { data: pageData, isLoading } = useApiKeys(
    searchParams.page,
    searchParams.size,
  );

  const { mutate: createApiKey, isPending: isCreating } = useCreateApiKey();

  const [newKeyName, setNewKeyName] = useState("");
  const [systemName, setSystemName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
  };

  const handleCreateKey = () => {
    if (!newKeyName || !systemName) {
      toast.error("Please fill in both name and system name");
      return;
    }

    createApiKey(
      { name: newKeyName, systemName: systemName },
      {
        onSuccess: (data) => {
          toast.success("API Key created successfully");
          if (data?.plainTextKey) {
            setCreatedKey(data.plainTextKey);
          }
          setNewKeyName("");
          setSystemName("");
        },
      }
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        {createdKey && (
          <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-emerald-800 dark:text-emerald-400 font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined">key_visualizer</span>
                  New Secret Key Created
                </h3>
                <p className="text-emerald-600 dark:text-emerald-500/70 text-sm mt-1">
                  Please copy your secret key now. You won't be able to see it again!
                </p>
              </div>
              <button
                onClick={() => setCreatedKey(null)}
                className="text-emerald-400 hover:text-emerald-600 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-500/20 rounded-lg p-3">
              <code className="flex-1 font-mono text-emerald-600 dark:text-emerald-400 break-all">
                {createdKey}
              </code>
              <button
                onClick={() => copyToClipboard(createdKey)}
                className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-md hover:bg-emerald-200 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
              </button>
            </div>
          </div>
        )}
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
              <p className="text-xl font-bold">
                {pageData?.totalElements || 0}
              </p>
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
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      <span className="material-symbols-outlined animate-spin text-2xl">
                        progress_activity
                      </span>
                    </td>
                  </tr>
                ) : !pageData?.content?.length ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No API keys found.
                    </td>
                  </tr>
                ) : (
                  pageData.content.map((apiKey) => (
                    <tr
                      key={apiKey.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-white">
                          {apiKey.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {apiKey.systemName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-mono text-sm text-slate-600 dark:text-slate-400">
                          <span>
                            sk_{apiKey.isActive ? "live" : "test"}_••••••••••••
                          </span>
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
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                            apiKey.isActive
                              ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              apiKey.isActive ? "bg-green-500" : "bg-slate-400"
                            }`}
                          ></span>
                          {apiKey.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(apiKey.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">-</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                          <span className="material-symbols-outlined">
                            more_horiz
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {pageData && pageData.totalPages > 1 && (
          <Pagination
            currentPage={pageData.number}
            totalPages={pageData.totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div id="generate-key-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  System Name
                </label>
                <input
                  className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="e.g. POS_SYSTEM_01"
                  type="text"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Permissions (UI Only)
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
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={handleCreateKey}
                  disabled={isCreating}
                  className="flex-1 bg-primary text-white font-bold py-2.5 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50">
                  {isCreating ? "Generating..." : "Generate Key"}
                </button>
                <button
                  onClick={() => {
                    setNewKeyName("");
                    setSystemName("");
                  }}
                  className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Clear
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

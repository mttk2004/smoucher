import type { Route } from "./+types/settings.api-logs";
import { useApiLogs } from "../features/api-logs/hooks";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { Pagination } from "../components/ui/Pagination";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "API Logs - Smoucher Developer Portal" },
    {
      name: "description",
      content:
        "Real-time monitor of incoming traffic to your production endpoints.",
    },
  ];
}

export default function ApiLogs() {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(10),
    method: parseAsString.withDefault(""),
    endpoint: parseAsString.withDefault(""),
    status: parseAsInteger,
  });

  const {
    data: pageData,
    isLoading,
    refetch,
  } = useApiLogs({
    page: searchParams.page,
    size: searchParams.size,
    method: searchParams.method,
    endpoint: searchParams.endpoint,
    status: searchParams.status ?? undefined,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">
                download
              </span>{" "}
              Export CSV
            </button>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>{" "}
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Requests
              </span>
              <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-bold px-2 py-0.5 rounded-full">
                +12.5%
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              1,284,592
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Last 24 hours</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Avg. Latency
              </span>
              <span className="text-rose-500 bg-rose-50 dark:bg-rose-500/10 text-[10px] font-bold px-2 py-0.5 rounded-full">
                -5.2%
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              142ms
            </div>
            <div className="text-[11px] text-slate-400 mt-1">P95 latency</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Error Rate
              </span>
              <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Optimal
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              0.04%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              5xx errors only
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Throughput
              </span>
              <span className="material-symbols-outlined text-primary text-lg">
                trending_up
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              842 req/s
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Current peak</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium">
            <span className="text-slate-500">Status:</span>
            <select
              value={searchParams.status ?? ""}
              onChange={(e) => setSearchParams({ status: e.target.value ? Number(e.target.value) : null, page: 0 })}
              className="bg-transparent border-none focus:ring-0 font-bold text-primary cursor-pointer p-0"
            >
              <option value="">All</option>
              <option value="200">200 OK</option>
              <option value="201">201 Created</option>
              <option value="400">400 Bad Request</option>
              <option value="401">401 Unauthorized</option>
              <option value="403">403 Forbidden</option>
              <option value="404">404 Not Found</option>
              <option value="500">500 Server Error</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium">
            <span className="text-slate-500">Method:</span>
            <select
              value={searchParams.method}
              onChange={(e) => setSearchParams({ method: e.target.value, page: 0 })}
              className="bg-transparent border-none focus:ring-0 font-bold text-primary cursor-pointer p-0"
            >
              <option value="">All</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium flex-1 max-w-xs">
            <span className="text-slate-500">Endpoint:</span>
            <input
              type="text"
              value={searchParams.endpoint}
              onChange={(e) => setSearchParams({ endpoint: e.target.value, page: 0 })}
              placeholder="Filter by endpoint..."
              className="bg-transparent border-none focus:ring-0 font-bold text-primary text-xs p-0 w-full"
            />
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
          <button
            onClick={() =>
              setSearchParams({
                method: "",
                endpoint: "",
                status: null,
                page: 0,
              })
            }
            className="text-xs font-medium text-slate-500 hover:text-primary transition-colors"
          >
            Clear all filters
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Endpoint
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                    Latency
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
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
                      colSpan={5}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No logs found.
                    </td>
                  </tr>
                ) : (
                  pageData.content.map((log) => (
                    <tr
                      key={log.id}
                      className="group hover:bg-primary/5 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                            log.method === "GET"
                              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : log.method === "POST"
                                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : log.method === "DELETE"
                                  ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {log.endpoint}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`size-2 rounded-full ${
                              log.responseStatus >= 200 &&
                              log.responseStatus < 300
                                ? "bg-emerald-500"
                                : log.responseStatus >= 400 &&
                                    log.responseStatus < 500
                                  ? "bg-amber-500"
                                  : "bg-rose-500"
                            }`}
                          ></div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {log.responseStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 text-right">
                        {log.responseTimeMs}ms
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-right">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {pageData && pageData.totalPages > 1 && (
        <Pagination
          currentPage={pageData.number}
          totalPages={pageData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

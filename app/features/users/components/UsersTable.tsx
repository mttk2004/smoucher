import { DataTable } from "../../../components/ui/DataTable";
import { Button } from "../../../components/ui/Button";

export function UsersTable() {
  const data = [
    {
      name: "Jordan Smith",
      email: "jordan.s@smoucher.com",
      role: "Admin",
      status: "Active",
      lastActivity: "2 mins ago",
      avatarInitials: "JS",
    },
    {
      name: "Sarah Chen",
      email: "sarah.c@smoucher.com",
      role: "Staff",
      status: "Active",
      lastActivity: "1 hour ago",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7aGV8hww9-orOpOqG_86SQS-W6oIcIM6of2UtGefRMjKEEV8cucLwMGOaKIFGcY8sQCAEHZDlxmod-HXGfZ_b8LxemRtx5E_yEYFM6bSJv2MTkhP7NPmGKIQAG52ElSiM3M2w745iMu6ZNVzSqGQmqgz_2cuY3zlEwLjzRaEZWH74yJaBn7tqUz6_nSM3SCFDlaCJlqIOwmpQ8sWAyk0iA4pKG-g0XOc-tM41dkVt3mSHqqDwoYsFBhrwpv3h20ZtqpsEn396uxc",
    },
    {
      name: "Marcus Wright",
      email: "m.wright@smoucher.com",
      role: "Staff",
      status: "Inactive",
      lastActivity: "Yesterday",
      avatarInitials: "MW",
    },
    {
      name: "David Lee",
      email: "d.lee@smoucher.com",
      role: "Admin",
      status: "Active",
      lastActivity: "Just now",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCMzPWcYbJ1ytpbeu9aIrfMitNC04tUHF1aErYvU2tH34vxfIqEm66R1G0se0e0PQg48MfPhd7Grgsn-e6ziaSMGeQKAtlZo6wT9GMmh7bG7bHMhVZdYX0hnMRlY-UXvnyoA2f1msf3n4pqiPf1lwXjHTlCPB-Vc-U1Fbj2xCfv_G7DByI53xedRUWHPWP04vQoI29iFNDI5NgTjYdt9T0Xi5UeB_N1oe6Fy4ku17wKGoUe-RElOrlKsPBuyowcEN4GTUoJYUwmvRU",
    },
  ];

  const columns = [
    {
      header: "User",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          {row.avatarUrl ? (
            <div
              className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center"
              style={{ backgroundImage: `url('\${row.avatarUrl}')` }}
            ></div>
          ) : (
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {row.avatarInitials}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {row.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {row.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      cell: (row: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase \${
            row.role === "Admin"
              ? "bg-primary/10 text-primary"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          {row.role}
        </span>
      ),
    },
    {
      header: "Status",
      className: "hidden sm:table-cell",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5">
          <div
            className={`size-2 rounded-full \${
              row.status === "Active"
                ? "bg-emerald-500"
                : "bg-slate-300 dark:bg-slate-600"
            }`}
          ></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {row.status}
          </span>
        </div>
      ),
    },
    {
      header: "Last Activity",
      className: "hidden md:table-cell text-slate-500 dark:text-slate-400",
      accessorKey: "lastActivity" as const,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: () => (
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          Edit Role
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 rounded-b-xl border border-t-0 shadow-sm relative -top-2 z-0">
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
          <Button variant="outline" size="icon" disabled>
            <span className="material-symbols-outlined text-[20px]">
              chevron_left
            </span>
          </Button>
          <Button variant="outline" size="icon">
            <span className="material-symbols-outlined text-[20px]">
              chevron_right
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}

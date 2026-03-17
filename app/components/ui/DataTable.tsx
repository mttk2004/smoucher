import * as React from "react";
import { cn } from "../../lib/utils";

interface DataTableProps<TData> {
  columns: {
    header: string;
    accessorKey?: keyof TData;
    cell?: (row: TData) => React.ReactNode;
    className?: string;
  }[];
  data: TData[];
  emptyMessage?: string;
  className?: string;
}

export function DataTable<TData>({
  columns,
  data,
  emptyMessage = "No results found.",
  className,
}: DataTableProps<TData>) {
  return (
    <div
      className={cn(
        "@container rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={cn(
                    "px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        "px-6 py-4 text-sm text-slate-700 dark:text-slate-300",
                        col.className
                      )}
                    >
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                        ? (row[col.accessorKey] as React.ReactNode)
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

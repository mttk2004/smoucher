
export interface StatCardProps {
  title: string;
  icon: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down";
  description?: React.ReactNode;
  progress?: number;
}

export function StatCard({
  title,
  icon,
  value,
  trend,
  trendDirection = "up",
  description,
  progress,
}: StatCardProps) {
  const trendColorClass =
    trendDirection === "up"
      ? "text-green-600 bg-green-50 dark:bg-green-900/20"
      : "text-red-600 bg-red-50 dark:bg-red-900/20";

  return (
    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg text-lg">
          {icon}
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
          {value}
        </p>
        {trend && (
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded leading-none ${trendColorClass}`}
          >
            {trend}
          </span>
        )}
      </div>
      {progress !== undefined && (
        <div className="mt-3 w-full bg-slate-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {description && (
        <div className="text-xs text-slate-400 mt-2">{description}</div>
      )}
    </div>
  );
}

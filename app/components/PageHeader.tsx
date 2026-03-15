import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 min-h-[72px]">
      <div className="space-y-1 flex-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-start gap-2 pt-1">{actions}</div>
      )}
    </div>
  );
}

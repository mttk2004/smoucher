
export interface PaginationProps {
  start: number;
  end: number;
  total: number;
  itemName: string;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
}

export function Pagination({
  start,
  end,
  total,
  itemName,
  onPrevious,
  onNext,
  className = "mt-6",
}: PaginationProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-900 dark:text-slate-100">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-900 dark:text-slate-100">
          {total}
        </span>{" "}
        {itemName}
      </p>
      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={start <= 1}
          className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={end >= total}
          className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export interface PaginationProps {
  start?: number;
  end?: number;
  total?: number;
  itemName?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
  // Fallback for pages using the old format
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (newPage: number) => void;
}

export function Pagination({
  start,
  end,
  total,
  itemName = "items",
  onPrevious,
  onNext,
  className = "mt-6",
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Use new format if start/end/total provided, otherwise fallback to old format
  if (start !== undefined && end !== undefined && total !== undefined) {
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

  // Fallback logic for old components using currentPage/totalPages
  if (currentPage !== undefined && totalPages !== undefined && onPageChange) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <p className="text-sm text-slate-500">
          Page{" "}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {currentPage + 1}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {totalPages || 1}
          </span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 0}
            className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return null;
}

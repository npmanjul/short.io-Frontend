import React, { useMemo } from "react";

export default function Pagination({
  totalPages = 1,
  totalUrls = 0,
  limit = 10,
  onPageChange,
  onLimitChange,
  onFetch,
}) {
  const [page, setPage] = React.useState(1);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  // Generate page numbers with "..." logic
  const pages = useMemo(() => {
    let arr = [];
    if (totalPages <= 7) {
      arr = [...Array(totalPages)].map((_, i) => i + 1);
    } else {
      if (page <= 3) {
        arr = [1, 2, 3, 4, "...", totalPages - 1, totalPages];
      } else if (page >= totalPages - 2) {
        arr = [
          1,
          2,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        arr = [1, "...", page - 1, page, page + 1, "...", totalPages];
      }
    }
    return arr;
  }, [page, totalPages]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    onPageChange?.(newPage);
    onFetch?.();
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    onLimitChange?.(newLimit);
    onFetch?.();
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile prev/next */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={!canGoPrev}
          onClick={() => handlePageChange(page - 1)}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            canGoPrev
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <button
          disabled={!canGoNext}
          onClick={() => handlePageChange(page + 1)}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            canGoNext
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {Math.min((page - 1) * limit + 1, totalUrls)}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(page * limit, totalUrls)}
            </span>{" "}
            of <span className="font-medium">{totalUrls}</span> results
          </p>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border border-gray-300 rounded-md text-sm px-2 py-1"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num} / page
              </option>
            ))}
          </select>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            {/* Prev */}
            <button
              disabled={!canGoPrev}
              onClick={() => handlePageChange(page - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                canGoPrev
                  ? "text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50"
                  : "text-gray-300 cursor-not-allowed ring-1 ring-gray-200"
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>

            {/* Pages */}
            {pages.map((p, idx) =>
              p === "..." ? (
                <span
                  key={idx}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    p === page
                      ? "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            {/* Next */}
            <button
              disabled={!canGoNext}
              onClick={() => handlePageChange(page + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                canGoNext
                  ? "text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50"
                  : "text-gray-300 cursor-not-allowed ring-1 ring-gray-200"
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

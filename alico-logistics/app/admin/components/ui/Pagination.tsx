import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  basePath: string;
  query?: Record<string, string>;
  itemLabel?: string;
};

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  basePath,
  query = {},
  itemLabel = "results",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createUrl = (newPage: number) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    params.set("page", newPage.toString());

    return `${basePath}?${params.toString()}`;
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

    const getPageNumbers = () => {
      if (totalPages <= 7) {
        return Array.from(
          { length: totalPages },
          (_, i) => i + 1
        );
      }

      const pages: (number | string)[] = [];

      // Always show first page
      pages.push(1);

      // Near the beginning
      if (page <= 4) {
        pages.push(2, 3, 4, 5);
        pages.push("...");
      }

      // Near the end
      else if (page >= totalPages - 3) {
        pages.push("...");
        for (let i = totalPages - 4; i < totalPages; i++) {
          pages.push(i);
        }
      }

      // Middle pages
      else {
        pages.push("...");
        pages.push(page - 2);
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push(page + 2);
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);

      return pages;
    };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-slate-600">
        Showing{" "}
        <strong>
          {start}–{end}
        </strong>{" "}
        of <strong>{totalItems}</strong> {itemLabel}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={createUrl(Math.max(page - 1, 1))}
          className={`rounded-lg border px-4 py-2 ${
            page === 1
              ? "pointer-events-none opacity-50"
              : "hover:bg-slate-100"
          }`}
        >
          Previous
        </Link>

        {pageNumbers.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-slate-500"
              >
                ...
              </span>
            );
          }

          const pageNumber = item as number;

          return (
            <Link
              key={pageNumber}
              href={createUrl(pageNumber)}
              className={`rounded-lg px-4 py-2 ${
                page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-slate-100"
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}

        <Link
          href={createUrl(
            Math.min(page + 1, totalPages)
          )}
          className={`rounded-lg border px-4 py-2 ${
            page === totalPages
              ? "pointer-events-none opacity-50"
              : "hover:bg-slate-100"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
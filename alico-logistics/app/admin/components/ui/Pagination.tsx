import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  basePath: string;
  search?: string;
  status?: string;
};

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  basePath,
  search = "",
  status = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createUrl = (newPage: number) => {
    const params = new URLSearchParams();

    params.set("page", newPage.toString());

    if (search) params.set("search", search);
    if (status) params.set("status", status);

    return `${basePath}?${params.toString()}`;
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-slate-600">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of{" "}
        <strong>{totalItems}</strong> results
      </p>

      <div className="flex items-center gap-2">
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

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((pageNumber) => (
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
        ))}

        <Link
          href={createUrl(Math.min(page + 1, totalPages))}
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
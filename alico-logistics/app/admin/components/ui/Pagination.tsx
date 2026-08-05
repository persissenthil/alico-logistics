import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  search?: string;
  status?: string;
};

export default function Pagination({
  page,
  totalPages,
  basePath,
  search = "",
  status = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createUrl = (newPage: number) => {
    const params = new URLSearchParams();

    params.set("page", newPage.toString());

    if (search) {
      params.set("search", search);
    }

    if (status) {
      params.set("status", status);
    }

    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="mt-8 flex items-center justify-between">
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

      <span className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </span>

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
  );
}
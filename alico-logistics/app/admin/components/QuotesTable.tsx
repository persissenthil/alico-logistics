"use client";

import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import {
  Eye,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";

import ConfirmDialog from "@/app/admin/components/ui/ConfirmDialog";
import { formatDistanceToNow, format } from "date-fns";

type Quote = {
  id: number;
  fullName: string;
  email: string;
  service: string;
  origin: string;
  destination: string;
  status: string;
  createdAt: Date;
};

type QuotesTableProps = {
  quotes: Quote[];
  showViewAll?: boolean;
  title?: string;
};

export default function QuotesTable({
  quotes,
  showViewAll = false,
  title = "Recent Quote Requests",
}: QuotesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [quoteToDelete, setQuoteToDelete] =
    useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  function createSortUrl(field: string) {
  const params = new URLSearchParams(
    searchParams.toString()
  );

  const currentSort =
    params.get("sort") ?? "createdAt";

  const currentOrder =
    params.get("order") ?? "desc";

  const nextOrder =
    currentSort === field && currentOrder === "asc"
      ? "desc"
      : "asc";

  params.set("sort", field);
  params.set("order", nextOrder);
  params.set("page", "1");

  return `/admin/quotes?${params.toString()}`;
}

function getSortIcon(field: string) {
  const currentSort =
    searchParams.get("sort") ?? "createdAt";

  const currentOrder =
    searchParams.get("order") ?? "desc";

  if (currentSort !== field) {
    return (
      <ArrowUpDown className="h-4 w-4 text-slate-400" />
    );
  }

  return currentOrder === "asc" ? (
    <ArrowUp className="h-4 w-4 text-blue-600" />
  ) : (
    <ArrowDown className="h-4 w-4 text-blue-600" />
  );
}

  async function handleDelete() {
    if (quoteToDelete === null) return;

    setDeleting(true);

    try {
      const response = await fetch(
        `/api/admin/quotes/${quoteToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete quote request.");
      }

      toast.success("Quote request deleted successfully.");
      setQuoteToDelete(null);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete quote request."
      );
    } finally {
      setDeleting(false);
    }
  }

  async function handleStatusChange(
    id: number,
    status: string
  ) {
    try {
      const response = await fetch(
        `/api/admin/quotes/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update quote request status."
        );
      }

      toast.success("Quote request status updated.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update quote request status."
      );
    }
  }

  return (
    <>
      <section className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>
           {showViewAll && (
          <Link
            href="/admin/quotes"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View All →
          </Link>
           )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <Link
                  href={createSortUrl("fullName")}
                  className="inline-flex items-center gap-1 font-semibold transition hover:text-blue-600"
                >
                  Name
                  {getSortIcon("fullName")}
                </Link>
              </th>

              <th className="px-4 py-3 text-left">
                <Link
                  href={createSortUrl("service")}
                  className="inline-flex items-center gap-1 font-semibold transition hover:text-blue-600"
                >
                  Service
                  {getSortIcon("service")}
                </Link>
              </th>

              <th className="px-4 py-3 text-left">
                <Link
                  href={createSortUrl("origin")}
                  className="inline-flex items-center gap-1 font-semibold transition hover:text-blue-600"
                >
                  Route
                  {getSortIcon("origin")}
                </Link>
              </th>

              <th className="px-4 py-3 text-left">
                <Link
                  href={createSortUrl("status")}
                  className="inline-flex items-center gap-1 font-semibold transition hover:text-blue-600"
                >
                  Status
                  {getSortIcon("status")}
                </Link>
              </th>

              <th className="px-4 py-3 text-left">
                <Link
                  href={createSortUrl("createdAt")}
                  className="inline-flex items-center gap-1 font-semibold transition hover:text-blue-600"
                >
                  Date
                  {getSortIcon("createdAt")}
                </Link>
              </th>

              <th className="px-4 py-3 text-left">
                Actions
              </th>
            </tr>
          </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="border-t border-slate-200 transition-colors hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    {quote.fullName}
                  </td>

                  <td className="px-4 py-3">
                    {quote.service}
                  </td>

                  <td className="px-4 py-3">
                    {quote.origin} → {quote.destination}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={quote.status}
                      onChange={(event) =>
                        handleStatusChange(
                          quote.id,
                          event.target.value
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1 text-sm font-medium outline-none ${
                        quote.status === "New"
                          ? "bg-green-100 text-green-700"
                          : quote.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : quote.status === "Replied"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Replied">
                        Replied
                      </option>
                      <option value="Closed">
                        Closed
                      </option>
                    </select>
                  </td>

                <td className="px-4 py-3">
                  <div className="font-medium">
                    {formatDistanceToNow(quote.createdAt, {
                      addSuffix: true,
                    })}
                  </div>

                  <div className="text-xs text-slate-500">
                    {format(quote.createdAt, "dd MMM yyyy")}
                  </div>
                </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/quotes/${quote.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setQuoteToDelete(quote.id)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {quotes.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No quote requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ConfirmDialog
        open={quoteToDelete !== null}
        title="Delete quote request"
        description="Are you sure you want to permanently delete this quote request? This action cannot be undone."
        confirming={deleting}
        onCancel={() => {
          if (!deleting) {
            setQuoteToDelete(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}
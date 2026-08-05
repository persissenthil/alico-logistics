"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Quote = {
  id: number;
  fullName: string;
  email: string;
  service: string;
  origin: string;
  destination: string;
  createdAt: Date;
};

type QuotesTableProps = {
  quotes: Quote[];
};

export default function QuotesTable({
  quotes,
}: QuotesTableProps) {
  const router = useRouter();
  async function handleDelete(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this quote request?"
  );

  if (!confirmed) return;

  const response = await fetch(`/api/admin/quotes/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    router.refresh();
  } else {
    alert("Failed to delete quote request.");
  }
}
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">
        Recent Quote Requests
      </h2>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Route</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t">
                <td className="px-4 py-3">{quote.fullName}</td>
                <td className="px-4 py-3">{quote.service}</td>
                <td className="px-4 py-3">
                  {quote.origin} → {quote.destination}
                </td>
               <td className="px-4 py-3">
                {quote.createdAt.toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/quotes/${quote.id}`}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(quote.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
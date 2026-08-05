import { prisma } from "@/lib/prisma";
import QuotesTable from "@/app/admin/components/QuotesTable";

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;
  const quoteRequests = await prisma.quoteRequest.findMany({
  where: {
    OR: [
      {
        fullName: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        service: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        origin: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        destination: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
  orderBy: {
    createdAt: "desc",
  },
});
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Quote Requests
      </h1>

      <p className="mt-2 text-slate-600">
        Manage all quote requests.
      </p>
        <form className="mt-6 flex gap-3" method="GET">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by name, email, service, origin or destination"
            className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Search
          </button>

          {search && (
            <a
              href="/admin/quotes"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear
            </a>
          )}
        </form>
      <QuotesTable quotes={quoteRequests} />
    </div>
  );
}
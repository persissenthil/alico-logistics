import { prisma } from "@/lib/prisma";
import QuotesTable from "@/app/admin/components/QuotesTable";

export default async function QuotesPage() {
  const quoteRequests = await prisma.quoteRequest.findMany({
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

      <QuotesTable quotes={quoteRequests} />
    </div>
  );
}
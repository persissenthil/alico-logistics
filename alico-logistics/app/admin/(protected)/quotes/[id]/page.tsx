import Link from "next/link";
import { notFound } from "next/navigation";
import QuoteReplyForm from "@/app/admin/components/QuoteReplyForm";
import { prisma } from "@/lib/prisma";

type QuoteDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuoteDetailsPage({
  params,
}: QuoteDetailsPageProps) {
  const { id } = await params;
  const quoteId = Number(id);

  if (!Number.isInteger(quoteId)) {
    notFound();
  }

  const quote = await prisma.quoteRequest.findUnique({
    where: {
      id: quoteId,
    },
  });

  if (!quote) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Quote Request
          </h1>

          <p className="mt-2 text-slate-600">
            View the complete freight quote request.
          </p>
        </div>

        <Link
          href="/admin/quotes"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Back to Quote Requests
        </Link>
      </div>

      <div className="mt-8 rounded-xl bg-white p-8 shadow">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Full name
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Email
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.email}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Phone
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.phone}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Company
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.company || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Service
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.service}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Cargo type
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.cargoType}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Origin
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.origin}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Destination
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.destination}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Weight
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.weight || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Date submitted
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {quote.createdAt.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-slate-500">
            Shipment details
          </p>

          <div className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-5 leading-7 text-slate-700">
            {quote.message || "No additional details provided."}
          </div>
        </div>
      </div>
      <QuoteReplyForm
  quoteId={quote.id}
  customerName={quote.fullName}
  originalSubject={`Quote request - ${quote.service}`}
/>
    </div>
  );
}
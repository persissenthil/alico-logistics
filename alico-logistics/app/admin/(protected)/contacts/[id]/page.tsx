import Link from "next/link";
import { notFound } from "next/navigation";
import ContactReplyForm from "@/app/admin/components/ContactReplyForm";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";

type ContactDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ContactDetailsPage({
  params,
}: ContactDetailsPageProps) {
  const { id } = await params;
  const contactId = Number(id);

  if (!Number.isInteger(contactId)) {
    notFound();
  }

  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Contact Message
          </h1>

          <p className="mt-2 text-slate-600">
            View the complete customer enquiry.
          </p>
        </div>

        <Link
          href="/admin/contacts"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Back to Contacts
        </Link>
      </div>

      <div className="mt-8 rounded-xl bg-white p-8 shadow">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Name
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {contact.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Email
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {contact.email}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Phone
            </p>
            <p className="mt-1 text-lg text-slate-900">
              {contact.phone || "-"}
            </p>
          </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Date received
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {formatDistanceToNow(contact.createdAt, {
                    addSuffix: true,
                  })}
                </p>

                <p
                  className="text-sm text-slate-500"
                  title={contact.createdAt.toLocaleString()}
                >
                  {format(contact.createdAt, "dd MMM yyyy • h:mm a")}
                </p>

              </div>

        </div>

<div className="mt-8 grid gap-6 md:grid-cols-2">
  <div>
    <p className="text-sm font-medium text-slate-500">
      Subject
    </p>

    <p className="mt-1 text-lg text-slate-900">
      {contact.subject || "-"}
    </p>
  </div>

    <div>
      <p className="text-sm font-medium text-slate-500">
        Status
      </p>

      <span
        className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
          contact.status === "New"
            ? "bg-green-100 text-green-700"
            : contact.status === "In Progress"
              ? "bg-yellow-100 text-yellow-700"
              : contact.status === "Replied"
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-200 text-slate-700"
        }`}
      >
        {contact.status}
      </span>
    </div>
  </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-slate-500">
            Message
          </p>

          <div className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-5 leading-7 text-slate-700">
            {contact.message}
          </div>
        </div>
      </div>
        <ContactReplyForm
          contactId={contact.id}
          customerName={contact.name}
          originalSubject={contact.subject}
        />
    </div>
  );
}
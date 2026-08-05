import Link from "next/link";
import { notFound } from "next/navigation";
import ContactReplyForm from "@/app/admin/components/ContactReplyForm";
import { prisma } from "@/lib/prisma";

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
            <p className="mt-1 text-lg text-slate-900">
              {contact.createdAt.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-slate-500">
            Subject
          </p>
          <p className="mt-1 text-lg text-slate-900">
            {contact.subject || "-"}
          </p>
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
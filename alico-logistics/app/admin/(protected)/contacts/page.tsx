import { prisma } from "@/lib/prisma";
import ContactsTable from "@/app/admin/components/ContactsTable";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Contact Messages
      </h1>

      <p className="mt-2 text-slate-600">
        Manage all contact form submissions.
      </p>

      <ContactsTable contacts={contacts} />
    </div>
  );
}
import { prisma } from "@/lib/prisma";

import DashboardCards from "@/app/admin/components/DashboardCards";
import ContactsTable from "@/app/admin/components/ContactsTable";
import QuotesTable from "@/app/admin/components/QuotesTable";
import LogoutButton from "@/app/admin/components/LogoutButton";

export default async function AdminDashboardPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const quoteRequests = await prisma.quoteRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <LogoutButton />
      </div>

      <p className="mt-4 text-slate-600">
        You currently have {contacts.length} contact message
        {contacts.length === 1 ? "" : "s"}.
      </p>

      <DashboardCards
        contacts={contacts.length}
        quotes={quoteRequests.length}
      />

      <ContactsTable contacts={contacts} />

      <QuotesTable quotes={quoteRequests} />
    </div>
  );
}
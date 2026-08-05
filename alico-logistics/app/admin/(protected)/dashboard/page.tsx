import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { verifySessionToken } from "@/lib/session";

import ContactsTable from "@/app/admin/components/ContactsTable";
import QuotesTable from "@/app/admin/components/QuotesTable";
import LogoutButton from "@/app/admin/components/LogoutButton";

import PageHeader from "@/app/admin/components/ui/PageHeader";
import StatCard from "@/app/admin/components/ui/StatCard";

import QuickActions from "@/app/admin/components/ui/QuickActions";

import {
  Users,
  FileText,
  CalendarDays,
  Clock3,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    await verifySessionToken(token);
  } catch {
    redirect("/admin/login");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    contacts,
    quoteRequests,
    contactsToday,
    quotesToday,
    newContacts,
    newQuotes,
  ] = await Promise.all([
    prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.contact.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    }),

    prisma.quoteRequest.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    }),

    prisma.contact.count({
      where: {
        status: "New",
      },
    }),

    prisma.quoteRequest.count({
      where: {
        status: "New",
      },
    }),
  ]);

  const totalContacts = await prisma.contact.count();
  const totalQuotes = await prisma.quoteRequest.count();

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your latest enquiries and quote requests."
      >
        <LogoutButton />
      </PageHeader>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Contacts"
          value={totalContacts}
          subtitle={`${newContacts} currently new`}
          icon={<Users className="h-6 w-6 text-white" />}
          iconBg="bg-blue-600"
        />

        <StatCard
          title="Quote Requests"
          value={totalQuotes}
          subtitle={`${newQuotes} currently new`}
          icon={<FileText className="h-6 w-6 text-white" />}
          iconBg="bg-orange-500"
        />

        <StatCard
          title="Contacts Today"
          value={contactsToday}
          subtitle="Received since midnight"
          icon={<CalendarDays className="h-6 w-6 text-white" />}
          iconBg="bg-green-600"
        />

        <StatCard
          title="Quotes Today"
          value={quotesToday}
          subtitle="Received since midnight"
          icon={<Clock3 className="h-6 w-6 text-white" />}
          iconBg="bg-purple-600"
        />
      </div>
      <div className="mt-8">
        <QuickActions />
      </div>
      <div className="mt-10 rounded-xl border border-slate-200 bg-white shadow-sm">
        <ContactsTable contacts={contacts} />
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white shadow-sm">
        <QuotesTable quotes={quoteRequests} />
      </div>
    </div>
  );
}
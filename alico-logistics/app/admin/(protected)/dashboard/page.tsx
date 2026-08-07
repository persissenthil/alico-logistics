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
import MonthlyChart from "@/app/admin/components/ui/MonthlyChart";
import RecentActivity from "@/app/admin/components/ui/RecentActivity";
import PeriodStatCard from "@/app/admin/components/ui/PeriodStatCard";

import {
  Users,
  FileText,
  CalendarDays,
  Clock3,
} from "lucide-react";

function getMonthlyData<T extends { createdAt: Date }>(items: T[]) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const totals = new Array(12).fill(0);

  for (const item of items) {
    const month = item.createdAt.getMonth();
    totals[month]++;
  }

  return months.map((month, index) => ({
    month,
    total: totals[index],
  }));
}

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

const now = new Date();

const today = new Date(now);
today.setHours(0, 0, 0, 0);

const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - now.getDay());
startOfWeek.setHours(0, 0, 0, 0);

const startOfMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  1
);

  const [
  contacts,
  quoteRequests,
  contactsToday,
  quotesToday,
  newContacts,
  newQuotes,
  contactDates,
  quoteDates,
  contactsThisWeek,
  contactsThisMonth,
  quotesThisWeek,
  quotesThisMonth,
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

  prisma.contact.findMany({
    select: {
      createdAt: true,
    },
  }),

  prisma.quoteRequest.findMany({
    select: {
      createdAt: true,
    },
  }),
  prisma.contact.count({
  where: {
    createdAt: {
      gte: startOfWeek,
    },
  },
}),

prisma.contact.count({
  where: {
    createdAt: {
      gte: startOfMonth,
    },
  },
}),

prisma.quoteRequest.count({
  where: {
    createdAt: {
      gte: startOfWeek,
    },
  },
}),

prisma.quoteRequest.count({
  where: {
    createdAt: {
      gte: startOfMonth,
    },
  },
}),
]);

  const totalContacts = await prisma.contact.count();
  const totalQuotes = await prisma.quoteRequest.count();

  /*const contactsChartData = [
  { month: "Jan", total: 12 },
  { month: "Feb", total: 18 },
  { month: "Mar", total: 9 },
  { month: "Apr", total: 25 },
  { month: "May", total: 16 },
  { month: "Jun", total: 22 },
];

const quotesChartData = [
  { month: "Jan", total: 8 },
  { month: "Feb", total: 14 },
  { month: "Mar", total: 11 },
  { month: "Apr", total: 20 },
  { month: "May", total: 15 },
  { month: "Jun", total: 19 },
]; */

const contactsChartData = getMonthlyData(contactDates);
const quotesChartData = getMonthlyData(quoteDates);

const activities = [
  ...contacts.map((contact) => ({
    id: contact.id,
    type: "contact" as const,
    name: contact.name,
    createdAt: contact.createdAt,
  })),

  ...quoteRequests.map((quote) => ({
    id: quote.id,
    type: "quote" as const,
    name: quote.fullName,
    createdAt: quote.createdAt,
  })),
]
  .sort(
    (a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
  )
  .slice(0, 8);

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
        icon={<Users className="h-6 w-6 text-white" />}
        iconBg="bg-blue-600"
        metricOneLabel="New"
        metricOneValue={newContacts}
        metricTwoLabel="Today"
        metricTwoValue={contactsToday}
      />

        <StatCard
        title="Quote Requests"
        value={totalQuotes}
        icon={<FileText className="h-6 w-6 text-white" />}
        iconBg="bg-orange-500"
        metricOneLabel="New"
        metricOneValue={newQuotes}
        metricTwoLabel="Today"
        metricTwoValue={quotesToday}
      />

          <PeriodStatCard
          title="Contacts"
          today={contactsToday}
          week={contactsThisWeek}
          month={contactsThisMonth}
          icon={<CalendarDays className="h-6 w-6 text-white" />}
          iconBg="bg-green-600"
        />

        <PeriodStatCard
          title="Quote Requests"
          today={quotesToday}
          week={quotesThisWeek}
          month={quotesThisMonth}
          icon={<Clock3 className="h-6 w-6 text-white" />}
          iconBg="bg-purple-600"
        />
      </div>
      
      <div className="mt-8">
        <QuickActions />
      </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <MonthlyChart
          title="Contacts by Month"
          data={contactsChartData}
        />

        <MonthlyChart
          title="Quote Requests by Month"
          data={quotesChartData}
        />
      </div>

      <div className="mt-10">
        <RecentActivity activities={activities} />
      </div>

        <ContactsTable
          contacts={contacts}
          showViewAll
        />

      <QuotesTable 
        quotes={quoteRequests}
        showViewAll
        />
    </div>
  );
}
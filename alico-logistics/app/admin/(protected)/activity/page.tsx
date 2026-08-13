import PageHeader from "@/app/admin/components/ui/PageHeader";
import Pagination from "@/app/admin/components/ui/Pagination";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
} from "date-fns";

const PAGE_SIZE = 10;

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    type?: string;
    page?: string;
  }>;
}) {
  const {
    search = "",
    type = "",
    page = "1",
  } = await searchParams;

  const currentPage = Math.max(
    1,
    Number.parseInt(page, 10) || 1
  );

  const [contacts, quotes] = await Promise.all([
    prisma.contact.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : undefined,
      select: {
        id: true,
        name: true,
        subject: true,
        createdAt: true,
      },
    }),

    prisma.quoteRequest.findMany({
      where: search
        ? {
            fullName: {
              contains: search,
              mode: "insensitive",
            },
          }
        : undefined,
      select: {
          id: true,
          fullName: true,
          service: true,
          origin: true,
          destination: true,
          createdAt: true,
        },
    }),
  ]);

    const activities = [
      ...contacts.map((contact) => ({
        id: contact.id,
        type: "contact" as const,
        name: contact.name,
        subject: contact.subject,
        service: null,
        origin: null,
        destination: null,
        createdAt: contact.createdAt,
      })),

      ...quotes.map((quote) => ({
        id: quote.id,
        type: "quote" as const,
        name: quote.fullName,
        subject: null,
        service: quote.service,
        origin: quote.origin,
        destination: quote.destination,
        createdAt: quote.createdAt,
      })),
    ]
    .filter((activity) => {
      if (!type) return true;
      return activity.type === type;
    })
    .sort(
      (a, b) =>
        b.createdAt.getTime() - a.createdAt.getTime()
    );

    

  const totalItems = activities.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / PAGE_SIZE)
  );

  const paginatedActivities = activities.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  function getActivityGroup(date: Date) {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "dd MMM yyyy");
}

const groupedActivities = paginatedActivities.reduce(
  (groups, activity) => {
    const group = getActivityGroup(activity.createdAt);

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(activity);

    return groups;
  },
  {} as Record<
    string,
    typeof paginatedActivities
  >
);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Activity"
        description="View recent contact and quote request activity."
      />

      <form
        method="GET"
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by customer name"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:max-w-md"
        />

        <select
          name="type"
          defaultValue={type}
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All activity</option>
          <option value="contact">Contacts</option>
          <option value="quote">Quotes</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Filter
        </button>

        {(search || type) && (
          <a
            href="/admin/activity"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear
          </a>
        )}
      </form>

      <section className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-900">
            All Activity
          </h2>
        </div>

<div>
  {paginatedActivities.length === 0 ? (
    <div className="px-6 py-10 text-center text-slate-500">
      No activity found.
    </div>
  ) : (
    Object.entries(groupedActivities).map(
      ([group, groupActivities]) => (
        <div key={group}>
          <div className="border-y border-slate-200 bg-slate-50 px-6 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {group}
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {groupActivities.map((activity) => (
              <Link
                key={`${activity.type}-${activity.id}`}
                href={
                  activity.type === "contact"
                    ? `/admin/contacts/${activity.id}`
                    : `/admin/quotes/${activity.id}`
                }
                className="block px-6 py-4 transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      activity.type === "contact"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {activity.type === "contact"
                      ? "Contact"
                      : "Quote"}
                  </span>

                  <p className="font-medium text-slate-900">
                    {activity.type === "contact"
                      ? `New contact from ${activity.name}`
                      : `New quote request from ${activity.name}`}
                  </p>
                </div>
                  {activity.type === "contact" ? (
                    activity.subject && (
                      <p className="mt-1 text-sm text-slate-600">
                        {activity.subject}
                      </p>
                    )
                  ) : (
                    <p className="mt-1 text-sm text-slate-600">
                      {activity.service}
                      {activity.origin && activity.destination && (
                        <>
                          {" • "}
                          {activity.origin} → {activity.destination}
                        </>
                      )}
                    </p>
                  )}
                <p
                  className="mt-2 text-xs text-slate-500"
                  title={activity.createdAt.toLocaleString()}
                >
                  {formatDistanceToNow(
                    activity.createdAt,
                    {
                      addSuffix: true,
                    }
                  )}
                  {" • "}
                  {format(
                    activity.createdAt,
                    "dd MMM yyyy"
                  )}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )
    )
  )}
</div>
      </section>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        basePath="/admin/activity"
       query={{
       search,
       type,
       }}
      />
    </div>
  );
}
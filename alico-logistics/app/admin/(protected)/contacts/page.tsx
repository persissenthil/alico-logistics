import ContactsTable from "@/app/admin/components/ContactsTable";
import PageHeader from "@/app/admin/components/ui/PageHeader";
import Pagination from "@/app/admin/components/ui/Pagination";
import { prisma } from "@/lib/prisma";
import { Download } from "lucide-react";

const PAGE_SIZE = 10;

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const {
    search = "",
    status = "",
    page = "1",
    sort = "createdAt",
    order = "desc",
  } = await searchParams;

  const currentPage = Math.max(
    1,
    Number.parseInt(page, 10) || 1
  );

  const sortOrder =
  order === "asc" ? "asc" : "desc";

const allowedSortFields = [
  "name",
  "email",
  "subject",
  "status",
  "createdAt",
];

const sortField = allowedSortFields.includes(sort)
  ? sort
  : "createdAt";

  const where = {
    AND: [
      search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                subject: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {},
      status
        ? {
            status,
          }
        : {},
    ],
  };

  const [contacts, totalContacts] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: {
         [sortField]: sortOrder,
      },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),

    prisma.contact.count({
      where,
    }),
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(totalContacts / PAGE_SIZE)
  );

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Contact Messages"
        description="Manage all contact form submissions."
      />

    <form
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        method="GET"
      >
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name, email, or subject"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:max-w-md"
        />

        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All statuses</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Replied">Replied</option>
          <option value="Closed">Closed</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Filter
        </button>

        <a
            href="/api/admin/contacts/export"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Export CSV
        </a>

        {(search || status) && (
          <a
            href="/admin/contacts"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear
          </a>
        )}
      </form>

      <ContactsTable 
           contacts={contacts} 
           title="All Contact Messages"
      />

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={totalContacts}
        pageSize={PAGE_SIZE}
        basePath="/admin/contacts"
        query={{
          search,
          status,
          sort,
          order,
        }}
        itemLabel="contacts"
      />
    </div>
  );
}
import { prisma } from "@/lib/prisma";
import ContactsTable from "@/app/admin/components/ContactsTable";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;
  const contacts = await prisma.contact.findMany({
  where: {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        subject: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  },
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

    
        <form className="mt-6 flex gap-3" method="GET">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by name, email, or subject"
            className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Search
          </button>

          {search && (
            <a
              href="/admin/contacts"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear
            </a>
          )}
        </form>
          <ContactsTable contacts={contacts} />
    </div>
  );
}
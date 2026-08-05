import Link from "next/link";

const actions = [
  {
    title: "Contacts",
    description: "View customer enquiries",
    href: "/admin/contacts",
    color: "bg-blue-600",
  },
  {
    title: "Quote Requests",
    description: "Manage quotations",
    href: "/admin/quotes",
    color: "bg-orange-500",
  },
  {
    title: "Website Settings",
    description: "Company information",
    href: "/admin/settings",
    color: "bg-green-600",
  },
  {
    title: "View Website",
    description: "Open public website",
    href: "/",
    color: "bg-slate-800",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className={`${action.color} rounded-xl p-5 text-white transition hover:scale-[1.02] hover:shadow-lg`}
          >
            <h3 className="font-semibold">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-white/80">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
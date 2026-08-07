"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  companyName: string;
  logoUrl: string;
  newContacts: number;
  newQuotes: number;
};

export default function Sidebar({
  companyName,
  logoUrl,
  newContacts,
  newQuotes,
}: SidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
    },
    {
    href: "/admin/activity",
    label: "Activity",
    },
    {
      href: "/admin/contacts",
      label: "Contacts",
      badge: newContacts,
    },
    {
      href: "/admin/quotes",
      label: "Quote Requests",
      badge: newQuotes,
    },
    {
      href: "/admin/settings",
      label: "Settings",
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        {logoUrl && (
          <div className="mb-5 rounded-lg bg-white p-4">
            <Image
              src={logoUrl}
              alt={`${companyName} logo`}
              width={180}
              height={80}
              loading="eager"
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        <h2 className="text-xl font-bold">
          {companyName}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between rounded-lg px-4 py-2.5 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`}
            >
              <span>{link.label}</span>

              {link.badge !== undefined &&
                link.badge > 0 && (
                  <span
                    className={`min-w-6 rounded-full px-2 py-0.5 text-center text-xs font-semibold ${
                      active
                        ? "bg-white text-blue-600"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
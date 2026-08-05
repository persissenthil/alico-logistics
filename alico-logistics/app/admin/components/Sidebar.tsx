"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  companyName: string;
  logoUrl: string;
};

export default function Sidebar({
  companyName,
  logoUrl,
}: SidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
    },
    {
      href: "/admin/contacts",
      label: "Contacts",
    },
    {
      href: "/admin/quotes",
      label: "Quote Requests",
    },
    {
      href: "/admin/settings",
      label: "Settings",
    },
  ];

  return (
  /* <aside className="w-64 shrink-0 bg-slate-900 text-white"> */
      <aside className="flex h-screen w-64 shrink-0 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        {logoUrl && (
          <div className="mb-4 rounded-lg bg-white p-2">
            <Image
              src={logoUrl}
              alt={`${companyName} logo`}
              width={142}
              height={50}
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
              className={`block rounded px-4 py-2 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
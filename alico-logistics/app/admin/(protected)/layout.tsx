import { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/session";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white">
        <div className="border-b border-slate-700 p-6">
          <h2 className="text-xl font-bold">
            Alico Logistics
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Admin Panel
          </p>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="block rounded px-4 py-2 hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/contacts"
            className="block rounded px-4 py-2 hover:bg-slate-800"
          >
            Contacts
          </Link>
          <Link
            href="/admin/quotes"
            className="block rounded px-4 py-2 hover:bg-slate-800"
          >
            Quote Requests
          </Link>
          <Link
            href="/admin/settings"
            className="block rounded px-4 py-2 hover:bg-slate-800"
          >
            Settings
          </Link>        
          </nav>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
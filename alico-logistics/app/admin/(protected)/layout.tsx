import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getSettings } from "@/lib/settings";
import { verifySessionToken } from "@/lib/session";
import Sidebar from "@/app/admin/components/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
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

  const settings = await getSettings();

const [newContacts, newQuotes] = await Promise.all([
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


  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar
        companyName={settings.companyName}
        logoUrl={settings.logoUrl}
        newContacts={newContacts}
        newQuotes={newQuotes}
      />

      <main className="flex-1 overflow-y-auto p-10">
        {children}
      </main>
    </div>
  );
}
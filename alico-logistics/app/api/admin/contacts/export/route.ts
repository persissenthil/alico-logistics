import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifySessionToken } from "@/lib/session";

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  try {
    await verifySessionToken(token);
  } catch {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const csv = [
    [
      "Name",
      "Email",
      "Subject",
      "Status",
      "Date",
    ].join(","),

    ...contacts.map((contact) =>
      [
        escapeCsv(contact.name),
        escapeCsv(contact.email),
        escapeCsv(contact.subject ?? ""),
        escapeCsv(contact.status),
        escapeCsv(formatDate(contact.createdAt)),
      ].join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="contacts.csv"',
    },
  });
}
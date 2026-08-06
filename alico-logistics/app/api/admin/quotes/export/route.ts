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

  const quotes = await prisma.quoteRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const csv = [
    [
      "Full Name",
      "Email",
      "Service",
      "Origin",
      "Destination",
      "Status",
      "Date",
    ].join(","),

    ...quotes.map((quote) =>
      [
        escapeCsv(quote.fullName),
        escapeCsv(quote.email),
        escapeCsv(quote.service),
        escapeCsv(quote.origin),
        escapeCsv(quote.destination),
        escapeCsv(quote.status),
        escapeCsv(formatDate(quote.createdAt)),
      ].join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="quotes.csv"',
    },
  });
}
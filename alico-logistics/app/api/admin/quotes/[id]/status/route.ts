import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifySessionToken } from "@/lib/session";

const allowedStatuses = [
  "New",
  "In Progress",
  "Replied",
  "Closed",
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    try {
      await verifySessionToken(token);
    } catch {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const quoteId = Number(id);

    if (!Number.isInteger(quoteId) || quoteId <= 0) {
      return NextResponse.json(
        { message: "Invalid quote request ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const status = body.status;

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        { message: "Invalid status." },
        { status: 400 }
      );
    }

    const quote = await prisma.quoteRequest.update({
      where: {
        id: quoteId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      message: "Quote request status updated successfully.",
      quote,
    });
  } catch (error) {
    console.error("Quote status update error:", error);

    return NextResponse.json(
      { message: "Unable to update quote request status." },
      { status: 500 }
    );
  }
}
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifySessionToken } from "@/lib/session";

export async function DELETE(
  _request: Request,
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

    const existingQuote = await prisma.quoteRequest.findUnique({
      where: {
        id: quoteId,
      },
      select: {
        id: true,
      },
    });

    if (!existingQuote) {
      return NextResponse.json(
        { message: "Quote request not found." },
        { status: 404 }
      );
    }

    await prisma.quoteRequest.delete({
      where: {
        id: quoteId,
      },
    });

    return NextResponse.json({
      message: "Quote request deleted successfully.",
    });
  } catch (error) {
    console.error("Quote delete error:", error);

    return NextResponse.json(
      { message: "Unable to delete quote request." },
      { status: 500 }
    );
  }
}
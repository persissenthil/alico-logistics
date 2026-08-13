import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";
import { verifySessionToken } from "@/lib/session";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(
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
        { message: "Invalid quote ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const subject =
      typeof body.subject === "string"
        ? body.subject.trim()
        : "";

    const reply =
      typeof body.reply === "string"
        ? body.reply.trim()
        : "";

    if (!subject || !reply) {
      return NextResponse.json(
        {
          message:
            "Subject and reply message are required.",
        },
        { status: 400 }
      );
    }

    if (subject.length > 200) {
      return NextResponse.json(
        {
          message:
            "Subject must be 200 characters or fewer.",
        },
        { status: 400 }
      );
    }

    if (reply.length > 5000) {
      return NextResponse.json(
        {
          message:
            "Reply must be 5000 characters or fewer.",
        },
        { status: 400 }
      );
    }

    const quote = await prisma.quoteRequest.findUnique({
      where: {
        id: quoteId,
      },
    });

    if (!quote) {
      return NextResponse.json(
        { message: "Quote request not found." },
        { status: 404 }
      );
    }

    const safeName = escapeHtml(quote.fullName);
    const safeReply = escapeHtml(reply).replaceAll(
      "\n",
      "<br />"
    );

    await sendEmail(
      quote.email,
      subject,
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>Dear ${safeName},</p>

          <p>${safeReply}</p>

          <p>
            Kind regards,<br />
            <strong>Alico Logistics</strong>
          </p>
        </div>
      `
    );

    await prisma.quoteRequest.update({
      where: {
        id: quoteId,
      },
      data: {
        status: "Replied",
      },
    });

    return NextResponse.json({
      message: "Reply sent successfully.",
    });
  } catch (error) {
    console.error("Quote reply error:", error);

    if (
      error instanceof
        Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Quote request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Unable to send the reply." },
      { status: 500 }
    );
  }
}
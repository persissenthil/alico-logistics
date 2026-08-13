import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifySessionToken } from "@/lib/session";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    return false;
  }

  try {
    await verifySessionToken(token);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  const settings = await prisma.setting.findMany({
    orderBy: {
      key: "asc",
    },
  });

  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { message: "Invalid settings data." },
        { status: 400 }
      );
    }

    const companyName =
      typeof body.companyName === "string"
        ? body.companyName.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    const address =
      typeof body.address === "string"
        ? body.address.trim()
        : "";

    const logoUrl =
      typeof body.logoUrl === "string"
        ? body.logoUrl.trim()
        : "";

    // Company name
    if (!companyName) {
      return NextResponse.json(
        { message: "Company name is required." },
        { status: 400 }
      );
    }

    if (companyName.length > 150) {
      return NextResponse.json(
        {
          message:
            "Company name must be 150 characters or fewer.",
        },
        { status: 400 }
      );
    }

    // Email
    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { message: "Email address is too long." },
        { status: 400 }
      );
    }

    // UK phone number
    if (phone) {
      const phonePattern =
        /^(?:\+44|0)[0-9\s()-]+$/;

      if (!phonePattern.test(phone)) {
        return NextResponse.json(
          {
            message:
              "Please enter a valid UK phone number starting with +44 or 0.",
          },
          { status: 400 }
        );
      }

      const phoneDigits = phone.replace(/\D/g, "");

      if (phoneDigits.length < 10) {
        return NextResponse.json(
          {
            message:
              "Please enter a valid UK phone number.",
          },
          { status: 400 }
        );
      }
    }

    // Address
    if (address.length > 1000) {
      return NextResponse.json(
        {
          message:
            "Address must be 1000 characters or fewer.",
        },
        { status: 400 }
      );
    }

    // Logo URL
    if (logoUrl.length > 1000) {
      return NextResponse.json(
        { message: "Invalid logo URL." },
        { status: 400 }
      );
    }

    const settingsToSave = {
      companyName,
      email,
      phone,
      address,
      logoUrl,
    };

    await prisma.$transaction(
      Object.entries(settingsToSave).map(
        ([key, value]) =>
          prisma.setting.upsert({
            where: {
              key,
            },
            update: {
              value,
            },
            create: {
              key,
              value,
            },
          })
      )
    );

    return NextResponse.json({
      message: "Settings saved successfully.",
    });
  } catch (error) {
    console.error("Settings API error:", error);

    return NextResponse.json(
      { message: "Unable to save settings." },
      { status: 500 }
    );
  }
}
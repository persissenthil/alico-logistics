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

    const validEntries: Array<[string, string]> = [];

    for (const [key, value] of Object.entries(body)) {
      if (
        !key.trim() ||
        typeof value !== "string" ||
        value.length > 5000
      ) {
        return NextResponse.json(
          { message: `Invalid value for ${key}.` },
          { status: 400 }
        );
      }

      validEntries.push([key, value]);
    }

    await prisma.$transaction(
      validEntries.map(([key, value]) =>
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
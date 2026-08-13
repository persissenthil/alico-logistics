import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { createSessionToken } from "@/lib/session";
import {
  checkLoginRateLimit,
  clearLoginRateLimit,
} from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const body = await request.json();

      if (
        !body ||
        typeof body !== "object" ||
        Array.isArray(body)
      ) {
        return NextResponse.json(
          { message: "Invalid login request." },
          { status: 400 }
        );
      }

      const email =
        typeof body.email === "string"
          ? body.email.trim().toLowerCase()
          : "";

      const password =
        typeof body.password === "string"
          ? body.password
          : "";


    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }
const forwardedFor = request.headers.get("x-forwarded-for");

const ip =
  forwardedFor?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const rateLimitKey = `${ip}:${email}`;

const rateLimit = checkLoginRateLimit(rateLimitKey);

if (!rateLimit.allowed) {
  const retryAfterSeconds = Math.max(
    1,
    Math.ceil(
      ((rateLimit.resetAt ?? Date.now()) - Date.now()) /
        1000
    )
  );

  return NextResponse.json(
    {
      message:
        "Too many login attempts. Please try again later.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": retryAfterSeconds.toString(),
      },
    }
  );
}
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }


    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
    clearLoginRateLimit(rateLimitKey);
    const token = await createSessionToken(admin.id);

    const cookieStore = await cookies();

    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(
      {
        message: "Login successful.",
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
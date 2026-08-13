import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  
];

const extensionByType: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  
};

export async function POST(request: Request) {
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

    const formData = await request.formData();
    const file = formData.get("logo");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Please select a logo file." },
        { status: 400 }
      );
    }

    if (file.size === 0) {
  return NextResponse.json(
    { message: "The selected logo file is empty." },
    { status: 400 }
  );
 }
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          message:
            "Only PNG, JPG, and WebP images are allowed.",
        },
        { status: 400 }
      );
    }

    const maximumSize = 2 * 1024 * 1024;

    if (file.size > maximumSize) {
      return NextResponse.json(
        { message: "The logo must be 2 MB or smaller." },
        { status: 400 }
      );
    }

    const extension = extensionByType[file.type];
    const fileName = `${randomUUID()}.${extension}`;

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "logo"
    );

    await mkdir(uploadDirectory, {
      recursive: true,
    });

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDirectory, fileName);

    await writeFile(filePath, fileBuffer);

    const logoUrl = `/uploads/logo/${fileName}`;

    await prisma.setting.upsert({
      where: {
        key: "logoUrl",
      },
      update: {
        value: logoUrl,
      },
      create: {
        key: "logoUrl",
        value: logoUrl,
      },
    });

    return NextResponse.json({
      message: "Logo uploaded successfully.",
      logoUrl,
    });
  } catch (error) {
    console.error("Logo upload error:", error);

    return NextResponse.json(
      { message: "Unable to upload the logo." },
      { status: 500 }
    );
  }
}
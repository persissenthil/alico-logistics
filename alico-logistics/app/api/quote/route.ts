import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      company,
      service,
      origin,
      destination,
      cargoType,
      weight,
      message,
    } = body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !service ||
      !origin ||
      !destination ||
      !cargoType
    ) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        fullName,
        email,
        phone,
        company,
        service,
        origin,
        destination,
        cargoType,
        weight,
        message,
      },
    });

    return NextResponse.json(
      {
        message: "Quote request submitted successfully!",
        quoteRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
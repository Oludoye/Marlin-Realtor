import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const listing = await prisma.listing.create({
      data: {
        title: body.title,
        price: Number(body.price),
        description: body.description,

        // ✅ FIXED: must be ACTUAL VALUE, not "String"
        city: body.city,  

        // ✅ If you store multiple images
        images: {
          create: body.images?.map((url: string) => ({
            url,
          })) || [],
        },
      },
    });

    return NextResponse.json(listing, { status: 201 });

  } catch (error: any) {
    console.error("LISTING CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create listing", details: error.message },
      { status: 500 }
    );
  }
}

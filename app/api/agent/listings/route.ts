// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const listings = await prisma.listing.findMany();
//   return NextResponse.json(listings);
// }

// export async function POST(req: Request) {
//   const body = await req.json();
//   const listing = await prisma.listing.create({ data: { ...body, userId: 1 } }); // TODO: replace with session userId
//   return NextResponse.json(listing);
// }

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET all listings for this agent
export async function GET() {
  const listings = await prisma.listing.findMany();
  return NextResponse.json(listings);
}

// PATCH to toggle approval
export async function PATCH(req: NextRequest) {
  const { id } = await req.json();
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const updated = await prisma.listing.update({
    where: { id },
    data: { approved: !listing.approved },
  });
  return NextResponse.json(updated);
}

// DELETE listing
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.listing.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.listing.delete({ where: { id } });
  return NextResponse.json({ message: 'Deleted' });
}

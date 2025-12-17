import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { role } = await req.json();
  const updated = await prisma.user.update({
    where: { id: params.id },
    data: { role }
  });
  return NextResponse.json(updated);
}

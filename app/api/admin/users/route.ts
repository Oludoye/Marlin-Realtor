

// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }

// export async function PATCH(req: NextRequest) {
//   const { id, role } = await req.json();
//   const updated = await prisma.user.update({ where: { id }, data: { role } });
//   return NextResponse.json(updated);
// }

// export async function DELETE(req: NextRequest) {
//   const { id } = await req.json();
//   await prisma.user.delete({ where: { id } });
//   return NextResponse.json({ message: "Deleted" });
// }

// app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';
import { UserRole, UserStatus } from '@prisma/client';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (session.user.role !== UserRole.ADMIN) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (session.user.role !== UserRole.ADMIN) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id, action, image } = await req.json();

    // Handle image update separately
    if (image !== undefined && id) {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { image },
      });
      return NextResponse.json({ message: 'Profile picture updated successfully', user: updatedUser });
    }

    if (!id || !action) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

    let updatedUser;

    if (action === 'approve') {
      updatedUser = await prisma.user.update({
        where: { id },
        data: { status: UserStatus.APPROVED },
      });
    } else if (action === 'ignore') {
      updatedUser = await prisma.user.update({
        where: { id },
        data: { status: UserStatus.DENIED },
      });
    } else if (action === 'delete') {
      updatedUser = await prisma.user.delete({
        where: { id },
      });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ message: `User ${action}d successfully`, user: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import prisma from '@/lib/prisma';
// import { authOptions } from '../../auth/[...nextauth]/route';
// import { UserRole } from '@prisma/client';

// // GET all users
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     if (session.user.role !== UserRole.ADMIN) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

//     const users = await prisma.user.findMany();
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// DELETE a user by ID
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    // ✅ Check if user exists first
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Delete the user safely
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

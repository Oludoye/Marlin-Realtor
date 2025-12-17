import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    return new Response(JSON.stringify({ message: "Registration successful!" }), { status: 201 });
  } catch (err: any) {
    console.error("Register API error:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}

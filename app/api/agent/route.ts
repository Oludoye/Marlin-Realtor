import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, office, experience, specialty, picture } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: "AGENT",
        agentProfile: {
          create: { office, experience, specialty, picture },
        },
      },
      include: { agentProfile: true },
    });

    return NextResponse.json({ message: "Agent registered successfully", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to register agent" }, { status: 500 });
  }
  
}
  const checkout = async (listingId: number, amount: number) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ listingId, amount }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    window.location.href = data.url;
  };
  


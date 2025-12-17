// // app/api/auth/register/route.ts

// // Import UserRole and the new UserStatus
// import { UserRole, UserStatus } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { name, email, password, role, phone } = await req.json();

//     if (!name || !email || !password || !role) {
//       return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
//     }

//     if (!["TEAM_MEMBER", "AGENT"].includes(role)) {
//       return new Response(JSON.stringify({ message: "Invalid role" }), { status: 400 });
//     }

//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Determine the initial status based on the role
//     const initialStatus: UserStatus = 
//       role === "AGENT" ? UserStatus.APPROVED : UserStatus.PENDING;

//     const user = await prisma.user.create({
//       data: { 
//         name, 
//         email, 
//         password: hashedPassword, 
//         role: role as UserRole, 
//         phone,
//         status: initialStatus, // Use the determined status
//       },
//     });

//     // Optionally: Add logic here to send an email notification to the admin 
//     // when a user registers with PENDING status.

//     return new Response(
//       JSON.stringify({ 
//         message: "User created successfully", 
//         userId: user.id,
//         status: user.status // Return the status in the response
//       }), 
//       { status: 201 }
//     );
//   } catch (err: any) {
//     console.error("Register API error:", err);
//     return new Response(
//       JSON.stringify({ message: "Internal server error", error: err.message }),
//       { status: 500 },
//     );
//   }
// }


// app/api/auth/register/route.ts

// Import UserRole and the new UserStatus
import { UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, phone } = await req.json();

    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    if (!["TEAM_MEMBER", "AGENT"].includes(role)) {
      return new Response(JSON.stringify({ message: "Invalid role" }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine the initial status based on the role
    const initialStatus: UserStatus = 
      role === "AGENT" ? UserStatus.APPROVED : UserStatus.PENDING;

    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        role: role as UserRole, 
        phone,
        status: initialStatus, // Use the determined status
      },
    });

    // Optionally: Add logic here to send an email notification to the admin 
    // when a user registers with PENDING status.

    return new Response(
      JSON.stringify({ 
        message: "User created successfully", 
        userId: user.id,
        status: user.status // Return the status in the response
      }), 
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Register API error:", err);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: err.message }),
      { status: 500 },
    );
  }
}

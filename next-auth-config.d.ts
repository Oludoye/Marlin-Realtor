// next-auth-config.d.ts or types/next-auth.d.ts

import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Define a custom user object that matches what your authorize function returns
interface CustomUser extends DefaultUser {
  role?: string; // Optional role field
}

// Extend the session object's user property
declare module 'next-auth' {
  interface Session {
    user: CustomUser & DefaultSession['user'];
  }
  // Extend the default user type itself (used in jwt callback user object)
  interface User extends CustomUser {}
}

// Extend the JWT module
declare module 'next-auth/jwt' {
  interface JWT {
    role?: string; // Optional role field
  }
}

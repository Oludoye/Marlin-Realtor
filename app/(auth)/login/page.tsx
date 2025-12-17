// 'use client';

// import { useState } from 'react';
// import { signIn } from 'next-auth/react'; // Import the signIn function
// import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation for App Router
// import Link from 'next/link';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     // Call the signIn function with the 'credentials' provider ID
//     const result = await signIn('credentials', {
//       redirect: false, // Prevent NextAuth from redirecting automatically
//       email,
//       password,
//     });

//     if (result?.error) {
//       // Authentication failed
//       setError('❌ Invalid email or password. Please try again.');
//     } else {
//       // Authentication successful
//       // Redirect the user to the dashboard or home page
//       router.push('/dashboard'); 
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Sign In
//         </button>

//         {error && <p className="text-center text-sm mt-4 text-red-500">{error}</p>}

//         <p className="text-center text-sm mt-4">
//             Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Assuming you have defined the structure of your user session somewhere, e.g., types/next-auth.d.ts
interface UserSession {
    user: {
        id: string;
        name: string;
        email: string;
        role: 'TEAM_MEMBER' | 'AGENT' | 'ADMIN';
        status: 'PENDING' | 'APPROVED' | 'DENIED';
    };
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Call the signIn function with the 'credentials' provider ID
    const result = await signIn('credentials', {
      redirect: false, // Prevent NextAuth from redirecting automatically
      email,
      password,
    });

    setIsLoading(false);

    if (result?.error) {
      // Authentication failed due to invalid credentials OR pending status (as set in [...nextauth].ts)
      
      // Since NextAuth 'credentials' provider returns a generic 'CredentialsSignin' error 
      // if 'authorize' returns null, we need a better message if the user is PENDING.
      
      // A common pattern is to check the user status separately in case of an error 
      // related to authorization status rather than bad password.
      
      // A simple implementation here:
      if (result.error === "CredentialsSignin") {
           setError('❌ Invalid email or password, or your account requires admin approval.');
      } else {
           setError(result.error);
      }

    } else {
      // Authentication successful. Now we must manually fetch the session 
      // to access the role and status to route correctly.
      
      // Note: In a real app, you'd want to use useSession hook and wait for the session to update
      // before redirecting, or route via a middleware. For simplicity here:
      
      // We assume the user is approved because the NextAuth authorize function only returns approved users.
      
      // We rely on the /api/auth/[...nextauth]/route.ts logic: if it passed 'authorize', they are APPROVED.

      const userEmailDomain = email.split('@')[1]; // Simple heuristic or rely on API response
      
      // We can redirect based on assumed role or status now that login succeeded:

      // The backend logic ensures only APPROVED users log in. We assume the role 
      // is correct and use middleware later to enforce these paths.
      
      console.log("Login successful, pushing to dashboard check.");
      // The user session is now available globally via useSession()
      router.push('/dashboard-redirector'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
          disabled={isLoading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
          disabled={isLoading}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        {error && <p className="text-center text-sm mt-4 text-red-500">{error}</p>}

        <p className="text-center text-sm mt-4">
            Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}

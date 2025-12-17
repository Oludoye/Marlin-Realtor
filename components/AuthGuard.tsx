// components/AuthGuard.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const userRole = session?.user?.role;
  
  // Note: We already ensured status is APPROVED during the login API call, 
  // so we just check the role here.

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (userRole && !allowedRoles.includes(userRole)) {
        // Redirect if role is incorrect
        router.push('/unauthorized'); // Create an unauthorized page
      }
    }
  }, [isLoading, isAuthenticated, userRole, allowedRoles, router]);

  if (isLoading || !isAuthenticated || (userRole && !allowedRoles.includes(userRole))) {
    // Show a loading screen while checking auth status
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking authentication status...</p>
      </div>
    );
  }

  // If authorized, render the children (the actual dashboard page)
  return <>{children}</>;
};

export default AuthGuard;

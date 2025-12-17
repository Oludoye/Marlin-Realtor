// app/profile/layout.tsx

import ProfileDropdown from "@/components/ProfileDropdown";

export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* ✅ Top Bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">My Profile</h1>
  
          <nav className="flex gap-6 items-center text-sm">
          <ProfileDropdown/>
            <a href="/agent" className="hover:underline">
              Overview
            </a>
            <a href="/profile/settings" className="hover:underline">
              Settings
            </a>
            
            <a href="/" className="hover:underline">
              Home
            </a>
            
          </nav>
        </header>
  
        {/* ✅ Page Content */}
        <main className="p-6 max-w-5xl mx-auto">{children}</main>
      </div>
    );
  }
  
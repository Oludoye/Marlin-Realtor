'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
};

export default function SidebarNavigation() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      async function fetchUser() {
        try {
          const res = await fetch("/api/profile");
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
      fetchUser();
    }
  }, [session]);

  const menuItems = {
    Profile: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
      { id: 'edit-profile', label: 'Edit Profile', icon: '👤', path: '/profile/edit' },
      { id: 'add-listings', label: 'Add Listings', icon: '➕', path: '/profile/create-listing' },
    ],
    Support: [
      { id: 'faq-support', label: 'FAQ & Support', icon: '❓', path: '/agent/support' },
    ],
    Security: [
      { id: 'delete-account', label: 'Delete Account', icon: '🗑', path: '/delete-account' },
      { id: 'logout', label: 'Log Out', icon: '🚪', path: '/login' },
    ],
    Home: [
      { id: 'my-listings', label: 'My Listings', icon: '📋', path: '/agent/listings' },
      { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
    ],
  };

  return (
    <div className="w-80 bg-white shadow-lg min-h-screen p-6">
      {/* Profile Section */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-3">
          {user?.image ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : session?.user?.name?.charAt(0).toUpperCase() || 'G'}
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900">
              {user?.name || session?.user?.name || 'Guest User'}
            </h3>
            <p className="text-sm text-gray-600">
              {user?.email || session?.user?.email || 'Please Login'}
            </p>
            {session && (
              <Link
                href="/profile/edit"
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium inline-block"
              >
                Edit Profile →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-6">
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {category}
            </h4>

            <ul className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        if (item.id === 'logout') {
                          signOut({ callbackUrl: '/login' });
                          return;
                        }
                        router.push(item.path);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

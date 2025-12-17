'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import DarkModeToggle from "@/components/DarkModeToggle";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Marlin Estate
          </Link>
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <h1 className="font-bold text-xl">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        {/* <DarkModeToggle /> */}
        <ProfileDropdown />
      </div>
    </div>

          <div className="flex space-x-4 items-center">
            <Link href="/listings" className="text-gray-700 hover:text-blue-600">
              Browse
            </Link>
            <Link href="/agent" className="text-gray-700 hover:text-blue-600">
              Agents
            </Link>
           
            
            {status === 'loading' ? (
              <div>Loading...</div>
             ) : session ? (
              <div className="flex items-center space-x-4">
              {/* <span className="text-gray-700">Hello, {session.user.name}</span> */}
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex space-x-1">
                <Link 
                  href="/login" 
                  className="text-gray-700 my-2 mx-3 item-center hover:text-blue-600"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
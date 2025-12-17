"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black shadow-2xl rounded-4xl mb-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          Marlin
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/TeamSection" className="hover:text-blue-600 transition">About Us</Link>
          <Link href="/listings" className="hover:text-blue-600 transition">Properties</Link>
          <Link href="#FeaturedPropertySection" className="hover:text-blue-600 transition">Services</Link>
          <Link href="/SellProperty" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="bg-blue-950 text-white px-3 py-1 rounded-2xl hover:bg-blue-800 transition">
              Agent Login
            </button>
          </Link>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          menuOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 pb-4 space-y-2 bg-white shadow-inner rounded-b-2xl">
          <Link href="/aboutUs" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">
            About Us
          </Link>
          <Link href="/listings" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">
            Properties
          </Link>
          <Link href="/admin" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/testimonials" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

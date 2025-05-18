'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Responsive Logo */}
        <div className="text-2xl sm:text-3xl text-blue-600 font-serif font-bold">MedicalSched</div>

        {/* Desktop Links */}
        <div className="space-x-6 text-black text-xl font-serif hidden md:flex">
          <Link href="/Home"><span className="relative group cursor-pointer">Home<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span></Link>
          <Link href="/About"><span className="relative group cursor-pointer">About<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span></Link>
          <Link href="/Services"><span className="relative group cursor-pointer">Services<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span></Link>
          <Link href="/Doctors"><span className="relative group cursor-pointer">Doctors<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span></Link>
          <Link href="/Dashboard"><span className="relative group cursor-pointer">Dashboard<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span></Link>
          <Link href="/Contact"><span className="relative group cursor-pointer">Contact<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span></Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link href="/SignIn">
            <button className="w-28 border border-blue-600 text-blue-600 bg-white px-4 py-2 hover:bg-blue-50 transition">
              Sign In
            </button>
          </Link>
          <Link href="/Login">
            <button className="w-28 bg-blue-600 text-white border border-blue-600 px-4 py-2 hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-blue-600 cursor-pointer">
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 font-serif text-xl text-black">
          {/* Close Icon */}
          <button
            onClick={closeMenu}
            className="absolute top-5 right-5 text-3xl text-blue-600 cursor-pointer"
          >
            <FiX />
          </button>

          <Link href="#" onClick={closeMenu}>
            <span className="relative group cursor-pointer">Home<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span>
          </Link>
          <Link href="#" onClick={closeMenu}>
            <span className="relative group cursor-pointer">About<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span>
          </Link>
          <Link href="#" onClick={closeMenu}>
            <span className="relative group cursor-pointer">Services<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span>
          </Link>
          <Link href="#" onClick={closeMenu}>
            <span className="relative group cursor-pointer">Doctors<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span>
          </Link>
          <Link href="#" onClick={closeMenu}>
            <span className="relative group cursor-pointer">Dashboard<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span>
          </Link>
          <Link href="#" onClick={closeMenu}>
            <span className="relative group cursor-pointer">Contact<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></span>
          </Link>

          <div className="flex flex-col space-y-4 pt-6 w-2/3">
            <Link href="/SignIn" onClick={closeMenu}>
              <button className="w-full border border-blue-600 text-blue-600 bg-white px-4 py-2 hover:bg-blue-50 transition">
                Sign In
              </button>
            </Link>
            <Link href="/Login" onClick={closeMenu}>
              <button className="w-full bg-blue-600 text-white border border-blue-600 px-4 py-2 hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-3xl font-bold gradient-text">🍹 PopSip</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2">
          <Link href="/bartenders" className="px-4 py-2 hover:bg-orange-100 rounded-lg transition-colors">Browse Bartenders</Link>
          <Link href="/bartenders" className="px-4 py-2 hover:bg-orange-100 rounded-lg transition-colors">Packages</Link>
          <Link href="/join" className="px-4 py-2 hover:bg-orange-100 rounded-lg transition-colors">Become a Bartender</Link>
          <Link href="/bartenders" className="px-6 py-2 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all font-normal shadow-lg neon-glow">
            Book Now
          </Link>
        </nav>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-orange-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-orange-600 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-orange-600 my-1 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-orange-600 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-80" : "max-h-0"}`}>
        <nav className="flex flex-col gap-2 px-4 pb-4 bg-white/95 backdrop-blur-md">
          <Link 
            href="/bartenders" 
            className="px-4 py-3 hover:bg-orange-100 rounded-lg transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Bartenders
          </Link>
          <Link 
            href="/bartenders" 
            className="px-4 py-3 hover:bg-orange-100 rounded-lg transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Packages
          </Link>
          <Link 
            href="/join" 
            className="px-4 py-3 hover:bg-orange-100 rounded-lg transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Become a Bartender
          </Link>
          <Link 
            href="/bartenders" 
            className="px-6 py-3 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all font-normal shadow-lg neon-glow text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}

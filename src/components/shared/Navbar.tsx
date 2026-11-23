"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutGrid, ArrowLeftRight, Info, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Services",
      href: "/services",
      icon: <LayoutGrid className="w-4 h-4 text-gray-700" />,
    },
    {
      name: "Compare",
      href: "/compare",
      icon: <ArrowLeftRight className="w-4 h-4 text-gray-700" />,
    },
    {
      name: "About Us",
      href: "/about",
      icon: <Info className="w-4 h-4 text-gray-700" />,
    },
  ];

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2.5 text-[15px] font-medium text-gray-800 hover:text-[#121D4F] transition-colors"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Right: Book Now Button */}
        <div>
          <Link
            href="/book-now"
            className="inline-flex items-center justify-center bg-[#FFC107] hover:bg-[#eab000] text-white font-semibold text-[15px] px-10 py-3 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-5 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-gray-800 font-medium hover:text-[#121D4F]"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
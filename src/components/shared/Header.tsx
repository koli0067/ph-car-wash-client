"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Car, LayoutDashboard, UserCircle, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client"; // তোমার পাথ অনুযায়ী ঠিক করে নিও
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // বাইরে কোথাও ক্লিক করলে ড্রপডাউন বন্ধ হয়ে যাবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="w-full bg-[#121D4F] text-white border-b border-white/5 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Circular Logo */}
        <Link href="/" className="flex items-center group">
          <div className="w-12 h-12 rounded-full bg-[#1B2B6B] flex items-center justify-center shadow-md border border-white/10 overflow-hidden transition-transform duration-200 group-hover:scale-105">
            <Car className="w-7 h-7 text-[#FFC107]" />
          </div>
        </Link>

        {/* Right: Contact Info, WhatsApp & User Profile / Dropdown */}
        <div className="flex items-center gap-5 sm:gap-7 bg-[#16235E]/60 px-5 py-2.5 rounded-xl border border-white/5">
          {/* Phone Number */}
          <a
            href="tel:+8801706785160"
            className="text-sm sm:text-[15px] font-medium tracking-wide text-gray-100 hover:text-[#FFC107] transition-colors"
          >
            Call us now: <span className="font-semibold">+880170678-5160</span>
          </a>

          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/8801706785160"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-white hover:text-[#25D366] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
          </a>

          {/* User Auth State & Dropdown Menu */}
          {isPending ? (
            <div className="w-6 h-6 animate-pulse bg-gray-600 rounded-full" />
          ) : session ? (
            // ইউজার লগইন করা থাকলে নামসহ আইকন এবং ড্রপডাউন দেখাবে
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-2.5 py-1 rounded-lg text-white hover:text-[#FFC107] transition-colors cursor-pointer focus:outline-none"
                aria-label="User Menu"
              >
                <div className="relative flex items-center justify-center p-1.5 rounded-md bg-[#1B2B6B] border border-white/10">
                  <User className="w-4 h-4 text-[#FFC107]" />
                  <span className="absolute bottom-0 w-4 h-[2px] bg-[#FFC107] rounded-full" />
                </div>
                <span className="text-sm font-medium tracking-wide max-w-[120px] truncate">
                  {session.user.name}
                </span>
              </button>

              {/* Dropdown Box */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 text-gray-800 animate-in fade-in zoom-in-95 duration-150">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1 ">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 hover:text-[#121D4F] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-500" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 hover:text-[#121D4F] transition-colors"
                    >
                      <UserCircle className="w-4 h-4 text-gray-500" />
                      <span>My Profile</span>
                    </Link>
                  </div>

                  {/* Sign Out Action */}
                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ইউজার লগইন করা না থাকলে আগের মতো শুধু আইকন ও নিচে হলুদ দাগ দেখাবে
            <Link
              href="/sign-in"
              aria-label="User Account"
              className="relative inline-flex flex-col items-center justify-center p-2 text-white hover:text-[#FFC107] transition-colors cursor-pointer z-10"
            >
              <User className="w-5 h-5 pointer-events-none" />
              <span className="absolute bottom-0 w-6 h-[2px] bg-[#FFC107] rounded-full pointer-events-none" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
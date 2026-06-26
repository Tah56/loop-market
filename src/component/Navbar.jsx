"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown } from "@heroui/react";
import CustomTrigger from "./DropDown";

export default function AppNavbar() {
  const { data } = authClient.useSession();
  const user = data?.user;
  const role = data?.user?.role;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Browse Items", href: "/allproduct" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <nav className="w-full bg-zinc-950 border-b border-emerald-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="sm:hidden p-2 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

            <Link href="/" className="font-bold text-2xl tracking-tight text-white flex items-center gap-1">
              Loop<span className="text-emerald-400">-Market</span>
            </Link>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden sm:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link 
                href={`/dashboard/${role}`} 
                className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {user && role === "seller" && (
              <Link
                href="/seller/add-product"
                className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all"
              >
                + Sell Item
              </Link>
            )}

            {!user && (
              <Link
                href="/auth/signUp"
                className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium border border-emerald-500/50 hover:bg-emerald-900/50 text-emerald-400 rounded-2xl transition-all"
              >
                Log In
              </Link>
            )}

            {user && (
              <div className="flex items-center gap-3">
                <CustomTrigger user={user} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-zinc-950 border-t border-emerald-500/20 px-4 py-6 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium text-zinc-300 hover:text-emerald-400 rounded-2xl hover:bg-zinc-900 transition-all"
            >
              {item.label}
            </Link>
          ))}

          {user && role === "seller" && (
            <Link
              href="/seller/add-product"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-4 py-3 font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all"
            >
              + Sell an Item
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
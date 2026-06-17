"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown } from "@heroui/react";
import CustomTrigger from "./DropDown";

export default function AppNavbar() {
  const { data } = authClient.useSession();
  const user = data?.user;
  console.log(user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Browse Items", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="sm:hidden p-2 rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>

            <Link
              href="/"
              className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white"
            >
              Loop<span className="text-blue-600">-Market</span>
            </Link>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden sm:flex items-center gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {
                user && <Link href={'/dashboard'} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                    Dashboard
                </Link>
            }
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {user && (
              <Link
                href="/sell"
                className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950 rounded-full transition-colors"
              >
                + Sell Item
              </Link>
            )}
            {!user && (
              <Link
                href="/auth/signUp"
                className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950 rounded-full transition-colors"
              >
                Log In
              </Link>
            )}
            {user && (
              <div className=" items-center   gap-2">
              <CustomTrigger user={user}></CustomTrigger>
              </div>
            )}

            {/* Profile Avatar Placeholder */}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="sm:hidden id='mobile-menu' bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-2 pb-4 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/sell"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-4 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              + Sell an Item
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

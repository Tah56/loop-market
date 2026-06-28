"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import CustomTrigger from "./DropDown";

export default function AppNavbar() {
  const { data } = authClient.useSession();
  const user = data?.user;
  const role = data?.user?.role;

  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Browse Items", href: "/allproduct" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-zinc-950 border-b border-[#009966]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 rounded-md text-zinc-400 hover:text-[#009966]"
            >
              ☰
            </button>

            <Link
              href="/"
              className="font-bold text-2xl tracking-tight text-white"
            >
              Loop<span className="text-[#009966]">-Market</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-3">
            {menuItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                    ${
                      active
                        ? "bg-[#009966]/15 text-[#009966]"
                        : "text-zinc-400 hover:text-[#009966] hover:bg-zinc-900"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}

            {user && (
              <Link
                href={`/dashboard/${role}`}
                className={`px-4 py-2 md:hidden lg:flex rounded-xl text-sm font-medium transition-all
                  ${
                    pathname.startsWith("/dashboard")
                      ? "bg-[#009966]/15 text-[#009966]"
                      : "text-zinc-400 hover:text-[#009966] hover:bg-zinc-900"
                  }
                `}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {user && role === "seller" && (
              <Link
                href="/dashboard/seller/addProduct"
                className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium bg-[#009966] hover:bg-[#008055] text-white rounded-2xl transition-all"
              >
                + Sell Item
              </Link>
            )}

            {!user && (
              <Link
                href="/auth/signUp"
                className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium border border-[#009966]/50 text-[#009966] rounded-2xl hover:bg-[#009966]/10"
              >
                Log In
              </Link>
            )}

            {user && <CustomTrigger user={user} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-zinc-950 border-t border-[#009966]/20 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-2xl transition-all
                  ${
                    active
                      ? "bg-[#009966]/15 text-[#009966]"
                      : "text-zinc-300 hover:bg-zinc-900"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}

          
        </div>
      )}
    </nav>
  );
}
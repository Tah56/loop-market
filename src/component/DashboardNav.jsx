"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function DashboardNavbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between bg-zinc-900 border-b border-[#7ED957]/20 px-5 py-4">
        <h2 className="text-xl font-bold text-[#009966]">
          Loop Market
        </h2>

        <button
          onClick={() => setOpen(!open)}
          className="text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 bg-zinc-950 border-r border-[#7ED957]/20 transition-all duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="border-b border-[#7ED957]/20 p-6">
          <h1 className="text-3xl font-bold text-[#009966]">
            Loop Market
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Seller Dashboard
          </p>
        </div>

        {/* User Card */}
        <div className="m-4 rounded-3xl border border-[#7ED957]/20 bg-zinc-900 p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#7ED957] flex items-center justify-center text-black font-bold text-xl">
              T
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Tanzim Ahmed
              </h3>

              <p className="text-sm text-zinc-400">
                Seller Account
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 rounded-2xl px-4 py-3 text-zinc-300 hover:bg-[#7ED957]/10 hover:text-[#7ED957] transition-all"
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-6 left-4 right-4">
          <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 hover:bg-red-500/20 transition-all">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
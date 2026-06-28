"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Poppins } from "next/font/google";
import { authClient } from "@/lib/auth-client";


import { IoMdHome } from "react-icons/io";
import { PiPlus } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { FaRegClipboard } from "react-icons/fa";

import {
  BarChart3,
  Package,
  ShoppingCart,
  ShoppingBag,
  Users,
} from "lucide-react";

import { CreditCard } from "@gravity-ui/icons";
import DropDown from "./DropDown";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DashNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = authClient.useSession();
  const user = session.data?.user;

  const navItems =
    user?.role === "seller"
      ? [
          {
            icon: IoMdHome,
            href: "/dashboard/seller",
            label: "Overview",
          },
          {
            icon: PiPlus,
            href: "/dashboard/seller/addProduct",
            label: "Add Product",
          },
          {
            icon: Package,
            href: "/dashboard/seller/MyProduct",
            label: "My Products",
          },
          {
            icon: ShoppingBag,
            href: "/dashboard/seller/orders",
            label: "Orders",
          },
          {
            icon: BarChart3,
            href: "/dashboard/seller/analytics",
            label: "Analytics",
          },
          {
            icon: Users,
            href: "/dashboard/seller/edit-profile",
            label: "Profile",
          },
        ]
      : user?.role === "admin"
      ? [
          {
            icon: IoMdHome,
            href: "/dashboard/admin",
            label: "Overview",
          },
          {
            icon: Package,
            href: "/dashboard/admin/allproducts",
            label: "All Products",
          },
          {
            icon: Users,
            href: "/dashboard/admin/user",
            label: "Users",
          },
          {
            icon: ShoppingCart,
            href: "/dashboard/admin/all-orders",
            label: "Orders",
          },
          {
            icon: BarChart3,
            href: "/dashboard/admin/analytics",
            label: "Analytics",
          },
        ]
      : [
          {
            icon: IoMdHome,
            href: "/dashboard/buyer",
            label: "Overview",
          },
          {
            icon: ShoppingBag,
            href: "/dashboard/buyer/orders",
            label: "My Orders",
          },
          {
            icon: CiHeart,
            href: "/dashboard/buyer/wishlist",
            label: "Wishlist",
          },
          {
            icon: CreditCard,
            href: "/dashboard/buyer/payments",
            label: "Payment History",
          },
          {
            icon: Users,
            href: "/dashboard/buyer/edit-profile",
            label: "Profile",
          },
        ];

  return (
    <div className={poppins.className}>
      <nav className="sticky top-0 z-50 w-full border-b border-green-500/10 bg-zinc-950 backdrop-blur-xl">
        <header className="flex h-16 items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#009966] text-lg font-bold text-white">
                ♻
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Loop Market
                </h2>

                <p className="text-xs text-[#009966]">
                  Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop User */}

          <div className="flex">

          {user && (
            <div className="hidden md:flex items-center">
              <DropDown user={user} />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="rounded-xl p-2 text-zinc-300 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              >
              {isMenuOpen ? (
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
              </div>
        </header>

        {/* Mobile Menu */}
       {/* Mobile Menu */}
{isMenuOpen && (
  <div className=";lg:hidden border-t border-green-500/10 bg-zinc-950">
    <ul className="flex flex-col gap-2 p-5">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.label}>
            <Link
              href={item.href}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                text-zinc-300
                hover:bg-green-500/10
                hover:text-green-400
                transition-all
              "
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}

      {!user && (
        <>
          <li className="pt-4 border-t border-zinc-800">
            <Link href="/auth/login">
              <Button
                variant="bordered"
                className="w-full border-green-500 text-green-400"
              >
                Login
              </Button>
            </Link>
          </li>

          <li>
            <Link href="/auth/signup">
              <Button className="w-full bg-green-600 text-white hover:bg-green-500">
                Sign Up
              </Button>
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
)}
      </nav>
    </div>
  );
}
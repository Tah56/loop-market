"use client";

import { LogoFacebook } from "@gravity-ui/icons";
import { MailIcon, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Re<span className="text-[#00cc88]">Sell</span>Hub
            </h2>

            <p className="mt-4 text-zinc-400 leading-relaxed">
              Bangladesh's trusted marketplace for buying and selling
              second-hand products. Save money, reduce waste, and give items a
              second life.
            </p>

            <div className="flex gap-4 mt-6">
              <Link
                href="#"
                className="p-3 rounded-xl bg-zinc-900 hover:bg-[#009966] transition"
              >
                <LogoFacebook size={18} className="text-white" />
              </Link>

              <Link
                href="#"
                className="p-3 rounded-xl bg-zinc-900 hover:bg-[#009966] transition"
              >
                <FaInstagram size={18} className="text-white" />
              </Link>

              <Link
                href="#"
                className="p-3 rounded-xl bg-zinc-900 hover:bg-[#009966] transition"
              >
                <BsTwitterX size={18} className="text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link href="/" className="hover:text-[#00cc88] transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="hover:text-[#00cc88] transition"
                >
                  Browse Products
                </Link>
              </li>

              <li>
                <Link
                  href="/sell"
                  className="hover:text-[#00cc88] transition"
                >
                  Sell Product
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-[#00cc88] transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Categories
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>Electronics</li>
              <li>Mobile Phones</li>
              <li>Furniture</li>
              <li>Fashion</li>
              <li>Sports</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-zinc-400">
              <div className="flex items-center gap-3">
                <MailIcon size={18} className="text-[#00cc88]" />
                <span>support@resellhub.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#00cc88]" />
                <span>+880 1712-345678</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#00cc88]" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} ReSellHub. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/privacy" className="hover:text-[#00cc88] transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-[#00cc88] transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
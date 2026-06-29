'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 pt-16 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <Link href="/" className="font-bold text-2xl text-white flex items-center gap-1 mb-4">
              Loop<span className="text-emerald-400">-Market</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Sustainable second-hand marketplace.<br />
              Buy smart. Sell easy. Save the planet.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="w-9 h-9 bg-zinc-900 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">𝕏</div>
              <div className="w-9 h-9 bg-zinc-900 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">📘</div>
              <div className="w-9 h-9 bg-zinc-900 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">📷</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <div className="space-y-3 text-sm">
              <Link href="/browse" className="block hover:text-emerald-400 transition-colors">Browse Products</Link>
              <Link href="/sell" className="block hover:text-emerald-400 transition-colors">Sell an Item</Link>
              <Link href="/categories" className="block hover:text-emerald-400 transition-colors">Categories</Link>
              <Link href="/about" className="block hover:text-emerald-400 transition-colors">About Us</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-3 text-sm">
              <Link href="/help" className="block hover:text-emerald-400 transition-colors">Help Center</Link>
              <Link href="/contact" className="block hover:text-emerald-400 transition-colors">Contact Us</Link>
              <Link href="/safety" className="block hover:text-emerald-400 transition-colors">Safety Guidelines</Link>
              <Link href="/terms" className="block hover:text-emerald-400 transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-400" />
                <a href="mailto:support@loopmarket.com"  className="text-sm hover:text-white">support@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-400" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-emerald-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 LoopMarket. All rights reserved.</p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-emerald-400">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-400">Terms</Link>
            <Link href="/sustainability" className="hover:text-emerald-400">Sustainability</Link>
          </div>

          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart size={16} className="text-red-500" /> for a greener planet
          </p>
        </div>
      </div>
    </footer>
  );
}
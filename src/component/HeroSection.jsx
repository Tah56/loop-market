"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Package, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden flex items-center">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-950/40 via-zinc-950 to-zinc-950 z-0" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Content - Bigger & Cleaner */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-sm font-medium px-5 py-2.5 rounded-full mb-6">
                🌱 Sustainable Marketplace
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter leading-none">
                The Smart Way
                <br />
                To Buy & Sell
                <br />
                <span className="text-emerald-400">Pre-Owned Goods</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-zinc-400 max-w-xl"
            >
             
  Buy and sell pre-owned products in a trusted marketplace.
  Find amazing deals, earn money from unused items, and
  contribute to a more sustainable future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/browse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-emerald-600 hover:bg-emerald-500 px-10 py-5 rounded-2xl font-semibold text-xl flex items-center gap-3 shadow-xl shadow-emerald-500/20 transition-all"
                >
                  Browse Products
                  <ArrowRight size={26} />
                </motion.button>
              </Link>

              <Link href="/sell">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-emerald-500/50 hover:border-emerald-400 px-10 py-5 rounded-2xl font-semibold text-xl transition-all"
                >
                  Start Selling
                </motion.button>
              </Link>
            </motion.div>

            {/* Dynamic Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-12 pt-8 border-t border-zinc-800"
            >
              <div>
                <p className="text-5xl font-bold text-emerald-400">248</p>
                <p className="text-zinc-400">Active Listings</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-emerald-400">87</p>
                <p className="text-zinc-400">Trusted Sellers</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-emerald-400">1.2k</p>
                <p className="text-zinc-400">Deals Completed</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Visual Focus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden border border-emerald-500/20 shadow-2xl">
              <img
                src="https://picsum.photos/id/1015/800/900"
                alt="Marketplace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -top-6 -right-6 bg-emerald-600 text-white px-6 py-4 rounded-3xl shadow-xl flex flex-col items-center"
            >
              <span className="text-3xl font-bold">+15</span>
              <span className="text-sm -mt-1">New This Month</span>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 left-8 bg-zinc-900 border border-emerald-500/30 rounded-3xl p-5 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🛡️</div>
                <div>
                  <p className="font-semibold text-emerald-400">
                    Buyer Protection
                  </p>
                  <p className="text-xs text-zinc-400">100% Guaranteed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

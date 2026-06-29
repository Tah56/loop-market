"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Car,
  Shirt,
  Dumbbell,
  BookOpen,
  Sofa,
  House,
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: Monitor },
  { name: "Mobile Phones", icon: Smartphone },
  { name: "Vehicles", icon: Car },
  { name: "Fashion", icon: Shirt },
  { name: "Sports", icon: Dumbbell },
  { name: "Books", icon: BookOpen },
  { name: "Furniture", icon: Sofa },
  { name: "Home & Garden", icon: House },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function CategoriesSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00996620,transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#009966]/30 bg-[#009966]/10 px-4 py-2 text-sm font-medium text-[#00cc88]">
            Browse Categories
          </span>

          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Explore Popular Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 md:text-lg">
            Discover thousands of products across multiple categories from
            trusted sellers.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6"
        >
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={`/allproduct?category=${encodeURIComponent(item.name)}`}
                className="block h-full"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#00cc88]/40 hover:shadow-xl hover:shadow-[#009966]/10 md:p-8"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#009966]/5 via-transparent to-[#00cc88]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 8 }}
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#009966] to-[#00cc88] shadow-lg shadow-[#009966]/20 md:mb-5 md:h-16 md:w-16"
                    >
                      <Icon className="h-6 w-6 text-white md:h-7 md:w-7" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white md:text-lg">
                      {item.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="mt-2 text-xs text-zinc-400 md:text-sm">
                      Browse products
                    </p>

                    {/* Arrow */}
                    <div className="mt-auto pt-5">
                      <span className="text-sm font-medium text-[#00cc88] transition-all group-hover:translate-x-1 inline-flex">
                        Explore →
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
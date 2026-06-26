"use client";

import { useEffect, useState } from "react";
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
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00996620,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-[#009966]/30 bg-[#009966]/10 px-4 py-2 text-sm font-medium text-[#00cc88]">
            Browse Categories
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">
            Explore Popular Categories
          </h2>

          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Discover thousands of products across multiple categories
            from trusted sellers.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-zinc-800
                  bg-zinc-900/80
                  backdrop-blur-xl
                  p-8
                  cursor-pointer
                  transition-all
                "
              >
                {/* Hover Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    bg-linear-to-br
                    from-[#009966]/5
                    via-transparent
                    to-[#00cc88]/10
                  "
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 8,
                    }}
                    className="
                      mb-5
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-linear-to-br
                      from-[#009966]
                      to-[#00cc88]
                      shadow-lg
                      shadow-[#009966]/20
                    "
                  >
                    <Icon size={28} className="text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-2 text-sm text-zinc-400">
                    Browse products
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
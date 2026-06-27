"use client";

import { motion } from "framer-motion";
import { Recycle, ShieldCheck, Users, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  const features = [
    {
      icon: Recycle,
      title: "Sustainable Shopping",
      description:
        "Give products a second life and help reduce waste through responsible buying and selling.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Marketplace",
      description:
        "Verified sellers, secure transactions, and a growing community you can trust.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Connect with buyers and sellers across Bangladesh and discover amazing local deals.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Future",
      description:
        "Every reused item means fewer resources consumed and a greener future for everyone.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-28">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-green-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
              About Loop Market
            </span>

            <h2 className="mt-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
              Buy Smart.
              <br />
              Sell Fast.
              <br />
              <span className="text-green-400">Reuse Everything.</span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              Loop Market is a modern marketplace designed for buying and
              selling pre-owned products safely and efficiently. Our mission is
              simple — help people save money, earn extra income, and reduce
              unnecessary waste through a trusted circular economy.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              From electronics and fashion to furniture and vehicles, Loop
              Market makes it easy to connect with local buyers and sellers
              while promoting a more sustainable future.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-2xl bg-green-600 px-7 py-4 font-semibold text-white transition hover:bg-green-500"
                >
                  Explore Products
                  <ArrowRight size={18} />
                </motion.button>
              </Link>

              <Link href="/sell">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl border border-green-500/30 px-7 py-4 font-semibold text-green-400 transition hover:bg-green-500/10"
                >
                  Start Selling
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-900/70 p-7 backdrop-blur-xl"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                    <Icon size={30} className="text-white" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 grid grid-cols-2 gap-6 rounded-[40px] border border-zinc-800 bg-zinc-900/60 p-10 backdrop-blur-xl lg:grid-cols-4"
        >
          <div className="text-center">
            <h3 className="text-4xl font-bold text-green-400">10K+</h3>
            <p className="mt-2 text-zinc-400">Active Users</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-green-400">25K+</h3>
            <p className="mt-2 text-zinc-400">Products Listed</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-green-400">8K+</h3>
            <p className="mt-2 text-zinc-400">Successful Deals</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-green-400">99%</h3>
            <p className="mt-2 text-zinc-400">User Satisfaction</p>
          </div>
        </motion.div>
      </div>
      {/* Why Recycling Matters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-24 rounded-[40px] border border-green-500/10 bg-zinc-900/60 p-10 backdrop-blur-xl"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
              Sustainability Matters
            </span>

            <h3 className="mt-5 text-4xl font-bold text-white">
              Why Reuse Instead of Throw Away?
            </h3>

            <p className="mt-5 text-zinc-400 leading-relaxed">
              Millions of perfectly usable products end up as waste every year.
              By choosing to buy and sell pre-owned items, we reduce landfill
              waste, save valuable resources, and lower environmental impact.
            </p>

            <p className="mt-4 text-zinc-400 leading-relaxed">
              Every product reused through Loop Market contributes to a cleaner,
              greener, and more sustainable future. Small actions today create a
              better world tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-3xl border border-zinc-800 bg-black/30 p-6">
              <h4 className="text-4xl font-bold text-green-400">♻️</h4>
              <p className="mt-3 text-white font-semibold">Reduce Waste</p>
              <p className="mt-2 text-sm text-zinc-400">
                Keep usable products out of landfills.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black/30 p-6">
              <h4 className="text-4xl font-bold text-green-400">🌍</h4>
              <p className="mt-3 text-white font-semibold">Protect Nature</p>
              <p className="mt-2 text-sm text-zinc-400">
                Lower environmental impact through reuse.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black/30 p-6">
              <h4 className="text-4xl font-bold text-green-400">💰</h4>
              <p className="mt-3 text-white font-semibold">Save Money</p>
              <p className="mt-2 text-sm text-zinc-400">
                Find quality products at affordable prices.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black/30 p-6">
              <h4 className="text-4xl font-bold text-green-400">🤝</h4>
              <p className="mt-3 text-white font-semibold">Support Community</p>
              <p className="mt-2 text-sm text-zinc-400">
                Help local buyers and sellers connect.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <h3 className="text-3xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight">
          "Every item reused is one less item wasted. Together we can build a
          circular economy."
        </h3>

        <p className="mt-6 text-green-400 font-medium">— Loop Market Mission</p>
      </motion.div>
    </section>
  );
}

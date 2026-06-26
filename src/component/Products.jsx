"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function TopProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products`);
        const data = await res.json();
 const products = data
    .filter((product) => product.status === "Approved")
    .slice(0, 8);
        setProducts(products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-white mb-10">
            Top Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-zinc-900 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-[#009966]/10 border border-[#009966]/20 text-[#00cc88] text-sm">
              Featured Products
            </span>

            <h2 className="mt-5 text-5xl font-bold text-white">
              Top Products
            </h2>

            <p className="mt-3 text-zinc-400">
              Discover the most popular listings this week
            </p>
          </div>

          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-[#00cc88]"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 hover:border-[#009966]/40 transition-all"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  fill
                  sizes="(max-width:768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute top-4 left-4">
                  <span className="bg-[#009966] text-white text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white text-lg font-semibold line-clamp-1">
                  {product.title}
                </h3>

                <div className="flex items-center gap-2 text-zinc-400 mt-2">
                  <MapPin size={15} />
                  <span className="text-sm">
                    {product.location || "Bangladesh"}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <p className="text-2xl font-bold text-[#00cc88]">
                    ৳{product.price}
                  </p>

                  <Link
                    href={`/allproduct/${product._id}`}
                    className="px-4 py-2 rounded-xl bg-[#009966] text-white text-sm hover:bg-[#00b377] transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
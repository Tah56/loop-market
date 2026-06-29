'use client';

import { motion } from 'framer-motion';
import { Star, Verified } from 'lucide-react';

const topSellers = [
  {
    name: "TechVault Store",
    avatar: "https://picsum.photos/id/64/80/80",
    rating: 4.9,
    sales: "248",
    badge: "Top Rated",
    specialty: "Electronics"
  },
  {
    name: "Vintage Threads",
    avatar: "https://picsum.photos/id/65/80/80",
    rating: 4.8,
    sales: "187",
    badge: "Eco Seller",
    specialty: "Fashion"
  },
  {
    name: "Home Revival Co",
    avatar: "https://picsum.photos/id/66/80/80",
    rating: 4.9,
    sales: "156",
    badge: "Verified",
    specialty: "Home & Kitchen"
  }
];

export default function TrustedSellers() {
  return (
    <section className="py-20 bg-zinc-950 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Trusted Sellers</h2>
          <p className="text-zinc-400">Meet our top-rated community members</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topSellers.map((seller, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={seller.avatar} 
                  className="w-16 h-16 rounded-2xl object-cover border border-emerald-500/30" 
                  alt={seller.name}
                />
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {seller.name} 
                    <Verified className="text-emerald-400" size={18} />
                  </div>
                  <p className="text-sm text-emerald-400">{seller.specialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#10b981" className="text-emerald-400" />
                ))}
                <span className="ml-2 text-emerald-400 font-medium">{seller.rating}</span>
              </div>

              <div className="text-4xl font-bold text-white mb-1">{seller.sales}</div>
              <p className="text-zinc-400">Items Sold</p>

              <div className="mt-8 text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-4 py-2 inline-block rounded-full">
                {seller.badge}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
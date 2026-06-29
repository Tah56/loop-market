'use client';

import { motion } from 'framer-motion';
import { Package, Users, UserCheck, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MarketplaceStats() {
  const [stats, setStats] = useState({
    totalProducts: 1248,
    totalSellers: 87,
    totalBuyers: 3241,
    completedOrders: 8746
  });

  // Simulate live counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalProducts: prev.totalProducts + Math.floor(Math.random() * 3),
        totalSellers: prev.totalSellers,
        totalBuyers: prev.totalBuyers + Math.floor(Math.random() * 5),
        completedOrders: prev.completedOrders + Math.floor(Math.random() * 4)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    { 
      label: "Total Products", 
      value: stats.totalProducts.toLocaleString(), 
      icon: Package, 
      color: "text-emerald-400" 
    },
    { 
      label: "Active Sellers", 
      value: stats.totalSellers.toLocaleString(), 
      icon: UserCheck, 
      color: "text-blue-400" 
    },
    { 
      label: "Happy Buyers", 
      value: stats.totalBuyers.toLocaleString(), 
      icon: Users, 
      color: "text-purple-400" 
    },
    { 
      label: "Completed Orders", 
      value: stats.completedOrders.toLocaleString(), 
      icon: CheckCircle, 
      color: "text-amber-400" 
    },
  ];

  return (
    <section className="py-20 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3 text-white">Marketplace at a Glance</h2>
          <p className="text-zinc-400">Real numbers. Real impact. Growing every day.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
                <div className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full">
                  LIVE
                </div>
              </div>

              <div className="text-5xl font-bold text-white mb-2 tracking-tighter">
                {stat.value}
              </div>
              <p className="text-zinc-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-zinc-500">
          Updated in real-time • Last updated just now
        </div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Leaf, TreePine, Recycle, Award } from 'lucide-react';

export default function SustainabilityImpact() {
  return (
    <section className="py-20 bg-zinc-950 border-t text-white border-zinc-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full mb-4">
            🌍 Making a Difference
          </div>
          <h2 className="text-4xl font-bold mb-4">Sustainability Impact</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Every second-hand purchase helps reduce waste and carbon emissions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-zinc-900 rounded-3xl p-8 border border-emerald-500/20"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Leaf size={36} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">1.2M kg</h3>
            <p className="text-zinc-400">CO₂ emissions avoided</p>
            <p className="text-xs text-emerald-400 mt-4">Equivalent to planting 52,000 trees</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-zinc-900 rounded-3xl p-8 border border-emerald-500/20"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Recycle size={36} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">87,450</h3>
            <p className="text-zinc-400">Items diverted from landfill</p>
            <p className="text-xs text-emerald-400 mt-4">This month alone</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-zinc-900 rounded-3xl p-8 border border-emerald-500/20"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <TreePine size={36} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">42,000+</h3>
            <p className="text-zinc-400">Trees saved from paper waste</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-zinc-900 rounded-3xl p-8 border border-emerald-500/20"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Award size={36} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Gold Standard</h3>
            <p className="text-zinc-400">Certified sustainable marketplace</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
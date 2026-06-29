'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const successStories = [
  {
    id: 1,
    type: "Buyer",
    name: "Sarah Chen",
    avatar: "https://picsum.photos/id/64/80/80",
    story: "I saved over $800 buying a refurbished MacBook Pro instead of new. The quality is amazing and the seller was super responsive!",
    item: "MacBook Pro M1 2021",
    savings: "$820",
    rating: 5,
    location: "San Francisco, CA"
  },
  {
    id: 2,
    type: "Seller",
    name: "Marcus Rodriguez",
    avatar: "https://picsum.photos/id/65/80/80",
    story: "Sold my old camera gear within 3 days. Made $650 and cleared space in my garage. The platform made it so easy!",
    item: "Sony A7III Camera Kit",
    earnings: "$650",
    rating: 5,
    location: "Austin, TX"
  },
  {
    id: 3,
    type: "Buyer",
    name: "Aisha Patel",
    avatar: "https://picsum.photos/id/66/80/80",
    story: "Found the perfect vintage leather jacket for $120 (originally $450). The community here is so friendly and trustworthy.",
    item: "Vintage Leather Jacket",
    savings: "$330",
    rating: 5,
    location: "Chicago, IL"
  }
];

export default function SuccessStories() {
  return (
    <section className="py-20 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Real Stories, Real Impact</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            See how our community is making a difference through smart buying and selling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={story.avatar} 
                  alt={story.name}
                  className="w-14 h-14 rounded-full object-cover border border-emerald-500/30"
                />
                <div>
                  <p className="font-semibold">{story.name}</p>
                  <p className="text-emerald-400 text-sm">{story.type}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#10b981" className="text-emerald-400" />
                ))}
              </div>

              <p className="text-zinc-300 leading-relaxed italic mb-6">
                "{story.story}"
              </p>

              <div className="pt-6 border-t border-zinc-800">
                <div className="text-sm text-zinc-400">
                  Bought/Sold: <span className="text-white font-medium">{story.item}</span>
                </div>
                <div className="mt-2 text-emerald-400 font-semibold">
                  {story.savings ? `Saved ${story.savings}` : `Earned ${story.earnings}`}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-emerald-400 text-sm font-medium tracking-widest">JOIN 12,458+ HAPPY MEMBERS</p>
        </div>
      </div>
    </section>
  );
}
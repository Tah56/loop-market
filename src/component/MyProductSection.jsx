"use client";

import React from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Delete } from "./Delete";

export default function MyProductCard({ data }) {
  // Mock handler for cart interaction
  const handleAddToCart = () => {
    console.log("Product added to cart!");
  };

  return (
    <div>
      {data.map((product) => {
        return (
          <div key={product._id} className="w-full max-w-90 bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden border border-zinc-100 flex flex-col font-sans">
            {/* Top Section: Yellow Background Image Container */}
            <div className="relative w-full aspect-4/3 flex items-center justify-center p-6 overflow-hidden">
              {/* Badge */}
              <span className="absolute top-5 left-5  text-[#111827] text-xs font-bold px-4 py-2 rounded-full shadow-xs">
                Best Seller
              </span>

              {/* Product Image */}
              {/* Replace the src path with your local headphones image asset */}
              <Image
                src={product.images[0]}
                alt={product.title}
                className="w-4/5 h-4/5 object-contain mix-blend-multiply drop-shadow-md"
                width={200}
                height={200}
              />
            </div>

            {/* Bottom Section: Product Content Information */}
            <div className="p-6 flex flex-col grow">
              {/* Title */}
              <h3 className="text-xl font-black text-[#0F172A] leading-tight tracking-tight mb-3">
              {product.title}
              </h3>

              {/* Rating Stars (Using clean inline SVGs matching Hero UI style) */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-[#F59E0B] fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                {/* Unfilled star */}
                <svg
                  className="w-4 h-4 text-zinc-300 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z" />
                </svg>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-[#0F172A] tracking-tight">
                 {product.price}
                </span>
                <span className="text-sm font-semibold text-zinc-400 line-through">
                  $129
                </span>
              </div>

              {/* Hero UI CTA Button */}
             <div className="flex flex-col gap-2">
                 <Link className="" href={`/allproduct/${product._id}`}>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-sm tracking-wide rounded-xl py-6 transition-colors mt-auto"
                startContent={
                    <svg
                    className="w-4 h-4 mr-1 fill-current"
                    viewBox="0 0 24 24"
                    >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                }
                >
                Add to Cart
              </Button>
                  </Link>
                 <Link href={`/dashboard/seller/edit-product/${product._id}`}>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-sm tracking-wide rounded-xl py-6 transition-colors mt-auto"
                startContent={
                    <svg
                    className="w-4 h-4 mr-1 fill-current"
                    viewBox="0 0 24 24"
                    >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                }
                >
            Edit Product 
              </Button>
                  </Link>
                    <Delete></Delete>
             </div>
                  
            </div>
          </div>
        );
      })}
    </div>
  );
}

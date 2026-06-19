"use client";

import React from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ data }) {
  // Mock handler for cart interaction
  const handleAddToCart = () => {
    console.log("Product added to cart!");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((product) =>{
        return(

          
          product.status==="Approved"&&
          <div
          key={product._id}
          className="w-65 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all"
          >
          {/* Badge */}
          <div className="mb-3">
            <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              Hot
            </span>
          </div>

          {/* Product Image */}
          <div className="flex justify-center items-center h-44 mb-4">
            <Image
              src={product.images?.[0]}
              alt={product.title}
              width={180}
              height={180}
              className="object-contain h-full w-full"
              />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.title}
          </h3>

          {/* Category */}
          <p className="text-sm text-gray-400 mt-1">
            {product.category || "OLED TV"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <svg
              key={i}
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mt-3 text-green-600 text-sm font-medium">
            <span>✔</span>
            <span>In Stock</span>
          </div>

          {/* Price */}
          <div className="mt-3">
            <p className="text-2xl font-bold text-blue-600">${product.price}</p>
          </div>

          {/* Add To Cart */}
          <Link href={`/allproduct/${product._id}`}>
            <Button
              className="w-full mt-4 bg-blue-600 text-white font-medium rounded-md"
              size="lg"
              >
              Add To Cart
            </Button>
          </Link>

          {/* SKU */}
          <p className="mt-4 text-xs text-gray-400">
            SKU: {product._id?.slice(-6)}
          </p>
        </div>
  )
    } 
  )}
  </div>
  );
}

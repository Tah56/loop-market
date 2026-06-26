"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BrowseProducts({ filters,data }) {
  
  const [filteredProducts, setFilteredProducts] = useState(data);

  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [category, setCategory] = useState(filters.category||"");
  const [condition, setCondition] = useState(filters.condition||'');
  const [sortBy, setSortBy] = useState("newest");
  const router = useRouter();

  useEffect(() => {
    const approvedProducts = data.filter(
      (product) => product.status === "Approved",
    );

    
    setFilteredProducts(approvedProducts);
  }, [data]);

  useEffect(() => {
    // Search
    const sp = new URLSearchParams();

    if (searchTerm) {
      sp.set("search",searchTerm)
    }

    if (category !== "") {
      sp.set("category", category);
    }

    if (condition !== "") {
      sp.set("condition", condition);
    }
    console.log("search", sp.toString());
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [category,searchTerm, router,condition]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-1 text-emerald-400">
          Browse Products
        </h1>

        <p className="text-zinc-400 mb-8">
          {filteredProducts.length} items found
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-emerald-600/30 pl-12 py-4 rounded-2xl focus:outline-none focus:border-emerald-500 text-lg placeholder:text-zinc-500"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Category */}
          <select
            value={
              category === "all" ? "All Categories" : category.replace("-", "")
            }
            onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-900 border border-emerald-600/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Fashion">Fashion</option>
            <option value="Sports">Sports</option>
          </select>

          {/* Condition */}
          <select
            value={
              condition === "all"
                ? "All Conditions"
                : condition.replace("-", "")
            }
            onChange={(e) => setCondition(e.target.value)}
            className="bg-zinc-900 border border-emerald-600/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Conditions</option>
            <option value="New">New</option>
            <option value="LikeNew">Like-New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 border border-emerald-600/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-emerald-500 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  className="w-full aspect-4/3 object-cover group-hover:scale-105 transition duration-300"
                />

                <div
                  className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${
                    product.condition === "New" ||
                    product.condition === "Like-New"
                      ? "bg-emerald-500 text-black"
                      : "bg-amber-500 text-black"
                  }`}
                >
                  {product.condition}
                </div>

                <div className="absolute top-3 right-3 bg-black/70 text-xs px-2 py-1 rounded-full text-emerald-300">
                  👁 {product.views || 0}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <div className="text-sm text-zinc-400 mb-3">
                  📍 {product.seller?.location || product.sellerInfo?.location}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-400 text-3xl font-bold">
                      ৳{product.price}
                    </p>

                    <p className="text-xs text-zinc-500">
                      Stock: {product.stock || 0}
                    </p>
                  </div>

                  <div className="text-amber-400">⭐ {product.rating || 0}</div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link href={`/allproduct/${product._id}`} className="flex-1">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all">
                      <ShoppingCart size={18} />
                      View Deal
                    </button>
                  </Link>

                  <button
                    onClick={() => toast.success("Added to wishlist ❤️")}
                    className="px-4 border border-zinc-700 hover:bg-zinc-800 rounded-2xl transition-all"
                  >
                    <Heart size={20} className="text-emerald-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-zinc-300">
              No products found
            </h3>

            <p className="text-zinc-500 mt-2">
              Try changing filters or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, X, Trash2, Search } from "lucide-react";
import Link from "next/link";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API;

  // Fetch Products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search and tab
  useEffect(() => {
    let result = products;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.seller?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (activeTab !== "All") {
      result = result.filter((product) => product.status === activeTab);
    }

    setFilteredProducts(result);
  }, [searchTerm, activeTab, products]);

  // Handle Actions (Approve, Reject, Delete)
  const handleAction = async (action, product) => {
    setActionLoading(product._id || product.id);

    try {
      let endpoint = "";
      let method = "PATCH";
      let body = {};

      if (action === "approve") {
        endpoint = `/api/products/${product._id}`;
        body = { status: "Approved" };
      } else if (action === "reject") {
        endpoint = `/api/products/${product._id}`;
        body = { status: "Rejected" };
      } else if (action === "delete") {
        endpoint = `/api/products/${product._id}`;
        method = "DELETE";
      } else {
        toast.info(`Viewing: ${product.title}`);
        return;
      }

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method !== "DELETE" ? JSON.stringify(body) : null,
      });

      if (res.ok) {
        toast.success(
          `${action.charAt(0).toUpperCase() + action.slice(1)}d successfully!`,
        );
        fetchProducts(); // Refresh list
      } else {
        toast.error("Action failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Manage Products</h1>

        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 pl-11 py-3 rounded-2xl focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-1 bg-zinc-900 p-1 rounded-2xl">
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
          {loading ? (
            <div className="text-center py-20 text-zinc-500">
              Loading products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              No products found
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id || product.id}
                className="flex items-center gap-4 px-6 py-5 border-b border-zinc-800 hover:bg-zinc-800/50 transition-all group"
              >
                <img
                  src={
                    product.image ||
                    product.mainImage ||
                    "https://picsum.photos/id/180/60/60"
                  }
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded-2xl"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">
                    {product.title}
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    {product.category} • Seller: {product.seller?.name}
                  </p>
                </div>

                <div className="text-right w-28">
                  <p className="text-emerald-400 font-semibold text-xl">
                    ${product.price?.toLocaleString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                      product.status === "Approved"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : product.status === "Pending"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-all">
                  <Link href={`/allproduct/${product._id}`}>
                    <button className="p-3 hover:bg-zinc-800 rounded-xl">
                      <Eye size={20} />
                    </button>
                  </Link>

                  {product.status !== "Approved" && (
                    <button
                      onClick={() => handleAction("approve", product)}
                      disabled={actionLoading === product._id}
                      className="p-3 hover:bg-emerald-900/30 rounded-xl text-emerald-400"
                    >
                      ✓
                    </button>
                  )}

                  {product.status !== "Rejected" && (
                    <button
                      onClick={() => handleAction("reject", product)}
                      disabled={actionLoading === product._id}
                      className="p-3 hover:bg-red-900/30 rounded-xl text-red-400"
                    >
                      <X size={20} />
                    </button>
                  )}

                  <button
                    onClick={() => handleAction("delete", product)}
                    disabled={actionLoading === product._id}
                    className="p-3 hover:bg-red-900/30 rounded-xl text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

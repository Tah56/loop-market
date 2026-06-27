'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, Edit2, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function MyProducts({data}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
      
      // Mock Data (Remove when backend is ready)
      const mockData = [
        {
          _id: "1",
          title: "iPhone 13 Pro Max 256GB",
          category: "Mobile Phones",
          price: 750,
          stock: 3,
          status: "Approved",
          image: "https://picsum.photos/id/1015/80/80"
        },
        {
          _id: "2",
          title: "Samsung 55 4K OLED TV",
          category: "Electronics",
          price: 620,
          stock: 2,
          status: "Pending",
          image: "https://picsum.photos/id/180/80/80"
        },
        {
          _id: "3",
          title: "Samsung Galaxy S22 Ultra",
          category: "Mobile Phones",
          price: 680,
          stock: 5,
          status: "Approved",
          image: "https://picsum.photos/id/201/80/80"
        },
        {
          _id: "4",
          title: "Mountain Bike Trek Marlin 7",
          category: "Sports",
          price: 950,
          stock: 5,
          status: "Approved",
          image: "https://picsum.photos/id/1074/80/80"
        },
      ];
      setProducts(mockData);
      setFilteredProducts(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search Filter
  useEffect(() => {
    let result = products;
    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchTerm, products]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`${API_BASE}/api/seller/products/${id}`, { method: 'DELETE' });
      toast.success("Product deleted successfully");
      fetchProducts(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-6xl min-h-screen mx-auto">
        {/* Header */}
        <div className="flex  justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Products ({filteredProducts.length})</h1>
          <Link
            href="/seller/add-product"
            className=" bg-[#009966] hover:bg-[#009966]/80 px-6 py-3 rounded-2xl flex items-center gap-2 font-medium transition-all"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        {/* Products List */}
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
          {loading ? (
            <div className="text-center py-20 text-zinc-500">Loading your products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">No products found</div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-wrap items-center gap-6 px-8 py-6 border-b border-zinc-800 hover:bg-zinc-800/50 transition-all last:border-none"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
                  <img 
                    src={product.image || product.images?.[0]} 
                    alt={product.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400">
                      New
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      product.status === 'Approved' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold text-2xl">${product.price}</p>
                  <p className="text-xs text-zinc-500">Stock: {product.stock}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/allproduct/${product._id}`} className="p-3 hover:bg-zinc-800 rounded-xl transition-all">
                    <Eye size={20} />
                  </Link>
                  <Link href={`/dashboard/seller/edit-product/${product._id}`} className="p-3 hover:bg-zinc-800 rounded-xl transition-all">
                    <Edit2 size={20} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="p-3 hover:bg-red-900/30 rounded-xl text-red-400 hover:text-red-500 transition-all"
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
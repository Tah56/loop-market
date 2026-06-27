'use client';

import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, TrendingUp, Heart } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { ShoppingCart } from '@gravity-ui/icons';

export default function BuyerOverview() {
  const [stats, setStats] = useState({
    totalPurchases: 0,
    activeOrders: 0,
    totalSpent: 0,
    wishlistCount: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';

  const fetchBuyerData = async () => {
    setLoading(true);
    try {
      const { data: session } = await authClient.getSession();
      
      if (!session?.user?.email) {
        toast.error("Please login");
        return;
      }

      const res = await fetch(`${API_BASE}/api/overview?email=${session.user.email}`);
      const data = await res.json();
      console.log(data);
      

      setStats({
        totalPurchases: data.totalOrders || 0,
        activeOrders: data.active || 0,
        totalSpent: data.totalSpent || 0,
        wishlistCount: data.wishlistCount || 0
      });

      setRecentOrders(data.recentOrders || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
      
      // Mock Data
      setStats({
        totalPurchases: 12,
        activeOrders: 3,
        totalSpent: 2840,
        wishlistCount: 8
      });
      setRecentOrders([
        { id: "#MQRU7DDO", product: "Nike Air Jordan 4", amount: 307.8, status: "Delivered" },
        { id: "#KX92PLO4", product: "Sony WH-1000XM5", amount: 398, status: "Shipped" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Buyer Overview</h1>
        <p className="text-zinc-400 mb-10">Welcome back! Here's your activity summary</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-400 text-sm">Total Purchases</p>
                <p className="text-4xl font-bold mt-2">{stats.totalPurchases}</p>
              </div>
              <Package className="text-emerald-400" size={32} />
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-400 text-sm">Active Orders</p>
                <p className="text-4xl font-bold mt-2 text-blue-400">{stats.activeOrders}</p>
              </div>
              <Clock className="text-blue-400" size={32} />
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-400 text-sm">Total Spent</p>
                <p className="text-4xl font-bold mt-2 text-emerald-400">${stats.totalSpent}</p>
              </div>
              <TrendingUp className="text-emerald-400" size={32} />
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-400 text-sm">Wishlist</p>
                <p className="text-4xl font-bold mt-2">{stats.wishlistCount}</p>
              </div>
              <Heart className="text-red-400" size={32} />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            <Link href="/buyer/orders" className="text-emerald-400 hover:text-emerald-500 text-sm flex items-center gap-1">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-zinc-900 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 border border-zinc-800">
                <div className="flex-1">
                  <h3 className="font-semibold">{order.product}</h3>
                  <p className="text-zinc-500 text-sm mt-1">Order ID: {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold text-xl">${order.amount}</p>
                  <div className={`inline-block px-4 py-1 text-xs rounded-full mt-2 ${
                    order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/buyer/orders" className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-emerald-500 transition-all group">
            <Package className="text-emerald-400 mb-4" size={32} />
            <h3 className="font-semibold text-xl">My Orders</h3>
            <p className="text-zinc-400 text-sm mt-2">Track your purchases</p>
          </Link>

          <Link href="/buyer/wishlist" className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-emerald-500 transition-all group">
            <Heart className="text-red-400 mb-4" size={32} />
            <h3 className="font-semibold text-xl">Wishlist</h3>
            <p className="text-zinc-400 text-sm mt-2">Saved items</p>
          </Link>

          <Link href="/browse" className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-emerald-500 transition-all group">
            <ShoppingCart className="text-blue-400 mb-4" size={32} />
            <h3 className="font-semibold text-xl">Browse More</h3>
            <p className="text-zinc-400 text-sm mt-2">Discover new deals</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
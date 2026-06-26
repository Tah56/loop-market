'use client';

import { useState, useEffect } from 'react';
import { Plus, Eye, TrendingUp, Package, DollarSign } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    myProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeListings: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [productStats, setProductStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0
  });

  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: session } = await authClient.getSession();
      
      if (!session?.user?.email) {
        toast.error("Please login as seller");
        return;
      }

      const res = await fetch(`${API_BASE}/api/seller/dashboard/${session.user.email}`);
      const data = await res.json();

      setStats({
        myProducts: data.myProducts || 0,
        totalOrders: data.totalOrders || 0,
        totalRevenue: data.totalRevenue || 0,
        activeListings: data.activeListings || 0
      });

      setRecentOrders(data.recentOrders || []);
      setProductStats({
        approved: data.approved || 0,
        pending: data.pending || 0,
        rejected: data.rejected || 0
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
      // Fallback mock data
      setStats({
        myProducts: 4,
        totalOrders: 5,
        totalRevenue: 3050,
        activeListings: 3
      });
      setRecentOrders([
        { id: "#MQRU7DDO", product: "iPhone 13 Pro Max 256GB", buyer: "Chris Wang", amount: 810, status: "Pending" },
        { id: "#MQR1EX43", product: "iPhone 13 Pro Max 256GB", buyer: "Admin User", amount: 810, status: "Delivered" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Seller Dashboard</h1>
            <p className="text-zinc-400 mt-1">Welcome back, Alex!</p>
          </div>
          <Link
            href="/seller/add-product"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-2xl">
                📦
              </div>
              <div>
                <p className="text-4xl font-bold">{stats.myProducts}</p>
                <p className="text-zinc-400 text-sm">My Products</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-2xl">
                📋
              </div>
              <div>
                <p className="text-4xl font-bold">{stats.totalOrders}</p>
                <p className="text-zinc-400 text-sm">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-2xl">
                💰
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-400">${stats.totalRevenue}</p>
                <p className="text-zinc-400 text-sm">Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-2xl">
                📈
              </div>
              <div>
                <p className="text-4xl font-bold">{stats.activeListings}</p>
                <p className="text-zinc-400 text-sm">Active Listings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            <Link href="/seller/orders" className="text-emerald-400 hover:text-emerald-500 flex items-center gap-1 text-sm">
              View All →
            </Link>
          </div>

          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-8 py-5 border-b border-zinc-800 hover:bg-zinc-800/50 transition-all">
                <div className="flex-1">
                  <p className="font-semibold">{order.product}</p>
                  <p className="text-sm text-zinc-500">Buyer: {order.buyer}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-block px-4 py-1 rounded-full text-xs font-medium mb-1 ${
                    order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {order.status}
                  </div>
                  <p className="font-semibold text-emerald-400">${order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Status */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Products Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 rounded-3xl p-8 text-center border border-zinc-800">
              <p className="text-5xl font-bold text-emerald-400 mb-2">{productStats.approved}</p>
              <p className="text-zinc-400">Approved</p>
            </div>
            <div className="bg-zinc-900 rounded-3xl p-8 text-center border border-zinc-800">
              <p className="text-5xl font-bold text-amber-400 mb-2">{productStats.pending}</p>
              <p className="text-zinc-400">Pending</p>
            </div>
            <div className="bg-zinc-900 rounded-3xl p-8 text-center border border-zinc-800">
              <p className="text-5xl font-bold text-red-400 mb-2">{productStats.rejected}</p>
              <p className="text-zinc-400">Rejected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
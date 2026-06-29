'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Package, DollarSign, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import { ShoppingCart } from '@gravity-ui/icons';

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalUsers: 1248,
    totalProducts: 3420,
    totalOrders: 1876,
    totalRevenue: 458920,
    avgOrderValue: 244.5
  });

  const [monthlySales, setMonthlySales] = useState([
    { month: 'Jan', sales: 12400 },
    { month: 'Feb', sales: 19800 },
    { month: 'Mar', sales: 15200 },
    { month: 'Apr', sales: 23100 },
    { month: 'May', sales: 28900 },
    { month: 'Jun', sales: 32400 },
  ]);

  const [categoryData, setCategoryData] = useState([
    { name: 'Electronics', value: 35, color: '#10b981' },
    { name: 'Fashion', value: 28, color: '#3b82f6' },
    { name: 'Home', value: 22, color: '#8b5cf6' },
    { name: 'Sports', value: 15, color: '#f59e0b' },
  ]);

  const [topProducts, setTopProducts] = useState([
    { name: "iPhone 13 Pro", sales: 87, revenue: 124500 },
    { name: "Sony WH-1000XM5", sales: 64, revenue: 89200 },
    { name: "Nike Air Jordan", sales: 52, revenue: 67800 },
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
            <p className="text-zinc-400 mt-1">Platform performance overview</p>
          </div>
          <div className="text-emerald-400 text-sm">Last updated: Just now</div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-emerald-500/20">
            <Users className="text-emerald-400 mb-4" size={32} />
            <p className="text-4xl font-bold text-emerald-400">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-zinc-400 text-sm">Total Users</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-6 border border-emerald-500/20">
            <Package className="text-emerald-400 mb-4" size={32} />
            <p className="text-4xl font-bold text-emerald-400">{stats.totalProducts.toLocaleString()}</p>
            <p className="text-zinc-400 text-sm">Total Products</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-6 border border-emerald-500/20">
            <ShoppingCart className="text-emerald-400 mb-4" size={32} />
            <p className="text-4xl font-bold text-emerald-400">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-zinc-400 text-sm">Total Orders</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-6 border border-emerald-500/20">
            <DollarSign className="text-emerald-400 mb-4" size={32} />
            <p className="text-4xl font-bold text-emerald-400">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-zinc-400 text-sm">Total Revenue</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-6 border border-emerald-500/20">
            <TrendingUp className="text-emerald-400 mb-4" size={32} />
            <p className="text-4xl font-bold text-emerald-400">${stats.avgOrderValue}</p>
            <p className="text-zinc-400 text-sm">Avg Order Value</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Trend Chart */}
          <div className="bg-zinc-900 rounded-3xl p-8 border border-emerald-500/20">
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <BarChart3 size={24} className="text-emerald-400" /> Monthly Sales Trend
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#52525b" />
                <YAxis stroke="#52525b" />
                <Tooltip />
                <Line type="natural" dataKey="sales" stroke="#10b981" strokeWidth={4} dot={{ fill: '#10b981', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-zinc-900 rounded-3xl p-8 border border-emerald-500/20">
            <h3 className="font-semibold text-xl mb-6">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }}></div>
                  <div>
                    <p className="text-sm">{cat.name}</p>
                    <p className="text-emerald-400 font-medium">{cat.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-6">Top Performing Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topProducts.map((product, i) => (
              <div key={i} className="bg-zinc-900 rounded-3xl p-6 border border-emerald-500/20">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-lg">{product.name}</p>
                    <p className="text-emerald-400 text-2xl font-bold mt-2">${product.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-400 text-sm">Sold</p>
                    <p className="text-3xl font-bold text-white">{product.sales}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
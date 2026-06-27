'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, Truck, PackageCheck } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function SellerOrders({sellerId}) {
  console.log(sellerId);
  
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';

  const fetchSellerOrders = async () => {
    setLoading(true);
    try {
      const { data: session } = await authClient.getSession();
      
      if (!session?.user) {
        toast.error("Please login as seller");
        return;
      }

      const res = await fetch(`${API_BASE}/api/seller/${session.user.email}`);
      const data = await res.json();

      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
      setOrders(mockSellerOrders);
      setFilteredOrders(mockSellerOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  // Real-time polling
  useEffect(() => {
    const interval = setInterval(fetchSellerOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Mock Data (remove when backend ready)
  const mockSellerOrders = [
    {
      _id: "1",
      orderId: "#MQRU7DDO",
      productName: "Nike Air Jordan 4 Retro",
      buyerName: "Alex Rivera",
      amount: 307.80,
      qty: 1,
      orderStatus: "Pending",
      image: "https://picsum.photos/id/20/70/70"
    },
    {
      _id: "2",
      orderId: "#MQR1EX43",
      productName: "MacBook Pro M1 2021",
      buyerName: "Jordan Lee",
      amount: 1188.00,
      qty: 1,
      orderStatus: "Processing",
      image: "https://picsum.photos/id/201/70/70"
    },
  ];

  // Filter
  useEffect(() => {
    let result = orders;

    if (searchTerm) {
      result = result.filter(order =>
        order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeTab !== 'All') {
      result = result.filter(order => order.orderStatus === activeTab);
    }

    setFilteredOrders(result);
  }, [searchTerm, activeTab, orders]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setActionLoading(orderId);

    setOrders(prev =>
      prev.map(order =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    try {
      await fetch(`${API_BASE}/api/seller/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus })
      });

      toast.success(`Order updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update order");
      fetchSellerOrders();
    } finally {
      setActionLoading(null);
    }
  };

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-6">
      <Toaster position="top-center" richColors />

      {sellerId.status==='active'?
      (<div className="mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Seller Orders</h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        {/* Tabs - Scrollable on mobile */}
        <div className="flex flex-wrap justify-between items-center  gap-2 bg-zinc-900 p-1 rounded-2xl mb-8  pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                activeTab === tab 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20 text-zinc-500">Loading your orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">No orders found.</div>
          ) : (
            filteredOrders.map((order) => (
              <div
  key={order._id}
  className="bg-zinc-900 rounded-3xl p-4 sm:p-6 border border-zinc-800 hover:border-zinc-700 transition-all"
>
  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

    {/* Product Info */}
    <div className="flex gap-4 flex-1 min-w-0">
      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
        <img
          src={order.image}
          alt={order.productName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-base sm:text-lg truncate">
          {order.productName}
        </h3>

        <p className="text-zinc-500 text-sm">
          Order {order.orderId}
        </p>

        <p className="text-zinc-500 text-sm truncate">
          Buyer: {order.buyerName}
        </p>
      </div>
    </div>

    {/* Price */}
    <div className="flex items-center justify-between lg:block lg:text-right">
      <p className="text-emerald-400 font-semibold text-xl">
        ${order.amount}
      </p>

      <p className="text-xs text-zinc-500">
        Qty: {order.qty}
      </p>
    </div>

    {/* Actions */}
    <div className="w-full lg:w-56 flex flex-col gap-3">

      <div
        className={`px-4 py-2 text-center rounded-2xl text-sm font-medium ${
          order.orderStatus === "Pending"
            ? "bg-amber-500/10 text-amber-400"
            : order.orderStatus === "Processing"
            ? "bg-blue-500/10 text-blue-400"
            : order.orderStatus === "Shipped"
            ? "bg-purple-500/10 text-purple-400"
            : "bg-emerald-500/10 text-emerald-400"
        }`}
      >
        {order.orderStatus}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">

        {order.orderStatus === "Pending" && (
          <button
            onClick={() =>
              handleStatusUpdate(order._id, "Processing")
            }
            disabled={actionLoading === order._id}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-2xl text-sm font-medium disabled:opacity-70"
          >
            Accept
          </button>
        )}

        {order.orderStatus === "Processing" && (
          <button
            onClick={() =>
              handleStatusUpdate(order._id, "Shipped")
            }
            disabled={actionLoading === order._id}
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <Truck size={18} />
            Ship
          </button>
        )}

        <Link
          href={`/seller/orders/${order._id}`}
          className="flex items-center justify-center px-5 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl sm:w-auto w-full"
        >
          <Eye size={20} />
        </Link>
      </div>
    </div>
  </div>
</div>
            ))
          )}
        </div>
      </div>):sellerId.status==='pending'?( <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-8 text-center">
      <div className="text-5xl mb-4">⏳</div>

      <h2 className="text-2xl font-bold text-amber-400 mb-3">
        Account Under Review
      </h2>

      <p className="text-zinc-400">
        Your seller account is currently under review by our admin team.
        You will be able to add products after approval.
      </p>
    </div>):(<div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center">
      <div className="text-5xl mb-4">🚫</div>

      <h2 className="text-2xl font-bold text-red-400 mb-3">
        Account Restricted
      </h2>

      <p className="text-zinc-400">
        Your seller account has been restricted by the admin.
        Please contact support for assistance.
      </p>
    </div>)}
    </div>
  );
}
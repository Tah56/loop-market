'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, Truck, PackageCheck, XCircle } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { authHeader } from '@/lib/core/session,';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';

  // Fetch Seller Orders
  const fetchSellerOrders = async () => {
    setLoading(true);
    try {
      const { data: session } = await authClient.getSession();
      
      if (!session?.user) {
        toast.error("Please login as seller");
        return;
      }

      const res = await fetch(`${API_BASE}/api/sellers`,{
        headers: await authHeader()
      });
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

  // Real-time polling (every 10 seconds)
 

  // Mock Data
  const mockSellerOrders = [
    {
      _id: "1",
      orderId: "#MQRU7DDO",
      productName: "Nike Air Jordan 4 Retro",
      buyerName: "Alex Rivera",
      date: "24/06/2026",
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
      date: "23/06/2026",
      amount: 1188.00,
      qty: 1,
      orderStatus: "Processing",
      image: "https://picsum.photos/id/201/70/70"
    },
    {
      _id: "3",
      orderId: "#MQPIIDUS",
      productName: "Sony WH-1000XM5 Headphones",
      buyerName: "Morgan Chen",
      date: "22/06/2026",
      amount: 398.00,
      qty: 1,
      orderStatus: "Shipped",
      image: "https://picsum.photos/id/180/70/70"
    },
  ];

  // Filter orders
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

    // Optimistic Update
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    try {
      await fetch(`${API_BASE}/api/seller/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
          ...await authHeader()
         },
        
        body:JSON.stringify({orderStatus: newStatus})

        
      });

      toast.success(`Order updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update order status");
      fetchSellerOrders(); // Revert on error
    } finally {
      setActionLoading(null);
    }
  };

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Seller Orders</h1>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-zinc-900 p-1 rounded-2xl mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
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
                className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex gap-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
                      <img src={order.image} alt={order.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{order.productName}</h3>
                      <p className="text-zinc-500 text-sm">Order {order.orderId}</p>
                      <p className="text-zinc-500 text-sm">Buyer: {order.buyerInfo.name}</p>
                      <p className="text-zinc-500 text-sm">Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold text-2xl">${order.amount}</p>
                    <p className="text-xs text-zinc-500">Qty: {order.qty}</p>
                  </div>

                  <div className="flex flex-col gap-3 md:w-52">
                    <div className={`px-5 py-2 text-center rounded-2xl text-sm font-medium ${
                      order.orderStatus === 'Pending' ? 'bg-amber-500/10 text-amber-400' :
                      order.orderStatus === 'Processing' ? 'bg-blue-500/10 text-blue-400' :
                      order.orderStatus === 'Shipped' ? 'bg-purple-500/10 text-purple-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {order.orderStatus}
                    </div>

                    <div className="flex gap-2">
                      {order.orderStatus === 'Pending' && (
                        <button
                          onClick={() => handleStatusUpdate(order.orderId, 'Processing')}
                          disabled={actionLoading === order._id}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-2xl text-sm font-medium disabled:opacity-70"
                        >
                          Accept Order
                        </button>
                      )}

                      {order.orderStatus === 'Processing' && (
                        <button
                          onClick={() => handleStatusUpdate(order.orderId, 'Shipped')}
                          disabled={actionLoading === order._id}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          <Truck size={18} />
                          Mark Shipped
                        </button>
                      )}

                      {/* Added: Mark Delivered Button */}
                      {order.orderStatus === 'Shipped' && (
                        <button
                          onClick={() => handleStatusUpdate(order.orderId, 'Delivered')}
                          disabled={actionLoading === order._id}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          <PackageCheck size={18} />
                          Mark Delivered
                        </button>
                      )}

                      <Link
                        href={`/seller/orders/${order.orderId}`}
                        className="flex items-center justify-center px-5 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl"
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
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, Truck, PackageCheck, XCircle } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const fetchSellerOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/orders/seller`);
      const data = await res.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
      setOrders(mockSellerOrders);
      setFilteredOrders(mockSellerOrders);
    } finally {
      setLoading(false);
    }
  };

  const mockSellerOrders = [
    {
      id: "#MQRU7DDO",
      product: "Nike Air Jordan 4 Retro",
      buyer: "Alex Rivera",
      date: "24/06/2026",
      amount: "307.80",
      qty: 1,
      status: "Pending",
      image: "https://picsum.photos/id/20/70/70"
    },
    {
      id: "#MQR1EX43",
      product: "MacBook Pro M1 2021",
      buyer: "Jordan Lee",
      date: "23/06/2026",
      amount: "1188.00",
      qty: 1,
      status: "Processing",
      image: "https://picsum.photos/id/201/70/70"
    },
    {
      id: "#MQPIIDUS",
      product: "Sony WH-1000XM5 Headphones",
      buyer: "Morgan Chen",
      date: "22/06/2026",
      amount: "398.00",
      qty: 1,
      status: "Shipped",
      image: "https://picsum.photos/id/180/70/70"
    },
  ];

  // Filter
  useEffect(() => {
    let result = orders;
    if (searchTerm) {
      result = result.filter(order =>
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeTab !== 'All') {
      result = result.filter(order => order.status === activeTab);
    }
    setFilteredOrders(result);
  }, [searchTerm, activeTab, orders]);

  const handleStatusUpdate = (orderId, newStatus) => {
    toast.success(`Order marked as ${newStatus}`);
    // Add API call here
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
            <div className="text-center py-20 text-zinc-500">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">No orders found.</div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex gap-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
                      <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{order.product}</h3>
                      <p className="text-zinc-500 text-sm">Order {order.id}</p>
                      <p className="text-zinc-500 text-sm">Buyer: {order.buyer}</p>
                      <p className="text-zinc-500 text-sm">Placed: {order.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold text-2xl">${order.amount}</p>
                    <p className="text-xs text-zinc-500">Qty: {order.qty}</p>
                  </div>

                  <div className="flex flex-col gap-3 md:w-52">
                    <div className={`px-5 py-2 text-center rounded-2xl text-sm font-medium ${
                      order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' :
                      order.status === 'Processing' ? 'bg-blue-500/10 text-blue-400' :
                      order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {order.status}
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'Processing')}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-2xl text-sm font-medium"
                        >
                          Accept Order
                        </button>
                      )}

                      {order.status === 'Processing' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'Shipped')}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <Truck size={18} />
                          Mark Shipped
                        </button>
                      )}

                      <Link
                        href={`/seller/orders/${order.id}`}
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
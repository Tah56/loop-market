'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, Trash2, CreditCard } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { authHeader } from '@/lib/core/session,';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:5000';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
        const { data: session, error } = await authClient.getSession()
      const res = await fetch(`${API_BASE}/api/orders/${session?.user?.email}`,{

        headers: await authHeader()
      });
      const data = await res.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  // Mock Data
  const mockOrders = [
    {
      id: "#MQRU7DDO",
      product: "Nike Air Jordan 4 Retro",
      date: "24/06/2026",
      amount: "307.8",
      qty: 1,
      status: "Pending",
      paymentStatus: "pending",
      image: "https://picsum.photos/id/20/60/60"
    },
    {
      id: "#MQR1EX43",
      product: "Nike Air Jordan 4 Retro",
      date: "24/06/2026",
      amount: "307.8",
      qty: 1,
      status: "Pending",
      paymentStatus: "pending",
      image: "https://picsum.photos/id/21/60/60"
    },
    {
      id: "#MQPIIDUS",
      product: "MacBook Pro M1 2021",
      date: "22/06/2026",
      amount: "1188",
      qty: 1,
      status: "Pending",
      paymentStatus: "paid",
      image: "https://picsum.photos/id/201/60/60"
    },
  ];

  // Filter
  useEffect(() => {
    let result = orders;

    if (searchTerm) {
      result = result.filter(order =>
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeTab !== 'All') {
      result = result.filter(order => order.orderStatus === activeTab);
    }

    setFilteredOrders(result);
  }, [searchTerm, activeTab, orders]);

  const handleCancelOrder = (orderId) => {
    if (!confirm("Cancel this order?")) return;
    toast.success("Order cancelled successfully");
    // Add API call here

    const res = fetch(`${process.env.NEXT_PUBLIC_API}/api/payments/${orderId}`,{
        method:"DELETE",
        headers:{
            "content-type": "application/json",
        }

    })
  };

  const handlePayNow = (order) => {
    router.replace
    (`https://checkout.stripe.com/${order._Id}`)
    console.log(order);
    
  };

  const tabs = ['All', 'Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {/* Search Bar */}
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
        <div className="flex justify-between flex-wrap gap-1 bg-zinc-900 p-1 rounded-2xl mb-8 overflow-x-auto">
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
                key={order._id}
                className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <div className="flex flex-wrap flex-col md:flex-row gap-6">
                  {/* Product Info */}
                  <div className="flex-1 flex gap-5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
                      <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{order.productName}</h3>
                      <p className="text-zinc-500 text-sm">Order {order.orderId}</p>
                      <p className="text-zinc-500 text-sm">Placed: {order.createdAt}</p>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="flex-1 flex justify-center items-center gap-3 md:gap-6 my-4 md:my-0">
                    {['Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered'].map((step, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          order.orderStatus === step || 
                          (['Pending','Accepted','Processing','Shipped','Delivered'].indexOf(order.orderStatus) >= index)
                            ? 'border-emerald-500 bg-emerald-500/10' 
                            : 'border-zinc-700'
                        }`}>
                          {order.orderStatus === step && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                        </div>
                        <span className="text-[10px] text-zinc-500 mt-1 hidden md:block">{step}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Actions */}
                  <div className="text-right md:w-52 flex flex-col justify-between">
                    <div>
                      <p className="text-emerald-400 font-semibold text-2xl">${order.amount}</p>
                      <p className="text-xs text-zinc-500">Qty: {order.qty || 1}</p>
                    </div>

                    <div className="space-y-3 mt-6">
                      {/* Pay Now Button - Show if paymentStatus is not "paid" */}
                      {order.paymentStatus !== 'Paid' && (
                        <button
                          onClick={() => handlePayNow(order)}
                          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-2xl text-sm font-medium transition-all"
                        >
                          <CreditCard size={18} />
                          Pay Now
                        </button>
                      )}

                      {/* Cancel Button */}
                      {order.orderStatus === 'Pending' && (
                        <button
                          onClick={() => handleCancelOrder(order.orderId)}
                          className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-500 py-3 rounded-2xl text-sm font-medium transition-all"
                        >
                          <Trash2 size={18} />
                          Cancel Order
                        </button>
                      )}

                      <Link
                        href={`/allproduct/${order.productId}`}
                        className="block text-center text-emerald-400 hover:text-emerald-500 text-sm font-medium py-2"
                      >
                        View Details →
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
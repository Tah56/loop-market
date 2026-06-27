"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function SellerDashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      const { data: session } = await authClient.getSession();

      if (!session?.user?.email) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/seller/overview?email=${session.user.email}`,
      );

      const data = await res.json();
      setOverview(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      // Loading
      <div className="min-h-screen bg-linear-to-br from-[#001f1a] via-zinc-950 to-[#003d33] flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    // Main Container
    <div className="min-h-screen bg-linear-to-br from-[#001f1a] via-zinc-950 to-[#003d33] text-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Seller Dashboard</h1>

          <p className="text-zinc-400 mt-2">Manage your products and orders</p>
        </div>

        <Link
          href="/dashboard/seller/addProduct"
          // Add Product Button
          className="bg-[#009966] hover:bg-[#00b377] text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 w-fit transition-all"
        >
          + Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
        <StatCard
          icon={<Package size={22} />}
          title="My Products"
          value={overview?.totalProducts || 0}
          // My Products
          color="bg-[#009966]/10 text-[#00cc88]"
        />

        <StatCard
          icon={<ShoppingCart size={22} />}
          title="Total Orders"
          value={overview?.totalOrders || 0}
          // Total Orders
          color="bg-[#009966]/10 text-[#00b377]"
        />

        <StatCard
          icon={<DollarSign size={22} />}
          title="Total Revenue"
          value={`$${overview?.totalRevenue || 0}`}
          // Revenue
          color="bg-[#009966]/10 text-[#00e699]"
        />

        <StatCard
          icon={<TrendingUp size={22} />}
          title="Active Listings"
          value={overview?.activeListings || 0}
          // Active Listings
          color="bg-[#009966]/10 text-[#66ffcc]"
        />
      </div>

      {/* Recent Orders */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Recent Orders</h2>

          <Link
            href="/dashboard/seller/orders"
            // View All
            className="text-[#00cc88] hover:text-[#00e699] flex items-center gap-2"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>


        <div className="bg-zinc-900/60 backdrop-blur-xl border border-[#009966]/50 rounded-2xl overflow-hidden">
          {overview?.recentOrders?.length > 0 ? (
            overview.recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-5 py-5 border-b border-zinc-800"
              >
                <div>
                  <h3 className="font-semibold">{order.productName}</h3>

                  <p className="text-zinc-400 text-sm">
                    Buyer: {order.buyerName}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : order.orderStatus === "Pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : order.orderStatus === "Cancelled"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-lime-500/10 text-lime-400 border-lime-500/20"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                  // Order Amount
                  <span className="text-[#00cc88] font-bold text-lg">
                    ${order.amount}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-zinc-500">
              No orders found
            </div>
          )}
        </div>
      </div>

      {/* Product Status */}
      <div>
        <h2 className="text-2xl font-bold mb-5">Product Status</h2>

        <div className="grid md:grid-cols-3 gap-5">
          <StatusCard
            value={overview?.productStatus?.approved || 0}
            label="Approved"
            // Approved
            color="text-[#00cc88]"
          />

          <StatusCard
            value={overview?.productStatus?.pending || 0}
            label="Pending"
            // Pending
            color="text-[#00b377]"
          />

          <StatusCard
            value={overview?.productStatus?.rejected || 0}
            label="Rejected"
            color="text-red-400"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    // StatCard
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-[#009966]/20 rounded-2xl p-6 hover:border-[#009966]/50 transition-all">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color}`}
      >
        {icon}
      </div>

      <h3 className="text-4xl font-bold mb-2 text-white">{value}</h3>

      <p className="text-zinc-400">{title}</p>
    </div>
  );
}

function StatusCard({ value, label, color }) {
  return (
    // StatusCard
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-[#009966]/20 rounded-2xl p-8 text-center hover:border-[#009966]/50 transition-all">
      <h3 className={`text-5xl font-bold ${color}`}>{value}</h3>

      <p className="text-zinc-400 mt-3">{label}</p>
    </div>
  );
}

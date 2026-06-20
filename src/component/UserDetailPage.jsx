'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Search, UserX, Eye, UserCheck } from 'lucide-react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Current logged-in admin (This should come from your auth context later)
  const currentAdminEmail = "admin@gmail.com";

  const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users`);
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  // Mock Data
  const mockUsers = [
    { _id: 1, name: "Admin User", email: "admin@loopmarket.com", role: "Admin", status: "active", location: "San Francisco, CA" },
    { _id: 2, name: "Alex Rivera", email: "seller1@loopmarket.com", role: "Seller", status: "active", location: "New York, NY" },
    { _id: 3, name: "Jordan Lee", email: "seller2@loopmarket.com", role: "Seller", status: "pending", location: "Los Angeles, CA" },
    { _id: 4, name: "Morgan Chen", email: "seller3@loopmarket.com", role: "Seller", status: "active", location: "Chicago, IL" },
    { _id: 5, name: "Taylor Kim", email: "seller4@loopmarket.com", role: "Seller", status: "pending", location: "Houston, TX" },
    { _id: 6, name: "Sam Patel", email: "buyer1@loopmarket.com", role: "Buyer", status: "active", location: "Phoenix, AZ" },
  ];

  // Filter users
  useEffect(() => {
    let result = users;
    if (searchTerm) {
      result = result.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(result);
  }, [searchTerm, users]);

  const isCurrentAdmin = (user) => user.email === currentAdminEmail;

  const handleAction = async (action, user) => {
    // Strong protection: Admin cannot modify their own account
    if (isCurrentAdmin(user)) {
      toast.error("❌ You cannot modify your own account!", {
        duration: 4000,
      });
      return;
    }

    setActionLoading(user._id);

    try {
      if (action === 'approve') {
        toast.success(`${user.name} has been approved and activated`);
      } else if (action === 'block') {
        toast.success(`${user.name} has been blocked`);
      }
      
      // TODO: Add real API call here
      // await fetch(`${API_BASE}/users/${user._id}/${action}`, { method: 'PATCH' });
      
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">Active</span>;
    }
    if (status === 'pending') {
      return <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400">Pending</span>;
    }
    return <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-red-500/10 text-red-400">Blocked</span>;
  };

  const getRoleColor = (role) => {
    if (role === 'Admin') return 'bg-purple-600 text-white';
    if (role === 'Seller') return 'bg-emerald-600 text-white';
    return 'bg-sky-600 text-white';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Manage Users ({filteredUsers.length})</h1>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 pl-11 py-3 rounded-2xl focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
          {filteredUsers.map((user) => {
            const isAdmin = isCurrentAdmin(user);
            return (
              <div
                key={user._id}
                className="flex items-center gap-4 px-6 py-5 border-b border-zinc-800 hover:bg-zinc-800/50 transition-all group"
              >
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${user.avatarColor || 'bg-emerald-600'}`}>
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    {isAdmin && <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">You</span>}
                  </div>
                  <p className="text-zinc-500 text-sm">{user.email}</p>
                </div>

                {/* Role */}
                <div>
                  <span className={`px-4 py-1.5 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>

                {/* Status */}
                <div>
                  {getStatusBadge(user.status)}
                </div>

                {/* Location */}
                <div className="text-zinc-400 text-sm hidden md:block w-48">
                  {user.location}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="p-3 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white">
                    <Eye size={20} />
                  </button>

                  {/* Approve Button (only for Pending) */}
                  {user.status === 'pending' && (
                    <button
                      onClick={() => handleAction('approve', user)}
                      disabled={actionLoading === user._id}
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-sm font-medium transition-all"
                    >
                      <UserCheck size={18} />
                      Approve
                    </button>
                  )}

                  {/* Block Button - Disabled for self */}
                  <button
                    onClick={() => handleAction('block', user)}
                    disabled={isAdmin || actionLoading === user._id}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                      isAdmin 
                        ? 'text-zinc-600 cursor-not-allowed opacity-50' 
                        : 'text-orange-400 hover:text-orange-500 hover:bg-orange-900/20'
                    }`}
                  >
                    <UserX size={18} />
                    Block
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
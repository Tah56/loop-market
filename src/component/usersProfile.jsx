'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Camera, Save, Edit2 } from 'lucide-react';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "Sami Rahman",
    email: "sami.rahman@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Passionate about sustainable living and finding great deals on pre-loved items.",
    role: "Seller",
    memberSince: "March 2025",
    totalListings: 24,
    soldItems: 18,
    activeListings: 7,
    purchasedItems: 12,
  });

  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserData({ ...formData });
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const isSeller = userData.role === "Seller";

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-10">
      <Toaster position="top-center" richColors />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">My Profile</h1>
            <p className="text-zinc-400 mt-1 text-sm sm:text-base">Manage your personal information</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all text-sm sm:text-base whitespace-nowrap"
          >
            <Edit2 size={20} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Profile Card */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Profile Picture - Responsive */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 border-zinc-700">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-3 right-3 bg-emerald-600 hover:bg-emerald-700 p-3 rounded-2xl transition-all">
                  <Camera size={20} />
                </button>
              </div>

              {/* Profile Information */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="text-sm text-zinc-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 disabled:opacity-75 text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-zinc-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-400 block mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500 disabled:opacity-75"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 block mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-4 focus:outline-none focus:border-emerald-500 disabled:opacity-75 resize-y"
                  />
                </div>

                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 mt-6"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Stats */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
              <h3 className="text-lg font-semibold mb-4">Account Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Account Type</span>
                  <span className={`px-4 py-1 text-xs font-medium rounded-full ${userData.role === 'Seller' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-sky-500/10 text-sky-400'}`}>
                    {userData.role}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Member Since</span>
                  <span className="text-zinc-300">{userData.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Role-Based Activity Stats */}
            <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
              <h3 className="text-lg font-semibold mb-5">
                {isSeller ? "Selling Activity" : "Buying Activity"}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {isSeller ? (
                  <>
                    <div className="bg-zinc-800 rounded-2xl p-5 text-center">
                      <p className="text-3xl font-bold text-emerald-400">{userData.activeListings}</p>
                      <p className="text-sm text-zinc-500 mt-1">Active Listings</p>
                    </div>
                    <div className="bg-zinc-800 rounded-2xl p-5 text-center">
                      <p className="text-3xl font-bold text-emerald-400">{userData.soldItems}</p>
                      <p className="text-sm text-zinc-500 mt-1">Items Sold</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-zinc-800 rounded-2xl p-5 text-center">
                      <p className="text-3xl font-bold text-emerald-400">{userData.purchasedItems}</p>
                      <p className="text-sm text-zinc-500 mt-1">Items Bought</p>
                    </div>
                    <div className="bg-zinc-800 rounded-2xl p-5 text-center">
                      <p className="text-3xl font-bold text-emerald-400">4</p>
                      <p className="text-sm text-zinc-500 mt-1">In Progress</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
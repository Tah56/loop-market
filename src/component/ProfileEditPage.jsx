'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Camera, Save, Edit2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';


export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  const IMG_BB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  // Fetch User Data
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: session } = await authClient.getSession();
      if (!session?.user) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/${session.user.email}`);
      const user = await res.json();
const date = new Date(user?.createdAt).toISOString().split("T")[0];
      setFormData({
        name: user.name || "Alex Rivera",
        email: user.email || "seller1@resellhub.com",
        phone: user.phone || "+1-555-0101",
        location: user.location || "New York, NY",
        bio: user.bio || "Trusted seller with 20+ items sold.",
        role:user.role,
        image:user?.image,
        member: date
      });

      if (user.avatar) setAvatarPreview(user.avatar);
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);

    try {
      const formDataImg = new FormData();
      formDataImg.append('image', file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`, {
        method: 'POST',
        body: formDataImg,
      });

      const result = await res.json();

      console.log(result);
      
      if (result.status === 200) {
        toast.success("Profile picture uploaded successfully!");
        // You can save the URL to backend here
     const { data: session } = await authClient.getSession();
      if (!session?.user) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/${session.user.email}`,{
            method:"PATCH",
            headers:{
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: result.data.url })
        });
       console.log(res);
       
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.log(error);
      
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Send to your backend
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(formData);
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Profile Settings</h1>
            <p className="text-zinc-400 mt-1">Manage your account information</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-all"
          >
            <Edit2 size={20} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-zinc-900 rounded-3xl p-6 mb-8 border border-zinc-800">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-zinc-700">
                <img
                  src={avatarPreview || formData.image }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-1 right-1 bg-emerald-600 hover:bg-emerald-700 p-3 rounded-2xl cursor-pointer transition-all">
                <Camera size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <h2 className="text-3xl font-semibold">{formData.name}</h2>
              <p className="text-zinc-400">{formData.email}</p>
              <p className="text-emerald-400 text-sm mt-1 capitalize">{formData.role} • Member Since {formData.member }</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-zinc-400 block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 disabled:opacity-75"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none opacity-75 cursor-not-allowed"
              />
              <p className="text-xs text-zinc-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 disabled:opacity-75"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 disabled:opacity-75"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm text-zinc-400 block mb-2">Bio</label>
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
              disabled={loading}
              className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all"
            >
              <Save size={22} />
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
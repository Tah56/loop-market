'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',        // New field
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation logic
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.role) {
      toast.error("Please select a role (Buyer or Seller)");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        location:formData.location
        // You can pass location if your backend supports it
        // location: formData.location,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
      } else {
        toast.success("Account created successfully! Please check your email.");
        router.push("/")
        console.log('Registration successful:', data);
        // Optionally redirect user
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Toaster position="top-center" richColors />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">REGISTER</h1>
            <p className="text-gray-500 mt-2">Create your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                I want to register as
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 border border-gray-200 rounded-2xl px-5 py-4 cursor-pointer hover:border-purple-500 transition-all has-checked:border-purple-600 has-checked:bg-purple-50">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === 'buyer'}
                    onChange={handleChange}
                    className="w-5 h-5 accent-purple-600"
                    required
                  />
                  <div>
                    <p className="font-medium text-gray-900">Buyer</p>
                    <p className="text-xs text-gray-500">I want to buy second-hand items</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 border border-gray-200 rounded-2xl px-5 py-4 cursor-pointer hover:border-purple-500 transition-all has-checked:border-purple-600 has-checked:bg-purple-50">
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={formData.role === 'seller'}
                    onChange={handleChange}
                    className="w-5 h-5 accent-purple-600"
                    required
                  />
                  <div>
                    <p className="font-medium text-gray-900">Seller</p>
                    <p className="text-xs text-gray-500">I want to sell my used items</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Location / City
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your city or area"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-4 rounded-2xl transition-all duration-200 text-lg shadow-lg shadow-purple-500/30"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                LOGIN
              </a>
            </p>
          </form>
        </div>

        {/* Right Side - Welcome */}
        <div className="hidden md:flex w-full md:w-1/2 bg-linear-to-br from-purple-600 to-purple-700 text-white items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
          
          <div className="relative text-center z-10">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl mb-6">
                <span className="text-5xl">🔄</span>
              </div>
            </div>
            
            <h2 className="text-6xl font-bold tracking-tighter mb-6">WELCOME</h2>
            
            <p className="text-xl text-purple-100 max-w-xs mx-auto leading-relaxed">
              Buy and sell quality second-hand products in your community. 
              Give items a second life and save money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
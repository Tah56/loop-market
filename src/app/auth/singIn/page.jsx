'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email:formData.email,
        /**
         * The user password
         */
        password: formData.password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/",
     
 } )

    setTimeout(() => {
      console.log('Login Data:', formData);
      toast.success('Welcome back to LoopMarket!');
      setLoading(false);
    }, 1500);
   
 if(!error){
    toast.success("LogIn success")
 }};
 const handleGoogleSignIn= async()=>{
     const data = await authClient.signIn.social({
    provider: "google",
  });
  }
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <Toaster position="top-center" richColors />

      <div className="w-full max-w-5xl bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16">
          <div className="mb-10">
            <h1 className="text-5xl font-bold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-zinc-400 text-lg">Login to continue trading on LoopMarket</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 accent-emerald-600"
                />
                <span className="text-sm text-zinc-400">Remember me</span>
              </label>
              <a href="#" className="text-emerald-500 hover:text-emerald-400 text-sm font-medium">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 py-4 rounded-2xl font-semibold text-lg transition-all mt-4"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Social Login */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-zinc-900 px-4 text-zinc-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleGoogleSignIn} type="button" className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-3.5 rounded-2xl transition-all">
                <span className="text-xl">G</span>
                <span>Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-3.5 rounded-2xl transition-all">
                <span className="text-xl"></span>
                <span>Apple</span>
              </button>
            </div>

            <p className="text-center text-zinc-400 text-sm mt-8">
              Don't have an account?{' '}
              <a href="/register" className="text-emerald-500 hover:text-emerald-400 font-semibold">
                Create Account
              </a>
            </p>
          </form>
        </div>

        {/* Right Side - Branding */}
        <div className="hidden md:flex w-full md:w-1/2 bg-linear-to-br from-emerald-700 via-emerald-800 to-zinc-950 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />

          <div className="relative text-center z-10">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-3xl mb-6 border border-white/20">
                <span className="text-6xl">🔄</span>
              </div>
            </div>

            <h2 className="text-6xl font-bold tracking-tighter mb-4">LoopMarket</h2>
            <p className="text-2xl text-emerald-200 mb-8">Second Chances, Better Prices</p>
            
            <div className="max-w-xs mx-auto text-emerald-100/80 leading-relaxed">
              Buy and sell quality pre-loved items in your community. 
              Sustainable shopping made simple.
            </div>

            <div className="mt-12 flex justify-center gap-8 text-sm opacity-70">
              <div>Secure Login</div>
              <div>Fast & Easy</div>
              <div>Trusted Community</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
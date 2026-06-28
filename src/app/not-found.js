'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        {/* Fun 404 Illustration */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="text-[180px] font-bold text-emerald-500/10 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl">🛒</div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-tight mb-4">Page Not Found</h1>
        
        <p className="text-zinc-400 text-xl mb-10">
          Oops! The page you're looking for seems to have been recycled or moved to a new location.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl font-semibold transition-all">
              <Home size={22} />
              Back to Home
            </button>
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 border border-zinc-700 hover:bg-zinc-900 px-8 py-4 rounded-2xl font-semibold transition-all"
          >
            <ArrowLeft size={22} />
            Go Back
          </button>
        </div>

        <div className="mt-16 text-sm text-zinc-500">
          Need help? Contact us at <span className="text-emerald-400">support@loopmarket.com</span>
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { ShieldX, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/10 rounded-full border border-red-500/20">
            <ShieldX size={64} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-6xl font-bold tracking-tight mb-4">Access Denied</h1>
        
        <p className="text-2xl text-zinc-400 mb-6">
          You are not authorized to view this page
        </p>

        <p className="text-zinc-500 mb-10 leading-relaxed">
          This area is restricted to administrators only. 
          Please login with the correct account or contact support if you believe this is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/singIn"
            className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all"
          >
            <ArrowLeft size={22} />
            Back to Login
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-3 border border-zinc-700 hover:bg-zinc-900 px-8 py-4 rounded-2xl font-medium text-lg transition-all"
          >
            Go to Homepage
          </Link>
        </div>

        <div className="mt-12 text-zinc-600 text-sm">
          LoopMarket © 2026 • Admin Access Restricted
        </div>
      </div>
    </div>
  );
}
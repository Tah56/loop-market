'use client';

import { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';


export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      product: "MacBook Pro M1 2021",
      price: 1188,
      qty: 1,
      image: "https://picsum.photos/id/201/100/100",
      seller: "TechHub Store"
    },
    {
      id: 2,
      product: "Sony WH-1000XM5 Headphones",
      price: 398,
      qty: 2,
      image: "https://picsum.photos/id/180/100/100",
      seller: "AudioPro"
    }
  ]);

  const [loading, setLoading] = useState(false);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: newQty } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal;

  const handleCheckout = async () => {
    setLoading(true);
        
    try {
      const res = await fetch('https://api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cartItems.map(item => ({
            product: item.product,
            price: item.price,
            qty: item.qty,
            image: item.image
          })),
          customerEmail: "customer@example.com" // Replace with real user email
        })
      });

      const data = await res.json();

      if (data.url) {
        window.location.href =  data.url // Redirect to Stripe Checkout
      } else {
        toast.error("Failed to start checkout");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Your Cart</h1>
            <p className="text-zinc-400 mt-1">{cartItems.length} items</p>
          </div>
          <Link href="/" className="text-emerald-400 hover:text-emerald-500 flex items-center gap-2">
            Continue Shopping <ArrowRight size={20} />
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-semibold mb-4">Your cart is empty</h2>
            <Link href="/" className="text-emerald-400 hover:underline text-lg">
              Browse Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 flex gap-6">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
                    <img src={item.image} alt={item.product} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.product}</h3>
                        <p className="text-zinc-500 text-sm">Seller: {item.seller}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-500">
                        <Trash2 size={22} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-8">
                      <div className="flex items-center gap-4">
                        <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="w-10 h-10 flex items-center justify-center border border-zinc-700 rounded-xl hover:bg-zinc-800">
                          <Minus size={18} />
                        </button>
                        <span className="font-semibold w-8 text-center text-lg">{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="w-10 h-10 flex items-center justify-center border border-zinc-700 rounded-xl hover:bg-zinc-800">
                          <Plus size={18} />
                        </button>
                      </div>

                      <p className="text-2xl font-semibold text-emerald-400">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 sticky top-6">
                <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-zinc-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="text-emerald-400">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold border-t border-zinc-700 pt-4">
                    <span>Total</span>
                    <span className="text-emerald-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full mt-10 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all"
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </button>

                <p className="text-center text-xs text-zinc-500 mt-6">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
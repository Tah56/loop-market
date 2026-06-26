"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, X, Plus, Minus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from '@/lib/auth-client';

export default function ProductDetailsPage({ data }) {
  console.log(data);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showBuyNowForm, setShowBuyNowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });
  const [isOwner, setIsOwner] = useState(false);

  const product = data;

  // Check if current user is product owner
  useEffect(() => {
    const checkOwner = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (session?.user && product?.seller?.email) {
          setIsOwner(session.user.email === product.seller.email);
        }
      } catch (error) {
        console.error("Failed to check ownership");
      }
    };

    if (product) checkOwner();
  }, [product]);

  const handleAddToCart = () => {
    toast.success(`${quantity} × ${product.title} added to cart!`);
  };

  const handleBuyNowClick = () => {
    setShowBuyNowForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success(
      `Order placed for ${quantity} items! Proceeding to payment...`,
    );
    setShowBuyNowForm(false);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Toaster position="top-center" richColors />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div>
            <div className="bg-zinc-900 rounded-3xl p-8 mb-6 border border-emerald-500/20">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                width={600}
                height={600}
                className="w-full rounded-2xl"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-emerald-500"
                      : "border-transparent hover:border-emerald-500/50"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${index}`}
                    width={140}
                    height={140}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-emerald-100">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">★★★★☆</div>
                <span className="text-emerald-400 font-medium">
                  {product.rating}
                </span>
                <span className="text-zinc-500">
                  • {product.reviewCount} Reviews
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold text-emerald-400">
                ${product.price}
              </span>
              <span className="text-zinc-500 line-through text-2xl">
                ${product.originalPrice}
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
                Save ${product.originalPrice - product.price}
              </span>
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-zinc-400 font-medium">Quantity:</span>
              <div className="flex items-center border border-emerald-500/30 rounded-2xl bg-zinc-900">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-3 hover:bg-emerald-900/30 rounded-l-2xl transition-all text-emerald-400"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-3 font-semibold text-lg border-x border-emerald-500/30 text-emerald-100">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-3 hover:bg-emerald-900/30 rounded-r-2xl transition-all text-emerald-400"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Buttons - Hide if user is owner */}
            {!isOwner && (
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  ADD TO CART
                </button>
                <div className="flex-1">
                  <form action="/api/checkout_sessions" method="POST">
                    <input type="hidden" name="product_id" value={data?._id} />
                    <section>
                      <button
                        type="submit"
                        className=" w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-semibold text-lg transition-all"
                        role="link"
                      >
                        BUY NOW
                      </button>
                    </section>
                  </form>
                </div>
              </div>
            )}

            {isOwner && (
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-4 rounded-2xl text-center font-medium">
                You are the owner of this product. You cannot purchase your own item.
              </div>
            )}

            <div className="text-center text-sm text-emerald-400">
              Checkout • FREE 2-DAY SHIPPING
            </div>

            {/* Trust Badges */}
            <div className="bg-zinc-900 rounded-2xl p-6 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">🔒</span>
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">🚚</span>
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">🔄</span>
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">✅</span>
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
    </div>
  );
}
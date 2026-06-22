"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function ProductDetailsPage({ data }) {
  // State management for active preview image thumbnails
  console.log(data);

  const [activeImage, setActiveImage] = useState("main");

  // State management for individual FAQ accordion triggers
  const [openFaq, setOpenFaq] = useState({
    battery: false,
    compatibility: false,
    noise: false,
  });

  // State management for Cart operations
  const [cartCount, setCartCount] = useState(0);

  // State management for dynamic review comments
  const [reviews, setReviews] = useState([
    {
      author: "John D.",
      content: "Incredible sound quality!",
      rating: 5,
      date: "2026-05-12",
    },
    {
      author: "Sarah M.",
      content: "Best ANC ever!",
      rating: 5,
      date: "2026-06-02",
    },
    {
      author: "Alex K.",
      content: "Battery lasts days!",
      rating: 5,
      date: "2026-06-14",
    },
  ]);

  // Review form states
  const [newAuthor, setNewAuthor] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newRating, setNewRating] = useState(5);

  const toggleFaq = (key) => {
    setOpenFaq((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Function handler for adding an item to the shopping cart
  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    alert(`${product.title} has been added to your cart!`);
  };

  // Function handler for direct instantly checkout buy sequence
  const handleBuyNow = () => {
    const { name, id, email } = data.seller;
    const productData = {
      productId: data._id,
      paymentStatus: "pending",
      orderStatus: "processing",
      sellerInfo: {
        name,
        id,
        email,
      },
    };
    console.log(productData);
    alert(
      `Proceeding straight to secure checkout with 1x ${product.title} ($${product.price.toFixed(2)})!`,
    );
  };

  // Function handler for submitting user comment reviews
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const freshReview = {
      author: newAuthor.trim(),
      content: newContent.trim(),
      rating: Number(newRating),
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([freshReview, ...reviews]);
    setNewAuthor("");
    setNewContent("");
    setNewRating(5);
  };

  // Mock item source dataset
  const product = {
    title: "AEROFLOW MAX",
    subtitle: "Active Noise Canceling Headphones",
    price: 299.0,
    originalPrice: 399.0,
    savings: 100,
    rating: 4.8,
    reviewCount: `${reviews.length} Reviews`,
    description:
      "Immerse yourself in pure sound. Experience industry-leading Active Noise Cancellation, 40-hour battery life, and unparalleled comfort.",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased">
      {/* Main Structural Layout Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-16">
        {/* 2. Top Block Hero Grid: Product Images & Purchase Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left Side: Dynamic Gallery Showcase Layout */}
          <div className="space-y-4">
            {/* Main Stage Image View Screen */}
            <div className="w-full aspect-square bg-[#F1F5F9] rounded-2xl flex items-center justify-center p-8 border border-zinc-200/30 overflow-hidden">
              <Image
                src={data.mainImage}
                alt="Product Showcase View"
                className="w-4/5 h-4/5 object-contain mix-blend-multiply drop-shadow-xl"
                width={200}
                height={200}
              />
            </div>

            {/* Thumbnail Navigation Row Slider */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { id: "main", label: "Main view" },
                { id: "humb", label: "Humb view" },
                { id: "case", label: "Charging case" },
                { id: "side", label: "Side aspect" },
              ].map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => setActiveImage(thumb.id)}
                  className={`flex flex-col items-center p-2 bg-[#F1F5F9] rounded-xl border-2 transition-all ${
                    activeImage === thumb.id
                      ? "border-[#0F172A] bg-white shadow-xs"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="w-full aspect-square flex items-center justify-center p-1">
                    <img
                      src={data.mainImage}
                      className="object-contain max-h-full mix-blend-multiply"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 mt-1 block truncate w-full text-center">
                    {thumb.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Metadata Configuration & Actions Panel */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-[#0F172A]">
                {data.title}
              </h1>
              <p className="text-sm font-semibold text-zinc-500 mt-1">
                {data.subtitle}
              </p>
            </div>

            {/* Ratings Summary Inline Block */}
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-[#0F172A] ml-1">{product.rating}</span>
              <span className="text-zinc-400 font-medium">
                | {product.reviewCount}
              </span>
            </div>

            {/* Pricing Section Stack */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400 line-through"></span>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black tracking-tight text-[#FF7A00]">
                  ${data.price}
                </span>
                <span className="bg-[#E2FBE9] text-[#059669] text-xs font-bold px-2.5 py-1 rounded-md">
                  Save ${product.savings}
                </span>
              </div>
            </div>

            {/* Product Body Summary Content Copy */}
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">
              {data.description}
            </p>

            {/* Interactive Functional Conversion Buttons Stack */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#145efc] hover:bg-[#145efc]/ text-white font-bold tracking-wide rounded-xl py-6.5 text-sm transition-colors shadow-xs"
              >
                ADD TO CART
              </Button>
              <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name='product_id' value={data?._id} />
                <section>
                  <button type="submit" role="link">
                    Checkout
                  </button>
                </section>
              </form>
              <p className="text-center text-[11px] font-bold text-zinc-400 tracking-wide uppercase">
                Free 2-Day Shipping
              </p>
            </div>

            {/* Trust and Value Metrics Badge Matrix */}
            <div className="grid grid-cols-2 gap-3 bg-white border border-zinc-200/60 rounded-xl p-4 text-xs font-bold text-zinc-600 shadow-2xs">
              <div className="flex items-center gap-2">
                🛡️ <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                📦 <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                🔄 <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center gap-2">
                ✅ <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Section: Customer Reviews Board Panel */}
        <div className="border-t border-zinc-200 pt-12 space-y-8">
          <h2 className="text-xl font-black tracking-tight text-[#0F172A] uppercase">
            Customer Reviews
          </h2>

          {/* Display Existing Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="p-5 bg-white border border-zinc-200/60 rounded-xl shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-500 text-xs mb-2">
                    {[...Array(review.rating)].map((_, rIdx) => (
                      <span key={rIdx}>★</span>
                    ))}
                    {[...Array(5 - review.rating)].map((_, rIdx) => (
                      <span key={rIdx} className="text-zinc-200">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#0F172A]">
                    "{review.content}"
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[10px] font-bold">
                      👤
                    </div>
                    <span className="text-xs font-bold text-zinc-500">
                      {review.author}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Form: Add Comment Section Component */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 max-w-2xl shadow-2xs">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-4">
              Share Your Experience
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Alex Smith"
                    className="w-full bg-[#F8FAFC] border border-zinc-200 focus:border-[#0F172A] rounded-xl p-3 text-xs font-medium outline-hidden transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 block">
                    Rating
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-zinc-200 focus:border-[#0F172A] rounded-xl p-3 text-xs font-bold outline-hidden transition-all text-amber-500"
                  >
                    <option value="5">★★★★★ (5/5)</option>
                    <option value="4">★★★★☆ (4/5)</option>
                    <option value="3">★★★☆☆ (3/5)</option>
                    <option value="2">★★☆☆☆ (2/5)</option>
                    <option value="1">★☆☆☆☆ (1/5)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 block">
                  Comment Review
                </label>
                <textarea
                  rows="3"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="What did you think about the noise cancellation, audio range, and headband comfort?"
                  className="w-full bg-[#F8FAFC] border border-zinc-200 focus:border-[#0F172A] rounded-xl p-3 text-xs font-medium outline-hidden transition-all resize-none"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#0F172A] hover:bg-black text-white font-bold text-xs tracking-wider uppercase px-6 py-5 rounded-xl transition-colors shadow-2xs"
              >
                Post Review
              </Button>
            </form>
          </div>
        </div>

        {/* 5. Section: Clean Frequently Asked Questions Accordion */}
        <div className="border-t border-zinc-200 pt-12 space-y-4">
          <h2 className="text-xl font-black tracking-tight text-[#0F172A] uppercase mb-2">
            Frequently Asked Questions
          </h2>

          {[
            {
              id: "battery",
              q: "Battery life?",
              a: "Up to 40 hours of playback time with active noise cancelling turned on.",
            },
            {
              id: "compatibility",
              q: "Compatibility?",
              a: "Fully compatible via Bluetooth 5.2 with iOS, Android, macOS, and Windows operating systems.",
            },
            {
              id: "noise",
              q: "Noise cancellation?",
              a: "Features ultra-dense advanced hybrid active noise isolation capturing external waves perfectly.",
            },
          ].map((faq) => (
            <div
              key={faq.id}
              className="border-b border-zinc-200 bg-white rounded-xl shadow-2xs border px-4 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full py-4 flex items-center justify-between text-left text-sm font-bold text-[#0F172A] focus:outline-hidden"
              >
                <span>{faq.q}</span>
                <span className="text-xs text-zinc-400">
                  {openFaq[faq.id] ? "▲" : "▼"}
                </span>
              </button>
              {openFaq[faq.id] && (
                <div className="pb-4 text-xs text-zinc-500 font-medium leading-relaxed transition-all">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 6. Section: Grid Listing of Related Products */}
        <div className="border-t border-zinc-200 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight text-[#0F172A] uppercase">
              Related Products
            </h2>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-xs hover:bg-white transition-all">
                ◀
              </button>
              <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-xs hover:bg-white transition-all">
                ▶
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Earbuds", price: 299.0, original: 399.0 },
              { title: "Charger", price: 299.0, original: 399.0 },
              { title: "Case", price: 299.0, original: 399.0 },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="w-full aspect-4/3 bg-[#F1F5F9] rounded-xl flex items-center justify-center p-6 border border-zinc-200/20 overflow-hidden mb-3 group-hover:shadow-xs transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop"
                    className="w-3/5 h-3/5 object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-black text-[#0F172A]">
                  {item.title}
                </h4>
                <div className="flex text-[10px] text-amber-500 my-0.5">
                  ★★★★★{" "}
                  <span className="text-zinc-400 font-medium ml-1">(45)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-[#FF7A00]">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-400 line-through">
                    ${item.original.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 7. Modular System Sticky Footer Details */}
    </div>
  );
}

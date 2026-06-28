"use client";

import { authHeader } from "@/lib/core/session,";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditProductPage({ user }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: user.title || "",
    category: user.category || "",
    condition: user.condition || "",
    price: user.price || "",
    stock: user.stock || 1,
    description: user.description || "",
  });

  // Existing images (URLs from database)
  const [existingImages, setExistingImages] = useState(
    user.images || [user.mainImage].filter(Boolean),
  );
  // New images selected by user (File objects)
  const [newImages, setNewImages] = useState([]);
  // All preview URLs for display
  const [previewUrls, setPreviewUrls] = useState(
    user.images || [user.mainImage].filter(Boolean),
  );

  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const IMG_BB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports",
    "Books",
    "Vehicles",
    "Other",
  ];
  const conditions = ["New", "Like New", "Good", "Fair", "Used"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (files) => {
    const newFiles = Array.from(files).slice(
      0,
      6 - existingImages.length - newImages.length,
    );

    if (newFiles.length === 0) return;

    setNewImages((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    // If it's an existing image
    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // It's a new image
      const newIndex = index - existingImages.length;
      const removedFile = newImages[newIndex];

      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));

      // Revoke object URL to prevent memory leaks
      if (removedFile) URL.revokeObjectURL(previewUrls[index]);
    }

    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadToImgBB = async (imageFile) => {
    const formDataUpload = new FormData();
    formDataUpload.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
      {
        method: "POST",
        body: formDataUpload,
      },
    );

    const result = await response.json();

    if (result.status === 200) {
      return result.data.url;
    } else {
      throw new Error(result.error?.message || "Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.condition ||
      !formData.price
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (existingImages.length + newImages.length === 0) {
      toast.error("Please keep at least one product image");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      let allImageUrls = [...existingImages];

      // Upload only new images
      if (newImages.length > 0) {
        for (const file of newImages) {
          const url = await uploadToImgBB(file);
          allImageUrls.push(url);
        }
      }

      const finalData = {
        ...formData,
        images: allImageUrls,
        mainImage: allImageUrls[0],
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/products/${user._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json",
            ... await authHeader()
           },
          body: JSON.stringify(finalData),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update product");

      toast.success("Product updated successfully!");
      router.push("/dashboard/seller/MyProduct");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            {/* Product Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. iPhone 13 Pro Max"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select condition</option>
                  {conditions.map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="1"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product in detail..."
                rows={5}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-4 focus:outline-none focus:border-purple-500 resize-y"
                required
              />
            </div>

            {/* Image Upload Section */}
            <div className="mt-8">
              <label className="block text-sm font-medium mb-3">
                Product Images <span className="text-red-500">*</span>
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleImageChange(e.dataTransfer.files);
                }}
                className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all ${isDragging ? "border-purple-500 bg-purple-950/30" : "border-zinc-700"}`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-5xl mb-4">📸</div>
                  <p className="text-lg font-medium">
                    Drop images here or click to upload
                  </p>
                  <p className="text-zinc-500 text-sm mt-1">
                    Max 6 images total • PNG, JPG, WebP
                  </p>
                </label>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`preview-${index}`}
                        className="w-full h-40 object-cover rounded-2xl border border-zinc-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                      >
                        Remove
                      </button>
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-purple-600 text-xs px-2 py-1 rounded-full">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 bg-amber-950/50 border border-amber-900/50 rounded-2xl p-4 text-amber-400 text-sm">
              <strong>Note:</strong> Your product will be reviewed by admin if
              major changes are made.
            </div>

            <div className="flex items-center gap-4 mt-10">
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                {uploading
                  ? "Uploading Images..."
                  : loading
                    ? "Submitting..."
                    : "Submit Product"}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-8 py-4 border border-zinc-700 hover:bg-zinc-800 rounded-2xl font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

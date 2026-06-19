'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AddProductPage({user}) {
    console.log(user);
    const {name,location,phone,email,id,role}=user?.user
    const seller ={
        name,
        location,
        phone,
        email,
        id,
        role,
    }
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    price: '',
    stock: '1',
    description: '',
    status: 'pending'
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const IMG_BB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // ← Replace with your actual ImgBB API key

  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Vehicles', 'Other'];
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Used'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (files) => {
    const newImages = Array.from(files);
    const totalImages = [...images, ...newImages].slice(0, 6);

    setImages(totalImages);

    const newPreviews = totalImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);

    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  // Upload single image to ImgBB
  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.status === 200) {
      return result.data.url;
    } else {
      throw new Error(result.error?.message || 'Failed to upload image');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageChange(e.dataTransfer.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.condition || !formData.price) {
      toast.error("Please fill all required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    if (!IMG_BB_API_KEY || IMG_BB_API_KEY === "YOUR_IMGBB_API_KEY_HERE") {
      toast.error("Please add your ImgBB API key in the code");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      // toast.loading("Uploading images to ImgBB...", { id: 'upload' });

      // Upload all images to ImgBB
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadToImgBB(images[i]);
        imageUrls.push(url);
      }

      // toast.success(`${images.length} image(s) uploaded successfully!`, { id: 'upload' });

      // Final form data with image URLs
      const finalData = {
        ...formData,
        images: imageUrls,           // Array of image URLs
        mainImage: imageUrls[0], 
        seller,    // First image as main
      };

      console.log('✅ Final Product Data:', finalData);

      // Here you can send finalData to your backend
      // await yourBackendAPI.createProduct(finalData);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products`,{
        method: "POST",
        headers:{
           'Content-Type':'application/json'
        },
        body: JSON.stringify(finalData)
      })
      const data = res
      console.log(data);
      
      
      

      toast.success("Product submitted successfully! Awaiting admin review.");

      // Reset form after success
      setFormData({
        title: '', category: '', condition: '', price: '', stock: '1', description: ''
      });
      setImages([]);
      setPreviewUrls([]);

    } catch (error) {
      console.error(error);
    ;
      
      toast.error(error.message || "Failed to upload images");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <Toaster position="top-center" richColors />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            
            {/* Product Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Product Title <span className="text-red-500">*</span></label>
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
                <label className="block text-sm font-medium mb-2">Category <span className="text-red-500">*</span></label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500" required>
                  <option value="">Select category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Condition <span className="text-red-500">*</span></label>
                <select name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500" required>
                  <option value="">Select condition</option>
                  {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">Price (USD) <span className="text-red-500">*</span></label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity <span className="text-red-500">*</span></label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="1" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500" required />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Description <span className="text-red-500">*</span></label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your product in detail..." rows={5} className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-4 focus:outline-none focus:border-purple-500 resize-y" required />
            </div>

            {/* Image Upload Section */}
            <div className="mt-8">
              <label className="block text-sm font-medium mb-3">Product Images <span className="text-red-500">*</span></label>
              
              <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all ${isDragging ? 'border-purple-500 bg-purple-950/30' : 'border-zinc-700'}`}>
                <input type="file" multiple accept="image/*" onChange={(e) => handleImageChange(e.target.files)} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-5xl mb-4">📸</div>
                  <p className="text-lg font-medium">Drop images here or click to upload</p>
                  <p className="text-zinc-500 text-sm mt-1">Max 6 images • PNG, JPG, WebP</p>
                </label>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`preview-${index}`} className="w-full h-40 object-cover rounded-2xl border border-zinc-700" />
                      <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all">Remove</button>
                      {index === 0 && <div className="absolute top-2 left-2 bg-purple-600 text-xs px-2 py-1 rounded-full">Main</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 bg-amber-950/50 border border-amber-900/50 rounded-2xl p-4 text-amber-400 text-sm">
              <strong>Note:</strong> Your product will be reviewed by admin before going live.
            </div>

            <div className="flex items-center gap-4 mt-10">
              <button type="submit" disabled={loading || uploading} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2">
                {uploading ? "Uploading Images..." : loading ? "Submitting..." : "Submit Product"}
              </button>
              
              <button type="button" onClick={() => window.history.back()} className="px-8 py-4 border border-zinc-700 hover:bg-zinc-800 rounded-2xl font-medium transition-all">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
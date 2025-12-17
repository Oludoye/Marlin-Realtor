"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateListingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🏠</div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description || !price || !city || !state || !type || images.length === 0) {
      setError("All fields are required, including at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("type", type);

    images.forEach((img) => formData.append("images", img)); // multiple images

    try {
      setLoading(true);
      const res = await fetch("/api/listings", {
        method: "POST",
        body: formData,
        credentials: "include", // Important: Include cookies for authentication
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create listing");
        return;
      }

      setSuccess("Listing created successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setCity("");
      setState("");
      setType("");
      setImages([]);

      // Optionally redirect to listings or dashboard
      router.push("/listings");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <span>➕</span>
              <span>Create New Listing</span>
            </h1>
            <p className="text-blue-100 mt-1">Fill in the details to list your property</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter property title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Describe your property"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
              <input
                type="text"
                placeholder="e.g. Apartment, House, Condo"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => setImages(Array.from(e.target.files || []))}
              />
              {images.length > 0 && (
                <p className="mt-2 text-sm text-green-600 font-medium">
                  ✓ {images.length} image{images.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "⏳ Uploading..." : "✨ Create Listing"}
            </button>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <p className="text-red-600 font-semibold">❌ {error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <p className="text-green-600 font-semibold">✅ {success}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
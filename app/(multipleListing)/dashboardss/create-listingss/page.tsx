"use client";
import { useState } from "react";

export default function CreateListingssPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleMultipleUpload(e: any) {
    const files = Array.from(e.target.files);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file as File);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImages(prev => [...prev, data.url]);
    }
  }

  async function createListing() {
    setLoading(true);

    await fetch("/api/listingss", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        description,
        city,      // ✅ THIS MUST EXIST
        images,    // array of uploaded image URLs
      }),
    });
    

    setLoading(false);
    alert("Listing created successfully!");
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Listing</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Price"
        type="number"
        onChange={e => setPrice(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}
      />

      <input
        type="file"
        multiple
        onChange={handleMultipleUpload}
        className="mb-4"
      />

<input
  type="text"
  placeholder="City"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  className="border p-2 w-full rounded"
/>

      {/* ✅ Image Preview Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.map(img => (
          <img
            key={img}
            src={img}
            className="w-full h-24 object-cover rounded border"
          />
        ))}
      </div>

      <button
        onClick={createListing}
        disabled={loading}
        className="bg-black text-white px-4 py-2 mt-6"
      >
        {loading ? "Saving..." : "Save Listing"}
      </button>
    </div>
  );
}

'use client';
import { useEffect, useState } from "react";

type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  approved: boolean;
};

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [form, setForm] = useState({ title: "", description: "", price: 0 });

  useEffect(() => {
    fetch("/api/listings")
      .then(res => res.json())
      .then(setListings);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addListing = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newListing = await res.json();
    setListings([...listings, newListing]);
    setForm({ title: "", description: "", price: 0 });
  };

  const deleteListing = async (id: number) => {
    await fetch(`/api/listings/${id}`, { method: "DELETE" });
    setListings(listings.filter(l => l.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Agent Listings 📋
        </h1>

        <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Listing</h2>
          <form onSubmit={addListing} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Property Title"
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Property Description"
              rows={3}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
            <div className="flex gap-4">
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="flex-1 border-2 border-gray-300 rounded-lg p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                required
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                ➕ Add Listing
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span>
              <span>All Listings</span>
              <span className="ml-auto text-lg font-normal bg-white/20 px-3 py-1 rounded-full">
                {listings.length} {listings.length === 1 ? 'Listing' : 'Listings'}
              </span>
            </h2>
          </div>

          {listings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-gray-600 text-lg">No listings found. Create your first listing above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Title</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {listings.map((l, index) => (
                    <tr 
                      key={l.id}
                      className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-150 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{l.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                          {formatPrice(l.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          l.approved 
                            ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300"
                            : "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300"
                        }`}>
                          {l.approved ? "✅ Approved" : "⏳ Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => deleteListing(l.id)}
                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs font-semibold"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

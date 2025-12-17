"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  city: string;
  state: string;
  type: string;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminListingPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/listings");
      
      if (!res.ok) {
        throw new Error("Failed to fetch listings");
      }
      
      const data = await res.json();
      setListings(data);
    } catch (err: any) {
      console.error("Error loading listings:", err);
      setError(err.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (id: number) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(`/api/listings/${id}`, { method: "DELETE" });

      if (res.ok) {
        alert("Listing deleted successfully.");
        loadData();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete listing.");
      }
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Failed to delete listing.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="bg-white shadow-xl rounded-xl p-8 text-center border-2 border-gray-200">
          <p className="text-gray-600 text-lg">Loading listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
          <p className="text-red-600 font-semibold mb-4">Error: {error}</p>
          <button
            onClick={loadData}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 shadow-md transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 max-w-6xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Navigation Buttons */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-6">
          <Link
            href="/agent/listings"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2 border-2 border-blue-300"
          >
            <span className="text-xl">🏠</span>
            <span>Agent Listings</span>
          </Link>

          <Link
            href="/admin/users"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">👥</span>
            <span>Manage Users</span>
          </Link>

          <Link
            href="/admin/listing/panel"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">👥</span>
            <span>Panel</span>
          </Link>  
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border-2 border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🏠</span>
            <span>Listings Management</span>
            <span className="ml-auto text-lg font-normal bg-white/20 px-3 py-1 rounded-full">
              {listings.length} {listings.length === 1 ? 'Listing' : 'Listings'}
            </span>
          </h2>
        </div>

        {listings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 text-lg">No listings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {listings.map((listing, index) => (
                  <tr 
                    key={listing.id} 
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {listing.images && listing.images.length > 0 ? (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-md border-2 border-gray-200">
                          <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs border-2 border-gray-200">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 max-w-xs truncate">
                        {listing.title}
                      </div>
                      <div className="text-xs text-gray-500 max-w-xs truncate mt-1">
                        {listing.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">📍 {listing.city}</div>
                      <div className="text-xs text-gray-500">{listing.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                        {listing.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {formatPrice(listing.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          listing.status === "ACTIVE"
                            ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300"
                            : listing.status === "SOLD"
                            ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300"
                            : "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded">
                        #{listing.userId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                      {formatDate(listing.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2 flex-wrap">
                        <Link
                          href={`/listings/${listing.id}`}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs font-semibold"
                        >
                          👁️ View
                        </Link>
                        <Link
                          href={`/listings/${listing.id}/edit`}
                          className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs font-semibold"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => deleteListing(listing.id)}
                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs font-semibold"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

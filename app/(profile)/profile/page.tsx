"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SavedProperty {
  id: string;
  listing: {
    id: number;
    title: string;
    price: number;
    images: string[];
    city: string;
    state: string;
    type: string;
  };
}

type User = {
  id: number;
  name: string;
  email: string;
  image: string | null;
};

export default function ClientDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // ✅ Fetch logged-in user profile
  useEffect(() => {
    if (!session) return;

    async function fetchUser() {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, [session]);

  // ✅ Fetch saved properties
  useEffect(() => {
    if (session) {
      fetchSavedProperties();
    }
  }, [session]);

  const fetchSavedProperties = async () => {
    try {
      const response = await fetch("/api/users/saved-properties");
      const data = await response.json();
      if (response.ok) {
        setSavedProperties(data);
      }
    } catch (error) {
      console.error("Error fetching saved properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedProperty = async (propertyId: string) => {
    try {
      const response = await fetch("/api/users/saved-properties", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });

      if (response.ok) {
        setSavedProperties((prev) =>
          prev.filter((sp) => sp.id !== propertyId)
        );
      }
    } catch (error) {
      console.error("Error removing saved property:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">


        {/* ✅ WELCOME HEADER with Profile Picture */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-2">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "Profile"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-3xl text-white font-bold">
                      {user?.name?.charAt(0).toUpperCase() || session?.user?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              {/* Edit Image Button */}
              <Link
                href="/profile/edit"
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                📷 Edit Image
              </Link>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.name || session.user?.name}! 👋
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage your property search and preferences
              </p>
            </div>
          </div>

          <Link
            href="/profile/create-listing"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition"
          >
            ➕ List a Property
          </Link>
        </div>

        {/* ✅ DASHBOARD STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-600 rounded-xl p-6 text-white">
            <div className="text-4xl font-bold">{savedProperties.length}</div>
            <div>Saved Properties</div>
          </div>

          <div className="bg-green-600 rounded-xl p-6 text-white">
            <div className="text-4xl font-bold">0</div>
            <div>Scheduled Tours</div>
          </div>

          <div className="bg-purple-600 rounded-xl p-6 text-white">
            <div className="text-4xl font-bold">0</div>
            <div>Messages</div>
          </div>
        </div>

        {/* ✅ SAVED LISTINGS GRID */}
        <div className="bg-white rounded-xl shadow border p-6">
          {savedProperties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">
                No saved properties yet
              </h3>
              <Link
                href="/listings"
                className="bg-blue-600 text-white px-6 py-3 rounded"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {savedProperties.map((sp) => (
                <div
                  key={sp.id}
                  className="border rounded-lg overflow-hidden shadow"
                >
                  <Link href={`/listings/${sp.listing.id}`}>
                    <img
                      src={sp.listing.images?.[0] || "/no-image.png"}
                      className="w-full h-48 object-cover"
                    />
                  </Link>

                  <div className="p-4">
                    <h3 className="font-bold">{sp.listing.title}</h3>
                    <p className="text-gray-600">
                      {sp.listing.city}, {sp.listing.state}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold">
                        {formatPrice(sp.listing.price)}
                      </span>

                      <button
                        onClick={() => removeSavedProperty(sp.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

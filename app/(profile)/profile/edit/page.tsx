"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function EditProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      loadProfile();
    }
  }, [status, router]);

  const loadProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      setName(data.name || "");
      setPhone(data.phone || "");
      setImage(data.image || null);
    } catch (err) {
      console.error("Error loading profile:", err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to upload image");
        return;
      }

      const data = await res.json();
      setImage(data.url);
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, image }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to update profile");
        return;
      }

      alert("Profile updated successfully!");
      router.push("/profile");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="p-10 max-w-2xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white shadow-xl rounded-xl p-8 text-center">
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Edit Profile
        </h1>
        <Link
          href="/profile"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to Profile
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-8 border-2 border-gray-200">
        {/* Profile Picture Section */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Profile Picture
          </label>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
              {image ? (
                <Image
                  src={image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-4xl">
                  {name.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
            <div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                <span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 inline-block">
                  {uploading ? "Uploading..." : "📷 Change Photo"}
                </span>
              </label>
              {image && (
                <button
                  onClick={() => setImage(null)}
                  className="ml-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Recommended: Square image, at least 400x400 pixels. Max size: 5MB
          </p>
        </div>

        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Phone Field */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Email (Read-only) */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={session.user?.email || ""}
            disabled
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={saveProfile}
            disabled={saving || !name.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {saving ? "Saving..." : "💾 Save Changes"}
          </button>
          <Link
            href="/profile"
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

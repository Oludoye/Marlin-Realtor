'use client';
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

type User = { 
  id: number; 
  name: string; 
  email: string; 
  role: string;
  status: string;
  phone: string | null;
  image: string | null;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/users");
      
      if (!res.ok) {
        // Try to get error message from response
        let errorMessage = "Failed to fetch users";
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = res.statusText || errorMessage;
        }
        
        // Provide more specific error messages
        if (res.status === 401) {
          errorMessage = "Unauthorized: Please log in again";
        } else if (res.status === 403) {
          errorMessage = "Forbidden: Admin access required";
        } else if (res.status === 500) {
          errorMessage = "Server error: Please try again later";
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await res.json();
      
      // Check if data is an array (users) or an error object
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        setUsers([]);
      }
    } catch (err: any) {
      console.error("Error loading users:", err);
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only load users if session is loaded and user is authenticated
    if (session?.user) {
      loadUsers();
    } else if (session === null) {
      // Session check is complete but user is not logged in
      setLoading(false);
    }
  }, [session]);

  const handleUserAction = async (id: number, action: 'approve' | 'ignore') => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || `Failed to ${action} user`);
        return;
      }

      // Reload users to get updated status
      await loadUsers();
      alert(`User ${action === 'approve' ? 'approved' : 'denied'} successfully`);
    } catch (err) {
      console.error(`Error ${action}ing user:`, err);
      alert(`Failed to ${action} user`);
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { 
        method: "DELETE" 
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
        return;
      }

      setUsers(users.filter(u => u.id !== id));
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  const handleImageUpload = async (userId: number, file: File) => {
    try {
      // Upload image
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const uploadData = await uploadRes.json();
        alert(uploadData.error || "Failed to upload image");
        return;
      }

      const { url } = await uploadRes.json();

      // Update user profile picture
      const updateRes = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, image: url }),
      });

      if (!updateRes.ok) {
        const updateData = await updateRes.json();
        alert(updateData.error || "Failed to update profile picture");
        return;
      }

      // Reload users to show updated image
      await loadUsers();
      alert("Profile picture updated successfully");
    } catch (err) {
      console.error("Error updating profile picture:", err);
      alert("Failed to update profile picture");
    }
  };

  // Show loading while session is being checked
  if (session === undefined) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white shadow-xl rounded-xl p-8 text-center">
          <p className="text-gray-600 text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show message if not logged in
  if (!session) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white shadow-xl rounded-xl p-8 text-center">
          <p className="text-gray-600 text-lg mb-4">Please log in to access this page.</p>
          <Link
            href="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
          <p className="text-red-600 font-semibold">Access Denied: Admin privileges required</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin - Users Management
        </h1>
        <div className="bg-white shadow-xl rounded-xl p-8 text-center border-2 border-gray-200">
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin - Users Management
        </h1>
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
          <p className="text-red-600 font-semibold mb-4">Error: {error}</p>
          <button
            onClick={loadUsers}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 shadow-md transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin - Users Management
        </h1>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-6">
          <Link
            href="/admin/listing"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">🏠</span>
            <span>Manage Listings</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border-2 border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>👥</span>
            <span>All Users</span>
            <span className="ml-auto text-lg font-normal bg-white/20 px-3 py-1 rounded-full">
              {users.length} {users.length === 1 ? 'User' : 'Users'}
            </span>
          </h2>
        </div>

        {users.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 text-lg">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Photo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    Status
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
                {users.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-md group">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer transition-all duration-200">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(user.id, file);
                              }
                            }}
                          />
                          <span className="text-white text-xs opacity-0 group-hover:opacity-100 font-semibold">
                            📷 Edit
                          </span>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{user.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'ADMIN' 
                          ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300'
                          : user.role === 'AGENT'
                          ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        user.status === 'APPROVED'
                          ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300'
                          : user.status === 'DENIED'
                          ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300'
                          : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2 flex-wrap">
                        {user.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleUserAction(user.id, 'approve')}
                              className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs font-semibold"
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'ignore')}
                              className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs font-semibold"
                            >
                              ❌ Deny
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteUser(user.id)}
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

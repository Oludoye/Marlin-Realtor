"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      console.log("API RESPONSE:", data); // ✅ DEBUG LINE

      // ✅ PROTECTION: Only set if it's actually an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setError(data.error || "Failed to load users");
        setUsers([]); // always keep users as ARRAY
      }
    } catch (err) {
      setError("Network error");
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    if (!confirm("Delete this user?")) return;

    const res = await fetch(`/api/admin/users?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      fetchUsers();
    } else {
      alert(data.error);
    }
  };

  const updateStatus = async (id: number, status: "APPROVED" | "REJECTED") => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    const data = await res.json();

    if (res.ok) {
      fetchUsers();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{user.status}</td>
                <td className="p-2 border flex gap-2 justify-center">
                  {user.status === "PENDING" && (
                    <>
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded"
                        onClick={() => updateStatus(user.id, "APPROVED")}
                      >
                        Approve
                      </button>

                      <button
                        className="bg-yellow-600 text-white px-2 py-1 rounded"
                        onClick={() => updateStatus(user.id, "REJECTED")}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

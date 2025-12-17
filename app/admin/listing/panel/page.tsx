// app/admin/panel/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();

        console.log("ADMIN USERS:", data); // ✅ DEBUG

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
          setError(data?.error || "Failed to load users");
        }
      } catch (err) {
        console.error(err);
        setError("Network error");
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="space-y-4">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((u: any) => (
            <div
              key={u.id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div>
                <div className="font-semibold">{u.name ?? u.email}</div>
                <div className="text-sm text-gray-600">{u.email}</div>
                <div className="text-sm text-gray-500">
                  Role: {u.role} | Status: {u.status}
                </div>
              </div>

              <div className="flex gap-2">
                <RoleSelector user={u} />

                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ✅ UPDATE ROLE
function RoleSelector({ user }: { user: any }) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // @ts-ignore
        const role = e.currentTarget.role.value;

        const res = await fetch("/api/admin/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id, role }),
        });

        if (res.ok) {
          location.reload();
        } else {
          alert("Failed to update role");
        }
      }}
    >
      <select
        name="role"
        defaultValue={user.role}
        className="border p-1 rounded mr-2"
      >
        <option value="TEAM_MEMBER">Team Member</option>
        <option value="AGENT">Agent</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button className="bg-gray-200 p-1 rounded">Update</button>
    </form>
  );
}

// ✅ DELETE USER
async function deleteUser(id: number) {
  if (!confirm("Delete this user?")) return;

  const res = await fetch(`/api/admin/users?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.ok) {
    location.reload();
  } else {
    alert(data.error || "Delete failed");
  }
}

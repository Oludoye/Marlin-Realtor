// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "TEAM_MEMBER" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch("/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     setMessage(data.message);

//     // ✅ Redirect to login page on successful registration
//     if (res.ok) {
//       router.push("/login");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="TEAM_MEMBER">Team Member</option>
//           <option value="AGENT">Agent</option>
//         </select>
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
//           Register
//         </button>
//       </form>
//       {message && <p className="mt-2 text-center">{message}</p>}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  // Default role is now 'AGENT' as TEAM_MEMBER requires admin approval and usually a separate flow
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "AGENT" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Registering...");
    setIsSuccess(false); // Reset status

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    
    const data = await res.json();
    
    if (res.ok) {
      setIsSuccess(true);
      if (form.role === "AGENT") {
        setMessage("Registration successful! Redirecting to Agent Dashboard...");
        // Redirect agents immediately
        router.push("/agent"); 
      } else {
        setMessage("Registration successful! Your team member access request has been sent to the admin for approval. You will be notified once approved.");
        // Stay on page and display message for team members pending approval
      }
    } else {
      setIsSuccess(false);
      setMessage(data.message || "Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          minLength={6}
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="AGENT">Agent (Instant Access)</option>
          <option value="TEAM_MEMBER">Team Member (Requires Admin Approval)</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center p-3 rounded ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

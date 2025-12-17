// 'use client';

// import { useState } from 'react';
// import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation';


// export default function SidebarNavigation() {
//   const [activeItem, setActiveItem] = useState('Profile');
//   const { data: session, status } = useSession() 
//   const router = useRouter();

//   const menuItems = {
//     Profile: [
//       { id: 'dashboard', label: 'Dashboard', icon: '👤', path: '/agent/dashboard' },
//       { id: 'edit-profile', label: 'Edit Profile', icon: '👤', path: '/edit-profile' },
//       { id: 'kyc-info', label: 'KYC Information', icon: '📄', path: '/kyc' },
//     ],
//     Support: [
//       { id: 'faq-support', label: 'FAQ & Support', icon: '❓', path: '/faq' },
//     ],
//     Security: [
//       { id: 'delete-account', label: 'Delete Account', icon: '🗑', path: '/delete-account' },
//       { id: 'logout', label: 'Log Out', icon: '🚪', path: '/logout' },
//     ],
//     Home: [
//       { id: 'investments', label: 'Investments', icon: '📈', path: '/investments' },
//       { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
//     ]
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex">
//         {/* Sidebar */}
//         <div className="w-80 bg-white shadow-lg min-h-screen p-6">
//           {/* Logo Section */}
//           {/* ... */}

//           {/* Profile Section (Now simpler) */}
//           <div className="mb-8 p-4 bg-gray-100 rounded-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//                 {/* Use the user's initial or default */}
//                 {session?.user?.name ? session.user.name.charAt(0) : 'EC'} 
//               </div>
              
//               {session?.user && ( // Only render this block if session.user exists
//               <div>
//                 <h3 className="font-semibold text-gray-900">{session.user.name}</h3>
//                 <p className="text-sm text-gray-600">Member since 2022</p>
//               </div>
//               )}
//               {/* Optional: Add an 'else' state if no session */}
//               {!session?.user && (
//                   <div>
//                       <h3 className="font-semibold text-gray-900">Guest User</h3>
//                       <p className="text-sm text-gray-600">Please log in</p>
//                   </div>
//               )}
              
//             </div>
//              </div>

 


//           {/* Navigation Menu */}
//           <nav className="space-y-6">
//             {Object.entries(menuItems).map(([category, items]) => (
//               <div key={category}>
//                 <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
//                   {category}
//                 </h4>
//                 <ul className="space-y-2">
//                   {items.map((item) => (
//                     <li key={item.id}>
//                       <button
//                         onClick={() => setActiveItem(item.label)}
//                         className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
//                           activeItem === item.label
//                             ? 'bg-blue-50 text-blue-600 border border-blue-200'
//                             : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                       >
//                         <span className="text-lg">{item.icon}</span>
//                         <span className="font-medium">{item.label}</span>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           <div className="max-w-4xl">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {activeItem}
//             </h1>
//             <p className="text-gray-600 mb-8">
//               Manage your {activeItem.toLowerCase()} settings and preferences.
//             </p>
            
//             {/* Content based on active item */}
            
//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               {activeItem === 'Edit Profile' && (
//                 <div className="space-y-4">
//                   <p className="text-gray-700">Update your personal information and preferences.</p>
//                   {/* Add form components here */}
//                 </div>
//               )}
              
//               {activeItem === 'KYC Information' && (
//                 <div className="space-y-4">
//                   <p className="text-gray-700">Manage your Know Your Customer verification details.</p>
                
//         {/* Add KYC components here */}
//                 </div>
//               )}
              
//               {activeItem === 'FAQ & Support' && (
//                 <div className="space-y-4">
//                   <p className="text-gray-700">Find answers to frequently asked questions and get support.</p>
//                   {/* Add FAQ components here */}
//                 </div>
//               )}
              
//               {activeItem === 'Delete Account' && (
//                 <div className="space-y-4">
//                   <p className="text-gray-700">Permanently delete your account and all associated data.</p>
//                   {/* Add delete account components here */}
//                 </div>
//               )}
              
//               {activeItem === 'Log Out' && (
//                 <div className="space-y-4">
//                   <p className="text-gray-700">Sign out of your account securely.</p>
//                   {/* Add logout components here */}
//                 </div>
//               )}
              
//               {activeItem === 'Investments' && (
//                 <div className="space-y-4">
//                   <p className="text-gray-700">View and manage your investment portfolio.</p>
//                   {/* Add investment components here */}
//                 </div>
//               )}
              
//               {activeItem === 'Profile' && (
//                 <div className="space-y-4">
//                   <p className="text-gray-700">Access your profile overview and settings.</p>
//                   {/* Add profile components here */}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
  
//             {/* Bottom Navbar */}
//      <nav className=" p-4 bg-white border-t border-gray-200 shadow-md">
//         <div className=" mx-auto px-4 flex justify-around items-center">
//          <button className="flex flex-col items-center text-gray-500 hover:text-blue-600">
//             <span className="text-lg">🏠</span>
//             <span className="text-xs font-medium">Home</span>
//           </button>
//           <button className="flex flex-col items-center text-gray-500 hover:text-blue-600">
//             <span className="text-lg">📈</span>
//             <span className="text-xs font-medium">Investments</span>
//           </button>
//           <button className="flex flex-col items-center text-blue-600">
//             <span className="text-lg">👤</span>
//             <span className="text-xs font-medium">Profile</span>
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }


// // 'use client';
// // import { useState, useEffect } from 'react';

// // type Listing = {
// //   id: number;
// //   title: string;
// //   description: string;
// //   price: number;
// // };

// // export default function AgentDashboard() {
// //   const [listings, setListings] = useState<Listing[]>([]);
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [price, setPrice] = useState('');

// //   const fetchListings = async () => {
// //     const res = await fetch('/api/agent/listings');
// //     const data = await res.json();
// //     setListings(data);
// //   };

// //   const addListing = async () => {
// //     await fetch('/api/agent/listings', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ title, description, price: Number(price) }),
// //     });
// //     setTitle(''); setDescription(''); setPrice('');
// //     fetchListings();
// //   };

// //   const deleteListing = async (id: number) => {
// //     await fetch(`/api/agent/listings/${id}`, { method: 'DELETE' });
// //     fetchListings();
// //   };

// //   useEffect(() => { fetchListings(); }, []);

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Agent Dashboard</h2>

// //       <div className="mb-4">
// //         <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
// //         <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
// //         <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
// //         <button onClick={addListing}>Add Listing</button>
// //       </div>

// //       <ul>
// //         {listings.map(l => (
// //           <li key={l.id}>
// //             {l.title} - ${l.price}
// //             <button onClick={() => deleteListing(l.id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AuthGuard from "@/components/AuthGuard"; // Import the AuthGuard

// Define the type for a listing
type Listing = { 
  id: number; 
  title: string; 
  description: string; 
  price: number; 
  approved: boolean 
};

type User = {
  id: number;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
};

// This component contains all the actual dashboard logic and UI
function AgentDashboardContent() {
  const { data: session } = useSession();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user profile
    if (session) {
      fetch("/api/profile")
        .then(res => res.json())
        .then(data => {
          setUser(data);
        })
        .catch(err => console.error("Error fetching user profile:", err));
    }

    // Fetch listings
    fetch("/api/listings")
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      });
  }, [session]);

  const toggleApproval = async (id: number) => {
    // Ensure these API endpoints enforce that only the listing owner or admin can update
    await fetch(`/api/listings/${id}`, { method: "PATCH" });
    setListings(listings.map(l => l.id === id ? { ...l, approved: !l.approved } : l));
  };

  const deleteListing = async (id: number) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    // Ensure these API endpoints enforce that only the listing owner or admin can delete
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">👤</div>
          <p className="text-xl text-gray-600">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header with Profile Picture */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase() || session?.user?.name?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.name || session?.user?.name || "Agent"}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your property listings
              </p>
            </div>
          </div>

          <Link
            href="/profile/create-listing"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
          >
            ➕ Add New Listing
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span>
              <span>My Listings</span>
              <span className="ml-auto text-lg font-normal bg-white/20 px-3 py-1 rounded-full">
                {listings.length} {listings.length === 1 ? 'Listing' : 'Listings'}
              </span>
            </h2>
          </div>

          {listings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-gray-600 text-lg">No listings found.</p>
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
                        <div className="text-xs text-gray-500 mt-1">{l.description}</div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleApproval(l.id)}
                            className={`px-3 py-1 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs font-semibold ${
                              l.approved
                                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700"
                                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                            }`}
                          >
                            {l.approved ? "⏸️ Unapprove" : "✅ Approve"}
                          </button>
                          <button
                            onClick={() => deleteListing(l.id)}
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
    </div>
  );
}


// Wrap the content with the AuthGuard
export default function ProtectedAgentDashboardPage() {
    return (
        <AuthGuard allowedRoles={['AGENT']}>
            <AgentDashboardContent />
        </AuthGuard>
    );
}




// "use client";

// import { ArrowLeft, User, FileText, HelpCircle, Trash2 } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// interface ProfileContentProps {
//   name: string;
//   memberSince: string;
//   profileImage?: string;
// }

// export default function ProfileContent({
//   name,
//   memberSince,
//   profileImage,
// }: ProfileContentProps) {
//   const safeProfileImage =
//     profileImage && profileImage.trim() !== ""
//       ? profileImage
//       : "/avatar.png";

//   return (
//     <aside className="w-72 min-h-screen bg-white border-r p-6">
//       {/* ✅ PROFILE ROW */}
//       <div className="flex items-center gap-4 mb-10">
//         <div className="w-14 h-14 rounded-full overflow-hidden bg-orange-100">
//           <Image
//             src={safeProfileImage}
//             alt="Profile"
//             width={56}
//             height={56}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div>
//           <h2 className="font-semibold text-gray-900">{name}</h2>
//           <p className="text-xs text-gray-500">Since {memberSince}</p>
//         </div>
//       </div>

//       {/* ✅ ACCOUNT */}
//       <div className="mb-6">
//         <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
//           Account
//         </h3>

//         <Link href="/edit-profile" className="sidebar-link">
//           <User size={18} /> Edit Profile
//         </Link>

//         <Link href="/kyc" className="sidebar-link">
//           <FileText size={18} /> KYC Information
//         </Link>
//       </div>

//       {/* ✅ SUPPORT */}
//       <div className="mb-6">
//         <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
//           Support
//         </h3>

//         <Link href="/faq" className="sidebar-link">
//           <HelpCircle size={18} /> FAQ & Support
//         </Link>
//       </div>

//       {/* ✅ SECURITY */}
//       <div>
//         <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
//           Security
//         </h3>

//         <button className="sidebar-link w-full text-left">
//           <Trash2 size={18} /> Delete Account
//         </button>

//         <button className="sidebar-link w-full text-left text-red-600">
//           <ArrowLeft size={18} /> Log Out
//         </button>
//       </div>
//     </aside>
//   );
// }

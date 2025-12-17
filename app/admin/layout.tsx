// app/admin/layout.tsx
import Navbar from '../../components/Navbar'

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen flex bg-gray-100">
       
        {/* ✅ SIDEBAR */}
        <aside className="w-50 bg-blue-500 text-white p-2">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
  
          <nav className="flex flex-col gap-4">
            <a href="/admin/listing" className="hover:text-gray-300 rounded-xl border py-3 px-10 ">
              Dashboard
            </a>
            <a href="/admin" className="hover:text-gray-300 border rounded-xl py-3 px-10 ">
              Protocol
            </a>
            <a href="/admin/listing/panel" className="hover:text-gray-300 rounded-xl border py-3 px-10">
              Panel
            </a>
            <a href="/admin/users" className="hover:text-gray-300 border rounded-xl py-3 px-10">
              Users
            </a>
            <a href="/agent/listings" className="hover:text-gray-300 rounded-xl border py-3 px-10">
              Agent Listings
            </a>
            <a href="/" className="hover:text-gray-300 mt-6 border py-3 rounded-xl px-10">
              ← Back to Site
            </a>
          </nav>
        </aside>
  
        {/* ✅ MAIN CONTENT */}
        <main className="flex-1 p-1">
             <Navbar />
            {children}
            </main>
        {/* <Navbar /> */}
      </div>
    );
  }
  
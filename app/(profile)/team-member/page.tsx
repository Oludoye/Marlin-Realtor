'use client';

import SidebarNavigation from '../../../components/SidebarNavigation.';
import AuthGuard from "@/components/AuthGuard";

// The core dashboard content component
function TeamMemberDashboardContent() {

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <SidebarNavigation /> 

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Team-Member Dashboard 🧑‍💻</h2>
        <p className="text-gray-600 mb-6">
          Manage your assigned tasks, track progress, and collaborate with your team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-blue-200 hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2 text-gray-700">Pending Tasks</h3>
            <p className="text-2xl font-bold text-blue-600">13</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-green-200 hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2 text-gray-700">Completed Tasks (Weekly)</h3>
            <p className="text-2xl font-bold text-green-600">4</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-purple-200 hover:shadow-xl transition-shadow">
            <h3 className="font-semibold mb-2 text-gray-700">Team Collaboration Score</h3>
            <p className="text-2xl font-bold text-purple-600">8.5/10</p>
          </div>
        </div>
      </main>
    </div>
  );
}


// Export the default page, wrapped in the AuthGuard
export default function TeamMemberDashboardPage() {
    // Only users with the role 'TEAM_MEMBER' can view this page
    return (
        <AuthGuard allowedRoles={['TEAM_MEMBER']}>
            <TeamMemberDashboardContent />
        </AuthGuard>
    );
}

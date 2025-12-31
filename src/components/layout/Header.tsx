'use client';

import { User } from '@/lib/types';
import { Bell, User as UserIcon, LogOut } from 'lucide-react';
import { logout, getCurrentUser } from '@/lib/auth';

export default function Header() {
  // Get user IMMEDIATELY - no useState, no useEffect
  const user = getCurrentUser();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  // If no user, don't show header at all
  if (!user) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">
            Welcome back, {user.name}!
            <span className="ml-2 text-sm text-primary capitalize">
              ({user.role.replace('-', ' ')})
            </span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
              <UserIcon className="text-white" size={20} />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500 capitalize">
                {user.role.replace('-', ' ')}
                {user.branchId && ` • Branch: ${user.branchId}`}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
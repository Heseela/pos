'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, getAccessibleRoutes } from '@/lib/auth';
import { User, UserRole } from '@/lib/types';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  BookOpen, 
  BarChart3, 
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Building,
  LogOut,
  Settings
} from 'lucide-react';
import { logout } from '@/lib/auth';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    // Always start expanded
    return false;
  });
  
  // Get user IMMEDIATELY on component mount
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      return getCurrentUser();
    }
    return null;
  });
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Double-check on mount but we already have user from useState initializer
    const currentUser = getCurrentUser();
    if (!currentUser && pathname !== '/login') {
      router.push('/login');
    }
  }, [pathname, router]);

  // Define all possible menu items with their roles
  const allMenuItems = [
    { 
      href: '/dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      roles: ['admin', 'branch-head', 'cashier', 'waiter'] 
    },
    { 
      href: '/orders', 
      label: 'Orders/KOT', 
      icon: ShoppingCart, 
      roles: ['admin', 'branch-head', 'cashier', 'waiter'] 
    },
    { 
      href: '/inventory', 
      label: 'Inventory', 
      icon: Package, 
      roles: ['admin', 'branch-head'] 
    },
    { 
      href: '/ledger', 
      label: 'Ledger', 
      icon: BookOpen, 
      roles: ['admin', 'branch-head'] 
    },
    { 
      href: '/reports', 
      label: 'Reports', 
      icon: BarChart3, 
      roles: ['admin', 'branch-head'] 
    },
    { 
      href: '/purchases', 
      label: 'Purchases', 
      icon: ShoppingBag, 
      roles: ['admin', 'branch-head'] 
    },
    { 
      href: '/branches', 
      label: 'Branches', 
      icon: Building, 
      roles: ['admin'] 
    },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  // If no user, don't show sidebar at all
  if (!user) {
    return null; // Return nothing, not even a skeleton
  }

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} sticky top-0 h-screen`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold">
              <span className="text-primary">POS</span>
              <span className="text-secondary"> System</span>
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
      
      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
              <div className="text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm truncate max-w-[150px]">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {user.role.replace('-', ' ')}
                {user.branchId && ` • Branch ID: ${user.branchId}`}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:pl-4'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-500'} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Settings size={16} />
              <span>Role: </span>
              <span className="font-semibold capitalize text-primary">
                {user.role.replace('-', ' ')}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handleLogout}
              className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
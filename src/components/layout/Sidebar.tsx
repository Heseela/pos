'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/lib/types';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  BookOpen, 
  BarChart3, 
  ShoppingBag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  userRole: UserRole;
}

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'branch-head', 'cashier', 'waiter'] },
  { href: '/orders', label: 'Orders/KOT', icon: ShoppingCart, roles: ['admin', 'branch-head', 'cashier', 'waiter'] },
  { href: '/inventory', label: 'Inventory', icon: Package, roles: ['admin', 'branch-head'] },
  { href: '/ledger', label: 'Ledger', icon: BookOpen, roles: ['admin', 'branch-head', 'cashier'] },
  { href: '/reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'branch-head'] },
  { href: '/purchases', label: 'Purchases', icon: ShoppingBag, roles: ['admin', 'branch-head'] },
];

export default function Sidebar({ userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-primary">
              <span className="text-secondary">POS</span>
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            <div className="font-medium text-gray-700">Current Role:</div>
            <div className="text-primary font-semibold capitalize">{userRole.replace('-', ' ')}</div>
          </div>
        </div>
      )}
    </aside>
  );
}
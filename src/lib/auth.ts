import { User, UserRole } from './types';
import { mockUsers } from './mockData';

export function login(email: string, password: string): User | null {
  const user = mockUsers.find(u => 
    u.name.toLowerCase().includes(email.toLowerCase()) && 
    password === 'password123'
  );
  return user || null;
}

export function logout(): void {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isAuthenticated');
  window.location.href = '/login';
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isAuthenticated') === 'true';
}

export function getAccessibleRoutes(userRole: UserRole): string[] {
  const baseRoutes = ['/dashboard'];
  
  switch(userRole) {
    case 'admin':
      return [...baseRoutes, '/orders', '/inventory', '/ledger', '/reports', '/purchases', '/branches'];
    
    case 'branch-head':
      return [...baseRoutes, '/orders', '/inventory', '/ledger', '/reports', '/purchases'];
    
    case 'cashier':
      return [...baseRoutes, '/orders'];
    
    case 'waiter':
      return [...baseRoutes, '/orders'];
    
    default:
      return baseRoutes;
  }
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const accessibleRoutes = getAccessibleRoutes(userRole);
  return accessibleRoutes.includes(route);
}

export function getMenuItems(userRole: UserRole) {
  const allMenuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: 'Home', roles: ['admin', 'branch-head', 'cashier', 'waiter'] },
    { href: '/orders', label: 'Orders/KOT', icon: 'ShoppingCart', roles: ['admin', 'branch-head', 'cashier', 'waiter'] },
    { href: '/inventory', label: 'Inventory', icon: 'Package', roles: ['admin', 'branch-head'] },
    { href: '/ledger', label: 'Ledger', icon: 'BookOpen', roles: ['admin', 'branch-head'] },
    { href: '/reports', label: 'Reports', icon: 'BarChart3', roles: ['admin', 'branch-head'] },
    { href: '/purchases', label: 'Purchases', icon: 'ShoppingBag', roles: ['admin', 'branch-head'] },
    { href: '/branches', label: 'Branches', icon: 'Building', roles: ['admin'] },
  ];
  
  return allMenuItems.filter(item => item.roles.includes(userRole));
}

export function getDefaultRoute(userRole: UserRole): string {
  switch(userRole) {
    case 'admin':
      return '/dashboard';
    case 'branch-head':
      return '/dashboard';
    case 'cashier':
      return '/dashboard';
    case 'waiter':
      return '/dashboard';
    default:
      return '/dashboard';
  }
}

export const canViewBranchData = (user: User, branchId: string): boolean => {
  if (user.role === 'admin') return true;
  
  return user.branchId === branchId;
};

export const canManageInventory = (role: string): boolean => {
  return ['admin', 'branch-head'].includes(role);
};

export const canViewReports = (role: string): boolean => {
  return ['admin', 'branch-head'].includes(role);
};

export const canViewLedger = (role: string): boolean => {
  return ['admin', 'branch-head', 'cashier'].includes(role);
};

export const canManageOrders = (role: string): boolean => {
  return ['admin', 'branch-head', 'cashier', 'waiter'].includes(role);
};
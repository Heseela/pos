import { ROLES } from '@/lib/constants';
import { UserRole } from '@/lib/types';

// Define module permissions for each role
export const rolePermissions: Record<UserRole, string[]> = {
  'admin': [
    'dashboard',
    'orders',
    'inventory',
    'ledger',
    'reports',
    'purchases',
    'branches',
    'users',
    'settings'
  ],
  'branch-head': [
    'dashboard',
    'orders',
    'inventory',
    'ledger',
    'reports',
    'purchases'
  ],
  'cashier': [
    'dashboard',
    'orders',
    'ledger'
  ],
  'waiter': [
    'dashboard',
    'orders'
  ]
};

export const canAccessModule = (role: UserRole, module: string): boolean => {
  return rolePermissions[role]?.includes(module) || false;
};

export const getModulePermissions = (role: UserRole): string[] => {
  return rolePermissions[role] || [];
};

export const getRoleDisplayName = (role: UserRole): string => {
  return ROLES[role] || role;
};

// Check if user can view data from specific branch
export const canViewBranchData = (user: { role: UserRole; branchId?: string }, branchId?: string): boolean => {
  if (user.role === 'admin') return true;
  if (user.role === 'branch-head' || user.role === 'cashier' || user.role === 'waiter') {
    return !branchId || user.branchId === branchId;
  }
  return false;
};

// Check if user can manage branches
export const canManageBranches = (role: UserRole): boolean => {
  return role === 'admin';
};
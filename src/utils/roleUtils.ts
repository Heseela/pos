// import { User } from '@/lib/types';

// export const canViewBranchData = (user: User, branchId: string): boolean => {
//   if (user.role === 'admin') return true;
  
//   return user.branchId === branchId;
// };

// export const canManageInventory = (role: string): boolean => {
//   return ['admin', 'branch-head'].includes(role);
// };

// export const canViewReports = (role: string): boolean => {
//   return ['admin', 'branch-head'].includes(role);
// };

// export const canViewLedger = (role: string): boolean => {
//   return ['admin', 'branch-head', 'cashier'].includes(role);
// };

// export const canManageOrders = (role: string): boolean => {
//   return ['admin', 'branch-head', 'cashier', 'waiter'].includes(role);
// };
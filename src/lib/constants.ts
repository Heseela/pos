import { UserRole } from './types';

export const ROLES: Record<UserRole, string> = {
  admin: 'Administrator',
  'branch-head': 'Branch Head',
  cashier: 'Cashier',
  waiter: 'Waiter'
};

export const ORDER_TYPES = [
  { value: 'dine-in', label: 'Dine In' },
  { value: 'takeaway', label: 'Takeaway' },
  { value: 'online', label: 'Online' },
  { value: 'table-booking', label: 'Table Booking' }
];

export const ORDER_STATUS = [
  'pending',
  'preparing',
  'ready',
  'served',
  'completed',
  'cancelled'
];

export const INVENTORY_CATEGORIES = [
  'Vegetables',
  'Fruits',
  'Dairy',
  'Meat',
  'Seafood',
  'Spices',
  'Beverages',
  'Packaged',
  'Others'
];
import { Branch, User, Order, InventoryItem, Purchase, LedgerEntry, Report } from './types';

// Mock Users
export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', role: 'admin' },
  { id: '2', name: 'KTM Branch Head', role: 'branch-head', branchId: '1' },
  { id: '3', name: 'Pokhara Branch Head', role: 'branch-head', branchId: '2' },
  { id: '4', name: 'Cashier 1', role: 'cashier', branchId: '1' },
  { id: '5', name: 'Cashier 2', role: 'cashier', branchId: '2' },
  { id: '6', name: 'Waiter 1', role: 'waiter', branchId: '1' },
  { id: '7', name: 'Waiter 2', role: 'waiter', branchId: '2' },
];

// Mock Branches
export const mockBranches: Branch[] = [
  { id: '1', name: 'KTM Main', location: 'Connaught Place, KTM', phone: '011-23456789', email: 'ktm@email.com' },
  { id: '2', name: 'Pokhara Branch', location: 'East West, Pokhara', phone: '022-98765432', email: 'pokhara@email.com' },
  { id: '3', name: 'Butwal Branch', location: 'ABC Road, Butwal', phone: '080-56781234', email: 'butwal@email.com' },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    orderType: 'dine-in',
    customerName: 'John Doe',
    contact: '9876543210',
    tableNumber: 'T05',
    items: [
      { id: '1', foodItem: 'Butter Chicken', quantity: 2, price: 350, total: 700 },
      { id: '2', foodItem: 'Garlic Naan', quantity: 4, price: 50, total: 200 },
      { id: '3', foodItem: 'Coke', quantity: 2, price: 60, total: 120 },
    ],
    totalAmount: 1020,
    status: 'completed',
    branchId: '1',
    createdAt: new Date('2024-01-20'),
    cashierId: '4',
  },
  {
    id: 'ORD002',
    orderType: 'online',
    customerName: 'Jane Smith',
    contact: '9876543211',
    address: '123 Main St, Pokhara',
    items: [
      { id: '4', foodItem: 'Paneer Tikka', quantity: 1, price: 280, total: 280 },
      { id: '5', foodItem: 'Fried Rice', quantity: 2, price: 180, total: 360 },
    ],
    totalAmount: 640,
    status: 'pending',
    branchId: '1',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'ORD003',
    orderType: 'table-booking',
    customerName: 'Robert Brown',
    contact: '9876543212',
    tableNumber: 'T12',
    items: [],
    totalAmount: 0,
    status: 'pending',
    branchId: '2',
    createdAt: new Date('2024-01-20'),
  },
];

// Mock Inventory
export const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Chicken Breast', category: 'Meat', quantity: 50, unit: 'kg', reorderLevel: 10, costPrice: 200, sellingPrice: 350, branchId: '1' },
  { id: '2', name: 'Basmati Rice', category: 'Packaged', quantity: 100, unit: 'kg', reorderLevel: 20, costPrice: 80, sellingPrice: 120, branchId: '1' },
  { id: '3', name: 'Paneer', category: 'Dairy', quantity: 30, unit: 'kg', reorderLevel: 5, costPrice: 150, sellingPrice: 280, branchId: '2' },
  { id: '4', name: 'Tomatoes', category: 'Vegetables', quantity: 25, unit: 'kg', reorderLevel: 5, costPrice: 40, sellingPrice: 60, branchId: '2' },
];

// Mock Purchases
export const mockPurchases: Purchase[] = [
  { id: 'P001', itemId: '1', itemName: 'Chicken Breast', quantity: 50, unitPrice: 200, totalPrice: 10000, supplier: 'Meat Suppliers Ltd', purchaseDate: new Date('2024-01-19'), branchId: '1' },
  { id: 'P002', itemId: '2', itemName: 'Basmati Rice', quantity: 100, unitPrice: 80, totalPrice: 8000, supplier: 'Grain Corp', purchaseDate: new Date('2024-01-18'), branchId: '1' },
];

// Mock Ledger
export const mockLedger: LedgerEntry[] = [
  { id: 'L001', date: new Date('2024-01-20'), description: 'Sale - ORD001', debit: 1020, credit: 0, balance: 1020, branchId: '1', type: 'sale' },
  { id: 'L002', date: new Date('2024-01-19'), description: 'Purchase - Chicken', debit: 0, credit: 10000, balance: -8980, branchId: '1', type: 'purchase' },
  { id: 'L003', date: new Date('2024-01-19'), description: 'Purchase - Rice', debit: 0, credit: 8000, balance: -16980, branchId: '1', type: 'purchase' },
];

// Mock Reports
export const mockReports: Report[] = [
  { id: 'R001', type: 'daily', period: '2024-01-20', totalSales: 1020, totalPurchases: 18000, totalExpenses: 5000, netProfit: -13780, branchId: '1', generatedAt: new Date('2024-01-20') },
];
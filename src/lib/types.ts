export type UserRole = 'admin' | 'branch-head' | 'cashier' | 'waiter';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  branchId?: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
}

export interface OrderItem {
  id: string;
  foodItem: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderType: 'dine-in' | 'takeaway' | 'online' | 'table-booking';
  customerName?: string;
  contact?: string;
  address?: string;
  tableNumber?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  branchId: string;
  createdAt: Date;
  cashierId?: string;
  waiterId?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  costPrice: number;
  sellingPrice?: number;
  branchId: string;
}

export interface Purchase {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  supplier: string;
  purchaseDate: Date;
  branchId: string;
}

export interface LedgerEntry {
  id: string;
  date: Date;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  branchId: string;
  type: 'sale' | 'purchase' | 'expense' | 'payment';
}

export interface Report {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  period: string;
  totalSales: number;
  totalPurchases: number;
  totalExpenses: number;
  netProfit: number;
  branchId: string;
  generatedAt: Date;
}
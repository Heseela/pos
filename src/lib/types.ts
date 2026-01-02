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
  manager?: string;    
  capacity?: number;   
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

export interface PurchaseItem {
  id?: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  unit: string;
}

export interface PurchaseFormData {
  id?: string;
  supplier: string;
  purchaseDate: Date | string;
  items: PurchaseItem[];
  totalAmount: number;
  branchId: string;
  createdAt?: Date;
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

export interface AuthCredentials {
  email: string;
  password: string;
  branch?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: number;
}
 
export interface SavedBill {
  id: string;
  billType: 'table' | 'individual';
  tableNumber?: string;
  customerName: string;
  customerContact?: string;
  customerAddress?: string;
  orderType?: 'dine-in' | 'takeaway' | 'delivery';
  cart: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  createdAt: Date;
  isPaid: boolean;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  manager?: string;
  capacity?: number;
  openingTime?: string;
  closingTime?: string;
  totalTables?: number;
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
  completedAt?: Date;
  servedAt?: Date;
  estimatedDelivery?: Date;
  estimatedPickup?: Date;
  bookingTime?: Date;
  partySize?: number;
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
  orderId?: string;
  purchaseId?: string;
  reference?: string;
  status?: 'completed' | 'pending' | 'cancelled';
  notes?: string;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'booked' | 'reserved';
  currentOrder?: {
    orderId: string;
    items: number;
    totalAmount: number;
    status: 'pending' | 'preparing' | 'served' | 'completed';
  };
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  available: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  category: string;
}

export interface BillingInfo {
  subtotal: number;
  tax: number;
  discount: number;
  serviceCharge: number;
  grandTotal: number;
  paymentMethod?: 'cash' | 'card' | 'online';
  amountPaid?: number;
  change?: number;
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
  totalOrders?: number;
  averageOrderValue?: number;
}
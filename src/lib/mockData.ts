import { Branch, User, Order, InventoryItem, Purchase, LedgerEntry, Report, FoodItem, Table } from './types';

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', role: 'admin' },
  { id: '2', name: 'KTM Branch Head', role: 'branch-head', branchId: '1' },
  { id: '3', name: 'Pokhara Branch Head', role: 'branch-head', branchId: '2' },
  { id: '4', name: 'Cashier 1', role: 'cashier', branchId: '1' },
  { id: '5', name: 'Cashier 2', role: 'cashier', branchId: '2' },
  { id: '6', name: 'Waiter 1', role: 'waiter', branchId: '1' },
  { id: '7', name: 'Waiter 2', role: 'waiter', branchId: '2' },
];

export const mockBranches: Branch[] = [
  { 
    id: '1', 
    name: 'KTM Main', 
    location: 'Connaught Place, KTM', 
    phone: '011-23456789', 
    email: 'ktm@email.com',
    manager: 'John Doe',         
    capacity: 80                 
  },
  { 
    id: '2', 
    name: 'Pokhara Branch', 
    location: 'East West, Pokhara', 
    phone: '022-98765432', 
    email: 'pokhara@email.com',
    manager: 'Jane Smith',       
    capacity: 60                 
  },
  { 
    id: '3', 
    name: 'Butwal Branch', 
    location: 'ABC Road, Butwal', 
    phone: '080-56781234', 
    email: 'butwal@email.com',
    manager: 'Robert Brown',   
    capacity: 50               
  },
];

export const mockFoodItems: FoodItem[] = [
  { id: '1', name: 'Butter Chicken', category: 'Main Course', price: 350, description: 'Rich creamy curry', available: true },
  { id: '2', name: 'Paneer Tikka', category: 'Appetizer', price: 280, description: 'Grilled cottage cheese', available: true },
  { id: '3', name: 'Garlic Naan', category: 'Bread', price: 50, description: 'Garlic flavored bread', available: true },
  { id: '4', name: 'Fried Rice', category: 'Main Course', price: 180, description: 'Vegetable fried rice', available: true },
  { id: '5', name: 'Coke', category: 'Beverage', price: 60, description: 'Soft drink', available: true },
  { id: '6', name: 'Mineral Water', category: 'Beverage', price: 40, description: '500ml bottle', available: true },
  { id: '7', name: 'Chicken Biryani', category: 'Main Course', price: 320, description: 'Aromatic rice dish', available: true },
  { id: '8', name: 'Veg Manchurian', category: 'Appetizer', price: 220, description: 'Indo-Chinese starter', available: true },
  { id: '9', name: 'Butter Roti', category: 'Bread', price: 30, description: 'Plain buttered bread', available: true },
  { id: '10', name: 'Lassi', category: 'Beverage', price: 80, description: 'Sweet yogurt drink', available: true },
  { id: '11', name: 'Chicken Tikka', category: 'Appetizer', price: 300, description: 'Grilled chicken', available: true },
  { id: '12', name: 'Dal Makhani', category: 'Main Course', price: 200, description: 'Creamy lentil curry', available: true },
  { id: '13', name: 'Raita', category: 'Side Dish', price: 60, description: 'Yogurt dip', available: true },
  { id: '14', name: 'Gulab Jamun', category: 'Dessert', price: 90, description: 'Sweet milk balls', available: true },
  { id: '15', name: 'Ice Cream', category: 'Dessert', price: 120, description: 'Vanilla ice cream', available: true },
];

export const mockTables: Table[] = [
  { id: '1', number: '01', capacity: 2, status: 'available' },
  { id: '2', number: '02', capacity: 4, status: 'occupied', currentOrder: { orderId: 'ORD001', items: 3, totalAmount: 1020, status: 'pending' } },
  { id: '3', number: '03', capacity: 6, status: 'available' },
  { id: '4', number: '04', capacity: 4, status: 'occupied', currentOrder: { orderId: 'ORD004', items: 4, totalAmount: 820, status: 'served' } },
  { id: '5', number: '05', capacity: 8, status: 'booked' },
  { id: '6', number: '06', capacity: 2, status: 'available' },
  { id: '7', number: '07', capacity: 4, status: 'occupied', currentOrder: { orderId: 'ORD007', items: 4, totalAmount: 910, status: 'preparing' } },
  { id: '8', number: '08', capacity: 6, status: 'available' },
  { id: '9', number: '09', capacity: 4, status: 'reserved' },
  { id: '10', number: '10', capacity: 2, status: 'available' },
];


export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    orderType: 'dine-in',
    customerName: 'John Doe',
    contact: '9876543210',
    tableNumber: 'T02',
    items: [
      { id: '1', foodItem: 'Butter Chicken', quantity: 2, price: 350, total: 700 },
      { id: '2', foodItem: 'Garlic Naan', quantity: 4, price: 50, total: 200 },
      { id: '3', foodItem: 'Coke', quantity: 2, price: 60, total: 120 },
    ],
    totalAmount: 1020,
    status: 'completed',
    branchId: '1',
    createdAt: new Date('2024-01-20T18:30:00'),
    cashierId: '4',
    waiterId: '6',
    completedAt: new Date('2024-01-20T19:45:00')
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
      { id: '6', foodItem: 'Mineral Water', quantity: 2, price: 40, total: 80 },
    ],
    totalAmount: 720,
    status: 'pending',
    branchId: '1',
    createdAt: new Date('2024-01-20T19:15:00'),
    estimatedDelivery: new Date('2024-01-20T20:00:00')
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
    createdAt: new Date('2024-01-20T17:00:00'),
    bookingTime: new Date('2024-01-20T20:00:00'),
    partySize: 4
  },
  {
    id: 'ORD004',
    orderType: 'dine-in',
    customerName: 'Alice Johnson',
    contact: '9876543213',
    tableNumber: 'T05',
    items: [
      { id: '7', foodItem: 'Chicken Biryani', quantity: 1, price: 320, total: 320 },
      { id: '8', foodItem: 'Veg Manchurian', quantity: 1, price: 220, total: 220 },
      { id: '9', foodItem: 'Butter Roti', quantity: 4, price: 30, total: 120 },
      { id: '10', foodItem: 'Lassi', quantity: 2, price: 80, total: 160 },
    ],
    totalAmount: 820,
    status: 'served',
    branchId: '1',
    createdAt: new Date('2024-01-20T19:00:00'),
    waiterId: '6',
    servedAt: new Date('2024-01-20T19:45:00')
  },
  {
    id: 'ORD005',
    orderType: 'dine-in',
    customerName: 'Michael Brown',
    contact: '9876543214',
    tableNumber: 'T08',
    items: [
      { id: '1', foodItem: 'Butter Chicken', quantity: 2, price: 350, total: 700 },
      { id: '11', foodItem: 'Chicken Tikka', quantity: 1, price: 300, total: 300 },
      { id: '12', foodItem: 'Dal Makhani', quantity: 1, price: 200, total: 200 },
      { id: '13', foodItem: 'Raita', quantity: 2, price: 60, total: 120 },
      { id: '14', foodItem: 'Gulab Jamun', quantity: 4, price: 90, total: 360 },
      { id: '3', foodItem: 'Garlic Naan', quantity: 6, price: 50, total: 300 },
      { id: '5', foodItem: 'Coke', quantity: 4, price: 60, total: 120 },
    ],
    totalAmount: 2100,
    status: 'preparing',
    branchId: '1',
    createdAt: new Date('2024-01-20T19:30:00'),
    waiterId: '6'
  },
  {
    id: 'ORD006',
    orderType: 'takeaway',
    customerName: 'Sarah Wilson',
    contact: '9876543215',
    address: '456 Park Avenue, KTM',
    items: [
      { id: '4', foodItem: 'Fried Rice', quantity: 3, price: 180, total: 540 },
      { id: '2', foodItem: 'Paneer Tikka', quantity: 2, price: 280, total: 560 },
      { id: '15', foodItem: 'Ice Cream', quantity: 2, price: 120, total: 240 },
      { id: '6', foodItem: 'Mineral Water', quantity: 4, price: 40, total: 160 },
    ],
    totalAmount: 1500,
    status: 'pending',
    branchId: '1',
    createdAt: new Date('2024-01-20T19:45:00'),
    estimatedPickup: new Date('2024-01-20T20:15:00')
  },
  {
    id: 'ORD007',
    orderType: 'dine-in',
    customerName: 'David Lee',
    contact: '9876543216',
    tableNumber: 'T10',
    items: [
      { id: '1', foodItem: 'Butter Chicken', quantity: 1, price: 350, total: 350 },
      { id: '12', foodItem: 'Dal Makhani', quantity: 1, price: 200, total: 200 },
      { id: '3', foodItem: 'Garlic Naan', quantity: 4, price: 50, total: 200 },
      { id: '10', foodItem: 'Lassi', quantity: 2, price: 80, total: 160 },
    ],
    totalAmount: 910,
    status: 'pending',
    branchId: '1',
    createdAt: new Date('2024-01-20T19:50:00'),
    waiterId: '7'
  },
  {
    id: 'ORD008',
    orderType: 'online',
    customerName: 'Emma Garcia',
    contact: '9876543217',
    address: '789 Oak Street, Pokhara',
    items: [
      { id: '7', foodItem: 'Chicken Biryani', quantity: 2, price: 320, total: 640 },
      { id: '8', foodItem: 'Veg Manchurian', quantity: 1, price: 220, total: 220 },
      { id: '14', foodItem: 'Gulab Jamun', quantity: 2, price: 90, total: 180 },
    ],
    totalAmount: 1040,
    status: 'ready',
    branchId: '2',
    createdAt: new Date('2024-01-20T19:20:00'),
    estimatedDelivery: new Date('2024-01-20T20:00:00')
  }
];

export const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Chicken Breast', category: 'Meat', quantity: 8, unit: 'kg', reorderLevel: 10, costPrice: 200, sellingPrice: 350, branchId: '1' },
  { id: '2', name: 'Basmati Rice', category: 'Packaged', quantity: 15, unit: 'kg', reorderLevel: 20, costPrice: 80, sellingPrice: 120, branchId: '1' },
  { id: '3', name: 'Paneer', category: 'Dairy', quantity: 30, unit: 'kg', reorderLevel: 5, costPrice: 150, sellingPrice: 280, branchId: '2' },
  { id: '4', name: 'Tomatoes', category: 'Vegetables', quantity: 25, unit: 'kg', reorderLevel: 5, costPrice: 40, sellingPrice: 60, branchId: '2' },
];

export const mockPurchases: Purchase[] = [
  { id: 'P001', itemId: '1', itemName: 'Chicken Breast', quantity: 50, unitPrice: 200, totalPrice: 10000, supplier: 'Meat Suppliers Ltd', purchaseDate: new Date('2024-01-19'), branchId: '1' },
  { id: 'P002', itemId: '2', itemName: 'Basmati Rice', quantity: 100, unitPrice: 80, totalPrice: 8000, supplier: 'Grain Corp', purchaseDate: new Date('2024-01-18'), branchId: '1' },
];

export const mockLedger: LedgerEntry[] = [
  { id: 'L001', date: new Date('2024-01-20'), description: 'Sale - ORD001', debit: 1020, credit: 0, balance: 1020, branchId: '1', type: 'sale' },
  { id: 'L002', date: new Date('2024-01-19'), description: 'Purchase - Chicken', debit: 0, credit: 10000, balance: -8980, branchId: '1', type: 'purchase' },
  { id: 'L003', date: new Date('2024-01-19'), description: 'Purchase - Rice', debit: 0, credit: 8000, balance: -16980, branchId: '1', type: 'purchase' },
];

export const mockReports: Report[] = [
  { id: 'R001', type: 'daily', period: '2024-01-20', totalSales: 1020, totalPurchases: 18000, totalExpenses: 5000, netProfit: -13780, branchId: '1', generatedAt: new Date('2024-01-20') },
];
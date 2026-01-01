'use client';

import { useState, useEffect } from 'react';
import TableGrid from '@/components/orders/TableGrid';
import MenuItems from '@/components/orders/MenuItems';
import OrderCart from '@/components/orders/OrderCart';
import IndividualOrderCart from '@/components/orders/IndividualOrderCart';
import BillPreview from '@/components/orders/BillPreview';
import { Table, FoodItem, CartItem } from '@/lib/types';
import { mockTables, mockFoodItems } from '@/lib/mockData';
import { Utensils, User } from 'lucide-react';

type OrderTab = 'table' | 'individual';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderTab>('table');
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [showBill, setShowBill] = useState(false);
  const [foodItems] = useState<FoodItem[]>(mockFoodItems);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Reset cart when switching tabs
  useEffect(() => {
    if (activeTab === 'table') {
      setCart([]);
      setCustomerName('');
      setCustomerContact('');
      setCustomerAddress('');
      setSelectedTable(null);
    } else {
      setCart([]);
      setCustomerName('');
      setCustomerContact('');
      setCustomerAddress('');
      setSelectedTable(null);
    }
  }, [activeTab]);

  const filteredFoodItems = filterCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === filterCategory);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setCart([]);
  };

  const handleBackToTables = () => {
    setSelectedTable(null);
    setCart([]);
    setCustomerName('');
  };

  const handlePlaceTableOrder = () => {
    if (!selectedTable) return;
    
    const updatedTables = tables.map(table => {
      if (table.id === selectedTable.id) {
        return {
          ...table,
          status: 'occupied' as const,
          currentOrder: {
            orderId: `ORD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            customerName,
            items: cart.reduce((sum, item) => sum + item.quantity, 0),
            totalAmount: calculateTotal(),
            status: 'pending' as const
          }
        };
      }
      return table;
    });
    
    setTables(updatedTables);
    alert('Table order placed successfully!');
    handleBackToTables();
  };

  const handlePlaceIndividualOrder = () => {
    if (!customerName.trim()) {
      alert('Please enter customer name');
      return;
    }

    if (orderType === 'delivery' && !customerAddress.trim()) {
      alert('Please enter delivery address');
      return;
    }

    if (cart.length === 0) {
      alert('Please add items to cart');
      return;
    }

    const orderDetails = {
      orderId: `ORD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customerName,
      contact: customerContact,
      address: customerAddress,
      orderType,
      items: cart,
      totalAmount: calculateTotal(),
      status: 'pending' as const
    };

    
    alert(`${orderType === 'delivery' ? 'Delivery' : 'Takeaway'} order placed successfully!`);
    
    setCart([]);
    setCustomerName('');
    setCustomerContact('');
    setCustomerAddress('');
  };

  const clearCart = () => {
    setCart([]);
    if (activeTab === 'individual') {
      setCustomerName('');
      setCustomerContact('');
      setCustomerAddress('');
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.13;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleAddToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                total: (cartItem.quantity + 1) * cartItem.price
              }
            : cartItem
        );
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        total: item.price,
        category: item.category
      }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      setCart(prev => prev.filter(item => item.id !== id));
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity, total: quantity * item.price }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Manage table and individual orders</p>
        </div>

        <div className="mb-6 bg-white rounded-lg border">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex-1 px-6 py-4 text-lg font-medium flex items-center justify-center gap-3 ${
                activeTab === 'table'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Utensils className="w-5 h-5" />
              Table Orders
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`flex-1 px-6 py-4 text-lg font-medium flex items-center justify-center gap-3 ${
                activeTab === 'individual'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="w-5 h-5" />
              Individual Orders
            </button>
          </div>
        </div>

        {activeTab === 'table' ? (
          !selectedTable ? (
            <div>
              <TableGrid
                tables={tables}
                selectedTable={selectedTable}
                onTableClick={handleTableClick}
              />
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={handleBackToTables}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ← Back to Tables
                </button>
                <div className="text-right">
                  <h2 className="text-xl font-bold text-gray-900">
                    Order for Table {selectedTable.number}
                  </h2>
                  <p className="text-gray-600">Capacity: {selectedTable.capacity} persons</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <MenuItems
                    foodItems={filteredFoodItems}
                    filterCategory={filterCategory}
                    onFilterChange={setFilterCategory}
                    onAddToCart={handleAddToCart}
                  />
                </div>
                
                <div className="lg:col-span-1">
                  <OrderCart
                    selectedTable={selectedTable}
                    cart={cart}
                    customerName={customerName}
                    onCustomerNameChange={setCustomerName}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onClearCart={clearCart}
                    onPlaceOrder={handlePlaceTableOrder}
                    onShowBill={() => setShowBill(true)}
                    subtotal={calculateSubtotal()}
                    tax={calculateTax()}
                    total={calculateTotal()}
                  />
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MenuItems
                foodItems={filteredFoodItems}
                filterCategory={filterCategory}
                onFilterChange={setFilterCategory}
                onAddToCart={handleAddToCart}
              />
            </div>
            
            <div className="lg:col-span-1">
              <IndividualOrderCart
                cart={cart}
                customerName={customerName}
                customerContact={customerContact}
                customerAddress={customerAddress}
                orderType={orderType}
                onCustomerNameChange={setCustomerName}
                onCustomerContactChange={setCustomerContact}
                onCustomerAddressChange={setCustomerAddress}
                onOrderTypeChange={setOrderType}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={clearCart}
                onPlaceOrder={handlePlaceIndividualOrder}
                onShowBill={() => setShowBill(true)}
                subtotal={calculateSubtotal()}
                tax={calculateTax()}
                total={calculateTotal()}
              />
            </div>
          </div>
        )}
      </div>

      {showBill && (
        <BillPreview
          cart={cart}
          customerName={customerName}
          tableNumber={selectedTable?.number || (orderType === 'takeaway' ? 'Takeaway' : 'Delivery')}
          subtotal={calculateSubtotal()}
          tax={calculateTax()}
          total={calculateTotal()}
          onClose={() => setShowBill(false)}
          onPrint={() => {
            window.print();
            setShowBill(false);
          }}
        />
      )}
    </div>
  );
}
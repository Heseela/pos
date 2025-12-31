'use client';

import { useState } from 'react';
import TableGrid from '@/components/orders/TableGrid';
import MenuItems from '@/components/orders/MenuItems';
import OrderCart from '@/components/orders/OrderCart';
import BillPreview from '@/components/orders/BillPreview';
import { Table, FoodItem, CartItem } from '@/lib/types';
import { mockTables, mockFoodItems } from '@/lib/mockData';

export default function OrdersPage() {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [showBill, setShowBill] = useState(false);
  const [foodItems] = useState<FoodItem[]>(mockFoodItems);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredFoodItems = filterCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === filterCategory);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setCart([]);
    setCustomerName(table.currentOrder?.customerName || '');
  };

  const handleBackToTables = () => {
    setSelectedTable(null);
    setCart([]);
    setCustomerName('');
  };

  const handlePlaceOrder = () => {
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
    alert('Order placed successfully!');
    handleBackToTables();
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName('');
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Table Management</h1>
        <p className="text-gray-600">Manage table orders and billing</p>
      </div>

      {!selectedTable ? (
        <div className="max-w-7xl mx-auto">
          <TableGrid
            tables={tables}
            selectedTable={selectedTable}
            onTableClick={handleTableClick}
          />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
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
                onAddToCart={(item) => {
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
                }}
              />
            </div>
            
            <div className="lg:col-span-1">
              <OrderCart
                selectedTable={selectedTable}
                cart={cart}
                customerName={customerName}
                onCustomerNameChange={setCustomerName}
                onUpdateQuantity={(id, quantity) => {
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
                }}
                onRemoveItem={(id) => setCart(prev => prev.filter(item => item.id !== id))}
                onClearCart={clearCart}
                onPlaceOrder={handlePlaceOrder}
                onShowBill={() => setShowBill(true)}
                subtotal={calculateSubtotal()}
                tax={calculateTax()}
                total={calculateTotal()}
              />
            </div>
          </div>
        </div>
      )}

      {showBill && selectedTable && (
        <BillPreview
          cart={cart}
          customerName={customerName}
          tableNumber={selectedTable.number}
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
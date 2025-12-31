'use client';

import { useState } from 'react';
import OrderForm from '@/components/orders/OrderForm';
import OrderList from '@/components/orders/OrderList';
import { mockOrders } from '@/lib/mockData';
import { Plus, Filter } from 'lucide-react';

export default function OrdersPage() {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState(mockOrders);
  const [orderType, setOrderType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesType = orderType === 'all' || order.orderType === orderType;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contact?.includes(searchTerm);
    return matchesType && matchesSearch;
  });

  const addOrder = (newOrder: any) => {
    setOrders([...orders, { ...newOrder, id: `ORD${String(orders.length + 1).padStart(3, '0')}` }]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders / KOT Management</h1>
          <p className="text-gray-600">Manage dine-in, takeaway, online orders and table bookings</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          New Order
        </button>
      </div>

      <div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search orders by ID, name or phone..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <select
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="dine-in">Dine In</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="online">Online</option>
                  <option value="table-booking">Table Booking</option>
                </select>
              </div>
            </div>

            <OrderList orders={filteredOrders} />
          </div>
        </div>

        {/* <div>
          <OrderTypeSelector />
        </div> */}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <OrderForm
              onSubmit={addOrder}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
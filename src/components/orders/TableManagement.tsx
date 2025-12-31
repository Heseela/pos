'use client';

import { useState } from 'react';
import { Table, CheckCircle, XCircle, Clock, Users, Receipt } from 'lucide-react';

interface TableInfo {
  id: string;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'booked' | 'reserved';
  currentOrder?: {
    orderId: string;
    customerName: string;
    items: number;
    totalAmount: number;
    status: 'pending' | 'preparing' | 'served';
  };
}

export default function TableManagement() {
  const [tables, setTables] = useState<TableInfo[]>([
    { id: '1', number: 'T01', capacity: 4, status: 'available' },
    { id: '2', number: 'T02', capacity: 4, status: 'occupied', 
      currentOrder: { orderId: 'ORD001', customerName: 'John Doe', items: 3, totalAmount: 1250, status: 'served' }},
    { id: '3', number: 'T03', capacity: 6, status: 'booked' },
    { id: '4', number: 'T04', capacity: 2, status: 'available' },
    { id: '5', number: 'T05', capacity: 4, status: 'occupied',
      currentOrder: { orderId: 'ORD002', customerName: 'Jane Smith', items: 2, totalAmount: 850, status: 'pending' }},
    { id: '6', number: 'T06', capacity: 8, status: 'reserved' },
    { id: '7', number: 'T07', capacity: 4, status: 'available' },
    { id: '8', number: 'T08', capacity: 6, status: 'occupied',
      currentOrder: { orderId: 'ORD003', customerName: 'Robert Brown', items: 4, totalAmount: 2100, status: 'preparing' }},
  ]);

  const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'booked': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reserved': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'available': return <CheckCircle size={16} />;
      case 'occupied': return <Users size={16} />;
      case 'booked': return <Clock size={16} />;
      case 'reserved': return <Clock size={16} />;
      default: return <Table size={16} />;
    }
  };

  const handleProceedToBilling = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table?.currentOrder) {
      alert(`Proceeding to billing for Order ${table.currentOrder.orderId}\nTotal: RS.${table.currentOrder.totalAmount}`);
      // Here you would navigate to billing page or open billing modal
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Table Management</h2>
          <p className="text-gray-600">Monitor table status and manage orders</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => setSelectedTable(table)}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedTable?.id === table.id ? 'ring-2 ring-primary' : ''
            } ${getStatusColor(table.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Table size={18} />
                <span className="font-bold text-lg">{table.number}</span>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(table.status)}
                <span className="text-xs font-medium capitalize">{table.status}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm mb-2">
              <Users size={14} />
              <span>Capacity: {table.capacity}</span>
            </div>

            {table.currentOrder && (
              <div className="mt-3 pt-3 border-t border-opacity-30">
                <div className="text-xs font-medium">Order #{table.currentOrder.orderId}</div>
                <div className="text-xs truncate">{table.currentOrder.customerName}</div>
                <div className="text-xs">Items: {table.currentOrder.items}</div>
                <div className="text-xs font-bold">RS.{table.currentOrder.totalAmount}</div>
                <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                  table.currentOrder.status === 'served' ? 'bg-green-100 text-green-800' :
                  table.currentOrder.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {table.currentOrder.status}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Table Details Panel */}
      {selectedTable && (
        <div className="bg-white rounded-lg border p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Table {selectedTable.number} Details
            </h3>
            <button
              onClick={() => setSelectedTable(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Table Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Table Number:</span>
                    <span className="font-semibold">{selectedTable.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold">{selectedTable.capacity} persons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedTable.status)}`}>
                      {selectedTable.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                    Create New Order
                  </button>
                  <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50">
                    Book Table
                  </button>
                  {selectedTable.status === 'occupied' && (
                    <button
                      onClick={() => handleProceedToBilling(selectedTable.id)}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Receipt size={16} />
                      Proceed to Billing
                    </button>
                  )}
                </div>
              </div>
            </div>

            {selectedTable.currentOrder && (
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700 mb-4">Current Order Details</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-bold text-lg">Order #{selectedTable.currentOrder.orderId}</div>
                      <div className="text-gray-600">{selectedTable.currentOrder.customerName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        RS.{selectedTable.currentOrder.totalAmount}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs inline-block ${
                        selectedTable.currentOrder.status === 'served' ? 'bg-green-100 text-green-800' :
                        selectedTable.currentOrder.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedTable.currentOrder.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Items Ordered:</span>
                      <span className="font-medium">{selectedTable.currentOrder.items}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Order Type:</span>
                      <span className="font-medium">Dine-in</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Order Time:</span>
                      <span className="font-medium">30 minutes ago</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h5 className="font-medium mb-3">Order Actions</h5>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark">
                        Add Items
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                        Change Status
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                        Print KOT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!selectedTable.currentOrder && (
              <div className="md:col-span-2 flex items-center justify-center">
                <div className="text-center">
                  <Table size={48} className="text-gray-300 mx-auto mb-4" />
                  <div className="text-gray-500">No active order for this table</div>
                  <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                    Start New Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
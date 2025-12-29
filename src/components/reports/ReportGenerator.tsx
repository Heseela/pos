'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { day: 'Mon', sales: 12000, orders: 45 },
  { day: 'Tue', sales: 19000, orders: 52 },
  { day: 'Wed', sales: 15000, orders: 48 },
  { day: 'Thu', sales: 22000, orders: 61 },
  { day: 'Fri', sales: 30000, orders: 78 },
  { day: 'Sat', sales: 28000, orders: 72 },
  { day: 'Sun', sales: 25000, orders: 65 },
];

const categoryData = [
  { name: 'Food', value: 65, color: '#2563eb' },
  { name: 'Beverages', value: 20, color: '#7c3aed' },
  { name: 'Desserts', value: 10, color: '#059669' },
  { name: 'Others', value: 5, color: '#d97706' },
];

export default function ReportGenerator() {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="space-y-6">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'sales' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales Report
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'inventory' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory Report
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'financial' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('financial')}
        >
          Financial Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-4">Weekly Sales Trend</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`RS.${Number(value).toLocaleString()}`, 'Sales']}
                />
                <Bar dataKey="sales" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Sales by Category</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                //   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Report Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded">
            <div className="text-sm text-gray-500">Total Sales</div>
            <div className="text-xl font-bold text-green-600">RS.156,800</div>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <div className="text-sm text-gray-500">Total Orders</div>
            <div className="text-xl font-bold text-blue-600">421</div>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <div className="text-sm text-gray-500">Avg. Order Value</div>
            <div className="text-xl font-bold text-purple-600">RS.372</div>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <div className="text-sm text-gray-500">Growth Rate</div>
            <div className="text-xl font-bold text-orange-600">12.5%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
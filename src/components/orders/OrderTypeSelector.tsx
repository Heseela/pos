'use client';

import { ShoppingCart, Home, Truck, Globe, Calendar } from 'lucide-react';

const orderTypes = [
  {
    type: 'dine-in',
    label: 'Dine In',
    icon: Home,
    description: 'Customers dining in restaurant',
    color: 'bg-blue-100 text-blue-700',
    iconColor: 'text-blue-600',
  },
  {
    type: 'takeaway',
    label: 'Takeaway',
    icon: ShoppingCart,
    description: 'Pickup orders',
    color: 'bg-green-100 text-green-700',
    iconColor: 'text-green-600',
  },
  {
    type: 'online',
    label: 'Online',
    icon: Globe,
    description: 'Home delivery orders',
    color: 'bg-purple-100 text-purple-700',
    iconColor: 'text-purple-600',
  },
  {
    type: 'table-booking',
    label: 'Table Booking',
    icon: Calendar,
    description: 'Advance table reservations',
    color: 'bg-orange-100 text-orange-700',
    iconColor: 'text-orange-600',
  },
];

export default function OrderTypeSelector() {
  const orderStats = {
    'dine-in': 24,
    'takeaway': 12,
    'online': 8,
    'table-booking': 5,
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Order Types</h3>
      <div className="space-y-4">
        {orderTypes.map((orderType) => (
          <div
            key={orderType.type}
            className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${orderType.color}`}>
                  <orderType.icon size={20} className={orderType.iconColor} />
                </div>
                <div>
                  <div className="font-semibold">{orderType.label}</div>
                  <div className="text-sm text-gray-500">{orderType.description}</div>
                </div>
              </div>
              <div className="text-xl font-bold">{orderStats[orderType.type as keyof typeof orderStats]}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${orderType.color.split(' ')[0]}`}
                style={{ 
                  width: `${(orderStats[orderType.type as keyof typeof orderStats] / 49) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <h4 className="font-semibold mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm">
            Print KOT
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
            View All
          </button>
          <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark text-sm col-span-2">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
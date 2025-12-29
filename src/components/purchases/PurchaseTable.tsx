'use client';

import { Purchase } from '@/lib/types';
import { Edit, Trash2, Eye } from 'lucide-react';

interface PurchaseTableProps {
  purchases: Purchase[];
}

export default function PurchaseTable({ purchases }: PurchaseTableProps) {
  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">No purchase records found</div>
        <div className="text-gray-500">Try changing your search criteria</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Purchase ID</th>
            <th className="text-left py-3 px-4 font-medium">Item Name</th>
            <th className="text-left py-3 px-4 font-medium">Supplier</th>
            <th className="text-left py-3 px-4 font-medium">Quantity</th>
            <th className="text-left py-3 px-4 font-medium">Unit Price</th>
            <th className="text-left py-3 px-4 font-medium">Total Price</th>
            <th className="text-left py-3 px-4 font-medium">Date</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="font-medium text-primary">{purchase.id}</div>
              </td>
              <td className="py-3 px-4">
                <div className="font-medium">{purchase.itemName}</div>
                <div className="text-sm text-gray-500">ID: {purchase.itemId}</div>
              </td>
              <td className="py-3 px-4">
                <div className="font-medium">{purchase.supplier}</div>
              </td>
              <td className="py-3 px-4">
                <div className="font-medium">{purchase.quantity}</div>
              </td>
              <td className="py-3 px-4">
                <div className="font-medium">RS.{purchase.unitPrice.toLocaleString()}</div>
              </td>
              <td className="py-3 px-4">
                <div className="font-bold text-green-600">RS.{purchase.totalPrice.toLocaleString()}</div>
              </td>
              <td className="py-3 px-4">
                <div className="text-gray-600">
                  {new Date(purchase.purchaseDate).toLocaleDateString()}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
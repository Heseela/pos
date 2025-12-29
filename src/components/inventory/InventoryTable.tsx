'use client';

import { InventoryItem } from '@/lib/types';
import { AlertTriangle, Edit, Trash2 } from 'lucide-react';

interface InventoryTableProps {
  inventory: InventoryItem[];
}

export default function InventoryTable({ inventory }: InventoryTableProps) {
  if (inventory.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">No inventory items found</div>
        <div className="text-gray-500">Add your first inventory item</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Item Name</th>
            <th className="text-left py-3 px-4 font-medium">Category</th>
            <th className="text-left py-3 px-4 font-medium">Quantity</th>
            <th className="text-left py-3 px-4 font-medium">Unit</th>
            <th className="text-left py-3 px-4 font-medium">Reorder Level</th>
            <th className="text-left py-3 px-4 font-medium">Cost Price</th>
            <th className="text-left py-3 px-4 font-medium">Selling Price</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => {
            const isLowStock = item.quantity <= item.reorderLevel;
            
            return (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium">{item.name}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className={`font-medium ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
                    {item.quantity}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600">{item.unit}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600">{item.reorderLevel}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">RS.{item.costPrice}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-green-600">
                    RS.{item.sellingPrice || 'N/A'}
                  </div>
                </td>
                <td className="py-3 px-4">
                  {isLowStock ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle size={16} />
                      <span>Low Stock</span>
                    </div>
                  ) : (
                    <span className="text-green-600">In Stock</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
'use client';

import { InventoryItem } from '@/lib/types';
import { AlertTriangle, Edit, Trash2, Eye } from 'lucide-react';

interface InventoryTableProps {
  inventory: InventoryItem[];
  onEditItem: (item: InventoryItem) => void;
  onDeleteItem: (id: string) => void;
  onViewItem: (item: InventoryItem) => void;
}

export default function InventoryTable({ 
  inventory, 
  onEditItem, 
  onDeleteItem,
  onViewItem 
}: InventoryTableProps) {
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
            const stockPercentage = (item.quantity / (item.reorderLevel * 3)) * 100;
            
            return (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">ID: {item.id}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <div className={`font-medium ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
                      {item.quantity}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${stockPercentage > 50 ? 'bg-green-600' : stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-600'}`}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600">{item.unit}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600">{item.reorderLevel}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">RS.{item.costPrice.toFixed(2)}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-green-600">
                    RS.{item.sellingPrice ? item.sellingPrice.toFixed(2) : 'N/A'}
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
                    <button
                      onClick={() => onViewItem(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative"
                      title="View details"
                    >
                      <Eye size={16} />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        View
                      </span>
                    </button>
                    <button
                      onClick={() => onEditItem(item)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors group relative"
                      title="Edit item"
                    >
                      <Edit size={16} />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        Edit
                      </span>
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group relative"
                      title="Delete item"
                    >
                      <Trash2 size={16} />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        Delete
                      </span>
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
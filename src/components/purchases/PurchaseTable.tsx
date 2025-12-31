'use client';

import { Purchase } from '@/lib/types';
import { Edit, Trash2, Eye } from 'lucide-react';

interface PurchaseTableProps {
  purchases: Purchase[];
  onEdit: (purchase: Purchase) => void;
  onDelete: (id: string) => void;
  onView: (purchase: Purchase) => void;
}

export default function PurchaseTable({ purchases, onEdit, onDelete, onView }: PurchaseTableProps) {
  const handleDelete = (id: string, itemName: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete purchase for "${itemName}"?\n\nThis action cannot be undone.`);
    
    if (confirmDelete) {
      onDelete(id);
    }
  };

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
                  <button
                    onClick={() => onView(purchase)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative"
                    title="View details"
                  >
                    <Eye size={18} />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      View
                    </span>
                  </button>
                  <button
                    onClick={() => onEdit(purchase)}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors group relative"
                    title="Edit purchase"
                  >
                    <Edit size={18} />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Edit
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(purchase.id, purchase.itemName)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group relative"
                    title="Delete purchase"
                  >
                    <Trash2 size={18} />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Delete
                    </span>
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
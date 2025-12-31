'use client';

import { InventoryItem } from '@/lib/types';
import { X, Package, AlertTriangle, DollarSign, Hash, Building, TrendingUp, TrendingDown } from 'lucide-react';

interface InventoryViewProps {
  item: InventoryItem;
  onClose: () => void;
  onEdit?: () => void;
}

export default function InventoryView({ item, onClose, onEdit }: InventoryViewProps) {
  const isLowStock = item.quantity <= item.reorderLevel;
  const stockPercentage = (item.quantity / (item.reorderLevel * 3)) * 100;
  const stockValue = item.quantity * item.costPrice;
  const profitMargin = item.sellingPrice 
    ? ((item.sellingPrice - item.costPrice) / item.costPrice) * 100 
    : 0;

  const getStockStatus = () => {
    if (item.quantity === 0) return 'Out of Stock';
    if (isLowStock) return 'Low Stock';
    return 'In Stock';
  };

  const getStockColor = () => {
    if (item.quantity === 0) return 'text-red-600 bg-red-100';
    if (isLowStock) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory Item Details</h2>
          <p className="text-gray-600">View complete item information</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Package size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Basic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Item Name</div>
              <div className="font-medium text-lg">{item.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Item ID</div>
              <div className="font-medium">{item.id}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Category</div>
              <div className="font-medium">{item.category}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Unit</div>
              <div className="font-medium">{item.unit}</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Stock Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Current Quantity</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor()}`}>
                  {getStockStatus()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className={`text-2xl font-bold ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                  {item.quantity}
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${stockPercentage > 50 ? 'bg-green-600' : stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-600'}`}
                      style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Reorder Level</div>
                <div className="font-medium">{item.reorderLevel}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Recommended Order</div>
                <div className="font-medium">
                  {item.quantity < item.reorderLevel ? 
                    `Order ${item.reorderLevel * 2 - item.quantity} ${item.unit}` : 
                    'No order needed'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Financial Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <DollarSign size={16} className="text-gray-500" />
                <div className="text-sm font-medium text-gray-700">Cost Price</div>
              </div>
              <div className="text-xl font-bold text-gray-800">
                RS.{item.costPrice.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">Per {item.unit}</div>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp size={16} className="text-green-500" />
                <div className="text-sm font-medium text-gray-700">Selling Price</div>
              </div>
              <div className="text-xl font-bold text-green-600">
                {item.sellingPrice ? `RS.${item.sellingPrice.toFixed(2)}` : 'N/A'}
              </div>
              <div className="text-xs text-gray-500">Per {item.unit}</div>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingDown size={16} className={profitMargin > 0 ? 'text-green-500' : 'text-red-500'} />
                <div className="text-sm font-medium text-gray-700">Profit Margin</div>
              </div>
              <div className={`text-xl font-bold ${profitMargin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.sellingPrice ? `${profitMargin.toFixed(1)}%` : 'N/A'}
              </div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Stock Value</div>
              <div className="text-2xl font-bold text-primary">
                RS.{stockValue.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {item.quantity} {item.unit} × RS.{item.costPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Branch Information */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Building size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Branch Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Branch ID</div>
              <div className="font-medium">{item.branchId}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Branch Location</div>
              <div className="font-medium">
                {item.branchId === '1' ? 'KTM Main' : 
                 item.branchId === '2' ? 'Pokhara Branch' : 'Butwal Branch'}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t pt-6">
          <div className="flex justify-center gap-4">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Edit Item
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { InventoryItem } from '@/lib/types';

interface InventoryFormProps {
  onSubmit: (item: any) => void;
  onClose: () => void;
  item?: InventoryItem | null;
}

export default function InventoryForm({ onSubmit, onClose, item }: InventoryFormProps) {
  const isEditing = !!item;
  
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category: item?.category || 'Vegetables',
    quantity: item?.quantity || 0,
    unit: item?.unit || 'kg',
    reorderLevel: item?.reorderLevel || 10,
    costPrice: item?.costPrice || 0,
    sellingPrice: item?.sellingPrice || 0,
    branchId: item?.branchId || '1',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Price') || name.includes('quantity') || name.includes('reorderLevel') 
        ? parseFloat(value) || 0 
        : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    if (formData.reorderLevel < 0) {
      newErrors.reorderLevel = 'Reorder level cannot be negative';
    }

    if (formData.costPrice < 0) {
      newErrors.costPrice = 'Cost price cannot be negative';
    }

    if (formData.sellingPrice < 0) {
      newErrors.sellingPrice = 'Selling price cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const calculateStockValue = () => {
    return formData.quantity * formData.costPrice;
  };

  const calculateProfitMargin = () => {
    if (!formData.sellingPrice || formData.costPrice === 0) return 0;
    return ((formData.sellingPrice - formData.costPrice) / formData.costPrice) * 100;
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Inventory Item' : 'Add Inventory Item'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Enter item name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Seafood">Seafood</option>
            <option value="Spices">Spices</option>
            <option value="Beverages">Beverages</option>
            <option value="Packaged">Packaged</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.quantity ? 'border-red-500' : ''
            }`}
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit *
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="liter">liter</option>
            <option value="ml">ml</option>
            <option value="piece">piece</option>
            <option value="packet">packet</option>
            <option value="dozen">dozen</option>
            <option value="box">box</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reorder Level *
          </label>
          <input
            type="number"
            name="reorderLevel"
            value={formData.reorderLevel}
            onChange={handleChange}
            required
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.reorderLevel ? 'border-red-500' : ''
            }`}
          />
          {errors.reorderLevel && <p className="text-red-500 text-sm mt-1">{errors.reorderLevel}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost Price (RS.) *
          </label>
          <input
            type="number"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.costPrice ? 'border-red-500' : ''
            }`}
          />
          {errors.costPrice && <p className="text-red-500 text-sm mt-1">{errors.costPrice}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selling Price (RS.)
          </label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.sellingPrice ? 'border-red-500' : ''
            }`}
          />
          {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch *
          </label>
          <select
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="1">KTM Main</option>
            <option value="2">Pokhara Branch</option>
            <option value="3">Butwal Branch</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Stock Value</div>
            <div className="font-medium">RS.{calculateStockValue().toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Profit Margin</div>
            <div className={`font-medium ${calculateProfitMargin() > 0 ? 'text-green-600' : 'text-gray-600'}`}>
              {formData.sellingPrice ? `${calculateProfitMargin().toFixed(1)}%` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            {isEditing ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
    </form>
  );
}
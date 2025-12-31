'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface PurchaseFormProps {
  onSubmit: (purchase: any) => void;
  onClose: () => void;
  initialData?: {
    supplier: string;
    purchaseDate: Date | string;
    items: Array<{
      itemName: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      category: string;
      unit: string;
    }>;
    totalAmount: number;
  };
  isEditing?: boolean;
}

export default function PurchaseForm({
  onSubmit,
  onClose,
  initialData,
  isEditing = false
}: PurchaseFormProps) {
  const [items, setItems] = useState<Array<{
    itemName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    category: string;
    unit: string;
  }>>(initialData?.items || [
    { itemName: '', quantity: 1, unitPrice: 0, totalPrice: 0, category: '', unit: '' }
  ]);

  const [supplier, setSupplier] = useState(initialData?.supplier || '');
  const [purchaseDate, setPurchaseDate] = useState(
    initialData?.purchaseDate
      ? new Date(initialData.purchaseDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data - replace with actual API data
  const inventoryItems = [
    { name: 'Chicken Breast', category: 'Meat', unit: 'kg' },
    { name: 'Basmati Rice', category: 'Packaged', unit: 'kg' },
    { name: 'Paneer', category: 'Dairy', unit: 'kg' },
    { name: 'Tomatoes', category: 'Vegetables', unit: 'kg' },
    { name: 'Onions', category: 'Vegetables', unit: 'kg' },
    { name: 'Cooking Oil', category: 'Packaged', unit: 'L' },
    { name: 'Butter', category: 'Dairy', unit: 'kg' },
    { name: 'Soft Drinks', category: 'Beverages', unit: 'case' },
    { name: 'Spices Mix', category: 'Spices', unit: 'kg' },
    { name: 'Fish', category: 'Seafood', unit: 'kg' },
  ];

  const suppliers = [
    'Meat Suppliers Ltd',
    'Grain Corp',
    'Dairy Fresh',
    'Vegetable Market',
    'Beverage Distributors',
    'Spice Traders',
    'Seafood Imports'
  ];

  const categories = [
    'Vegetables',
    'Fruits',
    'Dairy',
    'Meat',
    'Seafood',
    'Spices',
    'Beverages',
    'Packaged',
    'Others'
  ];

  const units = ['kg', 'L', 'piece', 'dozen', 'pack', 'case', 'box'];

  const calculateItemTotal = (index: number) => {
    const item = items[index];
    const total = item.quantity * item.unitPrice;
    const newItems = [...items];
    newItems[index].totalPrice = total;
    setItems(newItems);
    return total;
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];

    if (field === 'itemName') {
      const selectedItem = inventoryItems.find(item => item.name === value);
      newItems[index] = {
        ...newItems[index],
        itemName: value as string,
        category: selectedItem?.category || '',
        unit: selectedItem?.unit || '',
        unitPrice: newItems[index].unitPrice, // Keep existing price
        totalPrice: newItems[index].quantity * newItems[index].unitPrice
      };
    } else if (field === 'quantity') {
      const quantity = Number(value);
      newItems[index] = {
        ...newItems[index],
        quantity,
        totalPrice: quantity * newItems[index].unitPrice
      };
    } else if (field === 'unitPrice') {
      const unitPrice = Number(value);
      newItems[index] = {
        ...newItems[index],
        unitPrice,
        totalPrice: unitPrice * newItems[index].quantity
      };
    } else if (field === 'category') {
      newItems[index] = {
        ...newItems[index],
        category: value as string
      };
    } else if (field === 'unit') {
      newItems[index] = {
        ...newItems[index],
        unit: value as string
      };
    }

    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { itemName: '', quantity: 1, unitPrice: 0, totalPrice: 0, category: '', unit: '' }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!supplier.trim()) {
      newErrors.supplier = 'Supplier is required';
    }

    if (!purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    }

    items.forEach((item, index) => {
      if (!item.itemName.trim()) {
        newErrors[`itemName_${index}`] = 'Item name is required';
      }
      if (item.quantity <= 0) {
        newErrors[`quantity_${index}`] = 'Quantity must be greater than 0';
      }
      if (item.unitPrice < 0) {
        newErrors[`unitPrice_${index}`] = 'Unit price cannot be negative';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const purchaseData = {
      supplier,
      purchaseDate: new Date(purchaseDate),
      items: items.map(item => ({
        itemName: item.itemName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        category: item.category,
        unit: item.unit
      })),
      totalAmount: items.reduce((sum, item) => sum + item.totalPrice, 0),
      branchId: '1', // This should come from user context
      createdAt: new Date()
    };

    onSubmit(purchaseData);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Purchase Order' : 'New Purchase Order'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supplier *
          </label>
          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.supplier ? 'border-red-500' : ''
              }`}
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supp => (
              <option key={supp} value={supp}>{supp}</option>
            ))}
            <option value="other">Other...</option>
          </select>
          {supplier === 'other' && (
            <input
              type="text"
              placeholder="Enter supplier name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          )}
          {errors.supplier && (
            <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purchase Date *
          </label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.purchaseDate ? 'border-red-500' : ''
              }`}
          />
          {errors.purchaseDate && (
            <p className="text-red-500 text-sm mt-1">{errors.purchaseDate}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Purchase Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 border rounded-lg">
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name *
                </label>
                <select
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors[`itemName_${index}`] ? 'border-red-500' : ''
                    }`}
                >
                  <option value="">Select Item</option>
                  {inventoryItems.map(invItem => (
                    <option key={invItem.name} value={invItem.name}>
                      {invItem.name} ({invItem.category})
                    </option>
                  ))}
                  <option value="other">Other (New Item)</option>
                </select>
                {item.itemName === 'other' && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Item name"
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                    />
                    <select
                      value={item.category}
                      onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                )}
                {errors[`itemName_${index}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`itemName_${index}`]}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors[`quantity_${index}`] ? 'border-red-500' : ''
                      }`}
                  />
                  <select
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    className="ml-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                {errors[`quantity_${index}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`quantity_${index}`]}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Price (RS.) *
                </label>
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors[`unitPrice_${index}`] ? 'border-red-500' : ''
                    }`}
                />
                {errors[`unitPrice_${index}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`unitPrice_${index}`]}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total (RS.)
                </label>
                <div className="px-4 py-2 border rounded-lg bg-gray-50">
                  <div className="font-semibold">RS.{item.totalPrice.toFixed(2)}</div>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-center h-full">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  disabled={items.length === 1}
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Total Purchase</h4>
            <p className="text-gray-600 text-sm">{items.length} item(s)</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Subtotal</div>
            <div className="text-3xl font-bold text-primary">RS.{calculateTotal().toFixed(2)}</div>
            <div className="text-sm text-gray-500 mt-1">
              Including all items
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            {isEditing ? 'Update Purchase' : 'Save Purchase'}
          </button>
        </div>
      </div>
    </form>
  );
}
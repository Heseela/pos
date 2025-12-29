'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface OrderFormProps {
  onSubmit: (order: any) => void;
  onClose: () => void;
}

export default function OrderForm({ onSubmit, onClose }: OrderFormProps) {
  const [orderType, setOrderType] = useState('dine-in');
  const [items, setItems] = useState<Array<{ foodItem: string; quantity: number; price: number; total: number }>>([
    { foodItem: '', quantity: 1, price: 0, total: 0 }
  ]);

  const foodItems = [
    { name: 'Butter Chicken', price: 350 },
    { name: 'Paneer Tikka', price: 280 },
    { name: 'Garlic Naan', price: 50 },
    { name: 'Fried Rice', price: 180 },
    { name: 'Coke', price: 60 },
    { name: 'Mineral Water', price: 40 },
  ];

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    if (field === 'foodItem') {
      const selectedFood = foodItems.find(f => f.name === value);
      newItems[index] = {
        ...newItems[index],
        foodItem: value as string,
        price: selectedFood?.price || 0,
        total: (selectedFood?.price || 0) * newItems[index].quantity
      };
    } else if (field === 'quantity') {
      const quantity = Number(value);
      newItems[index] = {
        ...newItems[index],
        quantity,
        total: newItems[index].price * quantity
      };
    } else if (field === 'price') {
      const price = Number(value);
      newItems[index] = {
        ...newItems[index],
        price,
        total: price * newItems[index].quantity
      };
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { foodItem: '', quantity: 1, price: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const orderData = {
      orderType,
      customerName: orderType === 'table-booking' || orderType === 'online' ? undefined : formData.get('customerName'),
      contact: orderType === 'table-booking' || orderType === 'online' ? undefined : formData.get('contact'),
      address: orderType === 'table-booking' || orderType === 'online' ? undefined : formData.get('address'),
      tableNumber: orderType === 'dine-in' || orderType === 'table-booking' ? formData.get('tableNumber') : undefined,
      items: items.filter(item => item.foodItem && item.quantity > 0),
      totalAmount: calculateTotal(),
      status: 'pending',
      branchId: '1',
      createdAt: new Date(),
    };
    onSubmit(orderData);
  };

  const needsCustomerInfo = !['online', 'table-booking'].includes(orderType);

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create New Order</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Type
          </label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="dine-in">Dine In</option>
            <option value="takeaway">Takeaway</option>
            <option value="online">Online Delivery</option>
            <option value="table-booking">Table Booking</option>
          </select>
        </div>

        {(orderType === 'dine-in' || orderType === 'table-booking') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Table Number
            </label>
            <input
              type="text"
              name="tableNumber"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., T05"
            />
          </div>
        )}
      </div>

      {needsCustomerInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="9876543210"
            />
          </div>
          {orderType === 'takeaway' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Delivery address"
              />
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Order Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 text-primary hover:text-primary-dark"
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5">
                <select
                  value={item.foodItem}
                  onChange={(e) => handleItemChange(index, 'foodItem', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select food item</option>
                  {foodItems.map(food => (
                    <option key={food.name} value={food.name}>
                      {food.name} - RS.{food.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  min="1"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={item.price}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div className="col-span-2 font-semibold">
                RS.{item.total.toFixed(2)}
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  disabled={items.length === 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold">Total Amount:</div>
          <div className="text-2xl font-bold text-primary">RS.{calculateTotal().toFixed(2)}</div>
        </div>

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
            Create Order
          </button>
        </div>
      </div>
    </form>
  );
}
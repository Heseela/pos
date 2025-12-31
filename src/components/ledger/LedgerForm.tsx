'use client';

import { LedgerEntry } from '@/lib/types';
import { useState } from 'react';
import { X } from 'lucide-react';

interface LedgerFormProps {
  entry?: LedgerEntry | null;
  onSubmit: (entry: LedgerEntry) => void;
  onClose: () => void;
}

export default function LedgerForm({ entry, onSubmit, onClose }: LedgerFormProps) {
  const isEditing = !!entry;
  
  const [formData, setFormData] = useState({
    description: entry?.description || '',
    type: entry?.type || 'sale',
    debit: entry?.debit || 0,
    credit: entry?.credit || 0,
    date: entry?.date ? new Date(entry.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    branchId: entry?.branchId || '1',
    orderId: entry?.orderId || '',
    purchaseId: entry?.purchaseId || '',
    status: entry?.status || 'completed'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.debit < 0 || formData.credit < 0) {
      newErrors.debit = 'Amounts cannot be negative';
    }

    if (formData.debit > 0 && formData.credit > 0) {
      newErrors.debit = 'Cannot have both debit and credit amounts';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newEntry: LedgerEntry = {
      id: entry?.id || `L${String(Date.now()).slice(-6)}`,
      description: formData.description,
      type: formData.type as any,
      debit: formData.debit,
      credit: formData.credit,
      date: new Date(formData.date),
      branchId: formData.branchId,
      orderId: formData.orderId || undefined,
      purchaseId: formData.purchaseId || undefined,
      status: formData.status as any,
      balance: 0 // Will be recalculated by parent component
    };

    onSubmit(newEntry);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Ledger Entry' : 'Add New Ledger Entry'}
          </h2>
          <p className="text-gray-600">
            {isEditing ? 'Update transaction details' : 'Enter new transaction details'}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-24 ${
              errors.description ? 'border-red-500' : ''
            }`}
            placeholder="Enter transaction description..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="sale">Sale</option>
              <option value="purchase">Purchase</option>
              <option value="expense">Expense</option>
              <option value="payment">Payment</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.date ? 'border-red-500' : ''
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Debit Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Debit Amount (RS.)
            </label>
            <input
              type="number"
              name="debit"
              value={formData.debit}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.debit ? 'border-red-500' : ''
              }`}
              placeholder="0.00"
            />
          </div>

          {/* Credit Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Credit Amount (RS.)
            </label>
            <input
              type="number"
              name="credit"
              value={formData.credit}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.debit ? 'border-red-500' : ''
              }`}
              placeholder="0.00"
            />
            {errors.debit && (
              <p className="text-red-500 text-sm mt-1">{errors.debit}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
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

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order ID (if applicable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order ID (Optional)
            </label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="ORD001"
            />
          </div>

          {/* Purchase ID (if applicable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase ID (Optional)
            </label>
            <input
              type="text"
              name="purchaseId"
              value={formData.purchaseId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="P001"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Transaction Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Type</div>
              <div className="font-medium">{formData.type.toUpperCase()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Net Amount</div>
              <div className={`font-bold ${formData.debit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formData.debit > 0 ? '+' : '-'}RS.{Math.abs(formData.debit || formData.credit).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            {isEditing ? 'Update Entry' : 'Add Entry'}
          </button>
        </div>
      </div>
    </form>
  );
}
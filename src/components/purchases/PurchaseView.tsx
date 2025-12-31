'use client';

import { Purchase } from '@/lib/types';
import { X, Printer, Download, Calendar, Package, DollarSign, Hash } from 'lucide-react';

interface PurchaseViewProps {
  purchase: Purchase;
  onClose: () => void;
}

export default function PurchaseView({ purchase, onClose }: PurchaseViewProps) {

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Purchase Details</h2>
          <p className="text-gray-600">View purchase information</p>
        </div>
        <div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Hash size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Purchase Information</h3>
          </div>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Purchase ID:</dt>
              <dd className="font-medium">{purchase.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Item ID:</dt>
              <dd className="font-medium">{purchase.itemId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Branch ID:</dt>
              <dd className="font-medium">{purchase.branchId}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Date & Time</h3>
          </div>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Purchase Date:</dt>
              <dd className="font-medium">
                {new Date(purchase.purchaseDate).toLocaleDateString()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Time:</dt>
              <dd className="font-medium">
                {new Date(purchase.purchaseDate).toLocaleTimeString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Package size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Item Details</h3>
          </div>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Item Name:</dt>
              <dd className="font-medium">{purchase.itemName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Supplier:</dt>
              <dd className="font-medium">{purchase.supplier}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Quantity:</dt>
              <dd className="font-medium">{purchase.quantity}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Financial Details</h3>
          </div>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Unit Price:</dt>
              <dd className="font-medium">RS.{purchase.unitPrice.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Total Price:</dt>
              <dd className="font-medium text-green-600">
                RS.{purchase.totalPrice.toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Status:</dt>
              <dd className="font-medium">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Completed
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          {/* <button
            onClick={handlePrint}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Print Receipt
          </button> */}
        </div>
      </div>
    </div>
  );
}
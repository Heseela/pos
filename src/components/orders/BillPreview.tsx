import { CartItem } from '@/lib/types';
import { Printer } from 'lucide-react';

interface BillPreviewProps {
  cart: CartItem[];
  customerName: string;
  tableNumber: string;
  subtotal: number;
  tax: number;
  total: number;
  onClose: () => void;
  onPrint: () => void;
}

export default function BillPreview({
  cart,
  customerName,
  tableNumber,
  subtotal,
  tax,
  total,
  onClose,
  onPrint
}: BillPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="p-6">
          {/* Bill Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">SAMPLE RESTAURANT</h2>
            <p className="text-gray-600">123 Main Street, Kathmandu</p>
            <p className="text-gray-600">Phone: 01-1234567</p>
            <div className="my-4 border-t border-b py-2">
              <p className="font-medium">TAX INVOICE</p>
              <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
              <p className="text-sm">Time: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-4">
            <p><strong>Customer:</strong> {customerName || 'Walk-in Customer'}</p>
            <p><strong>Table:</strong> {tableNumber || 'Takeaway'}</p>
          </div>

          {/* Items List */}
          <div className="mb-6">
            <div className="grid grid-cols-12 gap-2 font-bold border-b pb-2 mb-2">
              <div className="col-span-6">Item</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Rate</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            {cart.map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-2 py-1 border-b">
                <div className="col-span-6">{item.name}</div>
                <div className="col-span-2 text-center">{item.quantity}</div>
                <div className="col-span-2 text-right">RS.{item.price.toFixed(2)}</div>
                <div className="col-span-2 text-right">RS.{item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span>RS.{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (13%):</span>
              <span>RS.{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>RS.{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Thank you for dining with us!</p>
            <p>*** This is a sample bill ***</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t p-4 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onPrint}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}
// 'use client';

// import { useState } from 'react';
// import { X, Receipt, CreditCard, Wallet, Percent } from 'lucide-react';

// interface BillingModalProps {
//   order: any;
//   onClose: () => void;
//   onComplete: () => void;
// }

// export default function BillingModal({ order, onClose, onComplete }: BillingModalProps) {
//   const [paymentMethod, setPaymentMethod] = useState('cash');
//   const [discount, setDiscount] = useState(0);
//   const [taxRate] = useState(13); // 13% VAT
  
//   const subtotal = order.totalAmount;
//   const taxAmount = (subtotal * taxRate) / 100;
//   const discountAmount = (subtotal * discount) / 100;
//   const total = subtotal + taxAmount - discountAmount;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Proceed to Billing</h2>
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
//               <X size={24} />
//             </button>
//           </div>

//           {/* Order Summary */}
//           <div className="mb-6">
//             <h3 className="font-semibold mb-4">Order Summary</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span>Order ID:</span>
//                 <span className="font-medium">{order.id}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Customer:</span>
//                 <span className="font-medium">{order.customerName}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Table:</span>
//                 <span className="font-medium">{order.tableNumber}</span>
//               </div>
//             </div>
//           </div>

//           {/* Payment Details */}
//           <div className="mb-6">
//             <h3 className="font-semibold mb-4">Payment Details</h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-3 gap-4">
//                 <button
//                   onClick={() => setPaymentMethod('cash')}
//                   className={`p-4 border rounded-lg flex flex-col items-center ${
//                     paymentMethod === 'cash' ? 'border-primary bg-primary-50' : ''
//                   }`}
//                 >
//                   <Wallet size={24} className="mb-2" />
//                   <span>Cash</span>
//                 </button>
//                 <button
//                   onClick={() => setPaymentMethod('card')}
//                   className={`p-4 border rounded-lg flex flex-col items-center ${
//                     paymentMethod === 'card' ? 'border-primary bg-primary-50' : ''
//                   }`}
//                 >
//                   <CreditCard size={24} className="mb-2" />
//                   <span>Card</span>
//                 </button>
//                 <button
//                   onClick={() => setPaymentMethod('digital')}
//                   className={`p-4 border rounded-lg flex flex-col items-center ${
//                     paymentMethod === 'digital' ? 'border-primary bg-primary-50' : ''
//                   }`}
//                 >
//                   <Receipt size={24} className="mb-2" />
//                   <span>Digital</span>
//                 </button>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Percent size={20} />
//                 <input
//                   type="number"
//                   value={discount}
//                   onChange={(e) => setDiscount(Number(e.target.value))}
//                   min="0"
//                   max="100"
//                   className="px-3 py-2 border rounded w-20"
//                   placeholder="Discount %"
//                 />
//                 <span>Discount</span>
//               </div>
//             </div>
//           </div>

//           {/* Amount Breakdown */}
//           <div className="border-t pt-4">
//             <div className="space-y-2 mb-6">
//               <div className="flex justify-between">
//                 <span>Subtotal:</span>
//                 <span>RS.{subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax ({taxRate}%):</span>
//                 <span>RS.{taxAmount.toFixed(2)}</span>
//               </div>
//               {discount > 0 && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount ({discount}%):</span>
//                   <span>-RS.{discountAmount.toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-xl font-bold border-t pt-2">
//                 <span>Total:</span>
//                 <span className="text-primary">RS.{total.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="flex justify-end gap-4">
//               <button onClick={onClose} className="px-6 py-2 border rounded-lg">
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   alert(`Payment of RS.${total.toFixed(2)} processed via ${paymentMethod}`);
//                   onComplete();
//                 }}
//                 className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
//               >
//                 Process Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { X, CreditCard, DollarSign, Smartphone, Receipt } from 'lucide-react';

interface BillingModalProps {
  table: any;
  orderItems: any[];
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
}

export default function BillingModal({ table, orderItems, onClose, onConfirm }: BillingModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discount, setDiscount] = useState(0);
  
  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.13; // 13%
  const tax = subtotal * taxRate;
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + tax - discountAmount;

  // Generate a bill number
  const billNumber = `BILL-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Bill Invoice</h2>
              <div className="text-gray-600">Bill No: {billNumber}</div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Order & Table Details */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Table Details</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Table No:</span>
                  <span className="font-medium">{table.number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium capitalize">{table.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-medium">{orderItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">RS.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (13%):</span>
                  <span className="font-medium">RS.{tax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-2 px-4 font-medium">Item</th>
                    <th className="text-left py-2 px-4 font-medium">Qty</th>
                    <th className="text-left py-2 px-4 font-medium">Price</th>
                    <th className="text-left py-2 px-4 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">RS.{item.price.toFixed(2)}</td>
                      <td className="py-2 px-4">RS.{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Section */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 border rounded-lg flex flex-col items-center ${paymentMethod === 'cash' ? 'border-primary bg-primary-50' : ''}`}
              >
                <DollarSign size={24} className="mb-2" />
                <span>Cash</span>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border rounded-lg flex flex-col items-center ${paymentMethod === 'card' ? 'border-primary bg-primary-50' : ''}`}
              >
                <CreditCard size={24} className="mb-2" />
                <span>Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('digital')}
                className={`p-4 border rounded-lg flex flex-col items-center ${paymentMethod === 'digital' ? 'border-primary bg-primary-50' : ''}`}
              >
                <Smartphone size={24} className="mb-2" />
                <span>Digital</span>
              </button>
            </div>

            {/* Discount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-32 px-3 py-2 border rounded"
              />
            </div>

            {/* Final Total */}
            <div className="border-t pt-4 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>RS.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (13%):</span>
                <span>RS.{tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%):</span>
                  <span>-RS.{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Grand Total:</span>
                <span className="text-primary">RS.{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Print receipt logic could go here
                  onConfirm(paymentMethod);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
              >
                <Receipt size={20} />
                Confirm & Print Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
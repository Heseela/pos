import { CartItem, SavedBill } from '@/lib/types';
import { ShoppingBag, Printer, Home, ShoppingCart, Truck, Package, Percent, Save, Edit2, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IndividualOrderCartProps {
  cart: CartItem[];
  customerName: string;
  customerContact: string;
  customerAddress: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  onCustomerNameChange: (name: string) => void;
  onCustomerContactChange: (contact: string) => void;
  onCustomerAddressChange: (address: string) => void;
  onOrderTypeChange: (type: 'dine-in' | 'takeaway' | 'delivery') => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onPlaceOrder: () => void;
  onShowBill: () => void;
  subtotal: number;
  tax: number;
  total: number;
  onApplyDiscount?: (percentage: number, amount: number) => void;
  onSaveBill?: (billData: SavedBill) => void;
  savedBills?: SavedBill[];
  onLoadSavedBill?: (billId: string) => void;
  onDeleteSavedBill?: (billId: string) => void;
}

export default function IndividualOrderCart({
  cart,
  customerName,
  customerContact,
  customerAddress,
  orderType,
  onCustomerNameChange,
  onCustomerContactChange,
  onCustomerAddressChange,
  onOrderTypeChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  onShowBill,
  subtotal,
  tax,
  total,
  onApplyDiscount,
  onSaveBill,
  savedBills = [],
  onLoadSavedBill,
  onDeleteSavedBill
}: IndividualOrderCartProps) {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [showSavedBills, setShowSavedBills] = useState(false);
  const [finalTotal, setFinalTotal] = useState(total);
  
  // Recalculate final total when discount or original total changes
  useEffect(() => {
    const discountedAmount = discountApplied > 0 ? total * (discountApplied / 100) : 0;
    setFinalTotal(total - discountedAmount);
  }, [total, discountApplied]);

  const handleApplyDiscount = () => {
    if (discountPercentage) {
      const percentage = parseFloat(discountPercentage);
      if (percentage >= 0 && percentage <= 100) {
        setDiscountApplied(percentage);
        onApplyDiscount?.(percentage, total * (percentage / 100));
        setShowDiscountInput(false);
        setDiscountPercentage('');
        setDiscountAmount('');
      } else {
        alert('Please enter a valid percentage (0-100)');
      }
    } else if (discountAmount) {
      const amount = parseFloat(discountAmount);
      if (amount >= 0 && amount <= total) {
        const percentage = (amount / total) * 100;
        setDiscountApplied(parseFloat(percentage.toFixed(2)));
        onApplyDiscount?.(parseFloat(percentage.toFixed(2)), amount);
        setShowDiscountInput(false);
        setDiscountPercentage('');
        setDiscountAmount('');
      } else {
        alert(`Please enter a valid amount (0-${total.toFixed(2)})`);
      }
    }
  };

  const handleRemoveDiscount = () => {
    setDiscountApplied(0);
    onApplyDiscount?.(0, 0);
  };

  const handleSaveBill = () => {
    if (cart.length === 0) {
      alert('Cart is empty. Add items to save bill.');
      return;
    }

    if (!customerName.trim()) {
      alert('Please enter customer name to save bill');
      return;
    }

    const billData: SavedBill = {
      id: `IND-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      billType: 'individual',
      customerName,
      customerContact,
      customerAddress,
      orderType,
      cart: [...cart],
      subtotal,
      discount: discountApplied,
      tax,
      total: finalTotal,
      createdAt: new Date(),
      isPaid: false
    };

    onSaveBill?.(billData);
    alert('Bill saved successfully! You can reload it later.');
  };

  const handleLoadBill = (bill: SavedBill) => {
    if (window.confirm(`Load saved bill for ${bill.customerName}? This will replace current cart.`)) {
      onLoadSavedBill?.(bill.id);
      setDiscountApplied(bill.discount);
      if (bill.orderType) {
        onOrderTypeChange(bill.orderType);
      }
      setShowSavedBills(false);
    }
  };

  const handleDeleteBill = (billId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this saved bill?')) {
      onDeleteSavedBill?.(billId);
    }
  };

  const getOrderTypeIcon = () => {
    switch (orderType) {
      case 'takeaway': return <Package className="w-4 h-4" />;
      case 'delivery': return <Truck className="w-4 h-4" />;
      case 'dine-in': return <Home className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredBills = savedBills.filter(bill => bill.billType === 'individual');

  return (
    <div className="bg-white rounded-xl border p-6 sticky top-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Individual Order</h2>
            <p className="text-sm text-gray-600">
              {cart.length} items in cart
            </p>
          </div>
        </div>
        
        {/* Saved Bills Button */}
        {filteredBills.length > 0 && (
          <button
            onClick={() => setShowSavedBills(!showSavedBills)}
            className="relative px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Saved Bills ({filteredBills.length})
          </button>
        )}
      </div>

      {/* Saved Bills Dropdown */}
      {showSavedBills && filteredBills.length > 0 && (
        <div className="mb-6 border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-3 border-b">
            <h3 className="font-bold text-gray-700">Saved Bills</h3>
            <p className="text-sm text-gray-500">Select a bill to load</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredBills.map(bill => (
              <div
                key={bill.id}
                className="p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors group"
                onClick={() => handleLoadBill(bill)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {getOrderTypeIcon()}
                      {bill.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {bill.orderType} • {bill.cart.length} items
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(bill.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        RS.{bill.total.toFixed(2)}
                      </div>
                      {bill.discount > 0 && (
                        <div className="text-xs text-green-600">
                          {bill.discount}% off
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleDeleteBill(bill.id, e)}
                      className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onOrderTypeChange('takeaway')}
            className={`px-4 py-3 rounded-lg flex flex-col items-center justify-center gap-2 border-2 transition-all ${
              orderType === 'takeaway'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 hover:border-primary/50 text-gray-700'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-sm font-medium">Takeaway</span>
          </button>
          <button
            onClick={() => onOrderTypeChange('delivery')}
            className={`px-4 py-3 rounded-lg flex flex-col items-center justify-center gap-2 border-2 transition-all ${
              orderType === 'delivery'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 hover:border-primary/50 text-gray-700'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span className="text-sm font-medium">Delivery</span>
          </button>
          <button
            onClick={() => onOrderTypeChange('dine-in')}
            className={`px-4 py-3 rounded-lg flex flex-col items-center justify-center gap-2 border-2 transition-all ${
              orderType === 'dine-in'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 hover:border-primary/50 text-gray-700'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Dine-in</span>
          </button>
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="Enter customer name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            value={customerContact}
            onChange={(e) => onCustomerContactChange(e.target.value)}
            placeholder="Enter contact number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>

        {orderType === 'delivery' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address *
            </label>
            <textarea
              value={customerAddress}
              onChange={(e) => onCustomerAddressChange(e.target.value)}
              placeholder="Enter delivery address"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
            />
          </div>
        )}
      </div>

      {/* Discount Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Discount</span>
          </div>
          {discountApplied > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">
                {discountApplied}% (RS.{(total * (discountApplied / 100)).toFixed(2)})
              </span>
              <button
                onClick={handleRemoveDiscount}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDiscountInput(!showDiscountInput)}
              className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              Add Discount
            </button>
          )}
        </div>

        {showDiscountInput && (
          <div className="p-3 border rounded-lg bg-gray-50 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Percentage %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={discountPercentage}
                  onChange={(e) => {
                    setDiscountPercentage(e.target.value);
                    if (e.target.value) {
                      const percent = parseFloat(e.target.value);
                      const amount = total * (percent / 100);
                      setDiscountAmount(amount.toFixed(2));
                    }
                  }}
                  placeholder="0-100%"
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Amount (RS.)</label>
                <input
                  type="number"
                  min="0"
                  max={total.toFixed(2)}
                  step="0.01"
                  value={discountAmount}
                  onChange={(e) => {
                    setDiscountAmount(e.target.value);
                    if (e.target.value) {
                      const amount = parseFloat(e.target.value);
                      const percent = (amount / total) * 100;
                      setDiscountPercentage(percent.toFixed(2));
                    }
                  }}
                  placeholder={`Max: ${total.toFixed(2)}`}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleApplyDiscount}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Apply Discount
              </button>
              <button
                onClick={() => {
                  setShowDiscountInput(false);
                  setDiscountPercentage('');
                  setDiscountAmount('');
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-500 font-medium">Cart is empty</div>
          <div className="text-sm text-gray-400 mt-2">Add items from the menu</div>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="mb-6 max-h-64 overflow-y-auto space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 border-2 border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">RS.{item.price} each</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-bold text-primary w-20 text-right">
                    RS.{item.total}
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mb-6 space-y-3 border-t pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-medium">RS.{subtotal.toFixed(2)}</span>
            </div>
            
            {discountApplied > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discountApplied}%):</span>
                <span className="font-medium">
                  -RS.{(total * (discountApplied / 100)).toFixed(2)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-600">
              <span>Tax (13%):</span>
              <span className="font-medium">RS.{tax.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-xl font-bold border-t pt-3">
              <span>Final Total:</span>
              <span className="text-primary">RS.{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClearCart}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Clear Cart
              </button>
              
              <button
                onClick={handleSaveBill}
                disabled={!customerName.trim()}
                className={`px-4 py-3 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2 ${
                  !customerName.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Save className="w-4 h-4" />
                Save Bill
              </button>
            </div>
            
            <button
              onClick={onPlaceOrder}
              disabled={!customerName.trim() || (orderType === 'delivery' && !customerAddress.trim())}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                !customerName.trim() || (orderType === 'delivery' && !customerAddress.trim())
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {orderType === 'delivery' ? 'Place Delivery Order' : 
               orderType === 'takeaway' ? 'Place Takeaway Order' : 
               'Place Dine-in Order'}
            </button>
            
            <button
              onClick={onShowBill}
              disabled={cart.length === 0}
              className={`w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                cart.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Printer className="w-4 h-4" />
              Preview & Print Bill
            </button>
          </div>
        </>
      )}
    </div>
  );
}
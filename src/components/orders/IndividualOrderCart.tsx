import { CartItem } from '@/lib/types';
import { ShoppingBag, Printer, Home, ShoppingCart, Truck, Package } from 'lucide-react';

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
  total
}: IndividualOrderCartProps) {
  return (
    <div className="bg-white rounded-xl border p-6 sticky top-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
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
            <div className="flex justify-between text-gray-600">
              <span>Tax (13%):</span>
              <span className="font-medium">RS.{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-3">
              <span>Total:</span>
              <span className="text-primary">RS.{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onClearCart}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Cart
            </button>
            
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
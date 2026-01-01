import { Table, CartItem } from '@/lib/types';
import { ShoppingBag, Printer, ShoppingCart } from 'lucide-react';

interface OrderCartProps {
  selectedTable: Table | null;
  cart: CartItem[];
  customerName: string;
  onCustomerNameChange: (name: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onPlaceOrder: () => void;
  onShowBill: () => void;
  subtotal: number;
  tax: number;
  total: number;
}

export default function OrderCart({
  selectedTable,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  onShowBill,
  subtotal,
  tax,
  total
}: OrderCartProps) {
  return (
    <div className="bg-white rounded-xl border p-6 sticky top-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ShoppingBag className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {selectedTable ? `Table ${selectedTable.number}` : 'Order Cart'}
          </h2>
          <p className="text-sm text-gray-600">
            {cart.length} items in cart
          </p>
        </div>
      </div>

      {!selectedTable ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-500 font-medium">Select a table to start ordering</div>
          <div className="text-sm text-gray-400 mt-2">Click on any table from the grid</div>
        </div>
      ) : cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-500 font-medium">Cart is empty</div>
          <div className="text-sm text-gray-400 mt-2">Add items from the menu popup</div>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="mb-6 max-h-80 overflow-y-auto space-y-3">
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

          <div className="space-y-3">
            <button
              onClick={onClearCart}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Cart
            </button>
            
            <button
              onClick={onPlaceOrder}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Place Order
            </button>
            
            <button
              onClick={onShowBill}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
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
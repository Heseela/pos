import { CartItem } from '@/lib/types';
import { Printer, User, Phone, Home, Package} from 'lucide-react';

interface BillPreviewProps {
  cart: CartItem[];
  customerName: string;
  tableNumber: string;
  billType: 'table' | 'individual';
  customerContact?: string;
  customerAddress?: string;
  individualOrderType?: 'takeaway' | 'delivery' | 'dine-in';
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
  billType, // Changed from orderType
  customerContact = '',
  customerAddress = '',
  individualOrderType = 'takeaway',
  subtotal,
  tax,
  total,
  onClose,
  onPrint
}: BillPreviewProps) {
  const getOrderTypeDisplay = () => {
    if (billType === 'table') { // Changed from orderType
      return 'Table Order';
    }
    switch (individualOrderType) {
      case 'takeaway': return 'Takeaway Order';
      case 'delivery': return 'Delivery Order';
      case 'dine-in': return 'Dine-in Order';
      default: return 'Individual Order';
    }
  };

  const getOrderTypeIcon = () => {
    if (billType === 'table') { // Changed from orderType
      return null;
    }
    switch (individualOrderType) {
      case 'takeaway': return <Package className="w-4 h-4" />;
      case 'delivery': return <Home className="w-4 h-4" />;
      case 'dine-in': return <User className="w-4 h-4" />;
      default: return null;
    }
  };

  const getOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    if (billType === 'table') { // Changed from orderType
      return `TBL-${year}${month}${day}-${random}`;
    } else {
      const prefix = individualOrderType === 'delivery' ? 'DEL' : 
                    individualOrderType === 'takeaway' ? 'TKO' : 'DIN';
      return `${prefix}-${year}${month}${day}-${random}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">SAMPLE RESTAURANT</h2>
            <p className="text-gray-600">123 Main Street, Kathmandu</p>
            <p className="text-gray-600">Phone: 01-1234567 | GST: 123456789012345</p>
            <div className="my-4 border-t border-b py-3">
              <p className="font-bold text-lg">TAX INVOICE</p>
              <div className="flex justify-center items-center gap-4 mt-2">
                <p className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {getOrderTypeDisplay()}
                </p>
                {getOrderTypeIcon() && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {getOrderTypeIcon()}
                    <span>{getOrderTypeDisplay().replace(' Order', '')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Order No:</p>
              <p className="font-bold">{getOrderNumber()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Date & Time:</p>
              <p className="font-bold">
                {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>

          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-gray-500" />
              <h3 className="font-bold text-gray-700">Customer Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{customerName || 'Walk-in Customer'}</p>
              </div> */}
              {customerName && (
                <div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <User className="w-3 h-3" />
                    <span>Name</span>
                  </div>
                  <p className="font-medium">{customerName}</p>
                </div>
              )}
              
              {customerContact && (
                <div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Phone className="w-3 h-3" />
                    <span>Contact</span>
                  </div>
                  <p className="font-medium">{customerContact}</p>
                </div>
              )}

              {billType === 'table' ? ( 
                <div>
                  <p className="text-sm text-gray-500">Table Number</p>
                  <p className="font-medium">{tableNumber || 'Not Assigned'}</p>
                </div>
              ) : customerAddress ? (
                <div className="md:col-span-2">
                  <div className="flex items-start gap-1 text-sm text-gray-500">
                    <Home className="w-3 h-3 mt-0.5" />
                    <span>Delivery Address</span>
                  </div>
                  <p className="font-medium">{customerAddress}</p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Items List */}
          <div className="mb-6">
            <div className="grid grid-cols-12 gap-2 font-bold border-b-2 border-gray-800 pb-2 mb-2">
              <div className="col-span-1 text-center">S.N.</div>
              <div className="col-span-5">Item Description</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Unit Price</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            
            {cart.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 py-2 border-b">
                <div className="col-span-1 text-center text-gray-600">{index + 1}</div>
                <div className="col-span-5">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </div>
                <div className="col-span-2 text-center">{item.quantity}</div>
                <div className="col-span-2 text-right">RS.{item.price.toFixed(2)}</div>
                <div className="col-span-2 text-right font-bold">RS.{item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Totals Section */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Sub Total:</span>
              <span className="font-bold">RS.{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">VAT (13%):</span>
              <span className="font-bold">RS.{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t-2 border-gray-800 pt-3 text-gray-900">
              <span>GRAND TOTAL:</span>
              <span className="text-primary">RS.{total.toFixed(2)}</span>
            </div>
            
            {/* Amount in Words */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Amount in Words:</span>{' '}
                {convertToWords(total)} Rupees Only
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t p-4 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={onPrint}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert number to words
function convertToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundred = Math.floor((num % 1000) / 100);
  const remainder = Math.floor(num % 100);
  
  let words = '';
  
  if (crore > 0) {
    words += convertToWords(crore) + ' Crore ';
  }
  
  if (lakh > 0) {
    words += convertToWords(lakh) + ' Lakh ';
  }
  
  if (thousand > 0) {
    words += convertToWords(thousand) + ' Thousand ';
  }
  
  if (hundred > 0) {
    words += ones[hundred] + ' Hundred ';
  }
  
  if (remainder > 0) {
    if (words !== '') {
      words += 'and ';
    }
    
    if (remainder < 10) {
      words += ones[remainder];
    } else if (remainder < 20) {
      words += teens[remainder - 10];
    } else {
      words += tens[Math.floor(remainder / 10)];
      if (remainder % 10 > 0) {
        words += ' ' + ones[remainder % 10];
      }
    }
  }
  
  return words.trim() || 'Zero';
}
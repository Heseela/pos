'use client';

import { LedgerEntry } from '@/lib/types';
import { X, Receipt, CreditCard, Truck, Banknote, Calendar, FileText, DollarSign, ArrowUpRight, ArrowDownRight, Hash, Building } from 'lucide-react';

interface LedgerViewProps {
  entry: LedgerEntry;
  onClose: () => void;
}

const typeIcons = {
  sale: Receipt,
  purchase: Truck,
  expense: CreditCard,
  payment: Banknote,
};

const typeColors = {
  sale: 'bg-green-100 text-green-800',
  purchase: 'bg-blue-100 text-blue-800',
  expense: 'bg-red-100 text-red-800',
  payment: 'bg-purple-100 text-purple-800',
};

const typeLabels = {
  sale: 'Sale',
  purchase: 'Purchase',
  expense: 'Expense',
  payment: 'Payment',
};

export default function LedgerView({ entry, onClose }: LedgerViewProps) {
  const TypeIcon = typeIcons[entry.type];
  const isDebit = entry.debit > 0;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ledger Entry Details</h2>
          <p className="text-gray-600">View transaction information</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Hash size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Basic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Entry ID</div>
              <div className="font-medium">{entry.id}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Transaction Type</div>
              <div className="flex items-center gap-2">
                <TypeIcon size={14} />
                <span className={`px-2 py-1 text-xs rounded-full ${typeColors[entry.type]}`}>
                  {typeLabels[entry.type]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-gray-500" />
              <h3 className="font-semibold text-gray-700">Date & Time</h3>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-medium">
                  {new Date(entry.date).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Time</div>
                <div className="font-medium">
                  {new Date(entry.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-gray-500" />
              <h3 className="font-semibold text-gray-700">Description</h3>
            </div>
            <div className="text-gray-700">{entry.description}</div>
            {entry.orderId && (
              <div className="mt-2 text-sm text-gray-500">
                Order ID: {entry.orderId}
              </div>
            )}
            {entry.purchaseId && (
              <div className="mt-1 text-sm text-gray-500">
                Purchase ID: {entry.purchaseId}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Financial Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ArrowUpRight size={16} className="text-green-600" />
                <div className="text-sm font-medium text-gray-700">Debit</div>
              </div>
              <div className={`text-xl font-bold ${entry.debit > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                {entry.debit > 0 ? `RS.${entry.debit.toLocaleString()}` : '-'}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ArrowDownRight size={16} className="text-red-600" />
                <div className="text-sm font-medium text-gray-700">Credit</div>
              </div>
              <div className={`text-xl font-bold ${entry.credit > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                {entry.credit > 0 ? `RS.${entry.credit.toLocaleString()}` : '-'}
              </div>
            </div>

            {/* Balance */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign size={16} className={entry.balance >= 0 ? 'text-green-600' : 'text-red-600'} />
                <div className="text-sm font-medium text-gray-700">Balance</div>
              </div>
              <div className={`text-xl font-bold ${entry.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                RS.{entry.balance.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Building size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-700">Additional Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Branch</div>
              <div className="font-medium">Branch {entry.branchId}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Transaction Direction</div>
              <div className="font-medium">
                {isDebit ? 'Incoming (Debit)' : 'Outgoing (Credit)'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Transaction Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Transaction Type</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[entry.type]}`}>
                {entry.type.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-t">
              <span className="text-gray-600">Amount</span>
              <span className={`font-bold ${isDebit ? 'text-green-600' : 'text-red-600'}`}>
                {isDebit ? `+RS.${entry.debit.toLocaleString()}` : `-RS.${entry.credit.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-t">
              <span className="text-gray-600">Resulting Balance</span>
              <span className={`font-bold ${entry.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                RS.{entry.balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
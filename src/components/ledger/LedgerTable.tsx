'use client';

import { LedgerEntry } from '@/lib/types';
import { ArrowUpRight, ArrowDownRight, Receipt, CreditCard, Truck, Banknote } from 'lucide-react';

interface LedgerTableProps {
  ledger: LedgerEntry[];
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

export default function LedgerTable({ ledger }: LedgerTableProps) {
  if (ledger.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">No ledger entries found</div>
        <div className="text-gray-500">Try changing your date range</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Date</th>
            <th className="text-left py-3 px-4 font-medium">Type</th>
            <th className="text-left py-3 px-4 font-medium">Description</th>
            <th className="text-left py-3 px-4 font-medium">Debit (RS.)</th>
            <th className="text-left py-3 px-4 font-medium">Credit (RS.)</th>
            <th className="text-left py-3 px-4 font-medium">Balance (RS.)</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((entry) => {
            const TypeIcon = typeIcons[entry.type];
            
            return (
              <tr key={entry.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <TypeIcon size={16} />
                    <span className={`px-2 py-1 text-xs rounded-full ${typeColors[entry.type]}`}>
                      {entry.type.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">{entry.description}</div>
                </td>
                <td className="py-3 px-4">
                  {entry.debit > 0 ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <ArrowUpRight size={16} />
                      <span className="font-medium">RS.{entry.debit.toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="text-gray-400">-</div>
                  )}
                </td>
                <td className="py-3 px-4">
                  {entry.credit > 0 ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <ArrowDownRight size={16} />
                      <span className="font-medium">RS.{entry.credit.toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="text-gray-400">-</div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className={`font-bold ${entry.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    RS.{entry.balance.toLocaleString()}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
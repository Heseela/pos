'use client';

import { useState } from 'react';
import LedgerTable from '@/components/ledger/LedgerTable';
import { mockLedger } from '@/lib/mockData';
import { BookOpen, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function LedgerPage() {
  const [ledger, setLedger] = useState(mockLedger);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');

  const filteredLedger = ledger.filter(entry => {
    const entryDate = new Date(entry.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return entryDate >= start && entryDate <= end;
  });

  const totalDebit = filteredLedger.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = filteredLedger.reduce((sum, entry) => sum + entry.credit, 0);
  const netBalance = totalDebit - totalCredit;
  const currentBalance = filteredLedger.length > 0 ? filteredLedger[filteredLedger.length - 1].balance : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Ledger</h1>
          <p className="text-gray-600">Track all financial transactions and balances</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Debit</div>
              <div className="text-2xl font-bold text-green-600">RS.{totalDebit.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="text-red-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Credit</div>
              <div className="text-2xl font-bold text-red-600">RS.{totalCredit.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Net Balance</div>
              <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                RS.{netBalance.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Current Balance</div>
              <div className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                RS.{currentBalance.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-end">
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
              Export to Excel
            </button>
          </div>
        </div>

        <LedgerTable ledger={filteredLedger} />
      </div>
    </div>
  );
}
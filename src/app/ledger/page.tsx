'use client';

import { useState, useEffect } from 'react';
import LedgerTable from '@/components/ledger/LedgerTable';
import LedgerView from '@/components/ledger/LedgerView';
import LedgerForm from '@/components/ledger/LedgerForm';
import { mockLedger } from '@/lib/mockData';
import { LedgerEntry } from '@/lib/types';
import { BookOpen, TrendingUp, TrendingDown, DollarSign, PlusCircle } from 'lucide-react';

export default function LedgerPage() {
  const [ledger, setLedger] = useState<LedgerEntry[]>(mockLedger);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
  const [viewingEntry, setViewingEntry] = useState<LedgerEntry | null>(null);
  const [editingEntry, setEditingEntry] = useState<LedgerEntry | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedLedger = localStorage.getItem('ledger');
    if (savedLedger) {
      const parsedLedger = JSON.parse(savedLedger);
      const ledgerWithDates = parsedLedger.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      setLedger(ledgerWithDates);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ledger', JSON.stringify(ledger));
  }, [ledger]);

  const filteredLedger = ledger.filter(entry => {
    const entryDate = new Date(entry.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const matchesDate = entryDate >= start && entryDate <= end;
    const matchesSearch = searchTerm === '' || 
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.type.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDate && matchesSearch;
  });

  const handleViewEntry = (entry: LedgerEntry) => {
    setViewingEntry(entry);
    setShowViewModal(true);
  };

  const handleEditEntry = (entry: LedgerEntry) => {
    setEditingEntry(entry);
    setShowFormModal(true);
  };

  const handleDeleteEntry = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ledger entry? This action cannot be undone.');
    
    if (confirmDelete) {
      const updatedLedger = ledger.filter(entry => entry.id !== id);
      
      const recalculatedLedger = recalculateBalances(updatedLedger);
      setLedger(recalculatedLedger);
    }
  };

  const handleAddEntry = (entry: LedgerEntry) => {
    const updatedLedger = [...ledger, entry];
    const recalculatedLedger = recalculateBalances(updatedLedger);
    setLedger(recalculatedLedger);
    setShowFormModal(false);
  };

  const handleUpdateEntry = (updatedEntry: LedgerEntry) => {
    const updatedLedger = ledger.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    );
    
    const recalculatedLedger = recalculateBalances(updatedLedger);
    setLedger(recalculatedLedger);
    setEditingEntry(null);
    setShowFormModal(false);
  };

  const recalculateBalances = (entries: LedgerEntry[]): LedgerEntry[] => {
    let runningBalance = 0;
    
    return entries.map(entry => {
      runningBalance = runningBalance + entry.debit - entry.credit;
      return {
        ...entry,
        balance: runningBalance
      };
    });
  };

  const handleCloseView = () => {
    setShowViewModal(false);
    setViewingEntry(null);
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setEditingEntry(null);
  };

  const totalDebit = filteredLedger.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = filteredLedger.reduce((sum, entry) => sum + entry.credit, 0);
  const netBalance = totalDebit - totalCredit;
  const currentBalance = filteredLedger.length > 0 ? filteredLedger[filteredLedger.length - 1].balance : 0;

  const exportToExcel = () => {
    const headers = ['ID', 'Date', 'Type', 'Description', 'Debit', 'Credit', 'Balance', 'Branch'];
    const csvData = filteredLedger.map(entry => [
      entry.id,
      new Date(entry.date).toLocaleDateString(),
      entry.type,
      entry.description,
      entry.debit,
      entry.credit,
      entry.balance,
      entry.branchId
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledger-${startDate}-to-${endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Ledger</h1>
          <p className="text-gray-600">Track all financial transactions and balances</p>
        </div>
        <button
          onClick={() => setShowFormModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <PlusCircle size={20} />
          Add Entry
        </button>
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

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex flex-col md:flex-row gap-4">
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
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Entries
              </label>
              <input
                type="text"
                placeholder="Search by description, ID, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={exportToExcel}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              Export to Excel
            </button>
          </div>
        </div>

        <LedgerTable 
          ledger={filteredLedger} 
          onViewEntry={handleViewEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      </div>

      {showViewModal && viewingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <LedgerView
              entry={viewingEntry}
              onClose={handleCloseView}
            />
          </div>
        </div>
      )}

      {/* Form Modal (Add/Edit) */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <LedgerForm
              entry={editingEntry}
              onSubmit={editingEntry ? handleUpdateEntry : handleAddEntry}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
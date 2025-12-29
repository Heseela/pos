'use client';

import { useState } from 'react';
import PurchaseTable from '@/components/purchases/PurchaseTable';
import { mockPurchases } from '@/lib/mockData';
import { ShoppingBag, TrendingUp, Package, DollarSign } from 'lucide-react';

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState(mockPurchases);
  const [searchTerm, setSearchTerm] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('all');

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = 
      purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSupplier = supplierFilter === 'all' || purchase.supplier === supplierFilter;
    return matchesSearch && matchesSupplier;
  });

  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0);
  const avgPurchaseValue = purchases.length > 0 ? totalPurchases / purchases.length : 0;
  const uniqueSuppliers = [...new Set(purchases.map(p => p.supplier))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Management</h1>
          <p className="text-gray-600">Track and manage inventory purchases</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
          <ShoppingBag size={20} />
          New Purchase
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Purchases</div>
              <div className="text-2xl font-bold">{purchases.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-2xl font-bold">RS.{totalPurchases.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Avg. Purchase</div>
              <div className="text-2xl font-bold">RS.{avgPurchaseValue.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="text-orange-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Suppliers</div>
              <div className="text-2xl font-bold">{uniqueSuppliers.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search purchases by item or supplier..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
          >
            <option value="all">All Suppliers</option>
            {uniqueSuppliers.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
          <input
            type="month"
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            defaultValue="2024-01"
          />
        </div>

        <PurchaseTable purchases={filteredPurchases} />
      </div>
    </div>
  );
}
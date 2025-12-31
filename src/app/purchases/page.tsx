'use client';

import { useState, useEffect } from 'react';
import PurchaseTable from '@/components/purchases/PurchaseTable';
import PurchaseForm from '@/components/purchases/PurchaseForm';
import PurchaseView from '@/components/purchases/PurchaseView';
import { mockPurchases } from '@/lib/mockData';
import { Purchase, PurchaseFormData } from '@/lib/types';
import { ShoppingBag, TrendingUp, Package, DollarSign, Search, Filter } from 'lucide-react';

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const [viewingPurchase, setViewingPurchase] = useState<Purchase | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Load purchases from localStorage on initial render
  useEffect(() => {
    const savedPurchases = localStorage.getItem('purchases');
    if (savedPurchases) {
      const parsedPurchases = JSON.parse(savedPurchases);
      // Convert date strings back to Date objects
      const purchasesWithDates = parsedPurchases.map((purchase: any) => ({
        ...purchase,
        purchaseDate: new Date(purchase.purchaseDate)
      }));
      setPurchases(purchasesWithDates);
    }
  }, []);

  // Save purchases to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }, [purchases]);

  // Filter purchases based on search term, supplier, and date
  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch =
      purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSupplier = supplierFilter === 'all' || purchase.supplier === supplierFilter;

    const matchesDate = !dateFilter || 
      new Date(purchase.purchaseDate).toISOString().split('T')[0] === dateFilter;

    return matchesSearch && matchesSupplier && matchesDate;
  });

  // Add new purchase
  const addPurchase = (formData: PurchaseFormData) => {
    const newPurchase: Purchase = {
      id: `P${String(purchases.length + 1).padStart(3, '0')}`,
      itemId: `ITM${String(purchases.length + 1).padStart(3, '0')}`,
      itemName: formData.items[0]?.itemName || '',
      quantity: formData.items.reduce((sum, item) => sum + item.quantity, 0),
      unitPrice: formData.items[0]?.unitPrice || 0,
      totalPrice: formData.totalAmount,
      supplier: formData.supplier,
      purchaseDate: new Date(formData.purchaseDate),
      branchId: '1'
    };

    setPurchases(prev => [...prev, newPurchase]);
    setShowForm(false);
  };

  // Update existing purchase
  const updatePurchase = (formData: PurchaseFormData) => {
    if (!editingPurchase) return;

    const updatedPurchases = purchases.map(purchase => {
      if (purchase.id === editingPurchase.id) {
        return {
          ...purchase,
          itemName: formData.items[0]?.itemName || '',
          quantity: formData.items.reduce((sum, item) => sum + item.quantity, 0),
          unitPrice: formData.items[0]?.unitPrice || 0,
          totalPrice: formData.totalAmount,
          supplier: formData.supplier,
          purchaseDate: new Date(formData.purchaseDate),
        };
      }
      return purchase;
    });

    setPurchases(updatedPurchases);
    setEditingPurchase(null);
    setShowForm(false);
  };

  // Delete purchase
  const deletePurchase = (id: string) => {
    if (confirm('Are you sure you want to delete this purchase?')) {
      setPurchases(prev => prev.filter(purchase => purchase.id !== id));
    }
  };

  // Handle edit button click
  const handleEdit = (purchase: Purchase) => {
    // Convert purchase to form data
    const formData: PurchaseFormData = {
      id: purchase.id,
      supplier: purchase.supplier,
      purchaseDate: purchase.purchaseDate,
      items: [{
        itemName: purchase.itemName,
        quantity: purchase.quantity,
        unitPrice: purchase.unitPrice,
        totalPrice: purchase.totalPrice,
        category: '',
        unit: ''
      }],
      totalAmount: purchase.totalPrice,
      branchId: '1'
    };

    setEditingPurchase(purchase);
    // You would need to pass this formData to your PurchaseForm
    // You might need to update your PurchaseForm to accept initialData
    setShowForm(true);
  };

  // Handle view button click
  const handleView = (purchase: Purchase) => {
    setViewingPurchase(purchase);
    setShowView(true);
  };

  // Handle form submission (both add and edit)
  const handleFormSubmit = (formData: PurchaseFormData) => {
    if (editingPurchase) {
      updatePurchase(formData);
    } else {
      addPurchase(formData);
    }
  };

  // Calculate statistics
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
        <button
          onClick={() => {
            setEditingPurchase(null);
            setShowForm(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <ShoppingBag size={20} />
          New Purchase
        </button>
      </div>

      {/* Stats Cards */}
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

      {/* Filters */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search purchases by ID, item or supplier..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
              >
                <option value="all">All Suppliers</option>
                {uniqueSuppliers.map(supplier => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>

            <input
              type="date"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />

            {(searchTerm || supplierFilter !== 'all' || dateFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSupplierFilter('all');
                  setDateFilter('');
                }}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Purchase Table */}
        <PurchaseTable
          purchases={filteredPurchases}
          onEdit={handleEdit}
          onDelete={deletePurchase}
          onView={handleView}
        />
      </div>

      {/* Purchase Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <PurchaseForm
              onSubmit={handleFormSubmit}
              onClose={() => {
                setShowForm(false);
                setEditingPurchase(null);
              }}
              initialData={editingPurchase ? {
                supplier: editingPurchase.supplier,
                purchaseDate: editingPurchase.purchaseDate,
                items: [{
                  itemName: editingPurchase.itemName,
                  quantity: editingPurchase.quantity,
                  unitPrice: editingPurchase.unitPrice,
                  totalPrice: editingPurchase.totalPrice,
                  category: '',
                  unit: ''
                }],
                totalAmount: editingPurchase.totalPrice
              } : undefined}
              isEditing={!!editingPurchase}
            />
          </div>
        </div>
      )}

      {/* Purchase View Modal */}
      {showView && viewingPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <PurchaseView
              purchase={viewingPurchase}
              onClose={() => {
                setShowView(false);
                setViewingPurchase(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
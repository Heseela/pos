'use client';

import { useState, useEffect } from 'react';
import InventoryTable from '@/components/inventory/InventoryTable';
import InventoryForm from '@/components/inventory/InventoryForm';
import InventoryView from '@/components/inventory/InventoryView';
import { mockInventory } from '@/lib/mockData';
import { InventoryItem } from '@/lib/types';
import { Plus, Package, AlertTriangle } from 'lucide-react';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [viewingItem, setViewingItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load from localStorage on initial render
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel).length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0);

  const addInventoryItem = (newItem: InventoryItem) => {
    const itemWithId = {
      ...newItem,
      id: `INV${String(inventory.length + 1).padStart(3, '0')}`
    };
    setInventory([...inventory, itemWithId]);
    setShowForm(false);
  };

  const updateInventoryItem = (updatedItem: InventoryItem) => {
    const updatedInventory = inventory.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setInventory(updatedInventory);
    setEditingItem(null);
    setShowForm(false);
  };

  const deleteInventoryItem = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this inventory item? This action cannot be undone.');
    
    if (confirmDelete) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleViewItem = (item: InventoryItem) => {
    setViewingItem(item);
    setShowView(true);
  };

  const handleFormSubmit = (itemData: any) => {
    const item: InventoryItem = {
      id: editingItem?.id || `INV${String(inventory.length + 1).padStart(3, '0')}`,
      name: itemData.name,
      category: itemData.category,
      quantity: itemData.quantity,
      unit: itemData.unit,
      reorderLevel: itemData.reorderLevel,
      costPrice: itemData.costPrice,
      sellingPrice: itemData.sellingPrice,
      branchId: itemData.branchId
    };

    if (editingItem) {
      updateInventoryItem(item);
    } else {
      addInventoryItem(item);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCloseView = () => {
    setShowView(false);
    setViewingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage stock levels, reorder points, and item details</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Items</div>
              <div className="text-2xl font-bold">{inventory.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Low Stock Items</div>
              <div className="text-2xl font-bold">{lowStockItems}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-2xl font-bold">RS.{totalValue.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search inventory items..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Seafood">Seafood</option>
            <option value="Spices">Spices</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>

        <InventoryTable 
          inventory={filteredInventory}
          onEditItem={handleEditItem}
          onDeleteItem={deleteInventoryItem}
          onViewItem={handleViewItem}
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <InventoryForm
              onSubmit={handleFormSubmit}
              onClose={handleCloseForm}
              item={editingItem}
            />
          </div>
        </div>
      )}

      {/* View Modal */}
      {showView && viewingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <InventoryView
              item={viewingItem}
              onClose={handleCloseView}
              onEdit={() => {
                setShowView(false);
                setEditingItem(viewingItem);
                setShowForm(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
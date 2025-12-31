'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockBranches } from '@/lib/mockData';
import { Building, Plus, Edit, Trash2, MapPin, Phone, Mail, Users, X } from 'lucide-react';
import { User } from '@/lib/types';

interface BranchFormData {
  name: string;
  location: string;
  phone: string;
  email: string;
  manager: string;
  capacity: number;
}

export default function BranchesPage() {
  const [branches, setBranches] = useState(mockBranches);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<BranchFormData>({
    name: '',
    location: '',
    phone: '',
    email: '',
    manager: '',
    capacity: 50,
  });
  const router = useRouter();

  useEffect(() => {
    // FIXED: Get current user from localStorage - use 'currentUser' not 'user'
    const userData = localStorage.getItem('currentUser');
    
    console.log('Current user from localStorage:', userData); // Debug log
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Parsed user:', parsedUser); // Debug log
        setUser(parsedUser);
        
        // Check if user is admin
        if (parsedUser.role !== 'admin') {
          console.log('User is not admin, redirecting...'); // Debug log
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    } else {
      console.log('No user found, redirecting to login'); // Debug log
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBranch = {
      ...formData,
      id: `BR${String(branches.length + 1).padStart(3, '0')}`,
    };
    setBranches([...branches, newBranch]);
    setShowForm(false);
    setFormData({
      name: '',
      location: '',
      phone: '',
      email: '',
      manager: '',
      capacity: 50,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(branch => branch.id !== id));
    }
  };

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading while checking authentication
  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    console.log('Rendering Access Denied. User role:', user.role); // Debug log
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="text-red-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mt-2">Only administrators can access this page.</p>
          <p className="text-sm text-gray-500 mt-4">
            Current role: <span className="font-semibold capitalize">{user.role}</span>
          </p>
          <p className="text-sm text-gray-500">
            User: <span className="font-semibold">{user.name}</span>
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branch Management</h1>
          <p className="text-gray-600">Manage all restaurant branches across locations</p>
          <div className="mt-2 text-sm text-gray-500">
            Welcome, <span className="font-semibold text-primary">{user.name}</span> (Admin)
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Add Branch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Branches</div>
              <div className="text-2xl font-bold">{branches.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Capacity</div>
              <div className="text-2xl font-bold">
                {branches.reduce((sum, branch) => sum + (branch.capacity || 0), 0)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Locations</div>
              <div className="text-2xl font-bold">
                {new Set(branches.map(b => b.location.split(',')[0])).size}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search branches by name or location..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <div key={branch.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{branch.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(branch.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-700">{branch.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-700">{branch.email}</span>
                </div>
                {branch.manager && (
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-gray-700">Manager: {branch.manager}</span>
                  </div>
                )}
                {branch.capacity && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-500">Seating Capacity</div>
                    <div className="font-bold text-gray-900">{branch.capacity} seats</div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="text-sm text-gray-500">Branch ID</div>
                <div className="font-mono text-sm">{branch.id}</div>
              </div>
            </div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <Building className="mx-auto text-gray-400" size={48} />
            <div className="mt-4 text-gray-500">No branches found</div>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-primary hover:underline"
            >
              Add your first branch
            </button>
          </div>
        )}
      </div>

      {/* Add Branch Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Branch</h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., KTM Main Branch"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Connaught Place, KTM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 011-23456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., branch@restaurant.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manager Name
                  </label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({...formData, manager: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value) || 50})}
                    min="1"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Add Branch
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
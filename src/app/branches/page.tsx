'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/components/auth/AuthProvider';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { mockBranches } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building, MapPin, Phone, Mail, Plus, Edit, Trash2 } from 'lucide-react';
import { canManageBranches } from '@/utils/roleUtils';

export default function BranchesPage() {
  const { user } = useAuth();

  if (!user) return null;

  // Only admin can access this page
  if (!canManageBranches(user.role)) {
    return (
      <ProtectedRoute allowedRoles={['admin']}>
        <div className="flex min-h-screen">
          <Sidebar userRole={user.role} />
          <div className="flex-1 flex flex-col">
            <Header user={user} />
            <main className="flex-1 p-6">
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">Access Denied</div>
                <div className="text-gray-500">
                  Only administrators can access branch management.
                </div>
              </div>
            </main>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="flex min-h-screen">
        <Sidebar userRole={user.role} />
        <div className="flex-1 flex flex-col">
          <Header user={user} />
          <main className="flex-1 p-6 fade-in">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Branches Management</h1>
              <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
                <Plus size={20} />
                Add New Branch
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBranches.map((branch) => (
                <Card key={branch.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Building size={20} className="text-primary" />
                        {branch.name}
                      </span>
                      <span className="text-sm font-normal bg-primary/10 text-primary px-2 py-1 rounded">
                        ID: {branch.id}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                        <span className="text-gray-700">{branch.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-gray-700">{branch.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-700">{branch.email}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary py-2 rounded hover:bg-primary/20 transition-colors">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100 transition-colors">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
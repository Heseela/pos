'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock } from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@pos.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'Delhi Branch Head', email: 'branch@pos.com', password: 'branch123', role: 'branch-head', branchId: '1' },
  { id: '3', name: 'Cashier User', email: 'cashier@pos.com', password: 'cashier123', role: 'cashier', branchId: '1' },
  { id: '4', name: 'Waiter User', email: 'waiter@pos.com', password: 'waiter123', role: 'waiter', branchId: '1' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // For demo, use the selected role directly
    const user = mockUsers.find(u => u.role === selectedRole);
    
    if (user) {
      // Store user in localStorage for session
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleQuickLogin = (role: string) => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                <span className="text-primary">POS</span>
                <span className="text-secondary">System</span>
              </h1>
            </div>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {/* Quick Login Buttons */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Login by Role:</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickLogin('admin')}
                className="p-3 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <div className="font-medium text-primary-800">Admin</div>
                <div className="text-xs text-primary-600">Full access</div>
              </button>
              <button
                onClick={() => handleQuickLogin('branch-head')}
                className="p-3 bg-secondary-50 border border-secondary-200 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <div className="font-medium text-secondary-800">Branch Head</div>
                <div className="text-xs text-secondary-600">Branch management</div>
              </button>
              <button
                onClick={() => handleQuickLogin('cashier')}
                className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="font-medium text-green-800">Cashier</div>
                <div className="text-xs text-green-600">Orders & payments</div>
              </button>
              <button
                onClick={() => handleQuickLogin('waiter')}
                className="p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="font-medium text-orange-800">Waiter</div>
                <div className="text-xs text-orange-600">Order management</div>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with credentials</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="admin">Administrator</option>
                  <option value="branch-head">Branch Head</option>
                  <option value="cashier">Cashier</option>
                  <option value="waiter">Waiter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-primary hover:text-primary-dark">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div>• Admin: admin@pos.com / admin123</div>
              <div>• Branch Head: branch@pos.com / branch123</div>
              <div>• Cashier: cashier@pos.com / cashier123</div>
              <div>• Waiter: waiter@pos.com / waiter123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
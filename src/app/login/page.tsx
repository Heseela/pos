'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import { Lock, Mail, Eye, EyeOff, Building, User as UserIcon } from 'lucide-react';

const demoUsers = [
  { id: '1', name: 'Admin User', role: 'admin', email: 'admin@pos.com' },
  { id: '2', name: 'KTM Branch Head', role: 'branch-head', branchId: '1', email: 'branch@pos.com' },
  { id: '3', name: 'Pokhara Branch Head', role: 'branch-head', branchId: '2', email: 'branch2@pos.com' },
  { id: '4', name: 'Cashier 1', role: 'cashier', branchId: '1', email: 'cashier@pos.com' },
  { id: '5', name: 'Cashier 2', role: 'cashier', branchId: '2', email: 'cashier2@pos.com' },
  { id: '6', name: 'Waiter 1', role: 'waiter', branchId: '1', email: 'waiter@pos.com' },
  { id: '7', name: 'Waiter 2', role: 'waiter', branchId: '2', email: 'waiter2@pos.com' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const setAuthCookies = (user: any) => {
    const userData = encodeURIComponent(JSON.stringify(user));
    document.cookie = `user=${userData}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    
    document.cookie = `isAuthenticated=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = login(email, password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      setAuthCookies(user);
      
      setTimeout(() => {
        const defaultRoute = getDefaultRoute(user.role);
        router.push(defaultRoute);
      }, 500);
    } else {
      setError('Invalid credentials. Use any name + "password123"');
      setLoading(false);
    }
  };

  const handleQuickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('password123');
  };

  const getDefaultRoute = (role: string): string => {
    switch(role) {
      case 'admin': return '/dashboard';
      case 'branch-head': return '/dashboard';
      case 'cashier': return '/dashboard';
      case 'waiter': return '/dashboard';
      default: return '/dashboard';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'branch-head': return 'bg-blue-100 text-blue-800';
      case 'cashier': return 'bg-green-100 text-green-800';
      case 'waiter': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-primary to-primary-dark">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Lock className="text-primary" size={24} />
              </div>
              <h1 className="text-4xl font-bold text-white">POS System</h1>
            </div>
            <h2 className="text-xl text-white/90">Welcome back</h2>
            <p className="text-white/70 mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  placeholder="admin or admin@pos.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  placeholder="password123"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} POS System. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Quick Access */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-md mx-auto h-full flex flex-col justify-center">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Quick Access</h3>
            <p className="text-gray-600 mt-2">
              Click any account to auto-fill credentials
            </p>
            <p className="text-sm text-gray-500 mt-4">
              These are demo accounts for testing. Each has different access levels and permissions.
            </p>
          </div>

          <div className="space-y-4">
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleQuickLogin(user.name)}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    user.role === 'admin' ? 'bg-red-50' :
                    user.role === 'branch-head' ? 'bg-blue-50' :
                    user.role === 'cashier' ? 'bg-green-50' : 'bg-yellow-50'
                  }`}>
                    {user.role === 'admin' ? (
                      <Building className="text-red-600" size={20} />
                    ) : (
                      <UserIcon className={
                        user.role === 'branch-head' ? 'text-blue-600' :
                        user.role === 'cashier' ? 'text-green-600' : 'text-yellow-600'
                      } size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-primary">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {user.email}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(user.role)}`}>
                      {user.role.replace('-', ' ')}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">
                      Password: password123
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Login Instructions</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Use any username from the list above</li>
              <li>• Password is always: <code className="bg-blue-100 px-1 rounded">password123</code></li>
              <li>• Each role has different permissions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
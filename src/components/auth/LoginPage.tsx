'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, Zap, Copy, Check } from 'lucide-react';
import { UserRole } from '@/lib/types';

// Mock users with different roles
const mockUsers = [
    { id: '1', name: 'Admin User', email: 'admin@pos.com', password: 'admin123', role: 'admin' as const, branchId: '1', branchName: 'KTM Main' },
    { id: '2', name: 'KTM Branch Head', email: 'ktm.branch@pos.com', password: 'branch123', role: 'branch-head' as const, branchId: '1', branchName: 'KTM Main' },
    { id: '3', name: 'Pokhara Branch Head', email: 'pokhara.branch@pos.com', password: 'branch123', role: 'branch-head' as const, branchId: '2', branchName: 'Pokhara Branch' },
    { id: '4', name: 'Cashier - KTM', email: 'ktm.cashier@pos.com', password: 'cashier123', role: 'cashier' as const, branchId: '1', branchName: 'KTM Main' },
    { id: '5', name: 'Cashier - Pokhara', email: 'pokhara.cashier@pos.com', password: 'cashier123', role: 'cashier' as const, branchId: '2', branchName: 'Pokhara Branch' },
    { id: '6', name: 'Waiter - KTM', email: 'ktm.waiter@pos.com', password: 'waiter123', role: 'waiter' as const, branchId: '1', branchName: 'KTM Main' },
    { id: '7', name: 'Waiter - Pokhara', email: 'pokhara.waiter@pos.com', password: 'waiter123', role: 'waiter' as const, branchId: '2', branchName: 'Pokhara Branch' },
];

// Role descriptions for better UX
const roleDescriptions: Record<UserRole, { title: string; description: string; features: string[] }> = {
    admin: {
        title: 'Administrator',
        description: 'Full system access with all privileges',
        features: ['Manage all branches', 'View all reports', 'Add/Edit users', 'System settings']
    },
    'branch-head': {
        title: 'Branch Head',
        description: 'Manage specific branch operations',
        features: ['View branch reports', 'Manage inventory', 'Monitor orders', 'Staff supervision']
    },
    cashier: {
        title: 'Cashier',
        description: 'Handle payments and order processing',
        features: ['Process payments', 'View order details', 'Generate bills', 'Cash management']
    },
    waiter: {
        title: 'Waiter',
        description: 'Take and manage customer orders',
        features: ['Take orders', 'View order status', 'Print KOTs', 'Customer service']
    }
};

interface LoginPageProps {
    onLoginSuccess: (role: UserRole) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    // Auto-fill credentials when role is selected
    useEffect(() => {
        const user = mockUsers.find(u => u.role === selectedRole);
        if (user) {
            setEmail(user.email);
            setPassword(user.password);
        }
    }, [selectedRole]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Find user in mock data
        const user = mockUsers.find(u =>
            u.email === email && u.password === password && u.role === selectedRole
        );

        if (user) {
            // Store user in localStorage for session
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');

            // Call the success callback
            onLoginSuccess(user.role);
        } else {
            setError('Invalid credentials. Please try again or use Quick Login.');
            setIsLoading(false);
        }
    };

    const handleQuickLogin = (role: UserRole) => {
        setIsLoading(true);
        const user = mockUsers.find(u => u.role === role);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');
            // Call the success callback
            onLoginSuccess(user.role);
        }
    };

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const currentUser = mockUsers.find(u => u.role === selectedRole);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Side - Login Form */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden slide-up">
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
                            <p className="text-gray-600">Demo Login - Experience different roles</p>
                        </div>

                        {/* Quick Login Buttons */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <Zap size={16} />
                                Quick Login (Click to Login):
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {(['admin', 'branch-head', 'cashier', 'waiter'] as UserRole[]).map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => handleQuickLogin(role)}
                                        className={`p-3 border rounded-lg transition-all duration-300 ${selectedRole === role
                                                ? 'border-primary bg-primary-50'
                                                : 'border-gray-200 hover:border-primary hover:bg-primary-50/50'
                                            }`}
                                    >
                                        <div className={`font-medium ${selectedRole === role ? 'text-primary-800' : 'text-gray-800'}`}>
                                            {roleDescriptions[role].title}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {role === 'branch-head' ? 'KTM Branch' : role}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or login with selected role</span>
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
                                        Select Role
                                    </label>
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                                    >
                                        <option value="admin">Administrator</option>
                                        <option value="branch-head">Branch Head</option>
                                        <option value="cashier">Cashier</option>
                                        <option value="waiter">Waiter</option>
                                    </select>
                                </div>

                                {/* Auto-filled Credentials Preview */}
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-medium text-gray-700">Demo Credentials for {roleDescriptions[selectedRole].title}</h4>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                            Auto-filled
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Email</label>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono">
                                                    {currentUser?.email}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(currentUser?.email || '', 'email')}
                                                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                                                >
                                                    {copiedField === 'email' ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Password</label>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono">
                                                    {showPassword ? currentUser?.password : '••••••••'}
                                                </div>
                                                <div className="flex gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="p-2 text-gray-500 hover:text-primary transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => copyToClipboard(currentUser?.password || '', 'password')}
                                                        className="p-2 text-gray-500 hover:text-primary transition-colors"
                                                    >
                                                        {copiedField === 'password' ? <Check size={16} /> : <Copy size={16} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                                        defaultChecked
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                        Auto-login on next visit
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <Lock size={18} />
                                            Login as {roleDescriptions[selectedRole].title}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Demo Tips:</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Use Quick Login for instant access</li>
                                <li>• Try different roles to see varying permissions</li>
                                <li>• All data is static and resets on refresh</li>
                                <li>• No backend server required</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Side - Role Information */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden slide-up">
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {roleDescriptions[selectedRole].title} Dashboard Preview
                            </h2>
                            <p className="text-gray-600">{roleDescriptions[selectedRole].description}</p>
                        </div>

                        {/* Role Features */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">What you can do:</h3>
                            <ul className="space-y-3">
                                {roleDescriptions[selectedRole].features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        </div>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Permission Overview */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Access Permissions:</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`p-3 rounded-lg border ${selectedRole === 'admin' ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                                    <div className="text-sm font-medium text-gray-700">Dashboard</div>
                                    <div className="text-xs text-gray-500">Full access</div>
                                </div>
                                <div className={`p-3 rounded-lg border ${['admin', 'branch-head', 'cashier', 'waiter'].includes(selectedRole) ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                                    <div className="text-sm font-medium text-gray-700">Orders</div>
                                    <div className="text-xs text-gray-500">
                                        {selectedRole === 'waiter' ? 'View only' : 'Full access'}
                                    </div>
                                </div>
                                <div className={`p-3 rounded-lg border ${['admin', 'branch-head'].includes(selectedRole) ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                                    <div className="text-sm font-medium text-gray-700">Inventory</div>
                                    <div className="text-xs text-gray-500">
                                        {['admin', 'branch-head'].includes(selectedRole) ? 'Full access' : 'No access'}
                                    </div>
                                </div>
                                <div className={`p-3 rounded-lg border ${['admin', 'branch-head', 'cashier'].includes(selectedRole) ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                                    <div className="text-sm font-medium text-gray-700">Ledger</div>
                                    <div className="text-xs text-gray-500">
                                        {selectedRole === 'cashier' ? 'View only' : ['admin', 'branch-head'].includes(selectedRole) ? 'Full access' : 'No access'}
                                    </div>
                                </div>
                                <div className={`p-3 rounded-lg border ${['admin', 'branch-head'].includes(selectedRole) ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                                    <div className="text-sm font-medium text-gray-700">Reports</div>
                                    <div className="text-xs text-gray-500">
                                        {['admin', 'branch-head'].includes(selectedRole) ? 'Full access' : 'No access'}
                                    </div>
                                </div>
                                <div className={`p-3 rounded-lg border ${selectedRole === 'admin' ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                                    <div className="text-sm font-medium text-gray-700">Branches</div>
                                    <div className="text-xs text-gray-500">
                                        {selectedRole === 'admin' ? 'Full access' : 'No access'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Demo User Info */}
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-primary-800 mb-2">Current Demo User:</h4>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                    <User className="text-white" size={20} />
                                </div>
                                <div>
                                    <div className="font-semibold">{currentUser?.name}</div>
                                    <div className="text-sm text-primary-700">
                                        {roleDescriptions[selectedRole].title} • {currentUser?.branchName}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Role Switcher */}
                        <div className="mt-8">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Switch Role:</h4>
                            <div className="flex flex-wrap gap-2">
                                {(['admin', 'branch-head', 'cashier', 'waiter'] as UserRole[]).map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => setSelectedRole(role)}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${selectedRole === role
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
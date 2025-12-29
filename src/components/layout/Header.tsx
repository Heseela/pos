import { User } from '@/lib/types';
import { Bell, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="text-primary" size={20} />
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-500 capitalize">{user.role.replace('-', ' ')}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
'use client';

import { ReactNode } from 'react';
import { UserRole } from '@/lib/types';
import { canAccessModule } from '@/utils/roleUtils';

interface RoleBasedWrapperProps {
  children: ReactNode;
  role: UserRole;
  module: string;
}

export default function RoleBasedWrapper({ children, role, module }: RoleBasedWrapperProps) {
  if (!canAccessModule(role, module)) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">Access Denied</div>
        <div className="text-gray-500">
          You don't have permission to access this module.
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
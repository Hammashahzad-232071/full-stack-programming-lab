// ═══════════════════════════════════════════════════════════════════════════
// PROTECTED ROUTE - components/ProtectedRoute.js
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (!loading && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
      router.push('/unauthorized');
    }
  }, [loading, isAuthenticated, user, router, allowedRoles]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return null;
  }

  return children;
};

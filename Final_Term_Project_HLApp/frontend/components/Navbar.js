// ═══════════════════════════════════════════════════════════════════════════
// NAVBAR - components/Navbar.js
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            🏥 Healthcare
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">{user.name}</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm capitalize">
                  {user.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-indigo-600 hover:text-indigo-800">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

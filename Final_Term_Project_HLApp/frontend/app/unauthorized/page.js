// ═══════════════════════════════════════════════════════════════════════════
// UNAUTHORIZED PAGE - app/unauthorized/page.js
// ═══════════════════════════════════════════════════════════════════════════

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Access Denied</h1>
        <p className="text-xl text-gray-600 mb-8">You don't have permission to access this page.</p>
        <Link href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TOAST PROVIDER - components/ToastProvider.js
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import { Toaster } from 'react-hot-toast';

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
};

export default ToastProvider;

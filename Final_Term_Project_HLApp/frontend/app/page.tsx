'use client';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Healthcare App</h1>
        <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '1.5rem' }}>
          Welcome to the Healthcare Appointment System
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/login" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.375rem', textDecoration: 'none', display: 'inline-block' }}>
            Login
          </a>
          <a href="/register" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#16a34a', color: 'white', borderRadius: '0.375rem', textDecoration: 'none', display: 'inline-block' }}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Built-in test accounts
    const testAccounts = [
      { email: 'doctor@test.com', password: 'password123', role: 'doctor', name: 'Dr. Test' },
      { email: 'patient@test.com', password: 'password123', role: 'patient', name: 'Patient Test' },
      { email: 'admin@test.com', password: 'password123', role: 'admin', name: 'Admin Test' }
    ];

    // Check registered user
    const registered = JSON.parse(localStorage.getItem('user') || 'null');

    // Combine both
    const allAccounts = registered ? [...testAccounts, registered] : testAccounts;

    // Find matching account (case insensitive)
    const user = allAccounts.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setError('Email not found');
      return;
    }

    if (user.password !== password) {
      setError('Password is incorrect');
      return;
    }

    // Login successful
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    if (user.role === 'doctor') {
      router.push('/doctor/dashboard');
    } else if (user.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/patient/dashboard');
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6'}}>
      <div style={{width: '400px', padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
        <h1 style={{textAlign: 'center', marginBottom: '10px', fontSize: '28px', fontWeight: 'bold'}}>Login</h1>
        
        <p style={{textAlign: 'center', fontSize: '12px', color: '#666', marginBottom: '20px'}}>Test: doctor@test.com / password123</p>

        {error && <div style={{padding: '10px', backgroundColor: '#fecaca', color: '#991b1b', borderRadius: '4px', marginBottom: '15px', textAlign: 'center'}}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{marginBottom: '15px'}}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box'}} required/>
          </div>

          <div style={{marginBottom: '20px'}}>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box'}} required/>
          </div>

          <button type="submit" style={{width: '100%', padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>Login</button>
        </form>

        <p style={{marginTop: '15px', textAlign: 'center', fontSize: '14px'}}>No account? <a href="/register" style={{color: '#2563eb', textDecoration: 'none'}}>Register</a></p>
      </div>
    </div>
  );
}
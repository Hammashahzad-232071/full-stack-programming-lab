'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser || JSON.parse(loggedInUser).role !== 'doctor') {
      router.push('/login');
    } else {
      setUser(JSON.parse(loggedInUser));
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f3f4f6'}}>
      <nav style={{backgroundColor: '#7c3aed', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{margin: 0}}>Doctor Dashboard</h1>
        <button onClick={() => {localStorage.clear(); router.push('/login');}} style={{padding: '0.5rem 1rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Logout</button>
      </nav>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem'}}>
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem'}}>Today's Appointments</h3>
            <p style={{fontSize: '32px', fontWeight: 'bold', color: '#7c3aed'}}>5</p>
          </div>
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem'}}>Total Patients</h3>
            <p style={{fontSize: '32px', fontWeight: 'bold', color: '#7c3aed'}}>24</p>
          </div>
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem'}}>Pending Prescriptions</h3>
            <p style={{fontSize: '32px', fontWeight: 'bold', color: '#7c3aed'}}>3</p>
          </div>
        </div>

        <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h2 style={{color: '#1f2937', fontWeight: 'bold', marginBottom: '1rem'}}>Appointments Today</h2>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead style={{backgroundColor: '#f3f4f6'}}>
              <tr>
                <th style={{padding: '1rem', textAlign: 'left', color: '#1f2937', fontWeight: '600'}}>Patient Name</th>
                <th style={{padding: '1rem', textAlign: 'left', color: '#1f2937', fontWeight: '600'}}>Time</th>
                <th style={{padding: '1rem', textAlign: 'left', color: '#1f2937', fontWeight: '600'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3,4,5].map(i => (
                <tr key={i} style={{borderBottom: '1px solid #e5e7eb'}}>
                  <td style={{padding: '1rem', color: '#1f2937'}}>Patient {i}</td>
                  <td style={{padding: '1rem', color: '#1f2937'}}>{10+i}:00 AM</td>
                  <td style={{padding: '1rem'}}><span style={{padding: '0.25rem 0.75rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'}}>Confirmed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
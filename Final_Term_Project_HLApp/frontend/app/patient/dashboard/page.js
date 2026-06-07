'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PatientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(loggedInUser));
  }, [router]);

  if (!user) return <div>Loading...</div>;

  const mockAppointments = [
    { id: 1, doctor: 'Dr. Ahmed Hassan', date: '2024-12-20', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Fatima Khan', date: '2024-12-25', time: '2:00 PM', status: 'Pending' }
  ];

  const mockDoctors = [
    { id: 1, name: 'Dr. Ahmed Hassan', specialty: 'General Practitioner', fee: '1000 PKR' },
    { id: 2, name: 'Dr. Fatima Khan', specialty: 'Cardiologist', fee: '1500 PKR' },
    { id: 3, name: 'Dr. Muhammad Ali', specialty: 'Dermatologist', fee: '1200 PKR' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    router.push('/login');
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f3f4f6'}}>
      {/* Navbar */}
      <nav style={{backgroundColor: '#2563eb', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Healthcare System</h1>
        <div>
          <span style={{marginRight: '1rem'}}>Welcome, {user.name}</span>
          <button onClick={handleLogout} style={{padding: '0.5rem 1rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
        
        {/* Stats */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#666', fontSize: '14px', marginBottom: '0.5rem'}}>Total Appointments</h3>
            <p style={{fontSize: '32px', fontWeight: 'bold', color: '#2563eb'}}>2</p>
          </div>
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#666', fontSize: '14px', marginBottom: '0.5rem'}}>Upcoming Appointments</h3>
            <p style={{fontSize: '32px', fontWeight: 'bold', color: '#16a34a'}}>1</p>
          </div>
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#666', fontSize: '14px', marginBottom: '0.5rem'}}>Completed Appointments</h3>
            <p style={{fontSize: '32px', fontWeight: 'bold', color: '#7c3aed'}}>1</p>
          </div>
        </div>

        {/* Appointments Section */}
        <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem'}}>
          <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '1rem'}}>My Appointments</h2>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead style={{backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb'}}>
              <tr>
                <th style={{padding: '1rem', textAlign: 'left'}}>Doctor</th>
                <th style={{padding: '1rem', textAlign: 'left'}}>Date</th>
                <th style={{padding: '1rem', textAlign: 'left'}}>Time</th>
                <th style={{padding: '1rem', textAlign: 'left'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAppointments.map(apt => (
                <tr key={apt.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                  <td style={{padding: '1rem'}}>{apt.doctor}</td>
                  <td style={{padding: '1rem'}}>{apt.date}</td>
                  <td style={{padding: '1rem'}}>{apt.time}</td>
                  <td style={{padding: '1rem'}}>
                    <span style={{padding: '0.25rem 0.75rem', backgroundColor: apt.status === 'Confirmed' ? '#dcfce7' : '#fef3c7', color: apt.status === 'Confirmed' ? '#166534' : '#92400e', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'}}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Available Doctors */}
        <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '1rem'}}>Available Doctors</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem'}}>
            {mockDoctors.map(doc => (
              <div key={doc.id} style={{border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9fafb'}}>
                <h3 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>{doc.name}</h3>
                <p style={{color: '#666', fontSize: '14px', marginBottom: '0.5rem'}}>{doc.specialty}</p>
                <p style={{fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem'}}>{doc.fee}</p>
                <button style={{width: '100%', padding: '0.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Book Appointment</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD - app/admin/dashboard/page.js
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import apiClient from '@/lib/apiClient';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [docsRes, patientsRes, appointmentsRes] = await Promise.all([
        apiClient.get('/doctors'),
        apiClient.get('/patients'),
        apiClient.get('/appointments')
      ]);
      
      setDoctors(docsRes.data.doctors || []);
      setPatients(patientsRes.data.patients || []);
      setAppointments(appointmentsRes.data.appointments || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Doctors</h3>
            <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
            <p className="text-3xl font-bold text-green-600">{patients.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Appointments</h3>
            <p className="text-3xl font-bold text-purple-600">{appointments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Pending Appointments</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {appointments.filter(a => a.status === 'pending').length}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Doctors Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Doctors</h2>
              <Link href="/admin/doctors" className="text-indigo-600 hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Specialization</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Hospital</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.slice(0, 5).map((doctor) => (
                    <tr key={doctor._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {doctor.userId?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{doctor.specialization}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{doctor.hospitalName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Patients Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Patients</h2>
              <Link href="/admin/patients" className="text-indigo-600 hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Blood Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Appointments</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.slice(0, 5).map((patient) => (
                    <tr key={patient._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {patient.userId?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{patient.bloodType}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{patient.totalAppointments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Management Links */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Link href="/admin/doctors" className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Manage Doctors</h3>
            <p className="text-indigo-700">Add, edit, or remove doctor profiles</p>
          </Link>
          <Link href="/admin/patients" className="bg-green-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Manage Patients</h3>
            <p className="text-green-700">Manage patient records and information</p>
          </Link>
          <Link href="/admin/appointments" className="bg-purple-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Manage Appointments</h3>
            <p className="text-purple-700">Approve or reject appointments</p>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}

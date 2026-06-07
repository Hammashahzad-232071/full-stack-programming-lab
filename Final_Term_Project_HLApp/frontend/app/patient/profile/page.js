// ═══════════════════════════════════════════════════════════════════════════
// PATIENT PROFILE - app/patient/profile/page.js
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import apiClient from '@/lib/apiClient';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function PatientProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchPatientProfile();
  }, [user]);

  const fetchPatientProfile = async () => {
    try {
      // Get patient profile
      const patientsRes = await apiClient.get('/patients');
      const currentPatient = patientsRes.data.patients.find(p => p.userId._id === user?.id);
      
      if (currentPatient) {
        setProfileData(currentPatient);
        setFormData({
          bloodType: currentPatient.bloodType,
          height: currentPatient.height,
          weight: currentPatient.weight,
          gender: currentPatient.gender,
          allergies: currentPatient.allergies?.join(', '),
          chronicDiseases: currentPatient.chronicDiseases?.join(', '),
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData = {
        bloodType: formData.bloodType,
        height: parseInt(formData.height),
        weight: parseFloat(formData.weight),
        gender: formData.gender,
        allergies: formData.allergies.split(',').map(a => a.trim()),
        chronicDiseases: formData.chronicDiseases.split(',').map(d => d.trim()),
      };

      await apiClient.put(`/patients/${profileData._id}`, updateData);
      toast.success('Profile updated successfully');
      fetchPatientProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['patient']}>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Medical Profile</h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : profileData ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Allergies (comma separated)</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Chronic Diseases (comma separated)</label>
              <textarea
                name="chronicDiseases"
                value={formData.chronicDiseases}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">Complete your patient profile to proceed</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

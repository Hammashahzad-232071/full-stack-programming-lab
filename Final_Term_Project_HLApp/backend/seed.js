// ═══════════════════════════════════════════════════════════════════════════
// DATABASE SEED - seed.js
// ═══════════════════════════════════════════════════════════════════════════

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
   await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});

    // Sample doctor data
    const doctors = [
      { name: 'Dr. Ahmed Hassan', email: 'ahmed.doctor@hospital.com', specialization: 'Cardiologist', experience: 15 },
      { name: 'Dr. Fatima Khan', email: 'fatima.doctor@hospital.com', specialization: 'Dermatologist', experience: 10 },
      { name: 'Dr. Muhammad Ali', email: 'ali.doctor@hospital.com', specialization: 'Neurologist', experience: 12 },
      { name: 'Dr. Aisha Malik', email: 'aisha.doctor@hospital.com', specialization: 'Pediatrician', experience: 8 },
      { name: 'Dr. Hassan Sheikh', email: 'hassan.doctor@hospital.com', specialization: 'Orthopedist', experience: 14 },
      { name: 'Dr. Leila Ahmed', email: 'leila.doctor@hospital.com', specialization: 'General Practitioner', experience: 20 },
      { name: 'Dr. Omar Hassan', email: 'omar.doctor@hospital.com', specialization: 'Psychiatrist', experience: 11 },
      { name: 'Dr. Noor Khan', email: 'noor.doctor@hospital.com', specialization: 'ENT', experience: 9 },
      { name: 'Dr. Salim Ibrahim', email: 'salim.doctor@hospital.com', specialization: 'Ophthalmologist', experience: 16 },
      { name: 'Dr. Hana Mohamed', email: 'hana.doctor@hospital.com', specialization: 'Dentist', experience: 7 },
      { name: 'Dr. Karim Said', email: 'karim.doctor@hospital.com', specialization: 'Cardiologist', experience: 13 },
      { name: 'Dr. Maryam Hussain', email: 'maryam.doctor@hospital.com', specialization: 'Dermatologist', experience: 9 },
      { name: 'Dr. Ibrahim Amin', email: 'ibrahim.doctor@hospital.com', specialization: 'Neurologist', experience: 11 },
      { name: 'Dr. Zainab Ali', email: 'zainab.doctor@hospital.com', specialization: 'Pediatrician', experience: 6 },
      { name: 'Dr. Rashid Mohammad', email: 'rashid.doctor@hospital.com', specialization: 'General Practitioner', experience: 18 },
    ];

    // Sample patient data
    const patients = [
      { name: 'Amina Hassan', email: 'amina@patient.com', bloodType: 'O+', gender: 'Female' },
      { name: 'Mohamed Ahmed', email: 'mohamed@patient.com', bloodType: 'A+', gender: 'Male' },
      { name: 'Layla Ibrahim', email: 'layla@patient.com', bloodType: 'B+', gender: 'Female' },
      { name: 'Hassan Khan', email: 'hassan@patient.com', bloodType: 'O-', gender: 'Male' },
      { name: 'Noor Ali', email: 'noor@patient.com', bloodType: 'AB+', gender: 'Female' },
      { name: 'Karim Omar', email: 'karim@patient.com', bloodType: 'A-', gender: 'Male' },
      { name: 'Huda Said', email: 'huda@patient.com', bloodType: 'B-', gender: 'Female' },
      { name: 'Salim Hassan', email: 'salim@patient.com', bloodType: 'AB-', gender: 'Male' },
      { name: 'Mina Ahmed', email: 'mina@patient.com', bloodType: 'O+', gender: 'Female' },
      { name: 'Rashid Khan', email: 'rashid@patient.com', bloodType: 'A+', gender: 'Male' },
      { name: 'Rania Ibrahim', email: 'rania@patient.com', bloodType: 'B+', gender: 'Female' },
      { name: 'Omar Ali', email: 'omar@patient.com', bloodType: 'O-', gender: 'Male' },
      { name: 'Leila Mohamed', email: 'leila@patient.com', bloodType: 'AB+', gender: 'Female' },
      { name: 'Amir Hassan', email: 'amir@patient.com', bloodType: 'A-', gender: 'Male' },
      { name: 'Sama Khan', email: 'sama@patient.com', bloodType: 'B-', gender: 'Female' },
    ];

    // Create Doctor Users and Profiles
    console.log('🏥 Creating doctor records...');
    for (const doctorData of doctors) {
      const user = await User.create({
        name: doctorData.name,
        email: doctorData.email,
        password: 'password123',
        role: 'doctor',
        isVerified: true,
        isActive: true
      });

      await Doctor.create({
        userId: user._id,
        specialization: doctorData.specialization,
        qualifications: 'MBBS, MD',
        licenseNumber: `LIC${Math.random().toString(36).substr(2, 9)}`,
        experience: doctorData.experience,
        consultationFee: 1500,
        hospitalName: 'Central Hospital',
        hospitalAddress: '123 Medical Street, Downtown'
      });
    }

    // Create Patient Users and Profiles
    console.log('👥 Creating patient records...');
    for (const patientData of patients) {
      const user = await User.create({
        name: patientData.name,
        email: patientData.email,
        password: 'password123',
        role: 'patient',
        isVerified: true,
        isActive: true
      });

      await Patient.create({
        userId: user._id,
        bloodType: patientData.bloodType,
        height: 170 + Math.floor(Math.random() * 20),
        weight: 60 + Math.floor(Math.random() * 30),
        gender: patientData.gender,
        dateOfBirth: new Date(1990 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
        emergencyContact: {
          name: 'Emergency Contact',
          phone: '03001234567',
          relationship: 'Family Member'
        },
        allergies: [],
        chronicDiseases: [],
        previousSurgeries: [],
        medications: []
      });
    }

    // Create Admin User
    console.log('⚙️ Creating admin account...');
    await User.create({
      name: 'Admin User',
      email: 'admin@hospital.com',
      password: 'admin123',
      role: 'admin',
      isVerified: true,
      isActive: true
    });

    console.log('\n✅ Database seeded successfully!');
    console.log('📊 Created: 15 Doctors, 15 Patients, 1 Admin');
    console.log('\nTest Credentials:');
    console.log('Admin: admin@hospital.com / admin123');
    console.log('Doctor: ahmed.doctor@hospital.com / password123');
    console.log('Patient: amina@patient.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

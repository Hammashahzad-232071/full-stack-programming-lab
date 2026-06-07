require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ═══════════════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ═══════════════════════════════════════════════════════════════════════════
// DATABASE CONNECTION
// ═══════════════════════════════════════════════════════════════════════════

const mongooseOptions = {
  serverSelectionTimeoutMS: 30000,  // 30 seconds to select server
  connectTimeoutMS: 30000,           // 30 seconds to connect
  socketTimeoutMS: 30000,            // 30 seconds for socket
  retryWrites: true,
  maxPoolSize: 5,
  minPoolSize: 2
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES (Will be added in next steps)
// ═══════════════════════════════════════════════════════════════════════════

// Auth routes
app.use('/api/auth', require('./routes/authRoutes'));

// Doctor routes
app.use('/api/doctors', require('./routes/doctorRoutes'));

// Patient routes
app.use('/api/patients', require('./routes/patientRoutes'));

// Appointment routes
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Prescription routes
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));

// Notification routes
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Treatment routes
app.use('/api/treatments', require('./routes/treatmentRoutes'));

// ═══════════════════════════════════════════════════════════════════════════
// HEALTH CHECK ENDPOINT
// ═══════════════════════════════════════════════════════════════════════════

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running ✅' });
});

// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLING MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════════════════

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🏥 Healthcare Backend Server`);
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`${'═'.repeat(60)}\n`);
});

module.exports = app;

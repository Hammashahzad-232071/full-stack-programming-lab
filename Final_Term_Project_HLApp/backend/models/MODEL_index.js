// ═══════════════════════════════════════════════════════════════════════════
// MODELS INDEX - models/index.js
// Export all Mongoose models in one place
// ═══════════════════════════════════════════════════════════════════════════

module.exports = {
  User: require('./User'),
  Doctor: require('./Doctor'),
  Patient: require('./Patient'),
  Appointment: require('./Appointment'),
  Treatment: require('./Treatment'),
  Prescription: require('./Prescription'),
  Notification: require('./Notification')
};

// ═══════════════════════════════════════════════════════════════════════════
// USAGE EXAMPLES:
// ═══════════════════════════════════════════════════════════════════════════

// Import all models at once
// const { User, Doctor, Patient, Appointment, Treatment, Prescription, Notification } = require('./models');

// Or import individual model
// const User = require('./models/User');

// Create operations
// const newUser = await User.create({ ... });
// const newDoctor = await Doctor.create({ ... });
// const newPatient = await Patient.create({ ... });
// const newAppointment = await Appointment.create({ ... });

// Find operations
// const users = await User.find();
// const doctor = await Doctor.findById(doctorId);
// const patient = await Patient.findOne({ email: 'patient@example.com' });

// Update operations
// await Appointment.findByIdAndUpdate(appointmentId, { status: 'approved' });

// Delete operations
// await User.findByIdAndDelete(userId);

// ═══════════════════════════════════════════════════════════════════════════
// DOCTOR MODEL - models/Doctor.js
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    // ── Link to User Account ───────────────────────────────────────────
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    // ── Professional Information ───────────────────────────────────────
    specialization: {
      type: String,
      required: [true, 'Please specify specialization'],
      enum: [
        'General Practitioner',
        'Cardiologist',
        'Dermatologist',
        'Neurologist',
        'Orthopedist',
        'Pediatrician',
        'Psychiatrist',
        'ENT',
        'Ophthalmologist',
        'Dentist',
        'Other'
      ]
    },
    qualifications: {
      type: String,
      required: [true, 'Please provide qualifications']
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true
    },
    experience: {
      type: Number,
      required: true,
      // Years of experience
      min: 0
    },

    // ── Consultation Fees ──────────────────────────────────────────────
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
      default: 1000
    },

    // ── Availability ──────────────────────────────────────────────────
    workDays: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    startTime: {
      type: String, // Format: "09:00"
      required: true,
      default: '09:00'
    },
    endTime: {
      type: String, // Format: "18:00"
      required: true,
      default: '18:00'
    },

    // ── Hospital/Clinic Information ────────────────────────────────────
    hospitalName: {
      type: String,
      required: true
    },
    hospitalAddress: {
      type: String,
      required: true
    },

    // ── Bio and About ──────────────────────────────────────────────────
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },

    // ── Rating and Reviews ────────────────────────────────────────────
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },

    // ── Status ────────────────────────────────────────────────────────
    isAvailable: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },

    // ── Statistics ────────────────────────────────────────────────────
    totalAppointments: {
      type: Number,
      default: 0
    },
    completedAppointments: {
      type: Number,
      default: 0
    },

    // ── Timestamps ────────────────────────────────────────────────────
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;

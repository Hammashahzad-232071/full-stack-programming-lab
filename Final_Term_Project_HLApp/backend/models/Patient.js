// ═══════════════════════════════════════════════════════════════════════════
// PATIENT MODEL - models/Patient.js
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    // ── Link to User Account ───────────────────────────────────────────
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    // ── Medical Information ────────────────────────────────────────────
    bloodType: {
      type: String,
      enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      required: [true, 'Please specify blood type']
    },
    height: {
      type: Number, // in cm
      required: true,
      min: [50, 'Please enter a valid height']
    },
    weight: {
      type: Number, // in kg
      required: true,
      min: [10, 'Please enter a valid weight']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },

    // ── Medical History ────────────────────────────────────────────────
    allergies: {
      type: [String],
      default: []
    },
    chronicDiseases: {
      type: [String],
      default: []
      // e.g., ['Diabetes', 'Hypertension']
    },
    previousSurgeries: {
      type: [String],
      default: []
    },
    medications: {
      type: [String],
      default: []
    },

    // ── Emergency Contact ──────────────────────────────────────────────
    emergencyContact: {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      relationship: String
    },

    // ── Insurance Information ──────────────────────────────────────────
    insuranceProvider: String,
    insurancePolicyNumber: String,

    // ── Assigned Doctor ────────────────────────────────────────────────
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      default: null
    },

    // ── Patient Status ────────────────────────────────────────────────
    isActive: {
      type: Boolean,
      default: true
    },

    // ── Appointment History ────────────────────────────────────────────
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

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

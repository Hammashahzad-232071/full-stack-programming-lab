// ═══════════════════════════════════════════════════════════════════════════
// PRESCRIPTION MODEL - models/Prescription.js
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    // ── Link to Appointment and Treatment ──────────────────────────────
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },
    treatmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment',
      default: null
    },

    // ── Patient and Doctor Reference ───────────────────────────────────
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },

    // ── Medicines Array ────────────────────────────────────────────────
    medicines: [
      {
        name: {
          type: String,
          required: true
          // e.g., "Paracetamol", "Amoxicillin"
        },
        dosage: {
          type: String,
          required: true
          // e.g., "500mg", "1000mg"
        },
        frequency: {
          type: String,
          required: true,
          enum: ['Once daily', 'Twice daily', 'Thrice daily', 'Every 4 hours', 'Every 6 hours', 'As needed']
        },
        duration: {
          type: String,
          required: true
          // e.g., "5 days", "2 weeks"
        },
        instructions: String,
        sideEffects: [String],
        contraindications: [String]
      }
    ],

    // ── Prescription Details ───────────────────────────────────────────
    prescriptionDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    expiryDate: {
      type: Date,
      required: true
    },

    // ── Additional Instructions ────────────────────────────────────────
    generalInstructions: {
      type: String,
      maxlength: [500, 'Instructions cannot exceed 500 characters']
    },
    dietaryRestrictions: [String],
    activityRestrictions: [String],

    // ── Refill Information ────────────────────────────────────────────
    refillsAllowed: {
      type: Number,
      default: 0
    },
    refillsUsed: {
      type: Number,
      default: 0
    },

    // ── Status ────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ['active', 'expired', 'completed'],
      default: 'active'
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

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;

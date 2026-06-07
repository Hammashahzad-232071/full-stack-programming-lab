// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION MODEL - models/Notification.js
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    // ── Recipient User ────────────────────────────────────────────────
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipientRole: {
      type: String,
      enum: ['admin', 'doctor', 'patient'],
      required: true
    },

    // ── Notification Type ─────────────────────────────────────────────
    notificationType: {
      type: String,
      enum: [
        'appointment_confirmed',
        'appointment_reminder',
        'appointment_cancelled',
        'prescription_ready',
        'medication_reminder',
        'follow_up_reminder',
        'treatment_update',
        'admin_message'
      ],
      required: true
    },

    // ── Related Entity Reference ───────────────────────────────────────
    relatedAppointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      default: null
    },
    relatedPrescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prescription',
      default: null
    },
    relatedTreatmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment',
      default: null
    },

    // ── Notification Content ───────────────────────────────────────────
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    detailedMessage: {
      type: String,
      default: null
    },

    // ── Notification Status ────────────────────────────────────────────
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date,
      default: null
    },

    // ── Delivery Channels ──────────────────────────────────────────────
    channels: {
      email: {
        type: Boolean,
        default: true
      },
      inApp: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false // Can be enabled later
      },
      push: {
        type: Boolean,
        default: false // Can be enabled later
      }
    },

    // ── Delivery Status ────────────────────────────────────────────────
    emailSent: {
      type: Boolean,
      default: false
    },
    emailSentAt: {
      type: Date,
      default: null
    },
    smsSent: {
      type: Boolean,
      default: false
    },
    smsSentAt: {
      type: Date,
      default: null
    },

    // ── Scheduled Notification ────────────────────────────────────────
    scheduledFor: {
      type: Date,
      default: null
    },
    isScheduled: {
      type: Boolean,
      default: false
    },

    // ── Priority ───────────────────────────────────────────────────────
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },

    // ── Timestamps ────────────────────────────────────────────────────
    createdAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }
  },
  { timestamps: true }
);

// ═══════════════════════════════════════════════════════════════════════════
// AUTO-DELETE EXPIRED NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════

notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

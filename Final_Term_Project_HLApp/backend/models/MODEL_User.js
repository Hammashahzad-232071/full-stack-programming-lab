// ═══════════════════════════════════════════════════════════════════════════
// USER MODEL - models/User.js
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // ── Basic Information ──────────────────────────────────────────────
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password by default
    },

    // ── Role-based Access ─────────────────────────────────────────────
    role: {
      type: String,
      enum: {
        values: ['admin', 'doctor', 'patient'],
        message: 'Role must be either admin, doctor, or patient'
      },
      required: true
    },

    // ── Account Status ─────────────────────────────────────────────────
    isActive: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },

    // ── Contact Information ────────────────────────────────────────────
    phone: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    city: String,
    country: String,

    // ── Profile Picture ────────────────────────────────────────────────
    profileImage: {
      type: String,
      default: null
    },

    // ── Timestamps ─────────────────────────────────────────────────────
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

// ═══════════════════════════════════════════════════════════════════════════
// PASSWORD HASHING MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash password if it's new or modified
  if (!this.isModified('password')) {
    next();
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// PASSWORD COMPARISON METHOD
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Compare entered password with hashed password
 * Usage: const isMatch = await user.matchPassword(enteredPassword);
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ═══════════════════════════════════════════════════════════════════════════
// HIDE SENSITIVE DATA
// ═══════════════════════════════════════════════════════════════════════════

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

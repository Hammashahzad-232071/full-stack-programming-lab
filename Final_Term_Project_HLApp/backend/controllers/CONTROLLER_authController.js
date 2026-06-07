// ═══════════════════════════════════════════════════════════════════════════
// AUTH CONTROLLER - controllers/authController.js
// ═══════════════════════════════════════════════════════════════════════════

const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * @param {string} userId - User ID
 * @param {string} role - User role (admin, doctor, patient)
 * @returns {string} JWT token
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token valid for 7 days
  );
};

/**
 * REGISTER - Create new user account
 * POST /api/auth/register
 * Body: { name, email, password, confirmPassword, role }
 */
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    // ── Validation ─────────────────────────────────────────────────────
    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please login or use another email.'
      });
    }

    // Validate role
    if (!['admin', 'doctor', 'patient'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be admin, doctor, or patient'
      });
    }

    // ── Create User ────────────────────────────────────────────────────
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      role: role,
      isVerified: false // Email verification can be added later
    });

    // ── Create Role-Specific Profile ───────────────────────────────────
    if (role === 'doctor') {
      // Doctor profile will be created separately with more details
      console.log('Doctor account created. Complete profile in next step.');
    } else if (role === 'patient') {
      // Patient profile will be created separately with medical details
      console.log('Patient account created. Complete profile in next step.');
    }

    // ── Generate JWT Token ─────────────────────────────────────────────
    const token = generateToken(newUser._id, newUser.role);

    // ── Remove password from response ──────────────────────────────────
    const userResponse = newUser.toJSON();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: token,
      user: {
        id: userResponse._id,
        name: userResponse.name,
        email: userResponse.email,
        role: userResponse.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during registration: ' + error.message
    });
  }
};

/**
 * LOGIN - Authenticate user and return JWT token
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ── Validation ─────────────────────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // ── Find User ──────────────────────────────────────────────────────
    // Note: password is normally not selected, but we need it to verify
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Contact admin.'
      });
    }

    // ── Verify Password ────────────────────────────────────────────────
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Wrong password.'
      });
    }

    // ── Generate JWT Token ────────────────────────────────────────────
    const token = generateToken(user._id, user.role);

    // ── Remove password from response ──────────────────────────────────
    const userResponse = user.toJSON();

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token: token,
      user: {
        id: userResponse._id,
        name: userResponse.name,
        email: userResponse.email,
        role: userResponse.role,
        phone: userResponse.phone,
        address: userResponse.address
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login: ' + error.message
    });
  }
};

/**
 * LOGOUT - Invalidate token (client-side removal)
 * POST /api/auth/logout
 * Headers: { Authorization: "Bearer <token>" }
 */
const logout = async (req, res) => {
  try {
    // In JWT, logout is handled client-side by removing the token
    // The server doesn't need to do anything special
    // But you can add token to a blacklist in production for extra security

    res.status(200).json({
      success: true,
      message: 'Logged out successfully. Please remove the token from client storage.'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout: ' + error.message
    });
  }
};

/**
 * GET CURRENT USER - Get logged-in user details
 * GET /api/auth/me
 * Headers: { Authorization: "Bearer <token>" }
 */
const getCurrentUser = async (req, res) => {
  try {
    // User ID comes from JWT middleware (req.user.id)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage,
        isActive: user.isActive,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user: ' + error.message
    });
  }
};

/**
 * UPDATE PROFILE - Update user profile information
 * PUT /api/auth/profile
 * Headers: { Authorization: "Bearer <token>" }
 * Body: { name, phone, address, city, country }
 */
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, city, country } = req.body;

    // ── Validation ─────────────────────────────────────────────────────
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    // ── Update User ────────────────────────────────────────────────────
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name.trim(),
        phone: phone || null,
        address: address || null,
        city: city || null,
        country: country || null,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile: ' + error.message
    });
  }
};

/**
 * CHANGE PASSWORD - Change user password
 * POST /api/auth/change-password
 * Headers: { Authorization: "Bearer <token>" }
 * Body: { currentPassword, newPassword, confirmPassword }
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // ── Validation ─────────────────────────────────────────────────────
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all password fields'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    // ── Get User with Password ─────────────────────────────────────────
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // ── Verify Current Password ────────────────────────────────────────
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // ── Update Password ────────────────────────────────────────────────
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password: ' + error.message
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  changePassword,
  generateToken
};

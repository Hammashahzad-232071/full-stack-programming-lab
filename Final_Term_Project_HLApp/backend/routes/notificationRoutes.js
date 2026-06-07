// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION ROUTES - routes/notificationRoutes.js
// ═══════════════════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

/**
 * PROTECTED ROUTES - Requires Authentication
 */

// Get user notifications
router.get('/', authenticateToken, notificationController.getUserNotifications);

// Get unread notifications
router.get('/unread', authenticateToken, notificationController.getUnreadNotifications);

// Get notification by ID
router.get('/:id', authenticateToken, notificationController.getNotificationById);

// Create notification (Admin/Doctor)
router.post('/', authenticateToken, authorize('admin', 'doctor'), notificationController.createNotification);

// Mark notification as read
router.put('/:id/read', authenticateToken, notificationController.markAsRead);

// Mark all notifications as read
router.put('/mark-all-read', authenticateToken, notificationController.markAllAsRead);

// Delete notification
router.delete('/:id', authenticateToken, notificationController.deleteNotification);

module.exports = router;

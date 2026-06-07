// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION CONTROLLER - controllers/notificationController.js
// ═══════════════════════════════════════════════════════════════════════════

const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');

/**
 * GET ALL NOTIFICATIONS FOR USER
 * GET /api/notifications
 */
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientId: req.user.id })
      .populate('relatedAppointmentId')
      .populate('relatedPrescriptionId')
      .populate('relatedTreatmentId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications: ' + error.message
    });
  }
};

/**
 * GET UNREAD NOTIFICATIONS
 * GET /api/notifications/unread
 */
const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipientId: req.user.id,
      isRead: false
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching unread notifications: ' + error.message
    });
  }
};

/**
 * GET NOTIFICATION BY ID
 * GET /api/notifications/:id
 */
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate('relatedAppointmentId')
      .populate('relatedPrescriptionId')
      .populate('relatedTreatmentId');

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Mark as read
    if (!notification.isRead) {
      notification.isRead = true;
      notification.readAt = new Date();
      await notification.save();
    }

    res.status(200).json({
      success: true,
      notification: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notification: ' + error.message
    });
  }
};

/**
 * CREATE NOTIFICATION
 * POST /api/notifications
 * Body: { recipientId, notificationType, title, message, ... }
 */
const createNotification = async (req, res) => {
  try {
    const {
      recipientId,
      recipientRole,
      notificationType,
      title,
      message,
      detailedMessage,
      relatedAppointmentId,
      relatedPrescriptionId,
      relatedTreatmentId,
      channels
    } = req.body;

    // Validation
    if (!recipientId || !notificationType || !title || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const notification = await Notification.create({
      recipientId,
      recipientRole,
      notificationType,
      title,
      message,
      detailedMessage: detailedMessage || null,
      relatedAppointmentId: relatedAppointmentId || null,
      relatedPrescriptionId: relatedPrescriptionId || null,
      relatedTreatmentId: relatedTreatmentId || null,
      channels: channels || { email: true, inApp: true }
    });

    // Send email if enabled
    if (channels && channels.email) {
      const user = await User.findById(recipientId);
      if (user && user.email) {
        try {
          await sendEmail({
            to: user.email,
            subject: title,
            text: message,
            html: `<h3>${title}</h3><p>${message}</p><p>${detailedMessage || ''}</p>`
          });
        } catch (emailError) {
          console.log('Email sending failed:', emailError.message);
        }
      }
    }

    res.status(201).json({
      success: true,
      message: 'Notification created and sent successfully',
      notification: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating notification: ' + error.message
    });
  }
};

/**
 * MARK NOTIFICATION AS READ
 * PUT /api/notifications/:id/read
 */
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      notification: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking notification as read: ' + error.message
    });
  }
};

/**
 * MARK ALL NOTIFICATIONS AS READ
 * PUT /api/notifications/mark-all-read
 */
const markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { recipientId: req.user.id, isRead: false },
      {
        isRead: true,
        readAt: new Date()
      }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking notifications as read: ' + error.message
    });
  }
};

/**
 * DELETE NOTIFICATION
 * DELETE /api/notifications/:id
 */
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting notification: ' + error.message
    });
  }
};

module.exports = {
  getUserNotifications,
  getUnreadNotifications,
  getNotificationById,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification
};

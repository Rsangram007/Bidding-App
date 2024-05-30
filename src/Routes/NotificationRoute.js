const express = require('express');
const { getNotifications, markAsRead } = require('../Controller/Notification');
const { Authorization, validateToken } = require('../Middleware/auth');

const router = express.Router();

router.get('/GetallNotification', validateToken, getNotifications);
router.post('/mark-read', validateToken, markAsRead);

module.exports = router;
const { getNotificationsByUserId, markNotificationsAsRead } = require('../Model/Notification');

const getNotifications = async (req, res) => {
    const notifications = await getNotificationsByUserId(req.user.id);
    console.log("all notification",notifications,req.user.id)
    res.json({ notifications });
};

const markAsRead = async (req, res) => {
    await markNotificationsAsRead(req.user.id);
    res.status(200).send('Notifications marked as read');
};

module.exports = { getNotifications, markAsRead };
const pool = require('../utils/Database');

const createNotification = async (userId, message) => {
    const result = await pool.query(
        'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *',
        [userId, message]
    );
    return result.rows[0];
};

const getNotificationsByUserId = async (userId) => {
    const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1', [userId]);
    return result.rows;
};

const markNotificationsAsRead = async (userId) => {
    await pool.query('UPDATE notifications SET is_read = true WHERE user_id = $1', [userId]);
};

module.exports = { createNotification, getNotificationsByUserId, markNotificationsAsRead };    
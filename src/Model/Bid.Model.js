const pool = require("../utils/Database");

const createBid = async (itemId, userId, bidAmount) => {
    const result = await pool.query(
        'INSERT INTO bids (item_id, user_id, bid_amount) VALUES ($1, $2, $3) RETURNING *',
        [itemId, userId, bidAmount]
    );
    return result.rows[0];
};

const getBidsByItemId = async (itemId) => {
    const result = await pool.query('SELECT * FROM bids WHERE item_id = $1', [itemId]);
    return result.rows;
};

module.exports = { createBid, getBidsByItemId };
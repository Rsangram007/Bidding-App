CREATE TABLE bids (
    id SERIAL PRIMARY KEY,
    item_id INT REFERENCES items(id),
    user_id INT REFERENCES users(id),
    bid_amount DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
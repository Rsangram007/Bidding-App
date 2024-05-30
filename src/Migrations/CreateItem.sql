CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    starting_price DECIMAL NOT NULL,
    current_price DECIMAL DEFAULT 0,
    image_url VARCHAR(255),
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
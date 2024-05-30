# Real-Time Bidding Platform

## Introduction
The real-time bidding platform API built with Node.js, Express, Socket.io, and PostgreSQL is a robust solution tailored for the demands of a dynamic bidding environment. Let's delve into its components and features:

Node.js and Express: Node.js provides the runtime environment for server-side JavaScript execution, while Express offers a minimalist web application framework to build APIs swiftly. Together, they ensure high performance and scalability.

Socket.io: Socket.io facilitates real-time bid updates and notifications. It enables bid events to be pushed instantly to connected clients, ensuring a seamless bidding experience.

PostgreSQL: PostgreSQL serves as the database management system, providing reliability, data integrity, and scalability. Its relational model is well-suited for storing complex bid data, user information, and authentication credentials.

CRUD Operations: The API supports Create, Read, Update, and Delete operations, enabling users to manage bids, auction items, user profiles, and other resources efficiently.

User Authentication: Robust user authentication mechanisms, such as JWT (JSON Web Tokens), ensure secure access to the API endpoints. Users can register, login, and manage their accounts securely.

Role-Based Access Control (RBAC): RBAC allows administrators to define user roles and permissions. Different roles, such as bidder, auctioneer, and administrator, have varying levels of access to API resources, ensuring data security and integrity.

Real-Time Bidding: The platform facilitates real-time bidding on auction items. Bid updates are instantly broadcasted to all connected clients via WebSocket communication, providing a responsive and immersive bidding experience.

Notifications: Users receive real-time notifications for bid updates, auction status changes, and other relevant events. This ensures timely communication and keeps users informed about the latest developments in the bidding process.

Scalability and Performance: The architecture of the API is designed for scalability and high performance, allowing it to handle a large number of concurrent users and bidding activities without compromising responsiveness or reliability.

Error Handling and Logging: Comprehensive error handling mechanisms and logging functionalities ensure smooth operation and easy troubleshooting. Errors are handled gracefully, and detailed logs provide insights into system behavior and performance.

API Documentation: The API is accompanied by comprehensive documentation, detailing endpoints, request formats, response structures, authentication mechanisms, and usage examples. This facilitates seamless integration with client applications and promotes developer productivity.

## Features
- User registration and authentication with JWT.
- Role-based access control for users and admins.
- CRUD operations for auction items.
- Real-time bidding using WebSockets.
- Real-time notifications for bids and outbid alerts.
- Image upload for auction items.
- Pagination, search, and filtering for auction items.
- Comprehensive error handling and validation.
- Rate limmiting to prevent API from being exploited.

## Environment Setup

### 1. Clone the repository:

    ```bash
    git clone https://github.com/Rsangram007/Bidding-App.git
    cd src
    ```

### 2. Install dependencies:
    ```bash
    npm install
    ```

### 3. Create a `.env` file with the following variables:
    ```env
    PORT=3000
    JWT_SECRET=your_jwt_secret
    ```

### 4. Run the database migrations:
    ```bash
    # Create tables in PostgreSQL locally
    psql -U yourusername -d yourdatabase -a -f database.sql
    ```

### 5. Start the development server:
    ```bash
    npm dev 
    ```
    Or the normal server :
    ```bash
    npm start
   ```

## Database Schema

### Users Table
- `id` (Primary Key)
- `username` (String, unique, not null)
- `password` (String, not null)
- `email` (String, unique, not null)
- `role` (String, default to 'user') // roles: 'user', 'Admin'
- `created_at` (Timestamp, default to current time)

### Items Table
- `id` (Primary Key)
- `name` (String, not null)
- `description` (Text, not null)
- `starting_price` (Decimal, not null)
- `current_price` (Decimal, default to starting_price)
- `image_url` (String, nullable) // for storing image paths
- `end_time` (Timestamp, not null) // auction end time
- `created_at` (Timestamp, default to current time)

### Bids Table
- `id` (Primary Key)
- `item_id` (Foreign Key referencing items.id)
- `user_id` (Foreign Key referencing users.id)
- `bid_amount` (Decimal, not null)
- `created_at` (Timestamp, default to current time)

### Notifications Table
- `id` (Primary Key)
- `user_id` (Foreign Key referencing users.id)
- `message` (String, not null)
- `is_read` (Boolean, default to false)
- `created_at` (Timestamp, default to current time)

## API Endpoints

### Users
- **POST localhost:3000/users/register** - Register a new user.
- **POST localhost:3000/users/login** - Authenticate a user and return a token.
- **GET localhost:3000/users/profile** - Get the profile of the logged-in user.

### Items
- **POST localhost:3000/Items/createItem** - Create a new auction item. (Authenticated users, image upload)
- **GET localhost:3000/Items/Getitem** - Retrieve all auction items (with pagination).
- **GET localhost:3000/Items/:items** - Retrieve a single auction item by ID.
- **PUT localhost:3000/Items/:items** - Update an auction item by ID. (Authenticated users, only item   admins)
- **DELETE localhost:3000/Items/:items** - Delete an auction item by ID. (Authenticated users, only item owners or admins)

### Bids
- **GET localhost:3000/Bids/:bids/bids** - Retrieve all bids for a specific item.
- **POST localhost:3000/Bids/:bids/bids** - Place a new bid on a specific item. (Authenticated users)

### Notifications
- **POST ** localhost:3000/Notification/mark-read - Mark notifications as read.
- **GET localhost:3000/Notification/GetallNotification** - Retrieve notifications for the logged-in user.


## WebSocket Events

### Bidding
- **connection** - Establish a new WebSocket connection.
- **bid** - Place a new bid on an item.
- **update** - Notify all connected clients about a new bid on an item.

### Notifications
- **notify** - Send notifications to users in real-time.

## Authentication and Authorization
- Use JWT (JSON Web Tokens) for authentication.
- Implement role-based access control to restrict access to certain endpoints based on user roles.
- Protect the POST, PUT, and DELETE endpoints appropriately.

## Validation and Error Handling
- Validate incoming data for required fields.
- Handle and return appropriate HTTP status codes and messages for errors (e.g., 400 for bad requests, 401 for unauthorized, 403 for forbidden, 404 for not found).

## Image Upload
- Implement image upload functionality for auction items using a library like multer.
- Store image URLs in the database.

## Search and Filtering
- Implement search functionality for auction items.
- Allow filtering items by status (e.g., active, ended).

## Pagination
- Implement pagination for the GET /items endpoint.

## Notifications
- Implement a notification system to notify users about bids on their items and when they are outbid.




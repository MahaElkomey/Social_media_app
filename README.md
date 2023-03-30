
# Social_media_app_Backend Server
This is a Node.js application that implements a Social Media Backend Server. It includes user authentication and authorization, CRUD operations for users, posts, comments, and reviews, and image uploading for user profile pictures.

## Technologies Used

- Node.js
- Express
- Mongoose
- Cloudinary
- Multer
- Joi
- dotenv
- cors
- bcrypt
- jsonwebtoken

## Features

- User authentication and authorization with role-based access control(Ex: only admin role can delete creators,users,posts).
- User model with CRUD operations.
- Post model with CRUD operations.
- Comment model with CRUD operations.
- Review model with CRUD operations.
- Image uploading using Multer and Cloudinary.
- Request validation using Joi.
- Protect sensitive information such as passwords from returning.
- Implement error handling strategy.
- Encrypt user stord password in database.


## Prerequisites

- Node.js installed on your system
- A text editor or an IDE of your choice
- MongoDB installed on your system or access to a MongoDB Atlas account

## Installation

1. Clone the repository to your local machine.
2. Run npm install to install the required dependencies.
3. Create a .env file in the project's root directory and set your environment variables (such as the database URL, JWT secret, salt_round, , app_port,cloudinary_cloud_name,cloudinary_api_key and cloudinary_api_keysecret).
4. Run npm start to start the server.

## Getting Started

1. Clone the repository to your local machine using the following command:

 sh
git clone https://github.com/MahaElomey/Social_media_app


2. Install the project dependencies using the following command:

 sh
npm install


3. Create a .env file in the root directory of the project, and add the following environment variables:

 sh

 ##### PORT=<choose_port_to_run_your_app_on_it>
 ##### DB_URL=<your_mongodb_connection_string>
 ##### JWT_SECRET=<your_jwt_secret>
 ##### SALR_ROUND=<your_salt_round_number>
 ##### CLOUDINARY_CLOUD_NAME=<your_cloud_name>
 ##### CLOUDINARY_API_KEY=<your_cloud_api_key>
 ##### CLOUDINARY_API_SECRETKEY=<your_cloud_api_secret_key>




4. Start the server:

The server will start running on `http://localhost:4000` by default.

 sh
npm start


5. Use the API routes with a tool like Postman or Thunder Client.

## API Endpoints
### User Routes

- `POST /signup` - Register a new user.
- `POST /signin` - sign in a user.
- `GET /user/:id` - Get a specific user by ID and retrieve all his/her posts with its comments and reviews
- `PATCH /user/:id` - Update a specific user by ID.
- `DELETE /user/:id` - Delete a specific user by ID.

Posts

- `POST /post` - Create a new post.
- `GET /post` - Get post with filter for user id.
- `GET /post/:id` - Get a specific post by ID.
- `PATCH /post/:id` - Update a specific post by ID.
- `DELETE /post/:id` - Delete a specific post by ID.

Comments

- `POST /comment` - Create a new comment for specific post (post data are in request header).
- `GET /comment` - Get a list of all comments for specific post.
- `GET /comment/:Id` - Get a specific comment by ID for specific post.
- `PATCH /comment/:Id` - Update a specific comment by ID for specific post.
- `DELETE /comment/:Id` - Delete a specific comment by ID for specific post.

Reviews

- `POST /review` - Create a new review for specific post (post data are in request header).
- `GET /review` - Get a list of all reviews for specific post.
- `GET /review/:Id` - Get a specific review by ID for specific post.
- `PATCH =/review/:Id` - Update a specific review by ID for specific post.
- `DELETE /review/:Id` - Delete a specific review by ID for specific post.

## Authors
- [Maha Elkomey](https://www.linkedin.com/in/maha-elkomey/)
- [Hager Aboshady](https://www.linkedin.com/in/hager-aboshady/)

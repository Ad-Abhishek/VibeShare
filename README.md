# To-Do Application API

A social media platform built with the MERN stack (MongoDB, Express, React, Node.js). VibeShare lets users connect, post, like, and comment in real-time, offering a dynamic and interactive experience.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Tech Stack

- **Node.js**: Backend JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ORM for Node.js

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ad-Abhishek/VibeShare.git
   cd VibeShare
   ```

2. Install dependencies for both backend and frontend:

   ```bash
   npm install
   ```

3. Set up MongoDB and configure environment variables (see below).

4. Run the application: both backend and frontend:

   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the backend directory project and add the following variables:

```bash
SERVER_PORT=your_server_port
MONGO_CONNECTION_STRING=your_mongo_db_connection_string
```

Create a `.env` file in the frontend directory project and add the following variables:

```bash
REACT_APP_BASE_SERVER_URL=your_base_server_URL
REACT_APP_GET_POSTS_URL=your_base_server_URL/posts
REACT_APP_CREATE_POST_URL=your_base_server_URL/posts/create
REACT_APP_LIKE_POST_URL=your_base_server_URL/posts/like/:id
REACT_APP_COMMENT_POST_URL=your_base_server_URL/posts/comment/:id
```

## API Endpoints

### Post Routes

| Method | Endpoint             | Description          | Protected | Request Body                                         | Response |
| ------ | -------------------- | -------------------- | --------- | ---------------------------------------------------- | -------- |
| POST   | `/posts/create`      | Create a Post        | No        | `{ "title": "yourTitle", "content": "yourContent" }` |
| POST   | `/posts/comment/:id` | Comment a Post by ID | No        | `{ "text": "yourComment" }`                          |          |
| POST   | `/posts/like/:id`    | Like a Post by ID    | No        |                                                      |          |
| GET    | `/posts`             | Get all Posts        | No        |                                                      |          |

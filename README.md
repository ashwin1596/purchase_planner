# Purchase Planner: Personalized Shopping Intelligence

A full-stack web application for managing and planning purchases, built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and containerized with Docker.

## Overview

Purchase Planner helps users organize and track their planned purchases with features like item categorization, voting system, and collaborative feedback through comments.

## Problem Solved

Scattered purchase tracking and decision-making processes that lead to unnecessary spending and coordination challenges.

## User Impact

- Smarter purchasing decisions
- Reduced individual and group buying friction
- Enhanced financial planning

## Features

### User Management
- **User Registration**: Create new accounts with secure user details storage
- **User Login**: Secure authentication system for existing users

### Item Management
- **Add Items**: Create new purchase items with:
  - Item name
  - Category
  - Price
  - Additional details
- **Display and Filter**:
  - Comprehensive item listing
  - Category-based filtering system
  - Organized view of all planned purchases
- **Remove Items**: Delete items that have been purchased or are no longer needed

### Interactive Features
- **Upvoting System**:
  - Upvote items to highlight importance
  - Add comments to explain upvotes
  - Track item popularity
- **Downvoting System**:
  - Downvote less relevant items
  - Help prioritize purchases

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/purchase-planner.git
cd purchase-planner
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Create .env file in backend directory
cp .env.example .env
```

4. Run with Docker:
```bash
docker-compose up --build
```

### Running Locally (Without Docker)

1. Start the backend server:
```bash
cd backend
npm run start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user

### Item Endpoints
- `GET /api/items` - Fetch all items
- `POST /api/items` - Create new item
- `DELETE /api/items/:id` - Remove an item
- `PUT /api/items/:id/vote` - Update item votes
- `POST /api/items/:id/comment` - Add comment to item

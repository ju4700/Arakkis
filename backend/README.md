# AgroBazar Backend API

Backend API for AgroBazar - Bangladesh's first digital agricultural marketplace.

## Features

- **User Authentication**: JWT-based authentication system
- **Two User Types**: Farmer and Consumer accounts
- **TypeScript**: Full TypeScript support for type safety
- **MongoDB**: Database with Mongoose ODM
- **Security**: Password hashing with bcryptjs

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string for JWT signing
     - `PORT`: Server port (default: 5000)

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Run the development server:
```bash
npm run dev
```

5. For production build:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user (farmer or consumer)
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)
- `PUT /api/auth/updateprofile` - Update user profile (protected)

## User Types

### Farmer
- Can list products
- Has farm details (location, size, crops)
- Verification system

### Consumer
- Can purchase products
- Manage shipping addresses
- Order history

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts           # Database connection
│   ├── controllers/
│   │   └── authController.ts   # Auth logic
│   ├── middleware/
│   │   └── auth.ts         # Authentication middleware
│   ├── models/
│   │   └── User.ts         # User model
│   ├── routes/
│   │   └── authRoutes.ts   # Auth routes
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   ├── utils/
│   │   └── tokenUtils.ts   # JWT utilities
│   └── server.ts           # Express app setup
├── .env                    # Environment variables
├── .env.example           # Example env file
├── package.json
└── tsconfig.json          # TypeScript configuration
```

## Development

The server uses `ts-node-dev` for hot reloading during development. Any changes to `.ts` files will automatically restart the server.

## Security Notes

- Always use a strong, random `JWT_SECRET` in production
- Keep `.env` file secure and never commit it to version control
- Use HTTPS in production
- Implement rate limiting for API endpoints

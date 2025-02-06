# Uber Clone Project

## Overview
This is a full-stack Uber clone application built with React, Node.js, and MongoDB. The project implements real-time ride-hailing functionality with features for both riders and drivers.

## Tech Stack
- Frontend: React + Vite, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- Real-time Communication: Socket.io
- Maps: Google Maps API
- Authentication: JWT
- Image Storage: Cloudinary

## Key Features
- User authentication (Riders & Captains)
- Real-time location tracking
- Ride booking system
- Driver-passenger matching
- Interactive maps
- Profile management
- Ride history

## API Endpoints

### User Endpoints
```
POST /users/register
- Register new users
- Required: firstname, lastname, email, password

POST /users/login  
- User authentication
- Required: email, password

GET /users/logout
- User logout
- Requires JWT token
```

### Captain Endpoints
```
POST /captain/register
- Register new drivers
- Required: personal details, vehicle details

POST /captain/login
- Captain authentication 
- Required: email, password

GET /captain/profile
- Get captain details
- Requires JWT token
```

## Implementation Details

### Authentication Flow
1. User/Captain registration with input validation
2. Password hashing using bcrypt
3. JWT token generation on login
4. Token blacklisting on logout

### Real-time Communication
- Socket.io for bidirectional communication
- Live location updates
- Instant ride status changes
- Driver-passenger chat

### Database Schema
- Users collection
- Captains collection 
- Rides collection
- Blacklisted tokens collection

## Environment Variables
```
PORT=4000
DB_CONNECT=mongodb_url
FRONTEND_URL=http://localhost:5173
JWT_SECRET=secret_key
GOOGLE_MAPS_API_KEY=api_key
CLOUDINARY_URL=cloudinary_url
```

## Setup Instructions
1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Start backend: `npm run dev`
5. Start frontend: `npm run dev`

## Project Structure
```
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── context/
└── Backend/
  ├── controllers/
  ├── models/
  ├── routes/
  └── middleware/
``` 
## Ride Endpoints
```
POST /ride/create
- Create new ride request
- Required: pickup, destination, vehicleType
- Authentication: User token required

GET /ride/get-fare
- Calculate ride fare
- Required: pickup, destination locations
- Returns fares for all vehicle types

POST /ride/confirm
- Captain accepts ride
- Required: rideId
- Authentication: Captain token required

GET /ride/start-ride
- Start the ride journey
- Required: rideId, otp
- Authentication: Captain token required

POST /ride/end-ride
- Complete the ride
- Required: rideId
- Authentication: Captain token required
```

### Socket.IO Integration
- Real-time connection management for users and captains
- Socket events:
  - `join`: Associates socketId with user/captain
  - `new-ride`: Notifies nearby captains of ride requests
  - `ride-confirmed`: Alerts user when captain accepts
  - `ride-started`: Notifies ride commencement
  - `ride-ended`: Signals ride completion
  - `update-location-captain`: Tracks captain location

### Google Maps Integration
- Geocoding API for address to coordinates conversion
- Distance Matrix API for:
  - Route distance calculation
  - Journey time estimation
  - Fare computation
- Places Autocomplete API for location suggestions
- Dynamic captain search within radius
- Real-time location tracking
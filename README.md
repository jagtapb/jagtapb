# Authentication using NestJS, ReactJS, and MongoDB

This application provides secure User Authentication using JWT tokens, featuring a frontend built with ReactJS, a backend powered by NestJS, and MongoDB as the chosen database solution. The MongoDB database is hosted in the cloud on cloud.mongodb.com, providing scalability and accessibility.

## Key Features
## Frontend (ReactJS)
    Directory: reactjs-nestjs-mongo/frontend/
    Technology: ReactJS with TypeScript
    Packages:
        JWT: Used for Authentication and Authorization.
        Redux: Facilitating state management for efficient data handling.
        Axios: Handling API requests seamlessly.

## Backend (NestJS)
    Directory: reactjs-nestjs-mongo/backend/
    Technology: NestJS with TypeScript
    Database: MongoDB
    Packages:
        Mongoose: Ensuring a smooth integration with MongoDB for data storage.
        JWT: Employed for API verification and security.
        Winston: Comprehensive logging with logs stored in the /backend/logs directory (please note that log files are not included in the .gitignore file).

## Getting Started
To begin working with this application, follow these steps:

## Frontend
1. Navigate to the frontend directory:
    cd reactjs-nestjs-mongo/frontend/
2. Install dependencies:
    npm install
3. Start the frontend server:
    npm run start

The application will be accessible on port 3000. Open your browser and navigate to http://localhost:3000/login.


## Backend
1. Navigate to the backend directory:
    cd reactjs-nestjs-mongo/backend/
2. Install dependencies:
    npm install
3. Start the backend server in development mode:    
    npm run start:dev

The backend server will be running on port http://localhost:8000.
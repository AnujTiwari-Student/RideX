# Backend Documentation

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the backend directory:
    ```sh
    cd backend
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:
```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

## Running the Server

To start the server, run:
```sh
npm start
```

The server will start on the port specified in your environment variables or default to port 3000.

## API Endpoints

### User Registration

- **URL:** `/users/register`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required): User's email address.
  - `fullname.firstname` (string, required): User's first name (minimum 3 characters).
  - `fullname.lastname` (string, optional): User's last name (minimum 3 characters).
  - `password` (string, required): User's password (minimum 5 characters).

- **Response:**
  - `200 OK`: Returns a JSON object containing the authentication token and user details.
  - `400 Bad Request`: Returns a JSON object containing validation errors.

- **Example Request:**
    ```sh
    curl -X POST http://localhost:3000/register \
    -H "Content-Type: application/json" \
    -d '{
        "email": "user@example.com",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "password": "password123"
    }'
    ```

- **Example Response:**
    ```json
    {
        "token": "your-jwt-token",
        "user": {
            "_id": "user-id",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "user@example.com"
        }
    }
    ```

### User Login

- **URL:** `/users/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password (minimum 5 characters).

- **Response:**
  - `200 OK`: Returns a JSON object containing the authentication token and user details.
  - `400 Bad Request`: Returns a JSON object containing validation errors.
  - `401 Unauthorized`: Returns a JSON object indicating invalid email or password.

- **Example Request:**
    ```sh
    curl -X POST http://localhost:3000/login \
    -H "Content-Type: application/json" \
    -d '{
        "email": "user@example.com",
        "password": "password123"
    }'
    ```

- **Example Response:**
    ```json
    {
        "token": "your-jwt-token",
        "user": {
            "_id": "user-id",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "user@example.com"
        }
    }
    ```

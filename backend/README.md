# Backend Documentation

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [User Logout](#user-logout)
  - [User Profile](#user-profile)
  - [Captain Registration](#captain-registration)
  - [Captain Login](#captain-login)
  - [Captain Logout](#captain-logout)
  - [Captain Profile](#captain-profile)

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
    curl -X POST http://localhost:3000/users/register \
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
    curl -X POST http://localhost:3000/users/login \
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

### User Logout

- **URL:** `/users/logout`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: Bearer token (optional if using cookies)

- **Response:**
  - `200 OK`: Returns a JSON object indicating successful logout.

- **Example Request:**
    ```sh
    curl -X GET http://localhost:3000/users/logout \
    -H "Authorization: Bearer your-jwt-token"
    ```

- **Example Response:**
    ```json
    {
        "message": "Logged out successfully"
    }
    ```

### User Profile

- **URL:** `/users/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: Bearer token (required)

- **Response:**
  - `200 OK`: Returns a JSON object containing the user profile details.
  - `401 Unauthorized`: Returns a JSON object indicating unauthorized access.

- **Example Request:**
    ```sh
    curl -X GET http://localhost:3000/users/profile \
    -H "Authorization: Bearer your-jwt-token"
    ```

- **Example Response:**
    ```json
    {
        "_id": "user-id",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "user@example.com"
    }
    ```

### Captain Registration

- **URL:** `/captain/register`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required): Captain's email address.
  - `fullname.firstname` (string, required): Captain's first name (minimum 3 characters).
  - `fullname.lastname` (string, optional): Captain's last name (minimum 3 characters).
  - `password` (string, required): Captain's password (minimum 5 characters).
  - `status` (string): Captain's status (either 'active' or 'inactive').
  - `vehicle.color` (string, required): Vehicle color (minimum 3 characters).
  - `vehicle.plate` (string, required): Vehicle plate number (minimum 3 characters).
  - `vehicle.capacity` (number, required): Vehicle capacity (minimum 1).
  - `vehicle.vehicleType` (string, required): Vehicle type (either 'car', 'motorcycle', or 'auto').

- **Response:**
  - `200 OK`: Returns a JSON object containing the authentication token and captain details.
  - `400 Bad Request`: Returns a JSON object containing validation errors.

- **Example Request:**
    ```sh
    curl -X POST http://localhost:3000/captain/register \
    -H "Content-Type: application/json" \
    -d '{
        "email": "captain@example.com",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "password": "password123",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }'
    ```

- **Example Response:**
    ```json
    {
        "token": "your-jwt-token",
        "captain": {
            "_id": "captain-id",
            "fullname": {
                "firstname": "Jane",
                "lastname": "Doe"
            },
            "email": "captain@example.com",
            "status": "active",
            "vehicle": {
                "color": "red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            }
        }
    }
    ```

### Captain Login

- **URL:** `/captain/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required): Captain's email address.
  - `password` (string, required): Captain's password (minimum 5 characters).

- **Response:**
  - `200 OK`: Returns a JSON object containing the authentication token and captain details.
  - `400 Bad Request`: Returns a JSON object containing validation errors.
  - `401 Unauthorized`: Returns a JSON object indicating invalid email or password.

- **Example Request:**
    ```sh
    curl -X POST http://localhost:3000/captain/login \
    -H "Content-Type: application/json" \
    -d '{
        "email": "captain@example.com",
        "password": "password123"
    }'
    ```

- **Example Response:**
    ```json
    {
        "token": "your-jwt-token",
        "captain": {
            "_id": "captain-id",
            "fullname": {
                "firstname": "Jane",
                "lastname": "Doe"
            },
            "email": "captain@example.com",
            "status": "active",
            "vehicle": {
                "color": "red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            }
        }
    }
    ```

### Captain Logout

- **URL:** `/captain/logout`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: Bearer token (optional if using cookies)

- **Response:**
  - `200 OK`: Returns a JSON object indicating successful logout.

- **Example Request:**
    ```sh
    curl -X GET http://localhost:3000/captain/logout \
    -H "Authorization: Bearer your-jwt-token"
    ```

- **Example Response:**
    ```json
    {
        "message": "Logged out successfully"
    }
    ```

### Captain Profile

- **URL:** `/captain/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: Bearer token (required)

- **Response:**
  - `200 OK`: Returns a JSON object containing the captain profile details.
  - `401 Unauthorized`: Returns a JSON object indicating unauthorized access.

- **Example Request:**
    ```sh
    curl -X GET http://localhost:3000/captain/profile \
    -H "Authorization: Bearer your-jwt-token"
    ```

- **Example Response:**
    ```json
    {
        "_id": "captain-id",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "captain@example.com",
        "status": "active",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
    ```

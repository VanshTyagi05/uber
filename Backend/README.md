# Backend API Documentation

## Endpoints

### POST /users/register

Register a new user.

#### Description

This endpoint registers a new user by accepting their first name, last name, email, and password. The password is hashed before saving to the database. Upon successful registration, a JWT token is generated and returned along with the user details.

#### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

- **201 Created**

  ```json
  {
    "user": {
      "_id": "60c72b2f9b1d8c001c8e4b8e",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "role": "user",
      "profileImage": null,
      "createdAt": "2021-06-14T07:00:00.000Z",
      "updatedAt": "2021-06-14T07:00:00.000Z",
      "socketId": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

- **400 Bad Request**

  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name is required",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Last name is required",
        "param": "fullname.lastname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

  ```json
  {
    "message": "All fields are required - user controller error"
  }
  ```

#### Required Data

- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, required): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 6 characters long.

### POST /users/login

Login an existing user.

#### Description

This endpoint logs in an existing user by accepting their email and password. Upon successful login, a JWT token is generated and returned along with the user details.

#### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

- **200 OK**

  ```json
  {
    "user": {
      "_id": "60c72b2f9b1d8c001c8e4b8e",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "role": "user",
      "profileImage": null,
      "createdAt": "2021-06-14T07:00:00.000Z",
      "updatedAt": "2021-06-14T07:00:00.000Z",
      "socketId": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

- **400 Bad Request**

  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

  ```json
  {
    "message": "All fields are required - user controller error"
  }
  ```

- **401 Unauthorized**

  ```json
  {
    "message": "Invalid credentials (user not found) - user controller error"
  }
  ```

  ```json
  {
    "message": "Invalid credentials (password) - user controller error"
  }
  ```

#### Required Data

- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 6 characters long.
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

Apologies for the confusion. If you're blacklisting the token, the logout endpoint should invalidate the token and remove it from the blacklist. Here's the updated documentation:

###  Get /users/logout

Logout the current user.

#### Description

This endpoint logs out the currently logged-in user by invalidating the JWT token and adding it to a blacklist. After successful logout, the user's socket ID is set to null.

#### Request Body

No request body is required for this endpoint.

#### Response

- **200 OK**

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

- **401 Unauthorized**

  ```json
  {
    "message": "Invalid token - user controller error"
  }
  ```

#### Required Data

No required data for this endpoint.

#### Notes

- The JWT token should be included in the `Authorization` header with the format `Bearer <token>`.
- The JWT token is added to a blacklist after successful logout.
- The user's socket ID is set to null after successful logout.

#### Example

```bash
curl --request POST \
  --url http://localhost:5000/api/users/logout \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

```json
{
  "message": "Logged out successfully"
}
```

Please note that you'll need to implement the blacklist functionality in your backend code to store and validate the blacklisted tokens.

#### Register Captain API Documentation

This documentation provides a detailed guide for the Register Captain API endpoint, including request structure, validation rules, and expected responses.

Endpoint Details
#### URL
POST /captain/register

Headers
Key	Value	Required
Authorization	Bearer <token>	No
Content-Type	application/json	Yes
Request Body
The request body must contain both personal details and vehicle details as a JSON object.

Personal Details
Field	Type	Description	Required
fullname.firstname	string	The first name of the captain.	Yes
fullname.lastname	string	The last name of the captain.	Yes
email	string	The email address of the captain (must be unique).	Yes
password	string	A secure password for the captain's account.	Yes
Vehicle Details
Field	Type	Description	Required
vehicle.color	string	The color of the captain's vehicle.	Yes
vehicle.plate	string	The license plate number of the vehicle.	Yes
vehicle.capacity	integer	The seating capacity of the vehicle.	Yes
vehicle.vehicleType	string	The type of vehicle (e.g., car, bike, etc.).	Yes
Example Request Body
json
Copy
Edit
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "SecureP@ss123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "Car"
  }
}
Response
Success Response (201 Created)
Upon successful registration, the API returns the following response:

Field	Type	Description
token	string	JWT token to authenticate future requests.
captain	object	Details of the newly registered captain.
Example Success Response
json
Copy
Edit
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "63eaa7b1f1d0b723c5b5e73d",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "Car"
    }
  }
}
Error Responses
The API may return the following errors:

Status Code	Message	Cause
400 Bad Request	"All fields are required"	Required fields are missing in the request.
400 Bad Request	"Captain already exists"	A captain with the same email is already registered.
400 Bad Request	"Validation errors"	Request body validation failed (e.g., invalid email).
500 Internal Server Error	"An unexpected error occurred"	Any unexpected server-side issue.
Example Error Response
json
Copy
Edit
{
  "message": "All fields are required"
}
Validation Rules
Email: Must be a valid email format.
Password: Must be at least 6 characters long.
Vehicle Capacity: Must be a positive integer.
Fullname: Both firstname and lastname must be at least 3 characters long.
Testing
Using Postman
Set the HTTP Method to POST.
Enter the endpoint URL: http://<your-server-url>/api/v1/captains/register.
Add the required headers:
Content-Type: application/json
Provide the JSON body as shown in the example.
Send the request.
Notes
Ensure the email field is unique to prevent duplicate registrations.
The response includes a JWT token; securely store it for authenticating future requests.
For server-side validation, error details are returned in an array under the errors key.

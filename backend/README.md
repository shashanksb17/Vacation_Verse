### Project Title
VacationVerse - Your Ultimate Vacation Booking Platform

## Introduction
VacationVerse is a web application that allows hosts to list their properties for vacation rental and guests to book these properties for their perfect getaway. The platform provides a seamless experience for both hosts and guests, ensuring a hassle-free vacation planning process.

## Deployed App
https://expensive-newt-snaps.cyclic.app/

## Video Walkthrough of the Project

## Features
- Hosts can register and list their properties for vacation rental.
- Guests can register and book properties for their vacation.
- Guests can search for properties based on location, amenities, and rating.
- Hosts can manage their listed properties and view bookings.
- Guests can manage their bookings and update booking details.

## Design Decisions or Assumptions
- Users need to register and log in to access certain features.
- Passwords are securely hashed before storing them in the database.
- Properties can be filtered based on location, amenities, and rating.

## Installation & Getting Started
1. Clone the repository from GitHub.
2. Install the required dependencies using npm.
3. Start the server using the following command:

```bash
npm install
npm start
```

## Usage
To use VacationVerse, follow these steps:

1. Register as a host or guest.
2. Log in to your account.
3. Hosts can list their properties with all relevant details.
4. Guests can search for properties and make bookings.
5. Hosts can manage their properties and view bookings.
6. Guests can manage their bookings and update booking details.

## APIs Used
- Google Maps API: Used to display property locations on the map.

## API Endpoints
1. Register a new host
   - `POST /host/register`
   - Request Body:
   ```json
   {
     "name": "Host Name",
     "email": "host@example.com",
     "password": "password123",
     "location": "Host Location",
     "status": "Host Status",
     "profilepicture": "Host Profile Picture URL",
     "bio": "Host Bio",
     "hostingSince": "Host Hosting Since Date (YYYY-MM-DD)"
   }
   ```
   - Response:
   ```json
   {
     "message": "Host registered successfully"
   }
   ```

2. Authenticate a host
   - `POST /host/login`
   - Request Body:
   ```json
   {
     "email": "host@example.com",
     "password": "password123"
   }
   ```
   - Response:
   ```json
   {
     "success": true,
     "token": "JWT Token"
   }
   ```

3. Get all hosts
   - `GET /hosts`
   - Response: Array of host objects

4. Register a new guest
   - `POST /guest/register`
   - Request Body:
   ```json
   {
     "name": "Guest Name",
     "email": "guest@example.com",
     "password": "password123",
     "gender": "Guest Gender",
     "profilepicture": "Guest Profile Picture URL"
   }
   ```
   - Response:
   ```json
   {
     "message": "User registered successfully"
   }
   ```

5. Authenticate a guest
   - `POST /guest/login`
   - Request Body:
   ```json
   {
     "email": "guest@example.com",
     "password": "password123"
   }
   ```
   - Response:
   ```json
   {
     "success": true,
     "token": "JWT Token",
     "name": "Guest Name"
   }
   ```

6. Create a new property (hotel)
   - `POST /properties`
   - Authorization: Host JWT token required
   - Request Body:
   ```json
   {
     "name": "Property Name",
     "about": "Property Description",
     "property_type": "Property Type",
     "price": 100,
     "images": ["Image URL 1", "Image URL 2"],
     "location": "Property Location",
     "amenities": ["Amenity 1", "Amenity 2"],
     "rating": { "rating_value": 4.5, "num_reviews": 100 },
     "availability": ["2023-07-24", "2023-07-25"],
     "booked": ["2023-07-26", "2023-07-27"]
   }
   ```
   - Response:
   ```json
   {
     "message": "Property created successfully"
   }
   ```

7. Get all properties (hotels)
   - `GET /properties`
   - Query Parameters:
     - `location`: Property Location
     - `amenities`: Property Amenities (comma-separated)
     - `rating`: Minimum Property Rating (number)
   - Response: Array of property objects

8. Get property details (hotel details)
   - `GET /properties/:property_id`
   - Path Parameters:
     - `property_id`: Property ID
   - Response: Property object

9. Update property details (hotel details)
   - `PUT /properties/:property_id`
   - Authorization: Host JWT token required
   - Path Parameters:
     - `property_id`: Property ID
   - Request Body:
   ```json
   {
     "title": "Updated Property Name",
     "description": "Updated Property Description",
     "price": 150,
     "picture": "Updated Image URL",
     "rooms": 5,
     "location": "Updated Property Location",
     "amenities": ["Updated Amenity 1", "Updated Amenity 2"],
     "rating": { "rating_value": 4.8, "num_reviews": 120 }
   }
   ```
   - Response:
   ```json
   {
     "message": "Property updated successfully"
   }
   ```

10. Delete a property (hotel)
    - `DELETE /properties/:property_id`
    - Authorization: Host JWT token required
    - Path Parameters:
      - `property_id`: Property ID
    - Response:
    ```json
    {
      "message": "Property deleted successfully"
    }
    ```

11. Create a new booking (room booking)
    - `POST /bookings`
    - Authorization: Guest JWT token required
    - Request Body:
    ```json
    {
      "start_date": "2023-07-28",
      "end_date": "2023-07-30",
      "property_id": 1,
      "couponCode": "COUPON123",
      "discountedPrice": 10,
      "no_of_people": 2
    }
    ```
    - Response:
    ```json
    {
      "bookingId": 1,
      "totalFare": 180,
      "message": "Booking created successfully"
    }
    ```

12. Get all bookings for a guest
    - `GET /bookings`
    - Authorization: Guest JWT token required
    - Response: Array of booking objects

13. Update booking details
    - `PUT /bookings/:booking_id`
    - Authorization: Guest JWT token required
    - Path Parameters:
      - `booking_id`: Booking ID
    - Request

 Body:
    ```json
    {
      "start_date": "2023-07-29",
      "end_date": "2023-08-01",
      "rooms_booked": 3
    }
    ```
    - Response:
    ```json
    {
      "message": "Booking updated successfully"
    }
    ```

14. Delete a booking
    - `DELETE /bookings/:booking_id`
    - Authorization: Guest JWT token required
    - Path Parameters:
      - `booking_id`: Booking ID
    - Response:
    ```json
    {
      "message": "Booking deleted successfully"
    }
    ```

## Technology Stack
- Node.js
- Express.js
- MySQL
- Bcrypt (for password hashing)
- JWT (JSON Web Tokens) (for authentication)
- CORS (Cross-Origin Resource Sharing)
- Google Maps API (for property location mapping)

The API documentation above provides an overview of the project, its features, endpoints, and usage instructions. It's essential to keep the documentation updated whenever new features or changes are introduced to the API.
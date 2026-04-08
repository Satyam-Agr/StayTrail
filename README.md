# StayTrail

StayTrail is a full-stack accommodation listing platform inspired by Airbnb. It lets users browse stays, create their own listings, upload property images, write reviews, and manage content securely through authentication and ownership checks.

## Overview

The project is built as a server-rendered web application using Node.js, Express.js, MongoDB, and EJS. It focuses on the core marketplace flow:

- Browse all listings
- View detailed property pages
- Register, log in, and log out securely
- Create, edit, and delete listings
- Upload listing images to Cloudinary
- Add and delete reviews with star ratings
- Restrict edits and deletes to the correct owner/author

## Implemented Features

### User Authentication

- User signup with username, email, and password validation
- Login using Passport.js local authentication
- Persistent login sessions with `express-session`
- Logout support
- Redirect-back flow after login for protected routes
- Flash messages for success and error feedback

### Listing Management

- View all listings on the main listings page
- Open a dedicated detail page for each listing
- Create new listings with:
  - title
  - description
  - price
  - location
  - country
  - image upload
- Edit existing listings
- Delete listings
- Owner-only protection for edit and delete actions

### Image Uploads

- Image uploads handled with `multer`
- Cloud storage handled with Cloudinary
- Cloudinary-backed upload storage using `multer-storage-cloudinary`
- Old Cloudinary image cleanup when a listing image is replaced
- Cloudinary image cleanup when a listing is deleted

### Reviews

- Add reviews on listing detail pages
- Rate listings from 1 to 5 stars
- Submit written review comments
- Delete reviews
- Review delete access restricted to the review author
- Review references linked back to listings
- Review cleanup from listing documents when a review is removed

### Validation and Error Handling

- Joi-based server-side validation 
- Centralized async error wrapping
- Custom error handling middleware
- Custom 404 page flow for unknown routes

### Data Relationships

- `User` owns many listings
- `Listing` stores references to reviews and owner
- `Review` stores references to its listing and author
- Cascading cleanup for associated reviews when a listing is deleted

## Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: Passport.js, Passport Local, Passport Local Mongoose
- Templating: EJS, EJS-Mate
- File Uploads: Multer, Cloudinary, Multer Storage Cloudinary
- Validation: Joi
- Session and Messaging: Express Session, Connect Flash
- Utilities: Method Override, Dotenv

## Main Routes

### Listing Routes

- `GET /listings` - show all listings
- `GET /listings/new` - show create listing form
- `POST /listings` - create a new listing
- `GET /listings/:id` - show a specific listing
- `GET /listings/:id/edit` - show edit form
- `PUT /listings/:id` - update a listing
- `DELETE /listings/:id` - delete a listing
- `POST /listings/:id/reviews` - add a review
- `DELETE /listings/:id/reviews/:reviewId` - delete a review

### User Routes

- `GET /user/signup` - show signup form
- `POST /user/signup` - register a new user
- `GET /user/login` - show login form
- `POST /user/login` - log in
- `GET /user/logout` - log out


## Current Scope

This version of StayTrail already includes the complete core CRUD flow for listings and reviews, user authentication, session handling, authorization checks, Cloudinary image uploads, and MongoDB persistence.

## Author

Satyam Agrawal

const express = require('express');
const router = express.Router();
const asyncWrap = require('../utils/asyncWrap');
const { showAllListings, showNewListingForm, showListingDetails, showEditListingForm, createNewListing, updateListing, deleteListing, createNewReview, deleteReview } = require('../controlers/listings');
const {validateListing, validateListingUpdate, validateReview} = require('../middlewares/listingValidate');

// GET /listings - Get all listings
router.get('/', asyncWrap(showAllListings));
// GET /listings/new - Show form to create a new listing
router.get('/new', asyncWrap(showNewListingForm));
// GET /listings/:id - Get a specific listing by ID
router.get('/:id', asyncWrap(showListingDetails));
// GET /listings/:id/edit - Show form to edit a listing
router.get('/:id/edit', asyncWrap(showEditListingForm));

// POST /listings - Create a new listing
router.post('/', validateListing, asyncWrap(createNewListing));
// PUT /listings/:id - Update a listing
router.put('/:id', validateListingUpdate, asyncWrap(updateListing));
//DELETE /listings/:id - Delete a listing
router.delete('/:id', asyncWrap(deleteListing));

// POST /listings/:id/reviews - Create a new review for a listing
router.post('/:id/reviews', validateReview, asyncWrap(createNewReview));
//DELETE /listings/:id/reviews/:reviewId - Delete a review
router.delete('/:id/reviews/:reviewId', asyncWrap(deleteReview));

module.exports = router;
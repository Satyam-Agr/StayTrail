const express = require('express');
const router = express.Router();
const asyncWrap = require('../utils/asyncWrap');
const { showAllListings, showNewListingForm, showListingDetails, showEditListingForm, createNewListing, updateListing, deleteListing, createNewReview, deleteReview } = require('../controlers/listings');
const {validateListing, validateListingUpdate, validateReview} = require('../middlewares/listingValidate');
const {checkAuthenticated} = require('../middlewares/auth');

// GET /listings - Get all listings
router.get('/', asyncWrap(showAllListings));
// GET /listings/new - Show form to create a new listing
router.get('/new',checkAuthenticated , asyncWrap(showNewListingForm));
// GET /listings/:id - Get a specific listing by ID
router.get('/:id', asyncWrap(showListingDetails));
// GET /listings/:id/edit - Show form to edit a listing
router.get('/:id/edit',checkAuthenticated , asyncWrap(showEditListingForm));

// POST /listings - Create a new listing
router.post('/',checkAuthenticated , validateListing, asyncWrap(createNewListing));
// PUT /listings/:id - Update a listing
router.put('/:id',checkAuthenticated , validateListingUpdate, asyncWrap(updateListing));
//DELETE /listings/:id - Delete a listing
router.delete('/:id',checkAuthenticated , asyncWrap(deleteListing));

// POST /listings/:id/reviews - Create a new review for a listing
router.post('/:id/reviews',checkAuthenticated , validateReview, asyncWrap(createNewReview));
//DELETE /listings/:id/reviews/:reviewId - Delete a review
router.delete('/:id/reviews/:reviewId',checkAuthenticated , asyncWrap(deleteReview));

module.exports = router;
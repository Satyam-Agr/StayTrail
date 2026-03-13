const express = require('express');
const multer = require('multer');
const asyncWrap = require('../utils/asyncWrap');
const { storage } = require('../utils/cloudConfig');
const { showAllListings, showNewListingForm, showListingDetails, showEditListingForm, createNewListing, updateListing, deleteListing, createNewReview, deleteReview } = require('../controlers/listings');
const {validateListing, validateListingUpdate, validateReview} = require('../middlewares/payloadValidate');
const {isAuthenticated, checkAuthenticated, isAuther, isOwner} = require('../middlewares/auth');

const upload = multer({ storage });
const router = express.Router();
// GET /listings - Get all listings
router.get('/', asyncWrap(showAllListings));
// GET /listings/new - Show form to create a new listing
router.get('/new', isAuthenticated , asyncWrap(showNewListingForm));
// GET /listings/:id - Get a specific listing by ID
router.get('/:id', checkAuthenticated, asyncWrap(showListingDetails));
// GET /listings/:id/edit - Show form to edit a listing
router.get('/:id/edit', isAuthenticated , asyncWrap(isOwner), asyncWrap(showEditListingForm));

// POST /listings - Create a new listing
router.post('/',isAuthenticated , upload.single('listing[image]'), validateListing, asyncWrap(createNewListing));
// PUT /listings/:id - Update a listing
router.put('/:id',isAuthenticated , asyncWrap(isOwner), upload.single('listing[image]'), validateListingUpdate, asyncWrap(updateListing));
//DELETE /listings/:id - Delete a listing
router.delete('/:id',isAuthenticated , asyncWrap(isOwner), asyncWrap(deleteListing));

// POST /listings/:id/reviews - Create a new review for a listing
router.post('/:id/reviews',isAuthenticated , validateReview, asyncWrap(createNewReview));
//DELETE /listings/:id/reviews/:reviewId - Delete a review
router.delete('/:id/reviews/:reviewId',isAuthenticated , asyncWrap(isAuther), asyncWrap(deleteReview));

module.exports = router;

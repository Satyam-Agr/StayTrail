const express = require('express');
const router = express.Router();
const asyncWrap = require('../utils/asyncWrap');
const { showAllListings, showNewListingForm, showListingDetails, showEditListingForm, createNewListing, updateListing, deleteListing } = require('../controlers/listings');
const validateListing = require('../middlewares/listingValidate');

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
router.put('/:id', validateListing, asyncWrap(updateListing));
//DELETE /listings/:id - Delete a listing
router.delete('/:id', asyncWrap(deleteListing));
module.exports = router;
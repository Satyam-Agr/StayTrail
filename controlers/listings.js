const Listing = require('../models/listing');
const ExpressError = require('../utils/errors');

//GET /listings - Get all listings
async function showAllListings(req, res) {
    const listings = await Listing.find({});
    if (!listings) {
        throw new ExpressError('No listings found', 500);
    }
    return res.render('listings/index', { listings });
}
// GET /listings/new - Show form to create a new listing
async function showNewListingForm(req, res) {
    return res.render('listings/new');
}
// GET /listings/:id - Get a specific listing by ID
async function showListingDetails(req, res) {
    const id=req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError('Listing not found', 404);
    }
    return res.render('listings/show', { listing });
}
// GET /listings/:id/edit - Show form to edit a listing
async function showEditListingForm(req, res) {
    const id=req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError('Listing not found', 404);
    }
    return res.render('listings/edit', { listing });
}
// POST /listings - Create a new listing
async function createNewListing(req, res) {
    const listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    return res.status(201).redirect('/listings');
}
// PUT /listings/:id - Update a listing
async function updateListing(req, res) {
    const id=req.params.id;
    const listing = req.body.listing;
    const updatedListing = await Listing.findByIdAndUpdate(id, listing, { new: true, runValidators: true });
    if (!updatedListing) {
        throw new ExpressError('Listing not found', 404);
    }
    return res.status(200).redirect(`/listings/${id}`);
}
//TODO: Add resistance to delete operation
//DELETE /listings/:id - Delete a listing
async function deleteListing(req, res) {
    const id=req.params.id;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError('Listing not found', 404);
    }
    return res.status(200).redirect('/listings');
}
module.exports = {
    showAllListings,
    showNewListingForm,
    showListingDetails,
    showEditListingForm,
    createNewListing,
    updateListing,
    deleteListing
}


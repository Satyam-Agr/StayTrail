const {listingSchema, updateListingSchema, reviewSchema, userSchema} = require('../utils/joiSchema');
const ExpressError = require('../utils/errors');
// validate new listing data
function validateListing(req, res, next) {
    const payload = {
        listing: req.body.listing,
        file: req.file
    };
    const { error } = listingSchema.validate(payload);
    if(error) {
        const errorMessage = error.details.map(el => el.message).join(', ');
        next(new ExpressError(errorMessage, 400));
    } else {
        next();
    }
}
// validate updated listing data
function validateListingUpdate(req, res, next) {
     const { error } = updateListingSchema.validate(req.body);
    if(error) {
        const errorMessage = error.details.map(el => el.message).join(', ');
        next(new ExpressError(errorMessage, 400));
    } else {
        next();
    }
}
// validate review data
function validateReview(req, res, next) {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const errorMessage = error.details.map(el => el.message).join(', ');
        next(new ExpressError(errorMessage, 400));
    } else {
        next();
    }
}
// validate user registration data
function validateSignup(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if(error) {
        const errorMessage = error.details.map(el => el.message).join(', ');
        next(new ExpressError(errorMessage, 400));
    } else {
        next();
    }
}
module.exports = {
    validateListing, 
    validateListingUpdate,
    validateReview,
    validateSignup
};

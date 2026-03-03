const {listingSchema, updateListingSchema, reviewSchema} = require('../utils/joiSchema');
const ExpressError = require('../utils/errors');
// validate new listing data
function validateListing(req, res, next) {
    const { error } = listingSchema.validate(req.body);
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
module.exports = {
    validateListing, 
    validateListingUpdate,
    validateReview
};

const listingSchema = require('../utils/joiSchema');
const ExpressError = require('../utils/errors');

function validateListing(req, res, next) {
    const { error } = listingSchema.validate(req.body);
    if(error) {
        const errorMessage = error.details.map(el => el.message).join(', ');
        next(new ExpressError(errorMessage, 400));
    } else {
        next();
    }
}
module.exports = validateListing;

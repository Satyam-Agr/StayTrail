const {userSchema} = require('../utils/joiSchema');
const ExpressError = require('../utils/errors');

// Middleware to validate user registration data
function validateSignup(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if(error) {
        const errorMessage = error.details.map(el => el.message).join(', ');
        next(new ExpressError(errorMessage, 400));
    } else {
        next();
    }
}
module.exports={
    validateSignup
};

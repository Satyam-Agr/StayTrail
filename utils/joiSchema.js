const joi=require('joi');
// Validation schemas for new listing
const listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required().max(60),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string().allow(null, ""),
        location:joi.string().required(),
        country:joi.string().required()
    }).required()
});
// Validation schema for updating a listing (same as creating, but image is optional)
const updateListingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required().max(60),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required()
    }).required()
});
// Validation schema for creating a review
const reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required()
});
// Validation schema for user signup
const userSchema=joi.object({
    user:joi.object({
        username:joi.string().required().min(3).max(30),
        email:joi.string().required().email(),
        password:joi.string().required().min(6)
    }).required()
});
module.exports={
    listingSchema, 
    updateListingSchema,
    reviewSchema,
    userSchema
};
const joi=require('joi');

const listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required().max(60),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string(),
        location:joi.string().required(),
        country:joi.string().required()
    }).required()
});
module.exports=listingSchema;
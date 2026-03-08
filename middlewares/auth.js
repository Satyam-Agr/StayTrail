const Listing = require("../models/listing");
const Review = require("../models/review");
const ExceptionError = require("../utils/errors");
function isAuthenticated(req,res,next){
    if(!req.isAuthenticated())
    {   
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","First login to procide!");
        return res.redirect("/user/login");
    }
    next();
}
function checkAuthenticated(req,res,next){
    if(!req.isAuthenticated())
    {   
        req.session.redirectUrl=req.originalUrl;
    }
    next();
}
async function isOwner(req,res,next){
    const id=req.params.id;
    const listing=await Listing.findById(id);
    if(req.user && !listing.owner.equals(req.user._id))
    {
        throw new ExceptionError("You are not the Owner of this listing", 400);
    }
    next();
}
async function isAuther(req,res,next){
    const {reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(req.user && !review.auther.equals(req.user._id))
    {
        throw new ExceptionError("You are not the Auther of this review", 400);
    }
    next();
}
module.exports={
    isAuthenticated,
    checkAuthenticated,
    isAuther,
    isOwner
};
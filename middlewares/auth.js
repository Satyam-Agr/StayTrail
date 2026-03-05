function checkAuthenticated(req,res,next){
    if(!req.isAuthenticated())
    {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","First login to procide!");
        return res.redirect("/user/login");
    }
    next();
}

module.exports={
    checkAuthenticated
};
const redirectUrl = require("../utils/redirectUrl");//gets the post login url
module.exports=function initializeLocals(req,res,next){
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    res.locals.redirectUrl = redirectUrl(req.session.redirectUrl);
    next();
}
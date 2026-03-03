const ExpressError = require('./errors');
module.exports=function asyncWrap(fn) {
    return function(req, res, next) {
        try{
            fn(req, res, next);
        } catch(err) {
            next(new ExpressError(`Server Error:${err.message}`, 500));
        }
    }
};
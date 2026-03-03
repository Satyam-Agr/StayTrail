function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    let { statusCode = 500, message = "Internal Server Error" } = err;

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource id";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    }

    return res.status(statusCode).render("error", { statusCode, message });
}

module.exports = errorHandler;

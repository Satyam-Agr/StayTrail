//imports 
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const connectToMongoDB = require('./utils/connection');
const ExpressError = require('./utils/errors');
const User = require('./models/user');
const errorHandler = require('./middlewares/errorHandling');
const flashMiddleware = require('./middlewares/flash');
const listingsRouter = require('./routes/listings');
const userRouter = require('./routes/user');

//global variables
const app = express();
const PORT = 3000;
const dataBaseUrl = 'mongodb://127.0.0.1:27017/staytrail';
//connect to MongoDB
connectToMongoDB(dataBaseUrl);
//middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true, 
        secure: false, 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 1, // 1 day
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
    }
}));
app.use(flash());
//custom middlewares
app.use(flashMiddleware);
//authentication setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//start the server
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
//routers
//TODO: create a home page
app.get('/', (req, res) => {
    res.redirect('/listings');
});
//listings routes
app.use('/listings', listingsRouter);
//user routes
app.use('/user', userRouter);

//404 handler
app.use((req, res) => {
    throw new ExpressError('Page Not Found', 404);
});
//error handling middleware
app.use(errorHandler);

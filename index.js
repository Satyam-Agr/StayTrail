//imports 
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const connectToMongoDB = require('./utils/connection');
const listingsRouter = require('./routes/listings');
const errorHandler = require('./middlewares/errorHandling');
const ExpressError = require('./utils/errors');

//global variables
const app = express();
const PORT = 3000;
const dataBaseUrl = 'mongodb://127.0.0.1:27017/staytrail';
//connect to MongoDB
connectToMongoDB(dataBaseUrl);
//middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
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

//404 handler
app.use((req, res) => {
    throw new ExpressError('Page Not Found', 404);
});
//error handling middleware
app.use(errorHandler);

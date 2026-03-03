const mongoose = require('mongoose');
async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
    }
}
module.exports = connectToMongoDB;
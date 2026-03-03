const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating : { type: Number, required: true, min: 1, max: 5 },
    comment : { type: String, required: true },
    listingId : { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    createdAt : { type: Date, default: Date.now },
})

reviewSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await mongoose.model('Listing').findByIdAndUpdate(doc.listingId,{ $pull: { reviews: doc._id } });
    }
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

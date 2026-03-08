const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        url: String,
        fileName: String
    },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId , 
        ref: "User"
    }
});

listingSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await mongoose.model('Review').deleteMany({ _id: { $in: doc.reviews } });
    }
});
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

const mongoose = require('mongoose');
const { cloudinary } = require('../utils/cloudConfig');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        url: { type: String, required: true },
        filename: { type: String, required: true }
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
//detete reviews and the images if the listing is deleted
listingSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await mongoose.model('Review').deleteMany({ _id: { $in: doc.reviews } });
        const publicId = doc?.image?.filename;
        if (publicId && publicId !== "ExternalLink") {
            await cloudinary.uploader.destroy(publicId);
        }
    }
});
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

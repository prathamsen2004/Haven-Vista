const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url: String,
        filename: String,
    },
    price:Number,
    location: String,
    country: String,
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
      
    },
})
listingSchema.post("findByIdAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})

const listing = mongoose.model("listing",listingSchema);
module.exports = listing;
const listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(req,res)=>{
    let {id} = req.params;
    let list = await listing.findById(id);
    let newreview =  new Review(req.body.review);
    newreview.author = req.user._id;

    list.reviews.push(newreview);

    await newreview.save();
    await list.save();

    res.redirect(`/listings/${id}`);
 }

 module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}
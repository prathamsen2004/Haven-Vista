const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn} = require("../middleware.js");
const Controllers = require("../controllers/review.js");

const validateReview = (req,res,next)=>{
    let {err} = reviewSchema.validate(req.body);
    if(err){
        throw new ExpressError(404,err);
    }else{
        next();
    }
}

//reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(Controllers.createReview));

// delete a review
router.delete("/:reviewId",wrapAsync(Controllers.destroyReview));

module.exports = router;
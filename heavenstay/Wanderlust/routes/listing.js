const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn} = require("../middleware.js");
const Controllers = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const validateListing = (req,res,next)=>{
    let {err} = listingSchema.validate(req.body);
    if(err){
        throw new ExpressError(404,err);
    }else{
        next();
    }
}

router.get("/",wrapAsync(Controllers.index));
router.get("/new",isLoggedIn,wrapAsync(Controllers.renderNewForm));
router.get("/:id",wrapAsync(Controllers.showListing));

router.post("/",upload.single('listing[image]'),validateListing,wrapAsync(Controllers.createListing));

router.get("/:id/edit",isLoggedIn,wrapAsync(Controllers.renderEditForm))

router.put("/:id",upload.single('listing[image]'),validateListing,wrapAsync(Controllers.updateListing));

module.exports = router;

const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}

module.exports.renderNewForm = async(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
    const {id} = req.params;
    const item = await Listing.findById(id).populate( {path:"reviews",populate:{path:"author"}}).populate("owner");
    console.log(item.owner[0].username);
    console.log(item.reviews);
    
    if(!item){
        req.flash("error","listing Not found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{item});
};

module.exports.createListing = async(req,res,next)=>{
    // let result = listingSchema.validate(req.body);
    // if(result.error){
    //     throw new ExpressError(404,result.error);
    // }
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 2
      }).send()
    console.log(response.body)
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"..",filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    console.log(newListing.price);
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
    
};

module.exports.renderEditForm = async(req,res)=>{
    const {id}=req.params;
    const item = await Listing.findById(id);
    res.render("listings/edit.ejs",{item});
}

module.exports.updateListing = async(req,res)=>{
    const {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
   
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    
    req.flash("success","Edited successfully");
    res.redirect(`/listings/${id}`);
}
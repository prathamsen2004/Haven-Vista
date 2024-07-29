const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const Controllers = require("../controllers/users.js");

const ListControllers = require("../controllers/listing.js");

router.get("/",ListControllers.index);
router.get("/signup",Controllers.renderSignUp);

router.post("/signup",Controllers.SignUp);

router.get("/login",Controllers.renderLogin);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),Controllers.login);

router.get("/logout",Controllers.logout);

module.exports = router;

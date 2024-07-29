const User = require("../models/user.js");

module.exports.renderSignUp = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.SignUp = async(req,res)=>{
    try{
    let {username, email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    // Automatic login with signup
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","User registered Successfully");
        res.redirect("/listings");
    })
    
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
    
};

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust");
    const redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};
 module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You have succesfully logged out");
        res.redirect("/listings");
    })
};

const express=require("express");
const router=express.Router();
const passport=require("passport");

//Google Authentication Route
//handling google oauth using passport
router.get("/google", passport.authenticate("google",{
        scope:["profile"]
    }),
)

//callback for the google to redirect
router.get(
    "/google/redirect",
    passport.authenticate("google"),
    (req,res)=>{
        res.redirect("/page/home");
    }
)

//Facebook Authentication Route
router.get("/facebook", passport.authenticate("facebook"))

//callback for the google to redirect
router.get(
"/facebook/redirect",
passport.authenticate("facebook"),
(req,res)=>{
    res.redirect("/page/home/");
}
)
module.exports=router
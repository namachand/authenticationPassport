const express=require("express");
const router=express.Router();
const passport=require("passport");

//handling google oauth using passport
router.get(
    "/google",
    passport.authenticate("google",{
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

module.exports=router
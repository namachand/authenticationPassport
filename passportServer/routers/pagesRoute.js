const express=require("express");
const router=express.Router();
const passport=require("passport");

const autoCheck=(req,res,next)=>{
    if(!req.user){
        res.redirect("http://localhost:3000/")
    }
    else{
        next();
    }
}

router.get("/home/",autoCheck,(req,res)=>{
    res.send("<h1> Welcome to the Home Page <h1>")
});

module.exports=router
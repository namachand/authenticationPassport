const express=require("express");
const router=express.Router();

//logging out
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("http://localhost:3000/");
})
module.exports=router
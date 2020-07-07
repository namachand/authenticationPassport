const passport= require("passport");
const GoogleStrategy= require("passport-google-oauth20");
const FacebookStrategy = require('passport-facebook');
const keys = require("./keys");
const UserAuthInfo = require("../models/userInformationModel");

//serialize function
passport.serializeUser((user,done)=>{
    console.log("inside serialize");
    done(null,user.id);
})

//deserialize function
passport.deserializeUser((id,done)=>{
    UserAuthInfo.findById(id)
    .then((user)=>{
        done(null,user);
    })
})

const cb=(accessToken,refreshToken,profile,done)=>{
    console.log("Inside the callback function");
    console.log(profile);
    UserAuthInfo.findOne({authId:profile.id})
        .then((currentUser)=>{
            //checking if user already exists
            if(currentUser){
                //if user then we will passs the current user info to the serialize function to create a cookie
                console.log("there current user");
                return done(null,currentUser)
            }
            //store the new user to the database
            else{
                new UserAuthInfo({
                    username : profile.displayName,
                    authId : profile.id
                })
                .save()
                .then((updatedUser)=>{                    
                    //if new user then we will passs the new user info to the serialize function to create a cookie
                    return done(null,updatedUser);
                })

            }
        })
}

//Google Strategy
passport.use(
    new GoogleStrategy({
        //callback for the google to redirect when authenticate
        callbackURL:"/authentication/google/redirect",
        //client ID's and clientSecret ID's
        clientID:keys.google.clientId,
        clientSecret:keys.google.clientSecret
    },cb
    )
)

//Facebook Strategy
passport.use(
    new FacebookStrategy({
        //callback for the google to redirect when authenticate
        callbackURL:"/authentication/facebook/redirect",
        //client ID's and clientSecret ID's
        clientID:keys.facebook.appId,
        clientSecret:keys.facebook.appSecret
    },cb
    )
)
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
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


passport.use(
  //option for the google strategy
    new GoogleStrategy({
        //callback for the google to redirect when authenticate
        callbackURL:"/authentication/google/redirect",
        //client ID's and clientSecret ID's
        clientID:keys.google.clientId,
        clientSecret:keys.google.clientSecret
    }, 
    (accessToken,refreshToken,profile,done)=>{
        //checking if user already in database
        UserAuthInfo.findOne({googleId:profile.id})
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
                    googleId : profile.id
                })
                .save()
                .then((updatedUser)=>{                    
                    //if new user then we will passs the new user info to the serialize function to create a cookie
                    return done(null,updatedUser);
                })

            }
        })
    })
)
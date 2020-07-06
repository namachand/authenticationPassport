const express = require("express");
const http = require("http");
const bodyParser  = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const googleAuthStrategy = require("./authServices/googleAuthStrategy");
const keys = require('./authServices/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

//importing the routes
const googleOAuthRoute=require("./routers/googleAuth");
const pagesRoute=require("./routers/pagesRoute");
const logoutRoute=require("./routers/logoutRoute")

const app =express();
const server=http.createServer(app);
const PORT=process.env.PORT || 3231;

//application middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//setting up cookie session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.sessionKey]
}));
//setting up passport
app.use(passport.initialize());
app.use(passport.session());

//handling the routes
app.use("/authentication",googleOAuthRoute);
app.use("/page",pagesRoute)
app.use("/user",logoutRoute)

//connection for Mongodb database
mongoose.connect(keys.mongoURI.URI,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log("connect to mongodb");
});
//connection for the Server at Port 3231
server.listen(PORT,()=>{
    console.log("connected to port:"+ PORT);
});
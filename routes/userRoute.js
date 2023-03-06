const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const passport = require("passport");
require("../config/passportConfig")(passport);

// user registration;
app.post('/register', async(req, res)=>{
  try {
    const user = await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).send({
        message: 'User Already Exist',
        success: false
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).send({
      message: 'User Registered Succesfully',
      success: true
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false
    })
  }
});

//user login using passport local authentication
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});


module.exports = app;
